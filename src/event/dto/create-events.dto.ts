export class CreateEventDto {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    tags: string[];
}
