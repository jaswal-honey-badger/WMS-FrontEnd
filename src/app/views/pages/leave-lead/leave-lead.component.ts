import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { leaveService } from 'src/app/core/services/leave.service';
import { userService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-leave-lead',
  templateUrl: './leave-lead.component.html',
  styleUrls: ['./leave-lead.component.scss']
})
export class LeaveLeadComponent implements OnInit {
  leaves= [];
  users=[]; 
  appointmentTime  = new Date();
  show =false;
  officeLeaves = [];
  countTheRecivedLeaves = 0 ;
  officeNewLeaves = [];
  employeeId = "6257bb97a3cc8e08e46399fd";
  employees = [];
  leaveType = new FormControl(''); 
  myStatus =  new FormControl('');
  myDate = new FormControl('');
  myEndDate = new FormControl('');
  userId = AuthService.getLoggedUser().id;
  constructor(private leaveService: leaveService , private userService : userService) { }

  ngOnInit(): void {
    this.fetchUsers();
   this.fetchLeaves();
    
  }

  // fetchLeaves() {
  //   //const conditions = {};
  //   const conditions = {  };
  //   this.leaveService.getLeaves(conditions).subscribe((response) => {
  //     this.leaves = response;
  //     console.log(this.employees.length);
  //     for(let i=0 ; i <this.employees.length; i++){
  //       console.log("1st for");
  //       for(let j =0, k =0  ; j< this.leaves.length ; j++){
  //         console.log("2nd for");
  //         if(this.leaves[j]['EmployeeId'] == this.employees[i]['_id']){
  //           console.log("After the leaves");
  //           console.log(this.leaves);
  //           this.officeLeaves[k] = this.leaves[j];
  //           console.log("Now the office Leaves");
  //           console.log(this.officeLeaves);
  //           k++
  //         }

  //       }
  //      }

  //     console.log(this.leaves);
  //     console.log ("users ko dikhnay")
  //     console.log(this.employees);
  //     console.log("office kee leaves ")
  //     console.log(this.officeLeaves);
  //   })
  // }

fetchLeaves(){
   const conditions = {};
   this.leaveService.getLeaves(conditions).subscribe((response) =>{
     this.leaves =response;
     for(let i=0 , j=0; i < this.leaves.length ; i++){
       if(this.leaves[i]['desigination'] == 'lead' && this.leaves[i]['status'] == 'Pending'){
       this.officeLeaves[j] = this.leaves[i];
       this.countTheRecivedLeaves = this.officeLeaves.length;
       j++;
       }

     }
    this.officeNewLeaves = this.officeLeaves.reverse();
     
   })
}



  refresh(): void {
    window.location.reload();
}

  updateApproveStatus(leaveId : any) {
    this.leaveService.updateLeaves(leaveId, {"status":'Approved'}).subscribe((response) => {
      this.refresh();
      console.log("Leaves updated successfully");
   
    }, (error) => {
    });}

  updateDeclineStatus(leaveId : any) {
      this.leaveService.updateLeaves(leaveId, {"status":'Declined'}).subscribe((response) => {
        this.refresh();
        console.log("Leaves updated successfully");
     
      }, (error) => {
      });}


  fetchUsers() {
    //const conditions = {};
    const conditions = {};
    this.userService.getUsers(conditions).subscribe((response) => {
      this.users = response;
      for(let i=0, j=0; i<this.users.length; i++){
        if(this.users[i]['RoleId'] == this.employeeId){
          this.employees[j] = this.users[i];
          j++;
        }
      }
      console.log(this.employees); 
    })
  }


  

 
}
