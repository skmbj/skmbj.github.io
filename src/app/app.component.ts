import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { MessageService } from "./message.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "myapp";
  isUserLogged;
  alertmsg;
  constructor(
    private authService: AuthService,
    public msgService: MessageService
  ) {}
  logOut() {
    this.authService.SignOut();
    this.msgService.clear();
    this.msgService.add("Sign out success");
  }
  alertClear() {
    this.alertmsg = [];
  }
  ngOnInit() {
    this.authService.userloggedStatus.subscribe((resp) => {
      this.isUserLogged = resp;
    });
    this.alertmsg = this.msgService.messages;
  }
}
