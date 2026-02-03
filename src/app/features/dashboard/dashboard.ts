import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  stats = signal({
    totalDonors: 1240,
    bloodUnits: 450,
    requestsPending: 12,
    livesSaved: 3200,
  });
  currentDate = signal(new Date());
}
