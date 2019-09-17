import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';
import { AuthService } from '../../../../shared/auth.service';  

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  displayDialogForUserConfig: boolean;
  selectedUserConfigRow: any;
  UserConfigRows: any;
  UserConfigCols: any;
  newUserConfig: boolean = false;

  @Input() role:any;

  constructor(private sharedService: SharedService,private authService: AuthService) { }

  ngOnInit() {

    this.UserConfigCols = [
      { field: 'username', header: 'User Name' },
      // { field: 'password', header: 'Password' },
      { field: 'role', header: 'User Role' },
    ];
    this.role = this.authService.getRole();
    this.initialize();
  }

  initialize() {
    this.sharedService.getMasterConfig("adminPanelUsers").subscribe((config: any) => {

      for (let i = 0; i < config.adminPanelUsers.length; i++) {
        config["adminPanelUsers"][i]["password"] = btoa(config["adminPanelUsers"][i]["password"]);
      }
      this.UserConfigRows = config.adminPanelUsers;
    });
  }

  onRowSelectUserConfig(event) {
    this.selectedUserConfigRow = { ...event.data };
    this.displayDialogForUserConfig = true;
  }

  showDialogToAddUserConfig() {
    this.newUserConfig = true;
    this.selectedUserConfigRow = {};
    this.displayDialogForUserConfig = true;
  }

  UserConfigSave() {
    if (this.newUserConfig) {
      // direct insert to mongoDb
      this.selectedUserConfigRow["opType"] = 1
    } else {
      // find index and update to mongodb
      this.selectedUserConfigRow["opType"] = 0
    }

    this.crudAndRefresh();
    
    this.displayDialogForUserConfig = false;
  }

  crudAndRefresh() {
    this.sharedService.saveOrUpdateUserConfig(this.selectedUserConfigRow).subscribe((d: any) => {
      this.initialize();
    });
  }

  UserConfigDelete() {
    this.selectedUserConfigRow["opType"] = -1;
    this.crudAndRefresh();
    this.selectedUserConfigRow = null;
    this.displayDialogForUserConfig = false;
  }

  UserConfigCancel() {
    this.displayDialogForUserConfig = false;
  }


}
