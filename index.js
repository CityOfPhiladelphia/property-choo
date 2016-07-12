const choo = require('choo')
const html = require('choo/html')

const searchView = require('./views/search')
const resultsView = require('./views/results')
const propertyView = require('./views/property')

const app = choo()

app.model(require('./models/results'))
app.model(require('./models/property'))

const layout = (view) => (state, prev, send) => {
  return html`
    <div class="page" id="application">
      <div class="row">
        <div class="medium-16 medium-offset-4 columns">
          ${searchView(state, prev, send)}
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

app.router((route) => [
  route('/', layout()),
  route('/address/:address', layout(resultsView)),
  route('/account/:account', layout(propertyView))
])

const tree = app.start({ hash: true })
document.body.appendChild(tree)
