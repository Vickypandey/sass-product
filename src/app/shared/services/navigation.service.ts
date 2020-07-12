import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface IMenuItem {
  type: string; // Possible values: link/dropDown/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  userInfo: any = {}
  dashboard = {
    name: "Dashboard",
    type: "link",
    tooltip: "Dashboard",
    icon: "dashboard",
    state: "dashboard/analytics",
  }
  pages = {
    name: "PAGES",
    type: "separator",
  }
  systemConfig = {
    name: "System Config",
    type: "dropDown",
    tooltip: "System Config",
    icon: "how_to_reg",
    state: "system-config",
    sub: [
      { name: "Lead Source", state: "lead-source" },
      { name: "Lead Type", state: "lead-type" },
      { name: "Lead Stage", state: "lead-stage" },
      { name: "Permissions", state: "permission" },
      { name: "Contact", state: "contact" },
    ],
  }
  users = {
    name: "Users",
    type: "link",
    icon: "people",
    state: "pages/users",
  }
  leads = {
    name: "Leads",
    type: "link",
    icon: "people",
    state: "pages/leads",
  }
  clients = {
    name: "Clients",
    type: "link",
    icon: "people",
    state: "pages/clients",
  }
  iconMenu: IMenuItem[] = [{
    name: "Dashboard",
    type: "link",
    tooltip: "Dashboard",
    icon: "dashboard",
    state: "dashboard/analytics",
  }];
  constructor() {
    setTimeout(() => {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      if (this.userInfo != null) {
        if (this.userInfo.is_superuser) {
          this.iconMenu.push(this.pages)
          this.iconMenu.push(this.systemConfig)
          this.iconMenu.push(this.users)
          this.iconMenu.push(this.leads)
          this.iconMenu.push(this.clients)
        } else if (this.userInfo.member_type == "Vendor" && !this.userInfo.is_superuser) {
          this.iconMenu.push(this.pages)
          this.iconMenu.push(this.leads)
        } else if (this.userInfo.member_type == "Client" && !this.userInfo.is_superuser) {
          this.iconMenu.push(this.pages)
          this.iconMenu.push(this.users)
          this.iconMenu.push(this.leads)
        }
      }
      console.log(this.iconMenu)
    }, 500)
  }


  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = "Frequently Accessed";
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    this.menuItems.next(this.iconMenu);
  }
}
