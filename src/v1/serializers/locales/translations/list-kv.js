function listKeyValue(translations) {
  return translations.reduce((acc, cur) => {
    acc[cur.key] = cur.text
    return acc
  }, {})
}

module.exports = listKeyValue
