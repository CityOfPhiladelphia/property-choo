const html = require('choo/html')

const formFields = [
  {
    name: '__VIEWSTATE',
    value: '/wEPDwULLTEyNDQ4MDU4OTkPZBYCZg9kFgICAw9kFgICDQ9kFgYCAQ9kFgICAw9kFgICAQ8QZGQWAGQCBQ8PFgIeBFRleHRlZGQCDQ9kFgYCAQ88KwAKAGQCBQ8UKwACZBAWABYAFgBkAgcPPCsAEQEBEBYAFgAWAGQYAgVBY3RsMDAkQm9keUNvbnRlbnRQbGFjZUhvbGRlciRHZXRUYXhJbmZvQ29udHJvbCRncmRQYXltZW50c0hpc3RvcnkPZ2QFMmN0bDAwJEJvZHlDb250ZW50UGxhY2VIb2xkZXIkR2V0VGF4SW5mb0NvbnRyb2wkZnJtD2dkfeKn02F5/UVWA1ziT8O+TiqI1khz8dbn3xHnh76pFpg='
  },
  {
    name: '__EVENTVALIDATION',
    value: '/wEWBQLYwKbjCwLRzsWTBwLlpIbACAKV6q2KDQKIvdHyCQKihnn4/OrmyoTE2SX2X/qFnyExidQjjGtDkY91sD0P'
  },
  {
    name: 'ctl00$BodyContentPlaceHolder$SearchByAddressControl$txtLookup',
    value: 'by Property Address'
  },
  {
    name: 'ctl00$BodyContentPlaceHolder$SearchByBRTControl$btnTaxByBRT',
    value: ' >>'
  },
  {
    name: 'ctl00$BodyContentPlaceHolder$SearchByBRTControl$txtTaxInfo',
    value: null
  }
]

module.exports = (opa) => {
  formFields[formFields.length - 1].value = opa.parcel_number

  return html`
    <div class="row hide-for-print">
      <div class="columns">
        <h2 class="alternate divide">Real Estate Taxes</h2>
        <div class="row">
          <div class="medium-14 columns">
            <p class="no-margin normal">
              Real Estate Tax account balances have not yet been added to this application.
            </p>
          </div>
          <div class="medium-10 columns text-right">
            <form method="post" action="http://www.phila.gov/revenue/realestatetax/">
              ${formFields.map((field) => html`<input type="hidden" name=${field.name} value=${field.value}>`)}
              <button type="submit" class="button no-margin">
                View the Tax Balance
              </button>
            </form>
            <div class="small-text">
              On Department of Revenue website
            </div>
          </div>
        </div>
      </div>
    </div>`
}
