import { Injectable, NgZone } from "@angular/core";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observer } from "rxjs";
import { MessageService } from "../message.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData: any;
  userloggedStatus = new BehaviorSubject(false);
  checkStatus = this.userloggedStatus.asObservable();
  private deviceUrl = "api/deviceList";
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient,
    public msgs: MessageService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  ngOnInit() {}

  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        this.ngZone.run(() => {
          this.userloggedStatus.next(true);
          this.msgs.add("login Success");
          this.router.navigate(["dashboard"]);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.msgs.add(error.message);
        // window.alert(error.message);
      });
  }

  SignUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.msgs.add(error.message);
        // window.alert(error.message);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(this.afAuth.auth.currentUser);
    return user &&
      this.afAuth.auth.currentUser &&
      user.email === this.afAuth.auth.currentUser.email
      ? true
      : false;

    // user !== null && user.emailVerified !== false ? true : false;
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.userloggedStatus.next(false);
      this.router.navigate(["login"]);
    });
  }

  getDeviceData() {
    return this.http.get(this.deviceUrl);
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  login(email: string, password: string) {}
}
