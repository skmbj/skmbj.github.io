import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouteModule } from "./route/route.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./auth/auth.service";
import { DeviceModule } from "./device/device.module";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";
import { MessageService } from "./message.service";

const firebaseConfig = {
  apiKey: "AIzaSyA3ZC6ESs4VbXpLVRuXrvTnIC3tsLI4ZAA",
  authDomain: "latronix-e72b8.firebaseapp.com",
  databaseURL: "https://latronix-e72b8.firebaseio.com",
  projectId: "latronix-e72b8",
  storageBucket: "latronix-e72b8.appspot.com",
  messagingSenderId: "689426075072",
  appId: "1:689426075072:web:253a1b369ec60079020c25",
  measurementId: "G-H0H1MJKT8Z",
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouteModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DeviceModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [AuthService, MessageService],
})
export class AppModule {}
