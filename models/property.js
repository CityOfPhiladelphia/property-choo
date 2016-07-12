const http = require('choo/http')
const parallel = require('run-parallel')

const config = require('../config')

module.exports = {
  namespace: 'property',
  state: {
    opa: {},
    history: [],
    ais: {
      properties: {},
      geometry: {}
    },
    homestead: {}
  },
  reducers: {
    receive: (data, state) => {
      return data
    }
  },
  effects: {
    fetch: (data, state, send, done) => {
      // Run operations in parallel
      parallel([
        (callback) => send('property:fetchOPA', data, callback),
        (callback) => send('property:fetchAIS', data, callback),
        (callback) => send('property:fetchHomestead', data, callback)
      ],
      function parallelDone (err, results) {
        if (err) console.error(err)

        const [opa, ais, homestead] = results
        send('property:receive', { opa, ais, homestead }, done)
      })
    },
    fetchOPA: (data, state, send, done) => {
      const url = `${config.opaBase}?parcel_number=${data}`
      http(url, { json: true }, (err, response) => {
        if (err) done(err)
        else if (response.body.length < 1) done(`No opa data found for ${data}`)
        else done(null, response.body[0])
      })
    },
    fetchAIS: (data, state, send, done) => {
      const url = `${config.aisBase}account/${data}?gatekeeperKey=${config.aisKey}`
      http(url, { json: true }, (err, response) => {
        if (err) done(err)
        else done(null, response.body)
      })
    },
    fetchHomestead: (data, state, send, done) => {
      const url = `${config.homesteadBase}?account_num=${data}`
      http(url, { json: true }, (err, response) => {
        if (err) done(err)
        else if (response.body.length < 1) done(`No homestead found for ${data}`)
        else done(null, response.body[0])
      })
    }
  }
}
