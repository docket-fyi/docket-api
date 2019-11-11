const prefix = 'docket';
const separator = ':';

function key(...pieces) {
  return Array.from([prefix, /*environment, */...pieces]).join(separator);
}

module.exports = {
  google: {
    // getOAuthUrl: key('google', 'getOAuthUrl')
  },
  locales: {
    show: localeCode => key('locales', localeCode),
    list: key('locales'),
    listTranslations: localeCode => key('locales', localeCode, 'translations')
  },
  microsoft: {
    // getOAuthUrl: key('microsoft', 'getOAuthUrl')
  },
  search: {},
  users: {
    show: id => key('users', id)
  }
}
