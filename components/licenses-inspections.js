const html = require('choo/html')

module.exports = (opa) => {
  const url = `http://li.phila.gov/#summary?address=${encodeURIComponent(opa.location)}`

  return html`
    <div class="row hide-for-print">
      <div class="columns">
        <h2 class="alternate divide">Permits, Licenses, and Violations</h2>
        <div class="row">
          <div class="hide-for-print medium-14 columns">
            <p class="no-margin normal">
              Permits, licenses, and violations from L+I have not yet been added to this application.
            </p>
          </div>
          <div class="medium-10 columns text-right">
            <a class="button no-margin" target="_blank" href="${url}">
              View the L+I Records
            </a>
            <div class="small-text">
              On the Licenses & Inspections website
            </div>
          </div>
        </div>
      </div>
    </div>`
}
