// src/app/features/donors/data/donors.data.ts
import { Donor } from '../models/donor.model';

export const DONORS_MOCK_DATA: Donor[] = [
  { id: '1', name: 'Liam Carter', bloodGroup: 'O+', location: 'New York, NY', lastDonationDate: '2023-10-15T09:30:00Z', status: 'Eligible' },
  { id: '2', name: 'Sophia Martinez', bloodGroup: 'A-', location: 'Austin, TX', lastDonationDate: '2024-01-20T14:15:00Z', status: 'Deferred' },
  { id: '3', name: 'Jackson Lee', bloodGroup: 'B+', location: 'Chicago, IL', lastDonationDate: '2023-11-05T10:00:00Z', status: 'Eligible' },
  { id: '4', name: 'Olivia Brooks', bloodGroup: 'AB+', location: 'Seattle, WA', lastDonationDate: '2022-08-12T08:45:00Z', status: 'Ineligible' },
  { id: '5', name: 'Mateo Silva', bloodGroup: 'O-', location: 'Miami, FL', lastDonationDate: '2024-02-10T11:20:00Z', status: 'Eligible' },
  { id: '6', name: 'Ava Patel', bloodGroup: 'A+', location: 'San Francisco, CA', lastDonationDate: null, status: 'Eligible' },
  { id: '7', name: 'Lucas Wright', bloodGroup: 'B-', location: 'Denver, CO', lastDonationDate: '2024-03-01T16:00:00Z', status: 'Deferred' },
];