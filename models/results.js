const http = require('choo/http')
const qs = require('query-string')
const waterfall = require('run-waterfall')
const keyBy = require('lodash/keyby')
const extend = require('xtend')

const config = require('../config')

module.exports = {
  namespace: 'results',
  state: {
    matches: {
      features: [],
      normalized: [],
      page: 0,
      page_count: 0,
      page_size: 0,
      total_size: 0
    },
    query: { // NOT the property returned by AIS, but an internal property
      type: null,
      input: null
    },
    isLoading: false
  },
  reducers: {
    receivePage: (data, state) => {
      const { matches, details } = data
      const matchesCopy = extend(matches, {}) // to avoid mutation
      const detailedFeatures = mergeDetails(matchesCopy.features, details)

      // Append to current state's features (support pagination)
      // for new queries, still works because current state's features is []
      matchesCopy.features = state.matches.features.concat(detailedFeatures)

      return { matches: matchesCopy, isLoading: false }
    },
    resetQuery: (data, state) => {
      const emptyMatches = module.exports.state.matches
      return ({ query: data, matches: emptyMatches })
    },
    setLoading: (data, state) => {
      return { isLoading: true }
    }
  },
  effects: {
    fetch: (data, state, send, done) => {
      const operations = []

      // If new query, first operation should be to reset state
      if (data.reset) operations.push((callback) => send('results:resetQuery', data, callback))

      operations.push(
        (callback) => send('results:setLoading', callback),
        (callback) => send('results:fetchMatches', data, callback),
        (matches, callback) => send('results:fetchDetails', matches, callback)
      )

      // Execute each operation sequentially, passing result into next function
      waterfall(operations, function waterfallDone (err, results) {
        if (err) done(err)

        if (results.matches.total_size === 1) {
          // If only one result, show property route (doesn't change url)
          const account = results.matches.features[0].properties.opa_account_num
          const payload = { location: `/account/${account}` }
          send('location:setLocation', payload, done)
        } else {
          send('results:receivePage', results, done)
        }
      })
    },
    fetchMatches: (data, state, send, done) => {
      const url = constructMatchesURL(data.type, data.input, data.page)
      http(url, { json: true }, (err, response) => {
        if (err) done(err)
        else done(null, response.body)
      })
    },
    fetchDetails: (matches, state, send, done) => {
      const accounts = matches.features.map((feature) => feature.properties.opa_account_num)
      const url = constructDetailsURL(accounts)
      http(url, { json: true }, (err, response) => {
        if (err) done(err)
        else if (response.body.length < 1) done('No details found')
        else done(null, { matches: matches, details: response.body })
      })
    }
  }
}

function constructMatchesURL (type, input, page) {
  const params = {
    gatekeeperKey: config.aisKey,
    include_units: null,
    opa_only: null
  }
  if (page) params.page = page
  const resource = type === 'address' ? 'addresses' : type
  const cleanInput = encodeURIComponent(input)
  return `${config.aisBase}${resource}/${cleanInput}?${qs.stringify(params)}`
}

function constructDetailsURL (accounts) {
  const params = {
    $select: [
      'parcel_number',
      'market_value',
      'sale_date',
      'sale_price'
    ].join(','),
    $where: `parcel_number in ("${accounts.join('","')}")`
  }
  return `${config.opaBase}?${qs.stringify(params)}`
}

function mergeDetails (features, details) {
  const detailsHash = keyBy(details, 'parcel_number')
  return features.map((feature) => {
    const detailsMatch = detailsHash[feature.properties.opa_account_num]
    if (detailsMatch) feature.properties = extend(feature.properties, detailsMatch) // warning: mutation
    return feature
  })
}
