import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ButtonModule} from "primeng/button";
import {HeaderComponent} from "./components/header/header.component";
import {MeteoService} from "./services/meteo.service";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, HeaderComponent, ToastModule],
  providers: [MessageService, MeteoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-meteo-app';

  constructor(private meteo: MeteoService) {
    console.log('AppComponent constructor');
    this.meteo.getUserGeo();
  }
}
