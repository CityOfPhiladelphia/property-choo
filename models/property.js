const http = require('choo/http')
const parallel = require('run-parallel')
const extend = require('xtend')

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
    homestead: {},
    query: null, // NOT the property returned by AIS, but an internal property
    isLoading: false
  },
  reducers: {
    receive: (data, state) => {
      return extend(data, { isLoading: false })
    },
    resetQuery: (data, state) => {
      const defaultState = module.exports.state
      return extend(defaultState, {
        query: data,
        isLoading: true
      })
    }
  },
  effects: {
    fetch: (data, state, send, done) => {
      // First, reset state synchronously
      send('property:resetQuery', data, () => {
        // Run operations in parallel
        parallel([
          (callback) => send('property:fetchOPA', data, callback),
          (callback) => send('property:fetchAIS', data, callback),
          (callback) => send('property:fetchHomestead', data, callback)
        ],
        function parallelDone (err, results) {
          if (err) done(err)

          const [opa, ais, homestead] = results
          send('property:receive', { opa, ais, homestead }, done)
        })
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
