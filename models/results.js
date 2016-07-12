const http = require('choo/http')
const qs = require('query-string')
const waterfall = require('run-waterfall')
const keyBy = require('lodash/keyby')
const map = require('lodash/map')
const extend = require('xtend')

const config = require('../config')

module.exports = {
  namespace: 'results',
  state: {
    ais: {
      features: [],
      normalized: [],
      page: 0,
      page_count: 0,
      page_size: 0,
      total_size: 0
    },
    opa: {},
    query: null, // NOT the property returned by AIS, but an internal property
    isLoading: false
  },
  reducers: {
    receivePage: (data, state) => {
      const combinedFeatures = state.ais.features.concat(data.ais.features)
      const newAIS = extend(data.ais, { features: combinedFeatures })
      const newOPA = extend(state.opa, data.opa)
      return ({ ais: newAIS, opa: newOPA, isLoading: false })
    },
    setQuery: (data, state) => {
      const emptyAIS = module.exports.state.ais
      return ({ query: data.address, ais: emptyAIS, opa: {}, isLoading: true })
    }
  },
  effects: {
    fetch: (data, state, send, done) => {
      const operations = [
        (callback) => send('results:fetchAIS', data, callback),
        (aisData, callback) => send('results:fetchOPA', aisData, callback)
      ]
      // If new query, first operation should be to reset state
      if (data.address !== state.query) {
        operations.unshift((callback) => send('results:setQuery', data, callback))
      }
      // Execute each function sequentially, passing result into next function
      waterfall(operations, function waterfallDone (err, results) {
        if (err) console.error(err)
        // results consists of 2 properties, { ais, opa }
        send('results:receivePage', results, done)
      })
    },
    fetchAIS: (data, state, send, done) => {
      const params = {
        gatekeeperKey: config.aisKey,
        include_units: null,
        opa_only: null
      }
      if (data.page) params.page = data.page
      const address = encodeURIComponent(data.address)
      const url = `${config.aisBase}addresses/${address}?${qs.stringify(params)}`
      http(url, { json: true }, (err, response) => {
        if (err) done(err)
        else done(null, response.body)
      })
    },
    fetchOPA: (aisData, state, send, done) => {
      const accountNumbers = aisData.features.map((feature) => feature.properties.opa_account_num)
      const params = {
        $select: [
          'parcel_number',
          'market_value',
          'sale_date',
          'sale_price'
        ].join(','),
        $where: `parcel_number in ("${accountNumbers.join('","')}")`
      }
      const url = `${config.opaBase}?${qs.stringify(params)}`
      http(url, { json: true }, (err, response) => {
        if (err) done(err)
        else if (response.body.length < 1) done(`No opa data found for ${aisData.length} accounts`)
        else {
          // Convert OPA array to object keyed by parcel_number for easier access
          // while iterating ais results. Could merge datasets here but not necessary.
          const opaHash = keyBy(response.body, 'parcel_number')
          done(null, { ais: aisData, opa: opaHash })
        }
      })
    }
  }
}
