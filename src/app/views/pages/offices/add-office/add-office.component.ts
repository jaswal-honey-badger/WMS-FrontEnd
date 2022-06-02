import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/common/authentication.service';
import { StorageService } from 'src/app/core/services/common/storage.service';
import { userService } from 'src/app/core/services/user.service';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';

import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.scss']
})
export class AddOfficeComponent implements OnInit {

  regForm: FormGroup;
  role = "";
  loading: boolean = false;
  loadingIndicator = true;
  checkVerificationEmailStep = false;
  reorderable = true;
  rows = [];
  title: string = 'AGM project';
  latitude!: number;
  longitude!: number;

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  public lati = 33.66063413823131;
  public longi = 72.93377862805238;
  validationForm1: FormGroup;
  validationForm2: FormGroup;

  zoom: number = 5;

  // initial center position for the map
  lat: number = 46.7985624;
  lng: number = 8.2319736;

  //view port restrictions
  countryRestriction = {
    latLngBounds: {
      east: 76.81351,
      north: 36.78901,
      south: 35.08322,
      west: 72.57277
    },
    strictBounds: true
  };

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
        lat: 51.673858,
        lng: 7.815982,
        label: 'A',
        draggable: true
    },
    {
        lat: 51.373858,
        lng: 7.215982,
        label: 'B',
        draggable: false
    },
    {
        lat: 51.723858,
        lng: 7.895982,
        label: 'C',
        draggable: true
    }
]

  constructor(private router: Router, private route: ActivatedRoute, public formBuilder: FormBuilder, 
    private authenticationService: AuthenticationService ,  private userService: userService ,) {

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


  ngOnInit(): void {
   this.createForm();
    /**
     * form1 value validation
     */
    this.validationForm1 = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      userName : ['', Validators.required]
    });

    /**
     * formw value validation
     */
    this.validationForm2 = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      mobileNumber : ['', Validators.required],
      password : ['', Validators.required]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;

  }
  onMapClicked(event: any){
    console.table(event.coords);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
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
      // this.toastrService.success("Please check your email for account verification", "Success")
    }).catch((response) => {
      if (response.error && response.error.message) {
       // this.toastrService.error(response.error.message);
      }
      this.loading = false;
    })
  }


  private createForm() {
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
    this.regForm = this.formBuilder.group({
      email:['', [Validators.minLength(5), Validators.maxLength(100), Validators.pattern(emailReg), Validators.required]],
      password:['', [Validators.minLength(8), Validators.maxLength(100), Validators.required, Validators.pattern(passwordReg)]],
      officeName: ['',[Validators.minLength(2), Validators.maxLength(50), Validators.required]],
      //university: ['',[Validators.minLength(2), Validators.maxLength(15), Validators.required]],
      //OfficeId:  ['',[Validators.minLength(2), Validators.maxLength(100), Validators.required]],
       city: ['', [Validators.minLength(2), Validators.maxLength(15), Validators.required]],
       address: ['',[Validators.minLength(2), Validators.maxLength(50), Validators.required]],
       pNumber:['', [Validators.minLength(2), Validators.maxLength(15), Validators.required]],
       lng:['', [Validators.minLength(2), Validators.maxLength(100), Validators.required]],
       lat:['', [Validators.minLength(2), Validators.maxLength(100), Validators.required]],
      role: ['office'],
      rememberMe: [false]
    })
  }

  // getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: Position) => {
  //       if (position) {
  //         console.log("Latitude: " + position.coords.latitude +
  //           "Longitude: " + position.coords.longitude);
  //         this.lati = position.coords.latitude;
  //         this.longi = position.coords.longitude;
  //         console.log(this.lati);
  //         console.log(this.lati);
  //       }
  //     },
  //       (error: PositionError) => console.log(error));
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }

  /**
   * Wizard finish function
   */
  finishFunction() {
    alert('Successfully Completed');
  }

  /**
   * Returns form
   */
  

  /**
   * Go to next step while form value is valid
   */

  /**
   * Go to next step while form value is valid
   */
  



  
  // initial center position for the map
 
  


  
 

  emailError() {
    return this.regForm.controls.email.hasError('required') ? 'Valid email is required' :
      this.regForm.controls.email.hasError('maxlength') ? 'Email cannot exceed 100 characters' :
        this.regForm.controls.email.hasError('minlength') ? 'Email is required of minimum length of 5 characters' :
          this.regForm.controls.email.hasError('pattern') ? 'Valid email is required' :
            '';
  }

  addressError() {
    return this.regForm.controls.address.hasError('required') ? 'address is required' :
      this.regForm.controls.address.hasError('maxlength') ? 'address cannot exceed 100 characters' :
        this.regForm.controls.address.hasError('minlength') ? 'address is required of minimum length of 5 characters' :
            '';
  }

  phoneError() {
    return this.regForm.controls.pNumber.hasError('required') ? 'Phone number is required' :
      this.regForm.controls.pNumber.hasError('maxlength') ? 'phone number cannot exceed 50 characters' :
        this.regForm.controls.pNumber.hasError('minlength') ? 'phone number is required of minimum length of 2 characters' :
          '';
  }

  passwordError() {
    return this.regForm.controls.password.hasError('required') ? 'Password is required' :
      this.regForm.controls.password.hasError('minlength') ? 'Password is required of minimum length of 8 characters' :
        this.regForm.controls.password.hasError('maxlength') ? 'First Name cannot exceed 100 characters' :
        this.regForm.controls.password.hasError('pattern') ? 'Password must contain at least an upper case, a lower case and a special character.' :
          '';
  }
  cityError() {
    return this.regForm.controls.city.hasError('required') ? 'city is required' :
            '';
  }

  officeError() {
    return this.regForm.controls.officeName.hasError('required') ? 'Office Name is required' :
      this.regForm.controls.officeName.hasError('maxlength') ? 'Office Name cannot exceed 50 characters' :
        this.regForm.controls.officeName.hasError('minlength') ? 'Office Name is required of minimum length of 2 characters' :
          '';
  }
  
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}