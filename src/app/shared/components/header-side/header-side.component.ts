import { Component, OnInit, EventEmitter, Input, Output, Renderer2, AfterViewInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { ContactModalComponent } from "../../../views/others/contact/contact-modal/contact-modal.component"
import { ClientContactModalComponent } from "../../../views/others/client-contact/client-contact-modal/client-contact-modal.component"
import { LeadModalComponent } from "../../../views/others/leads/leads-modal/leads-modal.component"
import { ClientLeadModalComponent } from "../../../views/others/client-leads/client-leads-modal/client-leads-modal.component"
import { AddUserComponent } from "../../../views/others/app-user/add-user/add-user.component"
import { ClientAddUserComponent } from "../../../views/others/client-admin-user/client-add-user/client-add-user.component"
import { ClientModalComponent } from "../../../views/others/client/client-modal/client-modal.component"
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit, AfterViewInit {
  @Input() notificPanel;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'flag-icon-es'
  }]
  currentLang = this.availableLangs[0];

  userInfo: any = {
    member_type: ""
  }

  contactModalComponent: MatDialogRef<ContactModalComponent>
  clientContactModalComponent: MatDialogRef<ClientContactModalComponent>
  leadModalComponent: MatDialogRef<LeadModalComponent>
  clientLeadModalComponent: MatDialogRef<ClientLeadModalComponent>
  addUserComponent: MatDialogRef<AddUserComponent>
  clientAddUserComponent: MatDialogRef<ClientAddUserComponent>
  clientModalComponent: MatDialogRef<ClientModalComponent>

  public matxThemes;
  public layoutConf: any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    private router: Router,
    private renderer: Renderer2,
    private _matDialog: MatDialog,
    public jwtAuth: JwtAuthService
  ) { }
  ngOnInit() {
    this.matxThemes = this.themeService.matxThemes;
    this.layoutConf = this.layout.layoutConf;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    }, 1500)
  }
  setLang(lng) {

  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, { transitionClass: true })
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, { transitionClass: true })

  }

  onSearch(e) {
    //   console.log(e)
  }

  logout() {
    localStorage.clear()
    sessionStorage.clear()
    this.jwtAuth.signout()
  }

  createContact() {
    if (this.userInfo.member_type == "Vendor") {
      this.contactModalComponent = this._matDialog.open(ContactModalComponent, {
        panelClass: 'add-user-dialog',
        width: '800px',
        disableClose: true
      })
      this.contactModalComponent.afterClosed().subscribe(result => {
        if (result != undefined) {
          if (location.pathname == "/pages/contact") {
            this.router.navigateByUrl('xxx', { skipLocationChange: true }).then(() => {
              this.router.navigate(['pages/contact']);
            });
          }
        }
      })
    } else {
      this.clientContactModalComponent = this._matDialog.open(ClientContactModalComponent, {
        panelClass: 'add-user-dialog',
        width: '800px',
        disableClose: true
      })
      this.clientContactModalComponent.afterClosed().subscribe(result => {
        if (result != undefined) {
          if (location.pathname == "/pages/client-contact") {
            this.router.navigateByUrl('xxx', { skipLocationChange: true }).then(() => {
              this.router.navigate(['pages/client-contact']);
            });
          }
        }
      })
    }
  }

  createUser() {
    if (this.userInfo.member_type == "Vendor") {
      this.addUserComponent = this._matDialog.open(AddUserComponent, {
        panelClass: 'add-user-dialog',
        width: '400px',
        disableClose: true
      })
      this.addUserComponent.afterClosed().subscribe(result => {
        if (result != undefined) {
          if (location.pathname == "/pages/users") {
            this.router.navigateByUrl('xxx', { skipLocationChange: true }).then(() => {
              this.router.navigate(['pages/users']);
            });
          }
        }
      })
    } else {
      this.clientAddUserComponent = this._matDialog.open(ClientAddUserComponent, {
        panelClass: 'add-user-dialog',
        width: '400px',
        disableClose: true
      })
      this.clientAddUserComponent.afterClosed().subscribe(result => {
        if (result != undefined) {
          if (location.pathname == "/pages/client-users") {
            this.router.navigateByUrl('xxx', { skipLocationChange: true }).then(() => {
              this.router.navigate(['pages/client-users']);
            });
          }
        }
      })
    }
  }

  createLead() {
    if (this.userInfo.member_type == "Vendor") {
      this.leadModalComponent = this._matDialog.open(LeadModalComponent, {
        panelClass: 'add-user-dialog',
        width: '80vw',
        height: '80vh',
        disableClose: true
      })
      this.leadModalComponent.afterClosed().subscribe(result => {
        if (result != undefined) {
          if (location.pathname == "/pages/leads") {
            this.router.navigateByUrl('xxx', { skipLocationChange: true }).then(() => {
              this.router.navigate(['pages/leads']);
            });
          }
        }
      })
    } else {
      this.clientLeadModalComponent = this._matDialog.open(ClientLeadModalComponent, {
        panelClass: 'add-user-dialog',
        width: '80vw',
        height: '80vh',
        disableClose: true
      })
      this.clientLeadModalComponent.afterClosed().subscribe(result => {
        if (result != undefined) {
          if (location.pathname == "/pages/client-leads") {
            this.router.navigateByUrl('xxx', { skipLocationChange: true }).then(() => {
              this.router.navigate(['pages/client-leads']);
            });
          }
        }
      })
    }
  }

  createClient() {
    this.clientModalComponent = this._matDialog.open(ClientModalComponent, {
      panelClass: 'add-user-dialog',
      width: '800px',
      disableClose: true
    })
    this.clientModalComponent.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (location.pathname == "/pages/clients") {
          this.router.navigateByUrl('xxx', { skipLocationChange: true }).then(() => {
            this.router.navigate(['pages/clients']);
          });
        }
      }
    })
  }

}