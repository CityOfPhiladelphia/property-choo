const html = require('choo/html')

const search = require('../components/search')

module.exports = (view) => (state, prev, send) => {
  return html`
    <div class="page" id="application">
      <div class="row">
        <div class="medium-16 medium-offset-4 columns">
          ${search(state, prev, send)}
        </div>
      </div>
      ${view ? html`
        <div class="row">
          <div class="medium-16 medium-offset-4 columns">
            ${view(state, prev, send)}
          </div>
        </div>` : ''}
    </div>`
}
