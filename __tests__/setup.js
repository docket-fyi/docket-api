// This file is referenced in jest.config.js
require('dotenv').config({path: `${process.cwd()}/.env.test`})
console.log('start '.repeat(10))
console.log(process.env)
console.log('end   '.repeat(10))
