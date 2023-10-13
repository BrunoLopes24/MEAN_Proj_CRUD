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
  public maxId: string;
  private diaryEntries: DiaryEntry[] = []

  constructor(private http: HttpClient){}

  getDiaryEntries() {
    this.http.get<{ diaryEntries: any }>(`${API_ENDPOINT}/diary-entries`)
      .pipe(
        map((responseData) => {
          return responseData.diaryEntries.map((entry: { date: string; entry: string; _id: number }) => {
            return {
              date: entry.date,
              entry: entry.entry,
              id: entry._id
            }
          })
        })
      )
      .subscribe(
        (updateResponse) => {
          try {
            this.diaryEntries = updateResponse;
            this.diarySubject.next(this.diaryEntries);
          } catch (error) {
            console.error('Error fetching entries:', error);
          }
        }
      );
  }  

  onAddDiaryEntry(diaryEntry: DiaryEntry){
    this.http.get<{maxId:string}>(`${API_ENDPOINT}/max-id`).subscribe((jsonData)=>{
      diaryEntry.id = jsonData.maxId + 1
      this.http.post<{message: string}>(`${API_ENDPOINT}/add-entry`, diaryEntry).subscribe((jsonData) => {
        console.log(diaryEntry);
        this.getDiaryEntries();
      });
    })

  }

  onUpdateEntry(id: string, Entry: DiaryEntry){
    this.http.put<{message: string}>(`${API_ENDPOINT}/update-entry/` + id, Entry).subscribe((jsonData)=>{
      console.log(jsonData.message)
      this.getDiaryEntries()
    })
  }


  onDelete(id: string){
    this.http.delete<{message: string}>(`${API_ENDPOINT}/remove-entry/` + id).subscribe((jsonData)=>{
      console.log(jsonData.message)
      this.getDiaryEntries()
    })
  }


  getDiaryEntry(id: string){
   const index = this.diaryEntries.findIndex(el =>{
    return el.id == id;
   })
   return this.diaryEntries[index];
  }

}
