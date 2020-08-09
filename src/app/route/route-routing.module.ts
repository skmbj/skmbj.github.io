import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";

import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AuthGuard } from "../shared/guard/auth.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "login/register", component: RegisterComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "devicelink",
    loadChildren: () =>
      import("../device/device.module").then((m) => m.DeviceModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
