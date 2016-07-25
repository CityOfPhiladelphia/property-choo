const choo = require('choo')

const layout = require('./layouts/default')
const resultsPage = require('./pages/results')
const propertyPage = require('./pages/property')

const app = choo()

app.model(require('./models/results'))
app.model(require('./models/property'))

app.router((route) => [
  route('/', layout()),
  route('/account/:account', layout(propertyPage)),
  route('/:type/:input', layout(resultsPage))
])

const tree = app.start({ hash: true })
document.body.appendChild(tree)
