const html = require('choo/html')

module.exports = (opa) => {
  // Note inquiry URL uses property id instead of parcel number
  const url = `http://opa.phila.gov/opa.apps/Help/CitizenMain.aspx?sch=Ctrl2&s=1&url=search&id=${opa.property_id}`

  return html`
    <div class="panel opa-inquiry-panel">
      <div class="row">
        <div class="small-24 columns">
          <h4 class="alternate no-margin">
            Corrections or questions about this information?
          </h4>
          <div class="text-right">
            <a href=${url} class="button no-margin" target="_blank">
              Submit an official inquiry
            </a>
            <div class="small-text">
              On the Office of Property Assessment website
            </div>
          </div>
        </div>
      </div>
    </div>`
}
