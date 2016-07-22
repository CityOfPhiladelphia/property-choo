const choo = require('choo')

const layout = require('./layouts/default')
const pages = {
  results: require('./pages/results'),
  property: require('./pages/property')
}

const app = choo()

app.model(require('./models/results'))
app.model(require('./models/property'))

app.router((route) => [
  route('/', layout()),
  route('/address/:input', layout(pages.results('address'))),
  route('/block/:input', layout(pages.results('block'))),
  route('/owner/:input', layout(pages.results('owner'))),
  route('/account/:account', layout(pages.property))
])

const tree = app.start({ hash: true })
document.body.appendChild(tree)
