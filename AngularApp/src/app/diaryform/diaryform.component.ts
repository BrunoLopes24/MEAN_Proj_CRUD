import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiaryDataService } from '../shared/diary-data-component';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryEntry } from '../shared/diary-entry.model';

@Component({
  selector: 'app-diaryform',
  templateUrl: './diaryform.component.html',
  styleUrls: ['./diaryform.component.css']
})
export class DiaryformComponent implements OnInit {

  diaryForm: FormGroup;
  editMode = false;
  diaryEntry: DiaryEntry;
  private paramId: number;

  constructor(private diaryDataService: DiaryDataService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paraMap => {

      if(paraMap.has("id")){
        this.editMode = true
        this.paramId = +paraMap.get("id")!;
        this.diaryEntry = this.diaryDataService.getDiaryEntry(+this.paramId);
      }else {
        this.editMode = false;
      }

    })

    this.diaryForm = new FormGroup({
      "date": new FormControl(this.editMode ? this.diaryEntry.date : null,[Validators.required]),
      "entry": new FormControl(this.editMode ? this.diaryEntry.entry : null,[Validators.required])
    });
  }

  onSubmit(){
   const newEntry = new DiaryEntry(1,this.diaryForm.value.date, this.diaryForm.value.entry);
    if(this.editMode){
      newEntry.id = +this.paramId;
      this.diaryDataService.onUpdateEntry(+this.paramId, newEntry);
    }else{
      this.diaryDataService.onAddDiaryEntry(newEntry);
    }

   this.router.navigateByUrl("");
  }
}
