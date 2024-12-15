import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Imports
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionsEditComponent } from './transactions/transactions-edit/transactions-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CategoriesListComponent, CategoriesEditComponent, TransactionsListComponent, TransactionsEditComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
