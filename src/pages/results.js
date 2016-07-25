const html = require('choo/html')

module.exports = (state, prev, send) => {
  const query = state.params

  if (query.input && !isSameQuery(query, state.results.query)) {
    query.reset = true
    send('results:fetch', query)
  }

  let display
  if (state.results.matches.features.length > 0) {
    display = resultsTable(state.results.matches.features)
  } else if (state.results.isLoading) {
    display = 'Loading...'
  } else if (state.results.error === 'no_matches') {
    display = noResultsMsg(query)
  } else if (state.results.error) {
    display = 'Error fetching results'
  } else {
    display = '0 properties found'
  }

  return html`
    <div class="row">
      <div class="medium-24 columns">
        <h1>${query.input}</h1>
        ${display}
        ${state.results.matches.total_size > state.results.matches.features.length
          ? html`<div><a href="#" class="button icon" onclick=${onClickMore}>See more results</a></div>`
          : ''}
      </div>
    </div>`

  function resultsTable (features) {
    return html`
      <table role="grid" summary="Property search results" class="tablesaw tablesaw-stack results no-borders" data-tablesaw-mode="stack">
        <thead>
          <tr>
            <th scope="col">Address</th>
            <th scope="col">Market Value</th>
            <th scope="col">Sale Details</th>
            <th scope="col">Owner</th>
          </tr>
        </thead>
        <tbody>
          ${features.map((feature) => {
            const props = feature.properties
            return html`
              <tr class="result-row" onclick=${() => navigate(props.opa_account_num)}>
                <td>${props.opa_address}</td>
                <td>${props.market_value}</td>
                <td>${formatDate(props.sale_date)}, $${props.sale_price}</td>
                <td>${props.opa_owners ? props.opa_owners.join(', ') : ''}</td>
              </tr>`
          })}
        </tbody>
      </table>`
  }

  function noResultsMsg (query) {
    return html`
      <div>
        No results found for <strong>${query.input}</strong>.
        ${query.type === 'address'
          ? html`<span><a href="#/block/${query.input}">Search all properties on the block</a>.</span>`
          : ''}
      </div>`
  }

  function navigate (accountNum) {
    window.location.hash = '/account/' + accountNum
  }

  function onClickMore (e) {
    query.page = state.results.matches.page + 1
    send('results:fetch', query)
    e.preventDefault()
  }
}

function isSameQuery (a, b) {
  return a.type === b.type && a.input === b.input
}

function formatDate (iso) {
  if (!iso) return
  const [year, month, day] = iso.split('T')[0].split('-')
  return `${+month}/${+day}/${year}`
}
