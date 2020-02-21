const inquirer = require('inquirer')
const AWS = require('aws-sdk')
const fs = require('fs')
const { yamlParse } = require('yaml-cfn')
const uuid = require('uuid/v4')
const util = require('util')

const {
  AWS_PROFILE,
  AWS_REGION,
  AWS_DEFAULT_REGION,
  AWS_CLOUDFORMATION_STACK_NAME,
  APPLICATION_NAME,
  TEMPLATE_FILE_PATH
} = process.env

const creds = new AWS.SharedIniFileCredentials({profile: AWS_PROFILE || 'docket'});
AWS.config.credentials = creds
const cloudformation = new AWS.CloudFormation({
  accessKeyId: creds.accessKeyId,
  secretAccessKey: creds.secretAccessKey,
  region: AWS_REGION || AWS_DEFAULT_REGION || 'us-west-2'
})
const cfnCreateStack = util.promisify(cloudformation.createStack.bind(cloudformation))
const cfnUpdateStack = util.promisify(cloudformation.updateStack.bind(cloudformation))
const cfnDescribeStacks = util.promisify(cloudformation.describeStacks.bind(cloudformation))

function upperCaseFirst(input) {
  return input.charAt(0).toUpperCase() + input.substr(1)
}

async function main() {
  if (!TEMPLATE_FILE_PATH) throw new Error('TEMPLATE_FILE_PATH environment variable must be provided.')
  if (!AWS_CLOUDFORMATION_STACK_NAME) throw new Error('AWS_CLOUDFORMATION_STACK_NAME environment variable must be provided.')
  const applicationName = APPLICATION_NAME || 'docket'
  const templateBody = fs.readFileSync(TEMPLATE_FILE_PATH, 'utf8') // eslint-disable-line no-sync
  const json = yamlParse(templateBody)
  const parameters = Object.entries(json.Parameters)
  const questions = parameters.map(parameter => {
    const name = parameter[0]
    const attributes = parameter[1]
    const type = attributes.NoEcho // eslint-disable-line no-nested-ternary
      ? 'password'
      : attributes.AllowedValues && attributes.AllowedValues.length
        ? 'list'
        : 'input'
    const question = {
      type, // attributes.NoEcho ? 'password' : 'input', // eslint-disable-line multiline-ternary
      name,
      message: () => {
        return attributes.Description
          ? `${name} (${attributes.Description}):`
          : `${name}:`
      },
      validate: input => {
        const results = []
        // The following allows parameters to be skipped, indicating that the previous value should be used
        if (!input) {
          return true
        }
        if (attributes.AllowedPattern) {
          const re = RegExp(attributes.AllowedPattern)
          re.test(input)
            ? results.push(true)
            : results.push(`Input must match the pattern ${attributes.AllowedPattern}`)
        }
        if (attributes.AllowedValues) {
          const result = attributes.AllowedValues.includes(input)
          result
            ? results.push(true)
            : results.push(`Input must be one of ${attributes.AllowedValues.join('|')}`)
        }
        return results.every(result => (typeof result === 'boolean' && result))
          ? true
          : results.filter(result => typeof result !== 'boolean')[0] // The first error message
      }
    }
    if (attributes.Default) {
      question.default = attributes.Default
    }
    if (question.type === 'list') {
      question.choices = attributes.AllowedValues
    }
    return question
  })
  const answers = await inquirer.prompt(questions)

  /**
   * The `EnvironmentNameParameter` value needs special handling
   * because it's used to help "namespace" stacks.
   */
  if (!answers.EnvironmentNameParameter) throw new Error('EnvironmentNameParameter must be provided')
  const stackName = [
    upperCaseFirst(applicationName),
    upperCaseFirst(answers.EnvironmentNameParameter),
    upperCaseFirst(AWS_CLOUDFORMATION_STACK_NAME),
    'Stack'
  ].join('')

  const describeStacksParams = {
    StackName: stackName
  }
  const createOrUpdateStackParams = {
    StackName: stackName,
    Capabilities: [
      'CAPABILITY_NAMED_IAM'
    ],
    ClientRequestToken: `NPM-Script-AWSCloudFormationSecrets-UpdateStack-${uuid()}`,
    Parameters: Object.entries(answers).map(entry => {
      const key = entry[0]
      const value = entry[1]
      const obj = {}
      obj.ParameterKey = key
      if (!value) {
        obj.UsePreviousValue = true
      } else {
        obj.ParameterValue = value
      }
      return obj
    }),
    TemplateBody: templateBody
  }
  let stackExists = false
  try {
    console.log('Describing stacks...')
    await cfnDescribeStacks(describeStacksParams)
    console.log(`Found stack '${stackName}'.`)
    stackExists = true
  } catch (err) {
    /**
     * The catch clause will be triggered in the event that
     * the stack doesn't exist.
     */
    console.log(`Stack '${stackName}' not found.`)
    // console.log(err.message)
  }

  console.log('')
  console.log('='.repeat(5), 'Review', '='.repeat(5), '\n')
  console.log('Stack name:', stackName, '\n')
  console.log('Parameters:')
  console.log(createOrUpdateStackParams.Parameters.map(parameter => `${parameter.ParameterKey} = ${parameter.ParameterValue}`).join('\n'))
  console.log('')
  console.log('='.repeat(18), '\n')
  const confirmationAnswers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: `Proceed with ${stackExists ? 'updating' : 'creating'} ${stackName}?`, // eslint-disable-line multiline-ternary
      default: false
    }
  ])
  if (!confirmationAnswers.proceed) {
    console.log('Done.')
    process.exit(0)
  }

  /**
   * The following is create-or-update functionality since
   * the SDK doesn't include the `deploy` method found in
   * the CLI.
   */
  try {
    if (stackExists) {
      console.log(`Updating stack ${stackName}...`)
      const updateResponse = await cfnUpdateStack(createOrUpdateStackParams)
      console.log(updateResponse)
    } else {
      console.log(`Creating stack ${stackName}...`)
      const createResponse = await cfnCreateStack(createOrUpdateStackParams)
      console.log(createResponse)
    }
    console.log('Done.')
    process.exit(0)
  } catch (err) {
    console.log(err.message)
    console.log('Exiting...')
    process.exit(1)
  }
}

main()
