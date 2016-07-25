const html = require('choo/html')
const getFormData = require('get-form-data')

module.exports = (state, prev, send) => {
  const selectedForm = state.results.selectedForm || state.params.type || 'address'

  return html`
    <div class="row column">
      <div class="row">
        <div class="small-6 columns">
          ${createTab('address', 'Address', 'fa-home')}
        </div>
        <div class="small-6 columns">
          ${createTab('block', 'Block', 'fa-road')}
        </div>
        <div class="small-6 columns">
          ${createTab('owner', 'Owner', 'fa-user')}
        </div>
        <div class="small-6 columns">
          ${createTab('account', 'Account', 'fa-credit-card')}
        </div>
      </div>
      <div class="row column">
        <div class="search-area">${createForm(selectedForm)}</div>
      </div>
    </div>`

  function createTab (type, label, icon) {
    return html`
      <a href="#" class="search-tab ${selectedForm === type ? 'active' : ''}" onclick=${onclick}>
        <span class="search-tab-icon"><i class="fa ${icon}"></i></span>
        <span class="search-tab-label">${label}</span>
      </a>`

    function onclick (e) {
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
