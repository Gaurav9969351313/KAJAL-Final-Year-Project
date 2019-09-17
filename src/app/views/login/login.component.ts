import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrDecrService } from "../../shared/encrDecr.service";
import { SharedService } from "../../shared/shared.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  role: any;
  constructor(private formBuilder: FormBuilder,
    private encrDecrService: EncrDecrService,
    private sharedService: SharedService,
    private router: Router) { }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['gaurav', Validators.required],
      password: ['mahindra@333', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    } else {

      this.sharedService.sendContext({ "key": "LS" });

      var loginCread = {
        "username": this.loginForm.value.username,
        "password": this.loginForm.value.password,
      }

      var token = this.encrDecrService.aesEncrypt(this.loginForm.value.username, this.loginForm.value.password);

      this.sharedService.post('/loginForAdminPanel', loginCread).subscribe((d: any) => {
        if (d.ResponseString == 1) {
          sessionStorage.setItem("AUTH_TOKEN", token + "|" + d.ResponseObject[0].role);
          this.router.navigate(['/dashboard'])
        } else {
          alert("Kindly Check your Credentials");
        }
      })
    }
  }
}
