'use strict';

const _ = require('lodash');

module.exports = lando => ({
  command: 'db-connect',
  describe: 'Opens database link with default system application',
  options: {
    service: {
      alias: ['s'],
      default: 'database',
      describe: 'Use the specified service',
      string: true,
    },
  },
  run: options => {
    const app = lando.getApp(options._app.root);
    return app.init()
      .then(() => {
        const service = _.find(app.info, ['service', options.service])
        lando.log.info('Attempting to generate link for service: ' + options.service)
        lando.log.info('Full JSON service info: ' + JSON.stringify(service))
        const link = `${service.type}://${service.creds.user}:${service.creds.password}@127.0.0.1:${service.external_connection.port}/${service.creds.database}`
        lando.log.info('Link generated: ' + link)
        lando.shell.sh(['open', link])
      });
  },
});
