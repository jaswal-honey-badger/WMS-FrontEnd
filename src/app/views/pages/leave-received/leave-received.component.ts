import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { userService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-leave-recevied',
  templateUrl: './leave-received.component.html',
  styleUrls: ['./leave-received.component.scss']
})
export class LeaveReceviedComponent implements OnInit {
 
  leaves = [];
  leavesById = [];
  user = AuthService.getLoggedUser();
  userName = AuthService.getLoggedUser().fName;
  empolyees = [];
  public leavesKiId;
  qrResultString: string;
  idToBeUpdated: string;
  constructor( private userService: userService) { }
  ngOnInit(): void {
   // this.fetchLeave();
    this.fetchUsers();
    console.log(this.user.fName);
  }

  refresh(): void {
    window.location.reload();
}

  // updateStatus(leaveId : any) {
  //   console.log(leaveId);
  //   this.leaveService.updateSample(leaveId, {"Approved":true}).subscribe((response) => {
  //     console.log("leave updated successfully");
  //   this.refresh();
  //   }, (error) => {
  //   });
  // }

  openFileBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#fileUploadInputExample") as HTMLElement;
    element.click()
  }

  handleFileInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#fileUploadInputExample + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
    }
  }

  // fetchLeave() {
  //   //const conditions = {};
  //   const conditions = { UserId: this.user.id };
  //   this.leaveService.getLeaves(conditions).subscribe((response) => {
  //     this.leaves = response;
  //     console.log(this.leaves[0]["age"]);
  //   })
  // }

  fetchUsers() {
    //const conditions = {};
    const conditions = { UserId: this.user.id };
    console.log(this.user);
    this.userService.getUsers(conditions).subscribe((response) => {
      this.empolyees = response;
      //console.log(this.samples[fName]);
    })
  }


  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }


}
