import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TasksModule } from "./tasks/tasks.module";

@Module({
    controllers: [AppController],
    modules: [TasksModule],
})
export class ApplicationModule {
}
