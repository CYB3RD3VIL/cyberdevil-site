const path = require('path');
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en','es','fr']
  },
  localePath: path.resolve('./public/locales')
};
