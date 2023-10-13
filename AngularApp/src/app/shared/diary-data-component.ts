import { Injectable } from "@angular/core";
import { DiaryEntry } from './diary-entry.model';
import { Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";

const API_ENDPOINT = 'http://localhost:3000';


@Injectable({
  providedIn:"root"
})

export class DiaryDataService{

  public diarySubject = new Subject<DiaryEntry[]>()
  public maxId: number;
  private diaryEntries: DiaryEntry[] = []

  constructor(private http: HttpClient){}

  getDiaryEntries(){
     this.http.get<{diaryEntries: any}>(`${API_ENDPOINT}/diary-entries`)
     .pipe(map((responseData)=>{
        return responseData.diaryEntries.map((entry:{date: string; entry: string, _id: number}) =>{
         return {
           date: entry.date,
           entry: entry.entry,
           id: entry._id
         }
        })
     }))
     .subscribe((updateResponse) => {
      this.diaryEntries = updateResponse;
      this.diarySubject.next(this.diaryEntries);
    })
  }

  onAddDiaryEntry(diaryEntry: DiaryEntry){
    this.http.get<{maxId:number}>(`${API_ENDPOINT}/max-id`).subscribe((jsonData)=>{
      diaryEntry.id = jsonData.maxId + 1
      this.http.post<{message: string}>(`${API_ENDPOINT}/add-entry`, diaryEntry).subscribe((jsonData) => {
        console.log(diaryEntry);
        this.getDiaryEntries();
      });
    })

  }

  onUpdateEntry(id: number, Entry: DiaryEntry){
    this.http.put<{message: string}>(`${API_ENDPOINT}/update-entry/` + id, Entry).subscribe((jsonData)=>{
      console.log(jsonData.message)
      this.getDiaryEntries()
    })
  }


  onDelete(id: number){
    this.http.delete<{message: string}>(`${API_ENDPOINT}/remove-entry/` + id).subscribe((jsonData)=>{
      console.log(jsonData.message)
      this.getDiaryEntries()
    })
  }


  getDiaryEntry(id: number){
   const index = this.diaryEntries.findIndex(el =>{
    return el.id == id;
   })
   return this.diaryEntries[index];
  }

}
