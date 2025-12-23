export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    created_at: string;
    updated_at?: string;
}

export interface TaskCreate {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
}

export interface TaskUpdate {
    title?: string;
    description?: string;
    completed?: boolean;
    priority?: 'low' | 'medium' | 'high';
}