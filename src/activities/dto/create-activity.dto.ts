export class CreateActivityDto {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    repeat?: string;
    repeat_end_date?: string;
    tags: string[];
}
