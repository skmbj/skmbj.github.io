import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  alertmsg;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  constructor(
    private frmBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.frmBuilder.group({
      useremail: [
        "",
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      userpwd: ["", [Validators.required]],
    });
  }

  get frm() {
    return this.loginForm.controls;
  }

  logForm() {
    const email = this.loginForm.get("useremail").value;
    const pwd = this.loginForm.get("userpwd").value;
    if (this.loginForm.valid) {
      // Code to send data to API
      this.authService.SignIn(email, pwd).then((res) => {
        console.log(res);
      });
      console.log(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      console.error("Invalid Form Data...");
    }
  }
}
