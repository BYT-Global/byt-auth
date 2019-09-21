import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import { InjectModel } from 'nestjs-typegoose';
import {User} from '@byt-org/byt-schema';
import { ModelType } from 'typegoose';
import { QueryFindOneAndUpdateOptions } from 'mongoose';

@Injectable()
export class AppService {
    private _firebaseAdmin;
    private _firebaseApp;

    constructor(@InjectModel(User) private _userModel: ModelType<User>) {
        this.setUpFirebaseAdmin();
        this.setUpFirebase();
    }

    isAlive(): any {
        return {
            env: process.env.NODE_ENV,
            message: `MS Auth is running on environment ${process.env.NODE_ENV}`
        };
    }

    setUpFirebaseAdmin() {
        const serviceAccount = require('../beyourtrip-firebase-adminsdk-ho8la-eb02bc5a5e.json');
        this._firebaseAdmin = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://myexpenses-fc767.firebaseio.com'
        });
    }

    setUpFirebase() {
        const firebaseConfig = {
            apiKey: 'AIzaSyBEu8ymTg3O6u2CH1qPRchoEz2kdbhxBAQ',
            authDomain: 'beyourtrip.firebaseapp.com',
            databaseURL: 'https://beyourtrip.firebaseio.com',
            projectId: 'beyourtrip',
            storageBucket: '',
            messagingSenderId: '48796798084',
            appId: '1:48796798084:web:48afba8c49179cf0aac6d1'
        };
        this._firebaseApp = firebase.initializeApp(firebaseConfig);
    }

    authGoogle(idToken) {
        return firebase.auth()
            .signInWithCredential(firebase.auth.GoogleAuthProvider.credential(idToken));
    }

    authFacebook(idToken) {
        return firebase.auth()
            .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(idToken));
    }

    keepGoogleUser(user: any) {
        return this._userModel
            .findOneAndUpdate(
                {
                    $or: [
                        { email: user.user.email },
                        { googleToken: user.user.uid },
                    ]
                },
                {
                    googleToken: user.user.uid,
                    name: user.user.displayName,
                    email: user.user.email,
                    profilePhoto: user.user.photoURL
                },
                { upsert: true, new: true } as QueryFindOneAndUpdateOptions
            );
    }

    keepFacebookUser(user: any) {
        return this._userModel
            .findOneAndUpdate(
                {
                    $or: [
                        { email: user.user.email },
                        { facebookToken: user.user.uid }
                    ],
                },
                {
                    facebookToken: user.user.uid,
                    name: user.user.displayName,
                    email: user.user.email,
                    profilePhoto: user.user.photoURL
                },
                { upsert: true, new: true } as QueryFindOneAndUpdateOptions
            );
    }
}
