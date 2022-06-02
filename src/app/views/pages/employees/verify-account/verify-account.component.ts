import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { AuthenticationService } from 'src/app/core/services/common/authentication.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  invalidLink: boolean = false;
  loading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, public formBuilder: FormBuilder,
    private toastrService: ToastrService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (!this.route.snapshot.params.verification) {
      this.invalidLink = true;
      return;
    } 
    this.verifyAccount();
  }

  verifyAccount() {
    this.loading = true;
    this.authenticationService
      .verifyAccount(this.route.snapshot.params.verification)
      .then(
        (response) => {
          AuthService.setLoggedUser(response);
          this.toastrService.success('Account verified', "Success!");
          this.loading = false;
    console.log(response);
          if (response.role == "admin") {
            this.router.navigate(['/dashboard']);
          } else if (response.role == "lab") {
            this.router.navigate(['/lab-sample']);
          } else if (response.role == "researcher") {
            this.router.navigate(['/customer']);
          }
        }).catch((response) => {
          console.log("======>", response);
          if (response.error && response.error.message) {
            this.toastrService.error(response.error.message);
          }
          this.invalidLink = true;
          this.loading = false;
        });
  }
}
