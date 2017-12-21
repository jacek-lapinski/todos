import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
    modules: [TasksModule]
})
export class ApplicationModule {

}
