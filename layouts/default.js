const html = require('choo/html')

const search = require('../components/search')

module.exports = (view) => (state, prev, send) => {
  return html`
    <div class="page" id="application">
      <div class="row">
        <div class="medium-24 columns">
          ${search(state, prev, send)}
        </div>
      </div>
      ${view ? view(state, prev, send) : ''}
    </div>`
}
