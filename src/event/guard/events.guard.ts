import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { EventsService } from "../events.service";

@Injectable()
export class EventOwnerGuard implements CanActivate {
    constructor (private readonly eventService: EventsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        //console.log(request.params.eventId);
        const eventId = request.params.eventId;
        const userId = request.user.userId;
        const event = await this.eventService.getEventById(eventId);
        if(event && event.owner.toString() === userId) {
            request.event = event;
            return true;
        }
        return false;
    }
}
