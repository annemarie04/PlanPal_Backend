import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ActivitiesService } from "../activities.service";

@Injectable()
export class ActivityOwnerGuard implements CanActivate {
    constructor (private readonly activityService: ActivitiesService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        //console.log(request.params.eventId);
        const activityId = request.params.activityId;
        const userId = request.user.userId;
        const activity = await this.activityService.getActivityById(activityId);
        if(activity && activity.owner.toString() === userId) {
            request.activity = activity;
            return true;
        }
        return false;
    }
}

