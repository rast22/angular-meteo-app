import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseComponent} from "./base/base.component";
import {MeteoRoutingModule} from "./meteo-routing.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseComponent,
    MeteoRoutingModule
  ]
})
export class MeteoModule { }
