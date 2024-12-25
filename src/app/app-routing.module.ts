import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesNewComponent } from './categories/categories-new/categories-new.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionsEditComponent } from './transactions/transactions-edit/transactions-edit.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'profile/:id',
    component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'categories/list',
    component: CategoriesListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'categories/new',
    component: CategoriesNewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'categories/edit/:id',
    component: CategoriesEditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'transactions/list',
    component: TransactionsListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'transactions/edit/:id',
    component: TransactionsEditComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
