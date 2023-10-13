import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryformComponent } from './diaryform.component';

describe('DiaryformComponent', () => {
  let component: DiaryformComponent;
  let fixture: ComponentFixture<DiaryformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiaryformComponent]
    });
    fixture = TestBed.createComponent(DiaryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
