const app = require('./app');
const env = require('./config/env');

const HOST = '0.0.0.0';

app.listen(env.port, HOST, () => {
  console.log(`Serveur démarré sur http://${HOST}:${env.port}`);
});
