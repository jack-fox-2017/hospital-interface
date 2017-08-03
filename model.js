const fs = require('fs')

class Model {
  static getData(file, getId = false) {
    let json = JSON.parse(fs.readFileSync(file, 'utf-8'))
    let idCount = json.shift()
    return getId ? idCount : json
  }

  static getSession(file) {
    return JSON.parse(fs.readFileSync(file, 'utf-8'))
  }

  static saveData(file, data) {
    let updateId = this.getData(file, true) + 1
    let newData = data.slice(0)
    newData.unshift(updateId)
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  }

  static saveSession(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  }
}

module.exports = Model
