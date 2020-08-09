import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";
import { AuthService } from "../auth/auth.service";

function ageRangeValidator(min: number, max: number): ValidatorFn {
  return function (
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (!control.value) {
      return null;
    }

    if (
      control.value !== undefined &&
      (isNaN(control.value) || control.value < min || control.value > max)
    ) {
      return { ageRange: true };
    }
  };
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  minAge = 25;
  maxAge = 65;

  constructor(
    private frmBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.regForm = this.frmBuilder.group({
      firstname: ["", Validators.required],
      lastname: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(6),
        ]),
      ],
      age: [
        "",
        [
          Validators.required,
          ageRangeValidator(this.minAge, this.maxAge),
          // ageRangeValidator
        ],
      ],
      useremail: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ],
      ],
      userpwd: ["", [Validators.required]],
    });
  }

  get frm() {
    return this.regForm.controls;
  }

  logForm() {
    const email = this.regForm.get("useremail").value;
    const pwd = this.regForm.get("userpwd").value;
    if (this.regForm.valid) {
      // Code to send data to API
      this.authService.SignUp(email, pwd).then((res) => {
        console.log("SignUp Successfull");
      });
    } else {
      this.regForm.markAllAsTouched();
      console.error("Invalid Form Data...");
    }
  }
}
