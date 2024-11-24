export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'expert' | 'consumer' | 'provider';
};

export type QuestionStatus = 
  | 'assigned'
  | 'unassigned'
  | 'completed';

export type QuestionPriority = 'low' | 'medium' | 'high';

export type Message = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
};

export type Question = {
  id: string;
  title: string;
  question: string;
  category: string;
  status: QuestionStatus;
  priority: QuestionPriority;
  submittedAt: string;
  updatedAt?: string;
  assignedTo?: string;
  response?: string;
  messages?: Message[];
  userId?: string;
  providerId?: string;
};

export type Expert = {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  status: string;
  cases: number;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
};