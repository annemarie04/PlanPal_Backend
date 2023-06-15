export class CreateActivityDto {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    repeat?: Number;
    repeat_end_date?: Date;
}
