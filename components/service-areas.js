const html = require('choo/html')

module.exports = (ais) => {
  return html`
    <div class="row">
      <div class="columns">
        <h2 class="alternate divide">Service Area</h2>

        <div class="row">
          <div class="medium-12 columns">
            <div class="panel mbm">
              <h3>School Catchment</h3>
              <h4 class="alternate">Elementary School</h4>
              <strong data-hook="elementary-school">${ais.elementary_school}</strong>
              <h4 class="alternate">Middle School</h4>
              <strong data-hook="middle-school">${ais.middle_school}</strong>
              <h4 class="alternate">High School</h4>
              <strong data-hook="high-school">${ais.high_school}</strong>
            </div>
          </div>
          <div class="medium-12 columns">
            <div class="panel mbm">
              <h3>Political</h3>
              <h4 class="alternate">2016 Councilmanic District</h4>
              <strong data-hook="council-district"></strong>
              <h4 class="alternate">Ward</h4>
              <strong data-hook="ward"></strong>
              <h4 class="alternate">Ward Division</h4>
              <strong data-hook="ward-divisions"></strong>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="columns">
            <div class="panel mbm">
              <h3>Public Safety</h3>
              <div class="row">
                <div class="medium-12 columns">
                  <h4 class="alternate">Police District</h4>
                  <strong data-hook="police-district"></strong>

                  <h4 class="alternate">Police Sector</h4>
                  <strong data-hook="police-sector"></strong>
                </div>
                <div class="medium-12 columns">
                  <h4 class="alternate">Police Public Service Area</h4>
                  <strong data-hook="police-psa"></strong>

                  <h4 class="alternate">Police Division</h4>
                  <strong data-hook="police-division"></strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="columns">
            <div class="panel mbm">
              <h3>Streets</h3>
              <div class="row">
                <div class="medium-12 columns">
                  <h4 class="alternate">Highway District</h4>
                  <strong data-hook="highway-district"></strong>
                  <h4 class="alternate">Highway Section</h4>
                  <strong data-hook="highway-section"></strong>
                  <h4 class="alternate">Highway Subsection</h4>
                  <strong data-hook="highway-subsection"></strong>
                  <h4 class="alternate">Street Light Routes</h4>
                  <strong data-hook="street-light-routes"></strong>
                  <h4 class="alternate">Traffic District</h4>
                  <strong data-hook="traffic-district"></strong>
                  <h4 class="alternate">Traffic PM District</h4>
                  <strong data-hook="traffic-pm-district"></strong>
                </div>
                <div class="medium-12 columns">
                  <h4 class="alternate">Trash & Recycling Day</h4>
                  <strong data-hook="rubbish-day"></strong>
                  <h4 class="alternate">Leaf Collection Day</h4>
                  <strong data-hook="leaf-collection"></strong>
                  <strong data-hook="" class="h1 stat no-margin"></strong>
                  <h4 class="alternate">Recycling Diversion Rate</h4>
                  <strong data-hook="recycling-diversion"></strong>
                  <h4 class="alternate">Sanitation Area</h4>
                  <strong data-hook="sanitation-area"></strong>
                  <h4 class="alternate">Sanitation District</h4>
                  <strong data-hook="sanitation-district"></strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="medium-12 columns">
            <div class="panel mbm">
              <h3>Districts</h3>
              <h4 class="alternate">Planning</h4>
              <strong data-hook="planning"></strong>
              <h4 class="alternate">Licenses and Inspections (L+I)</h4>
              <strong data-hook="li-district"></strong>
              <h4 class="alternate">Recreation</h4>
              <strong data-hook="recreation"></strong>
            </div>
          </div>
          <div class="medium-12 columns">
            <div class="panel mbm">
              <h3>Water</h3>
              <h4 class="alternate">PWD Maintenance Districts</h4>
              <strong data-hook="pwd-maintenance"></strong>
              <h4 class="alternate">PWD Pressure Districts</h4>
              <strong data-hook="pwd-pressure"></strong>
              <h4 class="alternate">Water Treatment Plant</h4>
              <strong data-hook="water-treatment"></strong>
              <h4 class="alternate">Water Plate Index</h4>
              <strong data-hook="water-plate"></strong>
            </div>
          </div>
        </div>

      </div>
    </div>`
}
