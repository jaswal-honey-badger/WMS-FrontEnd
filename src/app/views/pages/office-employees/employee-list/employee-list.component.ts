import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { userService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  basicModalCloseResult: string = '';
  users = [];
  user = AuthService.getLoggedUser();
  userId = AuthService.getLoggedUser().id;
  employees = [];
  offices = [];
  employeeId = "6257bb97a3cc8e08e46399fd";
  officeId = "6257bb97a3cc8e08e46399fc";

  constructor( private userService: userService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }


  fetchUsers() {
    //const conditions = {};
    const conditions = {};
    console.log(this.user);
    this.userService.getUsers(conditions).subscribe((response) => {
      this.users = response;
      
      for(let i=0, j=0; i<this.users.length; i++){
        if(this.users[i]['RoleId'] == this.employeeId && this.users[i]['OfficeId'] == this.userId){
          this.employees[j] = this.users[i];
          j++;
          console.log("inside If Statement ");
        }
      }
      
    })
  }


}
