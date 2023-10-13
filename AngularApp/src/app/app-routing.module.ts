import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { DiaryformComponent } from './diaryform/diaryform.component';

const routes: Routes = [
  {path:"", component: DiaryComponent},
  {path:"data-entry", component:DiaryformComponent},
  {path:"edit/:id", component:DiaryformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
