const html = require('choo/html')

const siteHeader = require('../components/site-header')
const pageHeader = require('../components/page-header')
const search = require('../components/search')

module.exports = (view) => (state, prev, send) => {
  let currentBreadcrumb
  if (state.params.account) currentBreadcrumb = 'Account: ' + state.params.account
  else if (state.params.input) currentBreadcrumb = 'Search: ' + state.params.input

  return html`
    <div class="page" id="application">
      ${siteHeader(currentBreadcrumb)}
      ${pageHeader()}
      ${search(state, prev, send)}
      ${view ? view(state, prev, send) : ''}
    </div>`
}
