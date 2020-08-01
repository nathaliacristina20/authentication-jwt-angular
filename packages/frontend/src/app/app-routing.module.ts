import { AuthGuardService } from './auth/services/auth-guard.service';
import { MainModule } from './main/main.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main/people' },
  { path: 'main', loadChildren: () => MainModule, canActivate: [ AuthGuardService ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
