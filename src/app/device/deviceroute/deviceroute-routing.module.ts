import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeviceListComponent } from "../device-list/device-list.component";
import { AuthGuard } from "src/app/shared/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: DeviceListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceroutRoutingModule {}
