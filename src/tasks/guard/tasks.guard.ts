import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TasksService } from "../tasks.service";

@Injectable()
export class TaskOwnerGuard implements CanActivate {
    constructor (private readonly taskService: TasksService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        //console.log(request.params.taskId);
        const taskId = request.params.taskId;
        const userId = request.user.userId;
        const task = await this.taskService.getTaskById(taskId);
        if(task && task.owner.toString() === userId) {
            request.task = task;
            return true;
        }
        return false;
    }
}
