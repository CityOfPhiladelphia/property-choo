const html = require('choo/html')

module.exports = (history) => {
  return html`
    <div class="row">
      <div class="columns">
        <h2 class="alternate divide">Valuation History</h2>
        <div class="row">
          <div class="columns">
            <table role="grid" summary="Property valuation history." class="tablesaw tablesaw-stack" data-tablesaw-mode="stack">
              <thead>
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Market Value</th>
                  <th scope="col">Taxable Land</th>
                  <th scope="col">Taxable Improvement</th>
                  <th scope="col">Exempt Land</th>
                  <th scope="col">Exempt Improvement</th>
                </tr>
              </thead>
              <tbody>
              ${history.map((row) => html`
                <tr>
                  <td>${row.year}</td>
                  <td>${row.market_value}</td>
                  <td>${row.taxable_land}</td>
                  <td>${row.taxable_building}</td>
                  <td>${row.exempt_land}</td>
                  <td>${row.exempt_building}</td>
                </tr>`)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`
}
