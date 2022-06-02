import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MouseEvent } from '@agm/core';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userService } from 'src/app/core/services/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent implements OnInit {

  id: any;
  showFilters = false;  
  basicModalCloseResult: string = '';
  users = [];
  samples = [];
  myResearcherUsers =[] ; 
  individual = [];
  rows = [];
  loadingIndicator = true;
  spec = [];
  role = "6257bb97a3cc8e08e46399fc";
  returnUrl: any;
  searchText;
 
  officeName = new FormControl('');
  districtName = new FormControl('');
  // user = AuthService.getLoggedUser();
  termsAccepted = false;
  modal: any;
  index: number;

  offers = [];
  userOf = {
    _id: "",
    fName: "",
    lName: "",
    email: "",
    verified: "",
    isBlocked: "",
    loginAttempts: "",
  };



  user = AuthService.getLoggedUser().id;
  

  constructor(private modalService: NgbModal,private toast: ToastrService,  private userService: userService ) {


   }

  ngOnInit(): void {
    console.log(this.user);
    this.fetchUser();
    this.fetchReUser();
   
  }
  
  fetchReUser() {
    //const conditions = {};
    const conditions = {};
    this.userService.getUsers(conditions).subscribe((response) => {
      console.log("pehly")
      console.log(response);
      this.users = response;
      for(let i=0, j=0; i<this.users.length; i++){
        if(this.users[i]['RoleId'] == this.role){
          this.myResearcherUsers[j] = this.users[i];
          console.log("My after this");
         console.log(this.myResearcherUsers);
          j++;
          console.log("inside If Statement ");
        }
      }
    console.log("badd main")
      //this.role = this.users;
      console.log(this.users);
    })
  }

  fetchUser() {
    //const conditions = {};
    const conditions = {};
    this.userService.getUsers(conditions).subscribe((response) => {
      this.users = response;
      //this.role = this.users;
      console.log(this.users);
    })
  }
 





  async openBasicModal(content, user) {
    console.log(user);
    this.userOf = user;
    // this.toast.info("Buy functionality is coming soon");
    // return;
    this.modal = this.modalService.open(content, {});
  }


}
