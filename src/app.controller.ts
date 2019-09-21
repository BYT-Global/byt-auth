import { Controller, Get, Param, Res } from '@nestjs/common';
import {Response} from 'express';
import { AppService } from './app.service';
import { ApiImplicitParam } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/isAlive')
    isAlive() {
        return this.appService.isAlive();
    }

    @Get('/authGoogle/:idToken')
    @ApiImplicitParam({name: 'idToken'})
    authGoogle(@Param() params, @Res() res: Response) {
        this.appService
            .authGoogle(params.idToken)
            .then((result) => this.appService.keepGoogleUser(result))
            .then((result: any) => res.json({
                token : jwt.sign({
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    profilePhoto: result.profilePhoto
                }, 'byt-app-auth-2109')
            }))
            .catch((err) => res.json(err));
    }

    @Get('/authFacebook/:idToken')
    @ApiImplicitParam({name: 'idToken'})
    authFacebook(@Param() params, @Res() res: Response) {
        this.appService
            .authFacebook(params.idToken)
            .then((result) => this.appService.keepFacebookUser(result))
            .then((result: any) => res.json({
                token : jwt.sign({
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    profilePhoto: result.profilePhoto
                }, 'byt-app-auth-2109')
            }))
            .catch((err) => res.json(err));
    }
}
