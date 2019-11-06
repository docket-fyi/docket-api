const BaseError = require('../base')

class ImportedEventsNotArrayError extends BaseError {

  constructor(message = 'Imported events not of type array') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ImportedEventsNotArrayError);
    }
    this.translationKey = 'importedEventsNotArray'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = ImportedEventsNotArrayError
