import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.component.html",
  styleUrls: ["./device-list.component.css"],
})
export class DeviceListComponent implements OnInit {
  deviceList;
  selectedDev;
  buttonDisplay;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getDeviceData().subscribe((data) => {
      if (data) {
        this.deviceList = data;
      }
    });
  }
  selectedDevice(dev) {
    this.selectedDev = dev.device_cap;
  }
  toDisplayBtn(action) {
    return this.selectedDev.find((obj) => obj.feature === action);
  }
}
