import * as express from "express";
import {errorHandler} from "..";
import {DashboardAdminRoutes} from "./dashboard/admin.routes";
import {DashboardRoleRoutes} from "./dashboard/role.routes";
import {DashboardMoviesRoutes} from "./dashboard/movies.routes";
import {DashboardUploadRoutes} from "./dashboard/upload.routes";
import {DashboardStatisticRoutes} from "./dashboard/statistic.routes"
import {FrontendMoviesRoutes} from "./frontend/frontend-movies.routes";
import {FrontendStatisticRoutes} from "./frontend/frontend-statistic.routes";
import {FrontendUploadRoutes} from "./frontend/frontend-upload.routes";

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

        app['prefix']('/dashboard/upload', data => {
            DashboardUploadRoutes(data)
        });

        app['prefix']('/dashboard/statistic', data => {
            DashboardStatisticRoutes(data)
        });

        app['prefix']('/frontend/movies', data => {
            FrontendMoviesRoutes(data)
        });

        app['prefix']('/frontend/statistic', data => {
            FrontendStatisticRoutes(data)
        });

        app['prefix']('/frontend/upload', data => {
            FrontendUploadRoutes(data)
        });
    })

    app.use(expressRouter);
    app.use(errorHandler);
};
