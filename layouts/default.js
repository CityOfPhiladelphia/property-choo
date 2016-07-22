const html = require('choo/html')

const siteHeader = require('../components/site-header')
const pageHeader = require('../components/page-header')
const search = require('../components/search')

module.exports = (view) => (state, prev, send) => {
  return html`
    <div class="page" id="application">
      ${siteHeader()}
      ${pageHeader()}
      ${search(state, prev, send)}
      ${view ? view(state, prev, send) : ''}
    </div>`
}
