import createServer from "./lib/server";
import config from "./config";
import logger from "./lib/utils/logger";

function startServer() {
    const server = createServer();
    const onStartListening = () => {
        logger.info(`우효 wwwwwwwww ${config.server.port}포트♥, 서버 겟또다제~☆`);
    }

    server.listen(config.server.port, onStartListening);
}

startServer();
