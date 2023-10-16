import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { DiaryformComponent } from './diaryform/diaryform.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:"", component: DiaryComponent},
  {path:"data-entry", component:DiaryformComponent},
  {path:"edit/:id", component:DiaryformComponent},
  {path:"login", component:LoginComponent},
  {path:"sign-up", component:SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
