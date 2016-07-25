const html = require('choo/html')

module.exports = (ais) => {
  const props = ais.properties

  return html`
    <div class="row">
      <div class="columns">
        <h2 class="alternate divide">Service Area</h2>

        <div class="row">
          <div class="medium-12 columns">
            <div class="panel mbm">
              <h3>School Catchment</h3>
              <h4 class="alternate">Elementary School</h4>
              <strong>${props.elementary_school}</strong>
              <h4 class="alternate">Middle School</h4>
              <strong>${props.middle_school}</strong>
              <h4 class="alternate">High School</h4>
              <strong>${props.high_school}</strong>
            </div>
          </div>
          <div class="medium-12 columns">
            <div class="panel mbm">
              <h3>Political</h3>
              <h4 class="alternate">2016 Councilmanic District</h4>
              <strong>${props.council_district_2016}</strong>
              <h4 class="alternate">Ward</h4>
              <strong>${props.political_ward}</strong>
              <h4 class="alternate">Ward Division</h4>
              <strong>${props.political_division}</strong>
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
                  <strong>${props.police_district}</strong>
                  <h4 class="alternate">Police Sector</h4>
                  <strong>${props.police_sector}</strong>
                </div>
                <div class="medium-12 columns">
                  <h4 class="alternate">Police Public Service Area</h4>
                  <strong>${props.police_service_area}</strong>
                  <h4 class="alternate">Police Division</h4>
                  <strong>${props.police_division}</strong>
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
                  <strong>${props.highway_district}</strong>
                  <h4 class="alternate">Highway Section</h4>
                  <strong>${props.highway_section}</strong>
                  <h4 class="alternate">Highway Subsection</h4>
                  <strong>${props.highway_subsection}</strong>
                  <h4 class="alternate">Street Light Routes</h4>
                  <strong>${props.street_light_route}</strong>
                  <h4 class="alternate">Traffic District</h4>
                  <strong>${props.traffic_district}</strong>
                  <h4 class="alternate">Traffic PM District</h4>
                  <strong>${props.traffic_pm_district}</strong>
                </div>
                <div class="medium-12 columns">
                  <h4 class="alternate">Trash & Recycling Day</h4>
                  <strong>${props.rubbish_recycle_day}</strong>
                  <h4 class="alternate">Leaf Collection Day</h4>
                  <strong>${props.leaf_collection_area}</strong>
                  <h4 class="alternate">Recycling Diversion Rate</h4>
                  <strong>${props.recycling_diversion_rate}</strong>
                  <h4 class="alternate">Sanitation Area</h4>
                  <strong>${props.sanitation_area}</strong>
                  <h4 class="alternate">Sanitation District</h4>
                  <strong>${props.sanitation_district}</strong>
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
              <strong>${props.planning_district}</strong>
              <h4 class="alternate">Licenses and Inspections (L+I)</h4>
              <strong>${props.li_district}</strong>
              <h4 class="alternate">Recreation</h4>
              <strong>${props.recreation_district}</strong>
            </div>
          </div>
          <div class="medium-12 columns">
            <div class="panel mbm">
              <h3>Water</h3>
              <h4 class="alternate">PWD Maintenance Districts</h4>
              <strong>${props.pwd_maint_district}</strong>
              <h4 class="alternate">PWD Pressure Districts</h4>
              <strong>${props.pwd_pressure_district}</strong>
              <h4 class="alternate">Water Treatment Plant</h4>
              <strong>${props.pwd_treatment_plant}</strong>
              <h4 class="alternate">Water Plate Index</h4>
              <strong>${props.pwd_water_plate}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>`
}
