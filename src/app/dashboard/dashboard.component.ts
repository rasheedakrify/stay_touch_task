import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  meetings: any[] = [];
  filteredMeetings: any[] = [];
  searchTerm: string = '';

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMeetings();
  }

  loadMeetings(): void {
    // Retrieve meetings from localStorage
    let storedMeetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    console.log('Stored Meetings:', storedMeetings); // Check if data is retrieved correctly

    // Assign meetings to both meetings and filteredMeetings arrays
    this.meetings = storedMeetings;
    this.filteredMeetings = storedMeetings.slice(0, this.itemsPerPage); // Initial load with first page
  }

  // Function to filter meetings based on searchTerm
  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredMeetings = this.meetings.slice(0, this.itemsPerPage); // Reset to show first page
    } else {
      this.filteredMeetings = this.meetings.filter(meeting =>
        meeting.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        meeting.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        meeting.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        meeting.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        meeting.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        meeting.meetingTime.toLowerCase().includes(this.searchTerm.toLowerCase())
      ).slice(0, this.itemsPerPage); // Apply filter and show first page
    }
    this.currentPage = 1; // Reset to first page after filtering
  }

  // Navigation to edit meeting
  navigateToEdit(id: string): void {
    this.router.navigate(['/edit', id]); // Navigate to edit page with meeting ID
  }

  // Function to delete a meeting
  deleteMeeting(id: string): void {
    this.meetings = this.meetings.filter(meeting => meeting.id !== id);
    localStorage.setItem('meetings', JSON.stringify(this.meetings));
    this.applyFilter(); // Re-apply filter to update the displayed list
  }

  // Function to handle pagination logic
  changePage(page: number): void {
    // Calculate start index based on page number and items per page
    const startIndex = (page - 1) * this.itemsPerPage;
    // Slice the meetings array to display items for the selected page
    this.filteredMeetings = this.meetings.slice(startIndex, startIndex + this.itemsPerPage);
    this.currentPage = page; // Update current page
  }

  // Function to generate an array of page numbers
  getPages(): number[] {
    const pageCount = Math.ceil(this.meetings.length / this.itemsPerPage);
    return new Array(pageCount).fill(0).map((_, index) => index + 1);
  }
}
