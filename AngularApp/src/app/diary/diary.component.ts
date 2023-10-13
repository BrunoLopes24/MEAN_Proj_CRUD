import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiaryEntry } from '../shared/diary-entry.model';
import { DiaryDataService } from '../shared/diary-data-component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})

export class DiaryComponent implements OnInit, OnDestroy {

  diaryEntries: DiaryEntry[] = [];
  diarySubscrition = new Subscription();

  constructor(private diaryDataService: DiaryDataService, private router: Router){}

  onDelete(id: number){
    this.diaryDataService.onDelete(id);
  }

  onEdit(id: number){
    this.router.navigate(["edit", id]);
  }

  ngOnInit(): void {
    this.diaryDataService.getDiaryEntries();
    this.diarySubscrition = this.diaryDataService.diarySubject.subscribe(diaryEntries => {
      this.diaryEntries = diaryEntries;
    });
  }

  ngOnDestroy(): void {
      this.diarySubscrition.unsubscribe();
  }



}
