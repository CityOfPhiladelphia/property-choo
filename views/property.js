const html = require('choo/html')

module.exports = (state, prev, send) => {
  const account = state.params.account
  const opa = state.property.opa
  const ais = state.property.ais
  const homestead = state.property.homestead

  if (account && opa.parcel_number !== account) {
    send('property:fetch', account)
  }

  return html`
    <div>
      <h1>${opa.location} ${opa.unit ? '#' + opa.unit : ''}</h1>
      <div>
        <h2>Owner</h2>
        ${opa.owner_1}${opa.owner_2 ? ', ' + opa.owner_2 : ''}
      </div>
      <div>
        <h2>Service areas</h2>
        <ul>
          <li>Elementary School: ${ais.properties.elementary_school}</li>
          <li>Leaf Collection: ${ais.properties.leaf_collection_area}</li>
        </ul>
      </div>
      <div>
        <h2>Homestead</h2>
        ${Object.keys(homestead).length > 0
          ? html`
            <ul>
              <li>Homestead: ${homestead.homestead_exemption > 0 ? 'Yes' : 'No'}</li>
              <li>Beginning Point: ${homestead.beginning_point}</li>
            </ul>`
          : ''}
      </div>
    </div>`
}
