const html = require('choo/html')

const ownership = require('../components/ownership')
const realEstateTaxes = require('../components/real-estate-taxes')
const valuationHistory = require('../components/valuation-history')
const salesDetails = require('../components/sales-details')
const licensesInspections = require('../components/licenses-inspections')
const trashRecycling = require('../components/trash-recycling')
const serviceAreas = require('../components/service-areas')
const detailsPanel = require('../components/details-panel')
const opaInquiry = require('../components/opa-inquiry')

module.exports = (state, prev, send) => {
  const account = state.params.account
  const opa = state.property.opa
  const ais = state.property.ais
  const history = state.property.history

  if (account && state.property.query !== account) {
    send('property:fetch', account)
  }

  if (state.property.error) {
    return html`
      <div class="row column">
        ${state.property.error === 'no_results'
          ? 'No results found'
          : 'Error fetching results'}
      </div>`
  } else {
    return html`
      <div class="row">
        <div class="property-main large-14 columns">
          <div class="property-title">
            <h1>
              ${opa.location}
              ${opa.unit ? '#' + opa.unit : ''}
            </h1>
            <div class="small-text">Philadelphia, PA ${opa.zip_code}</div>
          </div>
          ${ownership(opa)}
          ${realEstateTaxes(opa)}
          ${valuationHistory(history)}
          ${salesDetails(opa)}
          ${licensesInspections(opa)}
          ${trashRecycling(ais)}
          ${serviceAreas(ais)}
        </div>
        <div class="property-side large-10 columns">
          <h3 class="hide-for-large alternate divide">Property Details</h3>
          ${detailsPanel(ais, opa)}
          ${opaInquiry(opa)}
        </div>
      </div>`
  }
}
