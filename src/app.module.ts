import { Module } from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {User} from '@byt-org/byt-schema';

import './defineEnv';

@Module({
    imports: [
        TypegooseModule.forRoot(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }),
        TypegooseModule.forFeature([User])
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
