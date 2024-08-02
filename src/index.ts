import https from 'https';
import fs from 'fs';
import 'dotenv/config'; // Certifique-se de que o dotenv está carregando as variáveis de ambiente
import { server } from './server/server'; // Certifique-se de que este export está correto

const startServer = () => {
    // Carregar certificados
    const options = {
        key: fs.readFileSync('C:\\Users\\user\\Documents\\GitHub\\nginx-1.26.1\\ssl\\private.key'),
        cert: fs.readFileSync('C:\\Users\\user\\Documents\\GitHub\\nginx-1.26.1\\ssl\\certificate.crt'),
    };

    // Configurar o servidor HTTPS
    const httpsServer = https.createServer(options, server);

    httpsServer.listen(process.env.PORT || 3333, () => {
        console.log(`App running! Port: ${process.env.PORT || 3333} CORS: ${process.env.ENABLED_CORS}`);
    });
};

startServer();
