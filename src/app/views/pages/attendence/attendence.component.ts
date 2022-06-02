import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { userService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent implements OnInit {
dateToday: number = Date.now();
attendance= [];
currentDateTime : any ;
officeLeaves = [];
countTheRecivedLeaves =0;
officeNewLeaves= [];
employeeId = "6257bb97a3cc8e08e46399fd";
employees = [];
users = [] ; 
 userId = AuthService.getLoggedUser().id ;
  constructor(private attendanceService: attendanceService , private datepipe: DatePipe , private userService : userService) {
 
   }

  ngOnInit(): void {
    this.fetchCurentDate ();
    this.fetchAttendances();
    this. fetchUsers();
  }

  refresh(): void {
    window.location.reload();
}

 public fetchCurentDate (){
  this.currentDateTime=this.datepipe.transform((new Date), 'dd/MM/yyyy');
 console.log(this.currentDateTime);
  }

  updateApproveStatus(attendanceId : any) {
    this.attendanceService.updateAttendance(attendanceId, {"isVerified":true}).subscribe((response) => {
      this.refresh();
      console.log("Attendance updated successfully");
   
    }, (error) => {
    });}


  fetchAttendances(){
    const conditions = {};
    this.attendanceService.getAttendance(conditions).subscribe((response) =>{
      this.attendance =response;
      this.fetchCurentDate();
      for(let i=0 , j=0; i < this.attendance.length ; i++){
        if(this.attendance[i]['OfficeId'] == this.userId && this.attendance[i]['isVerified'] == false){
        this.officeLeaves[j] = this.attendance[i];
        this.countTheRecivedLeaves = this.officeLeaves.length;
        j++;
        }
 
      }
     this.officeNewLeaves = this.officeLeaves.reverse();
      
    })
 }

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
