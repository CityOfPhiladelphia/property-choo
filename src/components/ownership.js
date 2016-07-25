const html = require('choo/html')

module.exports = (opa) => {
  const owners = [opa.owner_1, opa.owner_2]
  const mailingAddress = constructMailingAddress(opa)

  return html`
    <div class="row">
      <div class="columns">
        <h2 class="alternate divide">Owner</h2>
        <div class="row">
          <div class="owner-name medium-15 columns">
            <h1 class="no-margin owners">
              ${owners.map((owner) => html`<div>${owner}</div>`)}
            </h1>
          </div>
          <div class="medium-9 columns">
            <h4 class="alternate no-margin">Mailing Address</h4>
            <div class="bold mailing">
              ${mailingAddress.map((line) => html`<div>${line}</div>`)}
            </div>
          </div>
        </div>
      </div>
    </div>`
}

function constructMailingAddress (opa) {
  const lines = []
  if (opa.mailing_street) {
    // Concatenate mailing address lines if present
    const mailing_address = [opa.mailing_address_1, opa.mailing_address_2].join(' ').trim()
    lines.push(mailing_address, opa.mailing_street, opa.mailing_city_state, opa.mailing_zip)
  } else {
    lines.push(opa.location, 'Philadelphia, PA', opa.zip_code)
  }
  return lines.filter((line) => line)
}
