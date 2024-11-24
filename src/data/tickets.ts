import { Ticket } from '../types';

export let tickets: Ticket[] = [
  {
    id: '001',
    title: 'Fasting Before Blood Test',
    question: 'Why do I need to fast before a blood test to measure cholesterol and blood sugar levels? I was told to fast for 8 hours before my bloodwork, but I\'m not sure why. Can you explain why fasting is necessary and what happens if I don\'t follow these instructions?',
    category: 'Chemistry',
    status: 'assigned',
    priority: 'medium',
    submittedAt: '2024-11-01T10:00:00Z',
    assignedTo: 'Dr. Patel',
    messages: []
  },
  {
    id: '002',
    title: 'Elevated Potassium Levels',
    question: 'What do my elevated potassium levels mean, and could it be due to something I ate before the test? I recently got my blood test results, and my potassium levels were higher than normal. Could this be related to my diet, or should I be concerned about a potential medical condition?',
    category: 'Chemistry',
    status: 'assigned',
    priority: 'high',
    submittedAt: '2024-10-30T15:30:00Z',
    assignedTo: 'Dr. Lee',
    messages: []
  },
  {
    id: '003',
    title: 'Liver Function Test Results',
    question: 'How do the results of a liver function test indicate the health of my liver? My doctor mentioned something about ALT and AST levels being slightly high. What do these enzymes reveal about my liver health, and how can I interpret these results?',
    category: 'Chemistry',
    status: 'completed',
    priority: 'medium',
    submittedAt: '2024-10-28T09:15:00Z',
    assignedTo: 'Dr. Ahmed',
    messages: []
  },
  {
    id: '004',
    title: 'Blood Calcium Levels',
    question: 'Why do blood calcium levels fluctuate, and what could cause a high reading? My recent lab results showed high calcium levels. Could this be due to my diet, medications, or an underlying issue like a parathyroid problem?',
    category: 'Chemistry',
    status: 'unassigned',
    priority: 'medium',
    submittedAt: '2024-10-25T14:20:00Z',
    messages: []
  },
  {
    id: '005',
    title: 'Low Sodium Levels',
    question: 'What could cause low sodium levels in my blood? I was told my sodium levels are a bit low. Is this related to dehydration, medication, or something more serious like kidney issues?',
    category: 'Chemistry',
    status: 'assigned',
    priority: 'high',
    submittedAt: '2024-10-20T11:45:00Z',
    assignedTo: 'Dr. Green',
    messages: []
  },
  {
  id: '006',
  title: 'Blood Type and Surgery',
  question: 'Why do I need to have my blood type checked before surgery? My doctor ordered a blood type test before my upcoming surgery. Why is this necessary, and what happens if my blood type isn’t compatible with donated blood?',
  category: 'Immunohematology',
  status: 'assigned',
  priority: 'high',
  submittedAt: '2024-10-31T12:00:00Z',
  assignedTo: 'Dr. Williams',
  messages: []
},
{
  id: '007',
  title: 'ANA Test and Autoimmune Disorders',
  question: 'Why would my doctor order an ANA (antinuclear antibody) test? My doctor mentioned an ANA test to check for lupus. How does this test work, and what does it mean if the result is positive?',
  category: 'Immunology',
  status: 'assigned',
  priority: 'medium',
  submittedAt: '2024-10-27T10:30:00Z',
  assignedTo: 'Dr. Singh',
  messages: []
},
{
  id: '008',
  title: 'Rh Factor and Pregnancy',
  question: 'What is Rh factor, and how does it affect pregnancy? I’m pregnant and was told I need an Rh factor test. Can you explain what Rh factor is and why it’s important during pregnancy?',
  category: 'Immunohematology',
  status: 'completed',
  priority: 'medium',
  submittedAt: '2024-10-18T09:00:00Z',
  assignedTo: 'Dr. Johnson',
  messages: []
},
{
  id: '009',
  title: 'White Blood Cell Count',
  question: 'What does a high white blood cell count mean for my health? My lab results showed an elevated white blood cell count. Does this always mean I have an infection, or could there be other causes like stress or inflammation?',
  category: 'Hematology',
  status: 'unassigned',
  priority: 'medium',
  submittedAt: '2024-10-29T14:45:00Z',
  messages: []
},
{
  id: '010',
  title: 'Low Hemoglobin and Fatigue',
  question: 'How can low hemoglobin levels affect my energy and health? My doctor told me I have low hemoglobin and might be anemic. Could this explain why I feel so tired, and what treatments are available to address this?',
  category: 'Hematology',
  status: 'assigned',
  priority: 'high',
  submittedAt: '2024-10-23T11:00:00Z',
  assignedTo: 'Dr. White',
  messages: []
},
{
  id: '011',
  title: 'Platelet Count and Bruising',
  question: 'Why do I bruise easily, and could it be related to my platelet count? I’ve noticed I bruise easily, and my doctor mentioned checking my platelets. What role do platelets play in clotting, and what could cause them to be too low?',
  category: 'Hemostasis',
  status: 'assigned',
  priority: 'medium',
  submittedAt: '2024-10-19T09:15:00Z',
  assignedTo: 'Dr. Brown',
  messages: []
},
{
  id: '012',
  title: 'INR Test for Blood Thinners',
  question: 'What does an INR test measure, and why is it important for people on blood thinners? My doctor asked me to get an INR test because I’m on warfarin. How does this test help monitor my medication, and what happens if the results are too high or low?',
  category: 'Hemostasis',
  status: 'completed',
  priority: 'high',
  submittedAt: '2024-10-16T08:30:00Z',
  assignedTo: 'Dr. Taylor',
  messages: []
},
{
  id: '013',
  title: 'Blood Culture Accuracy',
  question: 'Why do I need multiple blood cultures to check for an infection? My doctor ordered several blood cultures to check for an infection in my bloodstream. Why are multiple samples necessary, and how do they confirm if I have an infection?',
  category: 'Microbiology',
  status: 'unassigned',
  priority: 'high',
  submittedAt: '2024-10-28T13:45:00Z',
  messages: []
},
{
  id: '014',
  title: 'Throat Culture for Strep',
  question: 'How does a throat culture help diagnose strep throat? I had a throat swab done, and my doctor said it’s to check for strep throat. How does this test work, and what happens if it comes back positive?',
  category: 'Microbiology',
  status: 'assigned',
  priority: 'medium',
  submittedAt: '2024-11-01T15:00:00Z',
  assignedTo: 'Dr. Adams',
  messages: []
},
{
  id: '015',
  title: 'Urinalysis and UTI Diagnosis',
  question: 'How does a urinalysis help identify a urinary tract infection (UTI)? I was asked to provide a urine sample to check for a UTI. What exactly is a urinalysis, and how can it reveal if I have an infection?',
  category: 'Microbiology',
  status: 'completed',
  priority: 'medium',
  submittedAt: '2024-10-22T09:30:00Z',
  assignedTo: 'Dr. Morgan',
  messages: []
}
];

export const getTicketById = (id: string): Ticket | undefined => {
  return tickets.find(ticket => ticket.id === id);
};

export const updateTicket = (id: string, updatedTicket: Ticket): Ticket => {
  const index = tickets.findIndex(ticket => ticket.id === id);
  if (index === -1) {
    throw new Error('Ticket not found');
  }
  
  tickets[index] = updatedTicket;
  return updatedTicket;
};

export const getTicketsByStatus = (status: string): Ticket[] => {
  return tickets.filter(ticket => ticket.status === status);
};

export const getTicketsByAssignee = (assignee: string): Ticket[] => {
  return tickets.filter(ticket => ticket.assignedTo === assignee);
};

export const getUnassignedTickets = (): Ticket[] => {
  return tickets.filter(ticket => ticket.status === 'unassigned');
};

export const getAssignedTickets = (): Ticket[] => {
  return tickets.filter(ticket => ticket.status === 'assigned');
};

export const getCompletedTickets = (): Ticket[] => {
  return tickets.filter(ticket => ticket.status === 'completed');
};