import * as express from "express";
import {errorHandler} from "..";
import {SsenariyRoutes} from "./ssenariy.routes";
import {UsersRoutes} from "./users.routes";
import {NotificaitionSsenariyRoutes} from "./notificaition-ssenariy.routes";
import {StorySsenariyRouetes} from "./story-ssenariy.routes";
import {PrizeRoutes} from "./prize.routes";
import {FrontendStorySsenariyRouetes} from "./frontend-story-ssenariy.routes";
import {StoryDashboardSsenariyRouetes} from "./dashboard/story-ssenariy.routes";
import {DashboardPrizeHistoryRoutes} from "./dashboard/prize-history.routes";
import {ConfigRoutes} from "./dashboard/config.routes";
import {FrontendConfigRoutes} from "./frontend-config.routes";
import {LevelRoutes} from "./dashboard/levels.routes";
import {UserDataRoutes} from "./dashboard/user-data.routes";
import {UsersLevelRoutes} from "./dashboard/user-level.routes";
import {FrontendUserDataRoutes} from "./frontend/frontend-user-data.routes";

function nestedRoutes(this: any, path, configure) {
    const router = express.Router({mergeParams: true});
    this.use(path, router);
    configure(router);
    return router;
}

express.application['prefix'] = nestedRoutes;
express.Router['prefix'] = nestedRoutes;

const expressRouter = express.Router({mergeParams: true});

export const routes = (app: express.Application) => {

    expressRouter['prefix']('/api', app => {

        app['prefix']('/ssenariy', data => {
            SsenariyRoutes(data)
        });

        app['prefix']('/story-ssenariy', data => {
            StorySsenariyRouetes(data)
        });

        app['prefix']('/dashboard/story-ssenariy', data => {
            StoryDashboardSsenariyRouetes(data)
        });

        app['prefix']('/dashboard/config', data => {
            ConfigRoutes(data)
        });


        app['prefix']('/dashboard/prize-history', data => {
            DashboardPrizeHistoryRoutes(data)
        });

        app['prefix']('/frontend/story-ssenariy', data => {
            FrontendStorySsenariyRouetes(data)
        })

        app['prefix']('/frontend/config', data => {
            FrontendConfigRoutes(data)
        })

        app['prefix']('/prize', data => {
            PrizeRoutes(data)
        });

        app['prefix']('/notification-ssenariy', data => {
            NotificaitionSsenariyRoutes(data)
        });

        app['prefix']('/users', data => {
            UsersRoutes(data)
        });

        app['prefix']('/levels', data => {
            LevelRoutes(data)
        });

        app['prefix']('/user-data', data => {
            UserDataRoutes(data)
        });

        app['prefix']('/user-level', data => {
            UsersLevelRoutes(data)
        });

        app['prefix']('/frontend', data => {
            FrontendUserDataRoutes(data)
        });

    })

    app.use(expressRouter);
    app.use(errorHandler);
};
