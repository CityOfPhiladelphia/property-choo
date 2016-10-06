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
    receiveError: (data, state) => {
      return { error: data, isLoading: false }
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
          (callback) => send('property:fetchHistory', data, callback),
          (callback) => send('property:fetchAIS', data, callback),
          (callback) => send('property:fetchHomestead', data, callback)
        ],
        function parallelDone (err, results) {
          if (err) return send('property:receiveError', err, done)

          const [opa, history, ais, homestead] = results
          send('property:receive', { opa, history, ais, homestead }, done)
        })
      })
    },
    fetchOPA: (data, state, send, done) => {
      const url = `${config.opa}?parcel_number=${data}`
      http(url, { json: true }, (err, response) => {
        if (err) return done('bad_request')
        else if (response.body.length < 1) return done('no_matches')
        done(null, response.body[0])
      })
    },
    fetchHistory: (data, state, send, done) => {
      const url = `${config.history}?parcel_number=${data}&$order=year desc`
      http(url, { json: true }, (err, response) => {
        if (err) console.error('history: bad_request')
        else if (response.body.length < 1) console.error('history: no_matches')
        done(null, response.body)
      })
    },
    fetchAIS: (data, state, send, done) => {
      const url = `${config.ais}account/${data}?gatekeeperKey=${config.aisKey}`
      http(url, { json: true }, (err, response) => {
        const status = response.body.status || response.statusCode
        if (status === 404) return done('no_matches')
        else if (err || status !== 200) return done('bad_request')
        done(null, response.body)
      })
    },
    fetchHomestead: (data, state, send, done) => {
      const url = `${config.homestead}?account_num=${data}`
      http(url, { json: true }, (err, response) => {
        if (err) console.error('homestead: bad_request')
        else if (response.body.length < 1) console.error('homestead: no_matches')
        done(null, response.body[0])
      })
    }
  }
}
