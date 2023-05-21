export class CreateActivityDto {
    title: string;
    description: string;
    repeat: string;
    start_date: Date;
    end_date: Date;
    start_time: Date;
    end_time: Date;
    tags: string[];
}
