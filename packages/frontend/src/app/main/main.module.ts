import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PeopleComponent } from './components/people/people.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [PeopleComponent, ProductsComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
