import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/common/authentication.service';
import { StorageService } from 'src/app/core/services/common/storage.service';
import { ToastrService } from 'ngx-toastr';
import { userService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  regForm: FormGroup;
  role = "";
  loading: boolean = false;
  loadingIndicator = true;
  checkVerificationEmailStep = false;
  reorderable = true;
  rows = [];
  officeRole = "6257bb97a3cc8e08e46399fc";
  myOfficeUsers = []
  users =[];

  constructor(private router: Router, private route: ActivatedRoute, public formBuilder: FormBuilder, 
    private authenticationService: AuthenticationService ,  private userService: userService, private toastrService: ToastrService) {
      this.fetch(data => {
        this.rows = data;
        setTimeout(() => {
          this.loadingIndicator = false;
        }, 1500);
      });
  }
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  private createForm() {
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
    this.regForm = this.formBuilder.group({
      email:['', [Validators.minLength(5), Validators.maxLength(100), Validators.pattern(emailReg), Validators.required]],
      password:['', [Validators.minLength(8), Validators.maxLength(100), Validators.required, Validators.pattern(passwordReg)]],
      fName: ['',[Validators.minLength(2), Validators.maxLength(50), Validators.required]],
      lName: ['',[Validators.minLength(2), Validators.maxLength(50), Validators.required]],
      OfficeId:  ['', [Validators.minLength(2), Validators.maxLength(100), Validators.required]],

      //university: ['',[Validators.minLength(2), Validators.maxLength(15), Validators.required]],
      //OfficeId:  ['',[Validators.minLength(2), Validators.maxLength(100), Validators.required]],
       pNumber:['', [Validators.minLength(2), Validators.maxLength(15), Validators.required]],
       pin: ['', [Validators.minLength(4), Validators.maxLength(4), Validators.required]],
      role: ['employee'],
      rememberMe: [false]
    })
  }

  ngOnInit(): void {
   // this.role = "Employee";
   this.fetchReUser();
    this.createForm();
  }

  fetchReUser() {
    //const conditions = {};
    const conditions = {};
    this.userService.getUsers(conditions).subscribe((response) => {
      console.log("pehly")
      console.log(response);
      this.users = response;
      for(let i=0, j=0; i<this.users.length; i++){
        if(this.users[i]['RoleId'] == this.officeRole){
          this.myOfficeUsers[j] = this.users[i];
          j++;
          console.log("inside If Statement ");
        }
        
      }
    console.log("badd main")
      //this.role = this.users;
      console.log(this.users);
    })
  }

  register() {
    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const userData = this.regForm.value;
    this.authenticationService.register(this.regForm.value).then((response) => {
      if (userData.rememberMe) {
        StorageService.setItem("ci_email_remember", userData.email);
      }

      this.checkVerificationEmailStep = true;
      this.loading = false;
      this.regForm.reset();
       this.toastrService.success("Please check your email for account verification", "Success")
    }).catch((response) => {
      if (response.error && response.error.message) {
        this.toastrService.error(response.error.message);
      }
      this.loading = false;
    })
  }

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

  emailError() {
    return this.regForm.controls.email.hasError('required') ? 'Valid email is required' :
      this.regForm.controls.email.hasError('maxlength') ? 'Email cannot exceed 100 characters' :
        this.regForm.controls.email.hasError('minlength') ? 'Email is required of minimum length of 5 characters' :
          this.regForm.controls.email.hasError('pattern') ? 'Valid email is required' :
            '';
  }

  universityError() {
    return this.regForm.controls.university.hasError('required') ? 'university is required' :
            '';
  }
  ResearcherIdError() {
    return this.regForm.controls.ResearcherId.hasError('required') ? 'Researcher Name is required' :
            '';
  }

  phoneError() {
    return this.regForm.controls.pNumber.hasError('required') ? 'Phone number is required' :
      this.regForm.controls.pNumber.hasError('maxlength') ? 'phone number cannot exceed 50 characters' :
        this.regForm.controls.pNumber.hasError('minlength') ? 'phone number is required of minimum length of 2 characters' :
          '';
  }

  pinError() {
    return this.regForm.controls.pin.hasError('required') ? 'pin is required' :
      this.regForm.controls.pin.hasError('maxlength') ? 'pin number should be equel to 4' :
        this.regForm.controls.pin.hasError('minlength') ? 'pin should be equel to 4' :
          '';
  }
  passwordError() {
    return this.regForm.controls.password.hasError('required') ? 'Password is required' :
      this.regForm.controls.password.hasError('minlength') ? 'Password is required of minimum length of 8 characters' :
        this.regForm.controls.password.hasError('maxlength') ? 'First Name cannot exceed 100 characters' :
        this.regForm.controls.password.hasError('pattern') ? 'Password must contain at least an upper case, a lower case and a special character.' :
          '';
  }
  fNameError() {
    return this.regForm.controls.fName.hasError('required') ? 'First Name is required' :
      this.regForm.controls.fName.hasError('maxlength') ? 'First Name cannot exceed 50 characters' :
        this.regForm.controls.fName.hasError('minlength') ? 'First Name is required of minimum length of 2 characters' :
          '';
  }

  OfficeIdError() {
    return this.regForm.controls.OfficeId.hasError('required') ? 'Office Name is required' :
            '';
  }
  lNameError() {
    return this.regForm.controls.lName.hasError('required') ? 'Last Name is required' :
      this.regForm.controls.lName.hasError('maxlength') ? 'Last Name cannot exceed 50 characters' :
        this.regForm.controls.lName.hasError('minlength') ? 'Last Name is required of minimum length of 2 characters' :
          '';
  }

}
