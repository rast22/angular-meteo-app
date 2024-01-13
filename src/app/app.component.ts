import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ButtonModule} from "primeng/button";
import {HeaderComponent} from "./header/header.component";
import {MeteoModule} from "./meteo/meteo.module";
import {MeteoRoutingModule} from "./meteo/meteo-routing.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, HeaderComponent, MeteoModule, MeteoRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-meteo-app';
}
