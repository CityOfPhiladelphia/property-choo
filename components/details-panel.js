const html = require('choo/html')

module.exports = (opa, homestead) => {
  const homesteadValue = homestead.homestead_exemption > 0 ? 'Yes' : 'No'

  return html`
    <div class="panel mbm">
      <div class="row">
        <div class="columns map-container">
          <div data-hook="map" class="map"></div>
          <div class="text-right">
            <a data-hook="street-view-url" href="#" class="small-text external" target="_blank">See in Google Street View</a>
          </div>
          <div class="map-explainer"><p><small>These maps are created using data that may not represent the precise legal boundaries of each parcel. If you need access to the legal descriptions as they are contained in deeds, please refer to the Department of Records's <a href="https://secure.phila.gov/parcelexplorerauth/">Parcel Explorer</a>.</small></p></div>
        </div>
      </div>
      <div class="row">
        <div class="medium-10 columns">
          <h4 class="alternate"><span title="Office of Property Assessment">OPA</span> Account</h4>
          <strong data-hook="opa-account">
            ${opa.parcel_number}
          </strong>
        </div>
        <div class="medium-14 columns">
          <h4 class="alternate">Homestead Exemption</h4>
          <strong data-hook="homestead">
            ${homesteadValue}
          </strong>
        </div>
      </div>
      <div class="row">
        <div class="small-24 columns">
          <h4 class="alternate">Description</h4>
          <strong data-hook="improvement-description">
            ${opa.building_code_description}
          </strong>
        </div>
      </div>
      <div class="row">
        <div class="small-24 columns">
          <h4 class="alternate">Condition</h4>
          <strong data-hook="improvement-condition">
            ${opa.exterior_condition}
          </strong>
        </div>
      </div>
      <div class="row">
        <div class="small-24 columns">
          <h4 class="alternate">Beginning Point</h4>
          <strong data-hook="beginning-point">
            ${homestead.beginning_point}
          </strong>
        </div>
      </div>
      <div class="row">
        <div class="medium-10 columns">
          <h4 class="alternate">Land Area <span class="normal">(SqFt)</span></h4>
          <strong data-hook="land-area" class="stat">
            ${opa.total_area}
          </strong>
        </div>
        <div class="medium-14 columns">
          <h4 class="alternate">Improvement Area <span class="normal">(SqFt)</span></h4>
          <strong data-hook="improvement-area" class="stat">
            ${opa.total_livable_area}
          </strong>
        </div>
      </div>
      <div class="row">
        <div class="small-24 columns">
          <h4 class="alternate">Zoning</h4>
          <strong data-hook="zoning">
            ${opa.zoning}
          </strong>
          <a class="small-text zoning-link" href="http://www.phila.gov/zoningarchive/" target="_blank">See related zoning documents</a>
        </div>
      </div>
    </div>`
}
