export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  due_date: string;
  created_at?: string;
  updated_at?: string;
}