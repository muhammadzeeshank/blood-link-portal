// src/app/features/donors/services/donor.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Donor } from '../models/donor.model';
import { DONORS_MOCK_DATA } from '../data/donors.data';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  
  // Simulates a network request
  getDonors(): Observable<Donor[]> {
    return of(DONORS_MOCK_DATA).pipe(
      delay(800) // 800ms artificial network delay
    );
  }
}