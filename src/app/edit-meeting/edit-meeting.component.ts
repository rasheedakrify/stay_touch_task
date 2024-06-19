import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { numericValidator } from '../shared/validators';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.scss']
})
export class EditMeetingComponent implements OnInit {
  meetingForm: FormGroup;
  meetingId: string;
    minDate: Date; // To store the minimum selectable date


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    
  ) {
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
    this.route.paramMap.subscribe(params => {
      this.meetingId = params.get('id');
      this.loadMeetingDetails();
    });
  }

  loadMeetingDetails(): void {
    const meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    const meeting = meetings.find((m: any) => m.id === this.meetingId);

    if (meeting) {
      this.meetingForm.patchValue(meeting);
    } else {
      // Handle case where meeting is not found, perhaps navigate back to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  saveMeeting(): void {
    if (this.meetingForm.invalid) {
      // If form is invalid, mark all fields as touched to display errors
      this.markFormGroupTouched(this.meetingForm);
      return; // Exit method if form is invalid
    }

    const meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    const updatedMeetings = meetings.map((m: any) => {
      if (m.id === this.meetingId) {
        return { ...m, ...this.meetingForm.value };
      }
      return m;
    });

    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    this.router.navigate(['/dashboard']);
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
