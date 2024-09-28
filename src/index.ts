// import { Knex } from './server/database/knex';
import server from './server/server';
import 'dotenv/config';

const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log('App running! port: '+ (process.env.PORT || 3333) + 'CORS: ' + process.env.ENABLED_CORS);
    }
    );
};

// if (process.env.IS_LOCALHOST !== 'true') {
//     Knex.migrate.latest()
//         // .then(() => {
//         //     Knex.seed.run()
//         //         .then(() => startServer())
//         //         .catch(console.log);
//         // })
//         .catch(console.log);
//         startServer();
// } else {
// }
startServer();