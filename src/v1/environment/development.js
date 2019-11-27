module.exports = {
  api: {
    name: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '3001',
    version: process.env.VERSION || 'v1',
    fallbackLocale: process.env.FALLBACK_LOCALE || 'en-US'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION
  },
  passwordReset: {
    secret: process.env.PASSWORD_RESET_SECRET,
    expiration: process.env.PASSWORD_RESET_EXPIRATION || '1d',
    from: process.env.PASSWORD_RESET_FROM || 'no-reply@docket.fyi',
  },
  postgres: {
    protocol: process.env.DB_PROTOCOL || 'postgresql://',
    host: process.env.DB_HOST || 'docket-postgres',
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'docket_development',
    useSSL: process.env.DB_USE_SSL || 'false',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT || 'postgres'
  },
  redis: {
    protocol: process.env.REDIS_PROTOCOL || 'redis://',
    host: process.env.REDIS_HOST || 'docket-redis',
    port: process.env.REDIS_PORT || '6379',
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    databaseId: process.env.REDIS_DATABASE_ID || '0',
    defaultTtl: process.env.REDIS_DEFAULT_CACHE_TTL_SECONDS || '300' // 5 minutes
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  },
  registrationConfirmation: {
    secret: process.env.REGISTRATION_CONFIRMATION_SECRET,
    expiration: process.env.REGISTRATION_CONFIRMATION_EXPIRATION || '1d',
    from: process.env.REGISTRATION_CONFIRMATION_FROM || 'no-reply@docket.fyi'
  },
  google: {
    clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
    redirectUrl: process.env.GOOGLE_CALENDAR_REDIRECT_URL,
    apiKey: process.env.GOOGLE_CALENDAR_API_KEY,
    scopes: () => process.env.GOOGLE_CALENDAR_SCOPES.split(',').map(scope => scope.trim()),
    rawScopes: process.env.GOOGLE_CALENDAR_SCOPES
  },
  microsoft: {
    applicationId: process.env.MICROSOFT_APPLICATION_ID,
    applicationPassword: process.env.MICROSOFT_APPLICATION_PASSWORD,
    tokenHost: process.env.MICROSOFT_TOKEN_HOST || 'https://login.microsoftonline.com',
    authorizePath: process.env.MICROSOFT_AUTHORIZE_PATH || 'common/oauth2/v2.0/authorize',
    tokenPath: process.env.MICROSOFT_TOKEN_PATH || 'common/oauth2/v2.0/token',
    redirectUrl: process.env.MICROSOFT_REDIRECT_URL,
    scopes: () => process.env.MICROSOFT_SCOPES.split(',').map(scope => scope.trim()),
    rawScopes: process.env.MICROSOFT_SCOPES
  },
  sentry: {
    dsn: process.env.SENTRY_DSN
  },
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY
  },
  elasticsearch: {
    protocol: process.env.ELASTICSEARCH_PROTOCOL || 'http://',
    host: process.env.ELASTICSEARCH_HOST || 'docket-elasticsearch',
    port: process.env.ELASTICSEARCH_PORT || 9200
  },
  vault: {
    apiVersion: process.env.VAULT_API_VERSION || 'v1',
    protocol: process.env.VAULT_PROTOCOL || 'http://',
    host: process.env.VAULT_HOST || 'docket-vault',
    port: process.env.VAULT_PORT || 8200,
    // endpoint: process.env.VAULT_ENDPOINT || 'http://docket-vault:8200',
    // token: process.env.VAULT_TOKEN,
  }
}
