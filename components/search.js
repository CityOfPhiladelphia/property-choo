const html = require('choo/html')
const getFormData = require('get-form-data')

module.exports = (state, prev, send) => {
  const selectedForm = state.results.selectedForm || state.params.type || 'address'

  return html`
    <div class="row column">
      <div class="row">
        <div class="small-6 columns">
          <a href="#" class="search-tab ${selectedForm === 'address' ? 'active' : ''}" onclick=${select('address')}>
            <span class="search-tab-icon"><i class="fa fa-home"></i></span>
            <span class="search-tab-label">Address</span>
          </a>
        </div>
        <div class="small-6 columns">
          <a href="#" class="search-tab ${selectedForm === 'block' ? 'active' : ''}" onclick=${select('block')}>
            <span class="search-tab-icon"><i class="fa fa-road"></i></span>
            <span class="search-tab-label">Block</span>
          </a>
        </div>
        <div class="small-6 columns">
          <a href="#" class="search-tab ${selectedForm === 'owner' ? 'active' : ''}" onclick=${select('owner')}>
            <span class="search-tab-icon"><i class="fa fa-user"></i></span>
            <span class="search-tab-label">Owner</span>
          </a>
        </div>
        <div class="small-6 columns">
          <a href="#" class="search-tab ${selectedForm === 'account' ? 'active' : ''}" onclick=${select('account')}>
            <span class="search-tab-icon"><i class="fa fa-credit-card"></i></span>
            <span class="search-tab-label">Account</span>
          </a>
        </div>
      </div>
      <div class="row">
        <div class="medium-24 columns">
          <div class="search-area">${createForm(selectedForm)}</div>
        </div>
      </div>
    </div>`

  function select (type) {
    return function (e) {
      send('results:setSelectedForm', type)
      e.preventDefault()
    }
  }
}

function createForm (type) {
  switch (type) {
    case 'address':
      return html`
        <form onsubmit=${onsubmit} class="search">
          <input type="text" id="address" placeholder="ex. 1234 Market St">
          <input type="submit">
        </form>`
    case 'block':
      return html`
        <form onsubmit=${onsubmit} class="search">
          <input type="text" id="block" placeholder="ex. 1200 Market St">
        </form>`
    case 'owner':
      return html`
        <form onsubmit=${onsubmit} class="search">
          <input type="text" id="owner" placeholder="ex. Benjamin Franklin">
        </form>`
    case 'account':
      return html`
        <form onsubmit=${onsubmit} class="search">
          <input type="text" id="account" placeholder="ex. 883309000">
        </form>`
  }

  function onsubmit (e) {
    const formData = getFormData(e.target)
    let path
    if (formData.address) path = '/address/' + formData.address
    else if (formData.block) path = '/block/' + formData.block
    else if (formData.owner) path = '/owner/' + formData.owner
    else if (formData.account) path = '/account/' + formData.account
    window.location.hash = path
    e.preventDefault()
  }
}
