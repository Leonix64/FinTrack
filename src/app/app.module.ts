import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Imports
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesNewComponent } from './categories/categories-new/categories-new.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';

import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionsNewComponent } from './transactions/transactions-new/transactions-new.component';
import { TransactionsEditComponent } from './transactions/transactions-edit/transactions-edit.component';

import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [AppComponent, CategoriesListComponent, CategoriesNewComponent, CategoriesEditComponent, TransactionsListComponent, TransactionsNewComponent, TransactionsEditComponent, TestComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
