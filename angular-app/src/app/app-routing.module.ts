import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreatechecklistComponent } from './createchecklist/createchecklist.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'createchecklist', component: CreatechecklistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
