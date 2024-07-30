export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar_url?: string;
  email: string;
  password: string;
}

export interface Procedure {
  id: string;
  dueDate: Date;
  description: string;
  status: "TODO" | "ON_GOING" | "DONE" | "WAITING";
  importance: "LOW" | "MEDIUM" | "HIGH";
  assignedId?: string;
  assigned?: User;
  category: "BUG" | "DESIGN" | "FEATURE" | "RESEARCH";
}
