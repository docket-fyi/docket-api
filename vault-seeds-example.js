/* eslint-disable max-lines */

const seeds = [
  {
    path: ['api'],
    entries: [
      {
        key: 'NODE_ENV',
        value: ''
      },
      {
        key: 'PORT',
        value: ''
      },
      {
        key: 'DEBUG',
        value: ''
      },
      {
        key: 'API_VERSION',
        value: ''
      },
      {
        key: 'FALLBACK_LOCALE',
        value: ''
      }
    ]
  },
  {
    path: ['postgres'],
    entries: [
      {
        key: 'DB_PROTOCOL',
        value: ''
      },
      {
        key: 'DB_HOST',
        value: ''
      },
      {
        key: 'DB_PORT',
        value: ''
      },
      {
        key: 'DB_USERNAME',
        value: ''
      },
      {
        key: 'DB_PASSWORD',
        value: ''
      },
      {
        key: 'DB_DIALECT',
        value: ''
      },
      {
        key: 'DB_NAME',
        value: ''
      },
      {
        key: 'DB_USE_SSL',
        value: ''
      }
    ]
  },
  {
    path: ['redis'],
    entries: [
      {
        key: 'REDIS_PROTOCOL',
        value: ''
      },
      {
        key: 'REDIS_HOST',
        value: ''
      },
      {
        key: 'REDIS_PORT',
        value: ''
      },
      {
        key: 'REDIS_USERNAME',
        value: ''
      },
      {
        key: 'REDIS_PASSWORD',
        value: ''
      },
      {
        key: 'REDIS_DATABASE_ID',
        value: ''
      },
      {
        key: 'REDIS_DEFAULT_CACHE_TTL_SECONDS',
        value: ''
      }
    ]
  },
  {
    path: ['jwt'],
    entries: [
      {
        key: 'JWT_SECRET',
        value: ''
      },
      {
        key: 'JWT_EXPIRATION',
        value: ''
      }
    ]
  },
  {
    path: ['mail'],
    entries: [
      {
        key: 'MAIL_HOST',
        value: ''
      },
      {
        key: 'MAIL_PORT',
        value: ''
      },
      {
        key: 'MAIL_USERNAME',
        value: ''
      },
      {
        key: 'MAIL_PASSWORD',
        value: ''
      }
    ]
  },
  {
    path: ['passwordReset'],
    entries: [
      {
        key: 'PASSWORD_RESET_SECRET',
        value: ''
      },
      {
        key: 'PASSWORD_RESET_EXPIRATION',
        value: ''
      },
      {
        key: 'PASSWORD_RESET_FROM',
        value: ''
      }
    ]
  },
  {
    path: ['registrationConfirmation'],
    entries: [
      {
        key: 'REGISTRATION_CONFIRMATION_SECRET',
        value: ''
      },
      {
        key: 'REGISTRATION_CONFIRMATION_EXPIRATION',
        value: ''
      },
      {
        key: 'REGISTRATION_CONFIRMATION_FROM',
        value: ''
      }
    ]
  },
  {
    path: ['google'],
    entries: [
      {
        key: 'GOOGLE_CALENDAR_CLIENT_ID',
        value: ''
      },
      {
        key: 'GOOGLE_CALENDAR_CLIENT_SECRET',
        value: ''
      },
      {
        key: 'GOOGLE_CALENDAR_API_KEY',
        value: ''
      },
      {
        key: 'GOOGLE_CALENDAR_REDIRECT_URL',
        value: ''
      },
      {
        key: 'GOOGLE_CALENDAR_SCOPES',
        value: ''
      }
    ]
  },
  {
    path: ['microsoft'],
    entries: [
      {
        key: 'MICROSOFT_APPLICATION_ID',
        value: ''
      },
      {
        key: 'MICROSOFT_APPLICATION_PASSWORD',
        value: ''
      },
      {
        key: 'MICROSOFT_TOKEN_HOST',
        value: ''
      },
      {
        key: 'MICROSOFT_AUTHORIZE_PATH',
        value: ''
      },
      {
        key: 'MICROSOFT_TOKEN_PATH',
        value: ''
      },
      {
        key: 'MICROSOFT_REDIRECT_URL',
        value: ''
      },
      {
        key: 'MICROSOFT_SCOPES',
        value: ''
      }
    ]
  },
  {
    path: ['stripe'],
    entries: [
      {
        key: 'STRIPE_PUBLIC_KEY',
        value: ''
      },
      {
        key: 'STRIPE_SECRET_KEY',
        value: ''
      }
    ]
  },
  {
    path: ['sentry'],
    entries: [
      {
        key: 'SENTRY_DSN',
        value: ''
      }
    ]
  },
  {
    path: ['elasticsearch'],
    entries: [
      {
        key: 'ELASTICSEARCH_PROTOCOL',
        value: ''
      },
      {
        key: 'ELASTICSEARCH_HOST',
        value: ''
      },
      {
        key: 'ELASTICSEARCH_PORT',
        value: ''
      }
    ]
  }
]

module.exports = seeds
