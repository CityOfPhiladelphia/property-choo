const html = require('choo/html')

module.exports = (opa) => {
  return html`
    <div class="row">
      <div class="columns">
        <h2 class="alternate divide">Sales Details</h2>
        <div class="panel sales mbm">
          <div class="row">
            <div class="medium-12 columns">
              <h4 class="alternate">Sales Price</h4>
              <strong class="stat">$${opa.sale_price}</strong>
            </div>
            <div class="medium-12 columns">
              <h4 class="alternate">Sales Date</h4>
              <strong>${formatDate(opa.sale_date)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>`
}

function formatDate (iso) {
  if (!iso) return
  const [year, month, day] = iso.split('T')[0].split('-')
  return `${+month}/${+day}/${year}`
}
