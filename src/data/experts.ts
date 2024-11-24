import type { Expert } from '../types';

export let experts: Expert[] = [
  {
    id: 'E001',
    name: 'Dr. Sarah Smith',
    specialty: 'Cardiology',
    email: 'sarah.smith@dhp.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    cases: 28
  },
  {
    id: 'E002',
    name: 'Dr. Michael Johnson',
    specialty: 'Neurology',
    email: 'michael.johnson@dhp.com',
    phone: '+1 (555) 234-5678',
    status: 'Active',
    cases: 15
  },
  {
    id: 'E003',
    name: 'Dr. Emily Chen',
    specialty: 'Pediatrics',
    email: 'emily.chen@dhp.com',
    phone: '+1 (555) 345-6789',
    status: 'Active',
    cases: 42
  },
  {
    id: 'E004',
    name: 'Dr. Patel',
    specialty: 'Chemistry',
    email: 'patel@dhp.com',
    phone: '+1 (555) 456-7890',
    status: 'Active',
    cases: 35
  },
  {
    id: 'E005',
    name: 'Dr. Lee',
    specialty: 'Chemistry',
    email: 'lee@dhp.com',
    phone: '+1 (555) 567-8901',
    status: 'Active',
    cases: 22
  }
];

export const addExpert = (expert: Expert) => {
  experts = [...experts, expert];
};

export const getExpertById = (id: string): Expert | undefined => {
  return experts.find(expert => expert.id === id);
};