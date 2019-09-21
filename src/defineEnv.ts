import * as dotenv from 'dotenv';

function defineEnv() {
    dotenv.config();

    switch (process.env.NODE_ENV) {
        case 'DEV':
            dotenv.config({path : `${process.cwd()}/.env.dev`});
            break;

        case 'production':
            dotenv.config({path : `${process.cwd()}/.env.prod`});
            break;

        default:
            dotenv.config({path : `${process.cwd()}/.env.dev`});
    }
}

export default defineEnv();
