import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { DeadlinesService } from "../deadlines.service";

@Injectable()
export class DeadlineOwnerGuard implements CanActivate {
    constructor (private readonly deadlineService: DeadlinesService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        //console.log(request.params.taskId);
        const deadlineId = request.params.deadlineId;
        const userId = request.user.userId;
        const deadline = await this.deadlineService.getDeadlineById(deadlineId);
        if(deadline && deadline.owner.toString() === userId) {
            request.deadline = deadline;
            return true;
        }
        return false;
    }
}
