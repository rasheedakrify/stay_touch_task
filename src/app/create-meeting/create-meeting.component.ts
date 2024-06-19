import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { numericValidator } from '../shared/validators'; // Import your custom validator
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss'],
    providers: [DatePipe]

})
export class CreateMeetingComponent implements OnInit {
  meetingForm: FormGroup;
  minDate: Date; // Minimum selectable date

  constructor(private fb: FormBuilder, private router: Router) {
    this.minDate = new Date(); 
    this.meetingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), numericValidator()]], // Apply numericValidator here
 
      address: [''],
      meetingTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  saveMeeting(): void {
    if (this.meetingForm.invalid) {
      // If form is invalid, mark all fields as touched to display errors
      this.markFormGroupTouched(this.meetingForm);
      return; // Exit method if form is invalid
    }

    // Generate a unique ID for the meeting
    const meetingId = this.generateUniqueId();

    // Get existing meetings from local storage or initialize empty array
    let meetings = JSON.parse(localStorage.getItem('meetings') || '[]');

    // Add new meeting to the array with the generated ID
    const newMeeting = { id: meetingId, ...this.meetingForm.value };
    meetings.push(newMeeting);

    // Save updated meetings array back to local storage
    localStorage.setItem('meetings', JSON.stringify(meetings));

    // Redirect to dashboard after saving
    this.router.navigate(['/dashboard']);
  }

  // Method to generate a unique ID
  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // Helper method to mark all form fields as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
