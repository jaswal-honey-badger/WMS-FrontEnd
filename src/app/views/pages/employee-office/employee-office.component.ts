import { Component, OnInit, ViewChild } from '@angular/core';
import { userService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/common/auth.service';
//import { ContractService } from 'src/app/core/services/contract.service';

@Component({
  selector: 'app-employee-office',
  templateUrl: './employee-office.component.html',
  styleUrls: ['./employee-office.component.scss'],
})
export class EmployeeOfficeComponent implements OnInit {
  id: string;
  
  samples = [];
  //user = AuthService.getLoggedUser();
  role = '';
 collectors = [];
 users = [];
 countyouremployee = 0 ;
 searchText;

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute,
     private toastr: ToastrService , private userService: userService) { }
  openBasicModal(content) {
    this.modalService.open(content, {}).result.then((result) => {
    }).catch((res) => { });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id"); 
   
    this.fetchUsers();
  }



  fetchUsers() {
    //const conditions = {};
    const conditions = { UserId: this.id };
    console.log("fetch k badd ");
    console.log(this.id);
    this.userService.getUsers(conditions).subscribe((response) => {
      this.users = response;
      for(let i=0, j=0; i<this.users.length; i++){
        if(this.users[i]['OfficeId'] == this.id){
          this.collectors[j] = this.users[i];
          this.countyouremployee = this.collectors.length;
          j++;
        }
      }
    })
  }

}
