import { Schedule } from './schedule.model';

export class Course {
    id: number;
    className: string;
    instructor: string;
    schedule: Schedule;
    description: string;
    maximumStudents: number;
    icon: string;
    students: Array<string>;
    createdAt: Date;
}