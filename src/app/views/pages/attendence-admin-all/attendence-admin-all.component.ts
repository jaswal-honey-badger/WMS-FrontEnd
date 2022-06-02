import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { AuthService } from 'src/app/core/services/common/auth.service';
@Component({
  selector: 'app-attendence-admin-all',
  templateUrl: './attendence-admin-all.component.html',
  styleUrls: ['./attendence-admin-all.component.scss']
})
export class AttendenceAdminAllComponent implements OnInit {
dateToday: number = Date.now();
attendance= [];
currentDateTime : any ;
officeLeaves = [];
countTheRecivedLeaves =0;
officeNewLeaves= [];
verification = new FormControl(''); 
myStatus =  new FormControl('');
myDate = new FormControl('');
showFilters = false;
 userId = AuthService.getLoggedUser().id ;
  constructor(private attendanceService: attendanceService , private datepipe: DatePipe) {
 
   }

  ngOnInit(): void {
    
    this.fetchCurentDate ();
    this.fetchAttendances();
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
        
        this.officeLeaves[j] = this.attendance[i];
        this.countTheRecivedLeaves = this.officeLeaves.length;
        j++;
      }
     this.officeNewLeaves = this.officeLeaves.reverse();

    })
 }

  
}
