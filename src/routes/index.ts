import * as express from "express";
import {errorHandler} from "..";
import {DashboardAdminRoutes} from "./dashboard/dashboard-admin.routes";
import {DashboardRoleRoutes} from "./dashboard/dashboard-role.routes";
import {DashboardMoviesRoutes} from "./dashboard/dashboard-movies.routes";
import {DashboardStatisticRoutes} from "./dashboard/dashboard-statistic.routes"
import {FrontendMoviesRoutes} from "./frontend/frontend-movies.routes";
import {DashboardAdvertisingRoutes} from "./dashboard/dashboard-advertising.routes";
import {FrontendSeriesRoutes} from "./frontend/frontend-series.routes";
import {DashboardSeriesRoutes} from "./dashboard/dashboard-series.routes";
import {BotMoviesRoutes} from "./bot/bot-movies.routes";
import {BotSeriesRoutes} from "./bot/bot-series.routes";
import {FrontendAdvertisingRoutes} from "./frontend/bot-advertising.routes";
import {BotAdvertisingRoutes} from "./bot/bot-advertising.routes";

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

        app['prefix']('/dashboard/admin', data => {
            DashboardAdminRoutes(data)
        });

        app['prefix']('/dashboard/role', data => {
            DashboardRoleRoutes(data)
        });

        app['prefix']('/dashboard/movies', data => {
            DashboardMoviesRoutes(data)
        });

        app['prefix']('/dashboard/advertising', data => {
            DashboardAdvertisingRoutes(data)
        });

        app['prefix']('/dashboard/statistic', data => {
            DashboardStatisticRoutes(data)
        });

        app['prefix']('/dashboard/series', data => {
            DashboardSeriesRoutes(data)
        });



        app['prefix']('/frontend/movies', data => {
            FrontendMoviesRoutes(data)
        });

        app['prefix']('/frontend/series', data => {
            FrontendSeriesRoutes(data)
        });

        app['prefix']('/frontend/advertising', data => {
            FrontendAdvertisingRoutes(data)
        });



        app['prefix']('/bot/movies', data => {
            BotMoviesRoutes(data)
        });

        app['prefix']('/bot/series', data => {
            BotSeriesRoutes(data)
        });

        app['prefix']('/bot/advertising', data => {
            BotAdvertisingRoutes(data)
        });
    })

    app.use(expressRouter);
    app.use(errorHandler);
};
