const html = require('choo/html')

module.exports = (queryType) => (state, prev, send) => {
  const query = { type: queryType, input: state.params.input }

  if (query.input && !isSameQuery(query, state.results.query)) {
    query.reset = true
    send('results:fetch', query)
  }

  let display
  if (state.results.isLoading) {
    display = 'Loading...'
  } else if (state.results.matches.features.length > 0) {
    display = resultsTable(state.results.matches.features)
  } else {
    display = '0 properties found'
  }

  return html`
    <div>
      <h1>${query.input}</h1>
      ${display}
      ${state.results.matches.total_size > state.results.matches.features.length
        ? html`<div><a href="#" class="button icon" onclick=${onClickMore}>See more results</a></div>`
        : ''}
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

  function onClickMore (e) {
    query.page = state.results.matches.page + 1
    send('results:fetch', query)
    e.preventDefault()
  }

  function navigate (accountNum) {
    window.location.hash = '/account/' + accountNum
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
