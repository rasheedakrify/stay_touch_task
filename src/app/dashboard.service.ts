import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private meetingsSubject = new BehaviorSubject<any[]>([]);
  meetings$ = this.meetingsSubject.asObservable();

  private meetings: any[] = []; // Replace with actual data storage

  constructor() {}

  getMeetings(): void {
    // Replace with actual API call or local storage retrieval
    this.meetingsSubject.next(this.meetings);
  }

  saveMeeting(meeting: any): void {
    // Replace with actual save logic to local storage or API call
    this.meetings.push(meeting);
    this.meetingsSubject.next(this.meetings);
  }

  updateMeeting(meeting: any, index: number): void {
    // Replace with actual update logic to local storage or API call
    this.meetings[index] = meeting;
    this.meetingsSubject.next(this.meetings);
  }

  deleteMeeting(index: number): void {
    // Replace with actual delete logic to local storage or API call
    this.meetings.splice(index, 1);
    this.meetingsSubject.next(this.meetings);
  }
}
