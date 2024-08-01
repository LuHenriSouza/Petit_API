import { server } from './server/server';
import 'dotenv/config';

const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log('App running! port: ' + (process.env.PORT || 3333) + 'CORS: ' + process.env.ENABLED_CORS);
    }
    );
};

startServer();