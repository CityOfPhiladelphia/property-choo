const html = require('choo/html')

module.exports = (state, prev, send) => {
  const address = state.params.address

  if (address && state.results.query !== address) {
    send('results:fetch', {address})
  }

  let display
  if (state.results.isLoading) {
    display = 'Loading...'
  } else if (state.results.ais.features.length > 0) {
    display = resultsTable(state.results.ais.features, state.results.opa)
  } else {
    display = '0 properties found'
  }

  return html`
    <div>
      <h1>${address}</h1>
      ${display}
      ${state.results.ais.total_size > state.results.ais.features.length
        ? seeMoreButton(address, state.results.ais.page + 1)
        : ''}
    </div>`

  function resultsTable (aisRows, opaHash) {
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
          ${aisRows.map((row) => {
            const opa = opaHash[row.properties.opa_account_num] || {}
            return html`
              <tr class="result-row" onclick=${() => window.location.hash = '/account/' + row.properties.opa_account_num}>
                <td>${row.properties.opa_address}</td>
                <td>${opa.market_value}</td>
                <td>${formatDate(opa.sale_date)}, $${opa.sale_price}</td>
                <td>${row.properties.opa_owners ? row.properties.opa_owners.join(', ') : ''}</td>
              </tr>`
          })}
        </tbody>
      </table>`
  }

  function seeMoreButton (address, page) {
    const payload = {address, page}
    return html`
      <div>
        <a class="button icon" onclick=${(e) => send('results:fetch', payload)}>
          See more results
        </a>
      </div>`
  }

  function formatDate (iso) {
    if (!iso) return
    const [year, month, day] = iso.split('T')[0].split('-')
    return `${+month}/${+day}/${year}`
  }
}
