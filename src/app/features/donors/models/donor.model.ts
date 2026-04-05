// src/app/features/donors/models/donor.model.ts

export type DonorStatus = 'Eligible' | 'Deferred' | 'Ineligible';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  location: string;
  lastDonationDate: string | Date | null;
  status: DonorStatus;
}