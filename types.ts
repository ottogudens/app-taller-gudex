// FIX: Replaced placeholder content with type definitions for Vehicle, ServiceRecord, ThemeSettings, and User, which are used across the application. This resolves multiple module resolution errors.
export interface ServiceRecord {
  id: string;
  date: string;
  mileage: number;
  notes: string;
  summary?: string;
  cost: number;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  ownerId: string;
  serviceHistory: ServiceRecord[];
  // New detailed fields
  engineDisplacement: string;
  transmission: 'Automática' | 'Manual';
  oilFilter: string;
  airFilter: string;
  fuelFilter: string;
  cabinFilter: string;
}

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  brand: string;
  stock: number;
  description: string;
}

export interface ThemeSettings {
  logo: string;
  colorPrimary: string;
  colorSecondary: string;
  colorBackground: string;
  appName: string;
}

export interface User {
  id:string;
  name: string;
  email: string;
  role: 'admin' | 'mechanic' | 'client';
}