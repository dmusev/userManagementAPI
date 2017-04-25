import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeTableComponent } from './homeTable/home.table.component';
import { HomeTableUpdateModalComponent } from './homeUpdateModal/home.table.update.modal.component';
import { HomeTableCreateModalComponent } from './homeCreateModal/home.table.create.moda.component';
import { HomeRouting } from './home.routing';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [ HomeComponent, HomeTableComponent, HomeTableUpdateModalComponent, HomeTableCreateModalComponent ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, HttpModule, HomeRouting,Ng2TableModule,
             PaginationModule.forRoot(), ModalModule.forRoot()],

})
export class HomeModule { }
