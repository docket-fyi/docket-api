const nodeVault = require('node-vault')
const inquirer = require('inquirer')
const fs = require('fs')

// const vault = require('./src/v1/config/vault')
const seeds = require('./vault-seeds');

(async () => {
  try {
    const apiVersion = process.env.VAULT_API_VERSION || 'v1'
    const protocol = process.VAULT_PROTOCOL || 'http://'
    const host = process.env.VAULT_HOST || 'docket-vault'
    const port = process.env.VAULT_PORT || 8200
    const endpoint = `${protocol}${host}:${port}`
    console.log(`Connecting to ${endpoint}...`)
    const tempVault = nodeVault({ apiVersion, endpoint })
    const initializedResponse = await tempVault.initialized()
    console.log('Connected.')
    if (!initializedResponse.initialized) {
      throw new Error('Vault is not initialized.')
    }
    const statusResponse = await tempVault.status()
    if (statusResponse.sealed) {
      throw new Error('Vault is sealed.')
    }
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'environment',
        message: 'Environment (used for namespacing secrets)',
        choices: [
          /**
           * Never use this tool for Production!
           */
          {
            name: 'Development',
            value: 'development'
          },
          {
            name: 'Staging',
            value: 'staging'
          }
        ]
      },
      // {
      //   type: 'input',
      //   name: 'username',
      //   message: 'Username',
      //   validate: input => (input !== '') ? true : 'Username can\'t be blank' // eslint-disable-line no-confusing-arrow, multiline-ternary
      // },
      // {
      //   type: 'password',
      //   name: 'password',
      //   message: 'Password',
      //   // mask: true,
      //   validate: input => (input !== '') ? true : 'Password can\'t be blank' // eslint-disable-line no-confusing-arrow, multiline-ternary
      // },
      {
        type: 'input',
        name: 'appRoleId',
        message: 'App role ID',
        // mask: true,
        validate: input => (input !== '') ? true : 'App role ID can\'t be blank' // eslint-disable-line no-confusing-arrow, multiline-ternary
      },
      {
        type: 'password',
        name: 'appRoleSecretWrapToken',
        message: 'App role secret wrap token',
        // mask: true,
        validate: input => (input !== '') ? true : 'App role secret wrap token can\'t be blank' // eslint-disable-line no-confusing-arrow, multiline-ternary
      },
      {
        type: 'confirm',
        name: 'proceed',
        message: 'For security, this script will delete vault-seeds.js from disk when finished. Proceed?',
        default: false
      }
    ])
    if (!answers.proceed) {
      console.log('Exiting...')
      process.exit(1)
    }
    // const userpassLoginResponse = await vault.userpassLogin({
    //   username: answers.username,
    //   password: answers.password
    // })
    // vault.token = userpassLoginResponse.auth.client_token // eslint-disable-line require-atomic-updates
    tempVault.token = answers.appRoleSecretWrapToken
    const unwrapResponse = await tempVault.unwrap()
    const secretId = unwrapResponse.data.secret_id
    const vault = nodeVault({ apiVersion, endpoint })
    const approleLoginResponse = await vault.approleLogin({
      role_id: answers.appRoleId,
      secret_id: secretId
    })
    vault.token = approleLoginResponse.auth.client_token // eslint-disable-line require-atomic-updates
    let totalEntries = 0
    let totalSuccessfulEntries = 0
    for (const [seedIndex, seed] of seeds.entries()) {
      if (!seed.path) {
        console.warn(`Warning: skipping seed (index ${seedIndex}); missing "path" property.`)
        continue // eslint-disable-line no-continue
      }
      if (!seed.entries || !seed.entries.length) {
        console.warn(`Warning: skipping seed (index ${seedIndex}); "entries" property is missing or empty.`)
        continue // eslint-disable-line no-continue
      }
      const data = seed.entries.reduce((acc, entry, idx) => { // eslint-disable-line no-loop-func
        totalEntries++ // eslint-disable-line no-plusplus
        if (!entry.key) {
          console.warn(`Warning: skipping entry (index ${idx}); missing "key" property.`)
          return acc // eslint-disable-line no-continue
        }
        /**
         * Using Object#hasOwnProperty here because the `value`
         * property can be null, 0, false, etc.
         */
        if (!entry.hasOwnProperty('value')) { // eslint-disable-line no-prototype-builtins
          console.warn(`Warning: skipping entry (index ${idx}); missing "value" property.`)
          return acc // eslint-disable-line no-continue
        }
        acc[entry.key] = entry.value
        totalSuccessfulEntries++ // eslint-disable-line no-plusplus
        return acc
      }, {})
      const path = `kv/${answers.environment}/${seed.path.join('/')}`
      if (!Object.keys(data).length) {
        console.warn(`Warning: not writing to ${path}; no data fields present.`)
        continue // eslint-disable-line no-continue
      }
      console.log(`Writing to ${path}...`)
      await vault.write(path, data) // eslint-disable-line no-await-in-loop
    }
    console.log(`Seeded ${totalSuccessfulEntries} of ${totalEntries} ${totalEntries === 1 ? 'secret' : 'secrets'}.`) // eslint-disable-line multiline-ternary
    // fs.unlinkSync('./vault-seeds.js') // eslint-disable-line no-sync
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
