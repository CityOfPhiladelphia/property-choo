const html = require('choo/html')

module.exports = (ais) => {
  const props = ais.properties

  return html`
    <div class="row">
      <div class="columns">
        <h2 class="alternate divide">Trash & Recycling</h2>
        <div class="panel sales mbm">
          <div class="row">
            <div class="medium-12 columns">
              <h4 class="alternate">Trash & Recycling Day</h4>
              <strong class="stat no-margin">${props.rubbish_recycle_day}</strong>
            </div>
            <div class="medium-12 columns">
              <h4 class="alternate">Leaf Collection</h4>
              <strong data-hook="leaf-collection">${props.leaf_collection_area}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>`
}
