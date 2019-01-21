const logger = require('logger').createLogger();
const app = require('./app');



const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.log(`Server started on port ${PORT}`);
  });