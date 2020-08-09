import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeviceListComponent } from "./device-list/device-list.component";
import { DeviceroutModule } from "./deviceroute/deviceroute.module";
import { DeviceroutRoutingModule } from "./deviceroute/deviceroute-routing.module";

@NgModule({
  declarations: [DeviceListComponent],
  imports: [CommonModule, DeviceroutModule, DeviceroutRoutingModule],
})
export class DeviceModule {}
