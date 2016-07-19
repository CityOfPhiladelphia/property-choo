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
  const ais = state.property.ais.properties
  const homestead = state.property.homestead

  if (account && state.property.query !== account) {
    send('property:fetch', account)
  }

  return html`
    <div class="row">
      <div class="property-main large-14 columns">
        ${ownership(opa)}
        ${realEstateTaxes(opa)}
        ${valuationHistory()}
        ${salesDetails(opa)}
        ${licensesInspections(opa)}
        ${trashRecycling(ais)}
        ${serviceAreas(ais)}
      </div>
      <div class="property-side large-10 columns">
        <h3 class="hide-for-large alternate divide">Property Details</h3>
        ${detailsPanel(opa)}
        ${opaInquiry(opa)}
      </div>
    </div>`
}
