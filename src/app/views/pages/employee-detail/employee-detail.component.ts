import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { userService } from 'src/app/core/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { leaveService } from 'src/app/core/services/leave.service';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { DataTable } from "simple-datatables";
import ProgressBar from 'progressbar.js';

//import { ContractService } from 'src/app/core/services/contract.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  id: string;
  showFilters = false;
  officeLeaves = [];
  countTheRecivedLeaves = 0;
  officeNewLeaves = [];
  MyPercentage = 0 ;
  MyEstPercentage = 0 ;
  leaves = [];
  attendance = [] ;
  attendanceverification = [];
  countRecivedAttendance = 0;
  AttendanceNew = [] ;
  one = [] ;
  two = [] ;
  three = [];
  four = [];
  countOne = 0 ;
  countTwo =0 ;
  countThree = 0 ;
  officeName : string ;
  filters = {
    leaveType:'' 
  };
  leaveType = new FormControl(''); 
  myStatus =  new FormControl('');
  myNewDate = new FormControl('');
  myOneDate = new FormControl('');
  myTwoDate = new FormControl('');
  myEndDate=new FormControl('');
  myNewStatus = new FormControl('');
  verfied = new FormControl('');
  users = [];
  employees = [] ;
  countYourCollecter= 0 ;
  userOfficeName = AuthService.getLoggedUser().email;
  countryRestriction = {
    latLngBounds: {
      east: 76.81351,
      north: 36.78901,
      south: 35.08322,
      west: 72.57277
    },
    strictBounds: true
  };
  //user = AuthService.getLoggedUser();
  role = '';

 countyouremployee = 0 ;
 searchText;


//  ------------------
regForm: FormGroup;
 
  loading: boolean = false;
  loadingIndicator = true;
  checkVerificationEmailStep = false;
  reorderable = true;
  rows = [];
  

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
                                                                                                                                                                                                                      

//-------------------------

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute,
     private toastr: ToastrService , private userService: userService , private leaveService : leaveService , private attendanceService : attendanceService, private authService : AuthService) { }
  openBasicModal(content) {
    this.modalService.open(content, {}).result.then((result) => {
    }).catch((res) => { });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id"); 
    // const dataTable = new DataTable("#dataTableExample");



   this.fetchLeaves();
   this.fetchAttendance();
   this.fetchNameUser();
   this.fetchMyofficeName();
   //this.fetchStatusAttendance();
  }
 

  fetchLeaves(){
    const conditions = {};
    this.leaveService.getLeaves(conditions).subscribe((response) =>{
      this.leaves =response;
      for(let i=0 , j=0; i < this.leaves.length ; i++){
        this.MyEstPercentage = this.leaves.length;
        if(this.leaves[i]['EmployeeId'] == this.id ){
        this.officeLeaves[j] = this.leaves[i];
        this.countTheRecivedLeaves = this.officeLeaves.length;
        j++;
        }
 
      }
     this.officeNewLeaves = this.officeLeaves.reverse();
    
    })
 
 }


 fetchAttendance(){
  const conditions = {};
  this.attendanceService.getAttendance(conditions).subscribe((response) =>{
    this.attendance =response;
    for(let i=0 , j=0 , k =0 , l=0; i < this.attendance.length ; i++){
      if(this.attendance[i]['EmployeeId'] == this.id ){
      this.attendanceverification[j] = this.attendance[i];
      this.countRecivedAttendance = this.attendanceverification.length;
      if(this.attendance[i]['EmployeeId'] == this.id && this.attendance[i]['status'] == 'Present'){
        this.one[k] =this.attendance[i];
        this.countOne = this.one.length; 
        k++;
      }
      if(this.attendance[i]['EmployeeId'] == this.id && this.attendance[i]['status'] == 'Absent'){
        this.two[l] =this.attendance[i];
        this.countTwo = this.two.length;
        l++;
      }
      j++;
      }
    }
   this.AttendanceNew = this.attendanceverification.reverse();
   this.MyPercentage = (this.countOne/this.countRecivedAttendance);

   var progressbar1 = new ProgressBar.Circle('#progressbar1', {
  
    color: '#727cf5',
    trailColor: 'rgba(77, 138, 240, .1)',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#727cf5', width: 1 },
    to: { color: '#727cf5', width: 4 },
    // Set default step function for all animate calls
    step: (state, circle) => {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
  
      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText(value +'%');
      } else {
        circle.setText(value + '%');
      }
  
    }
  });
  progressbar1.text.style.fontFamily = "'Overpass', sans-serif;";
  progressbar1.text.style.fontSize = '3rem';
  progressbar1.animate((this.MyPercentage));
  console.log("My Graph")
  console.log();
    
  })

}


fetchNameUser(){
  const conditions = {};
  this.userService.getUsers(conditions).subscribe((response) => {
    console.log("pehly")
    console.log(response);
    this.users = response;
    for(let i=0, j=0; i<this.users.length; i++){
      if(this.users[i]['_id'] == this.id){
        this.employees[j] = this.users[i];
        
        this.countYourCollecter = this.employees.length;
        console.log("fkfmkermk");
        console.log(this.countYourCollecter);
        j++;
      }
    }
  console.log("badd main")
    //this.role = this.users;
    console.log(this.users);
  })
}

fetchMyofficeName(){
this.officeName = this.userOfficeName;
}
}
