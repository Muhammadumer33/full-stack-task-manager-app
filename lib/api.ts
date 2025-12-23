import axios from 'axios';
import { Task, TaskCreate, TaskUpdate } from '@/types/task';

const API_URL = 'http://localhost:8000/api/tasks';

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createTask = async (task: TaskCreate): Promise<Task> => {
    const response = await axios.post(API_URL, task);
    return response.data;
};

export const updateTask = async (id: number, task: TaskUpdate): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/${id}`, task);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};