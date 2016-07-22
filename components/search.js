const html = require('choo/html')
const getFormData = require('get-form-data')

module.exports = (state, prev, send) => {
  return html`
    <div class="row">
      <div class="medium-8 columns">
        <form onsubmit=${onsubmit}>
          <label for="address">Address</label>
          <input type="text" id="address" placeholder="ex. 1234 Market St">
        </form>
      </div>
      <div class="medium-8 columns">
        <form onsubmit=${onsubmit}>
          <label for="block">Block</label>
          <input type="text" id="block" placeholder="ex. 1200 Market St">
        </form>
      </div>
      <div class="medium-8 columns">
        <form onsubmit=${onsubmit}>
          <label for="owner">Owner</label>
          <input type="text" id="owner" placeholder="ex. Benjamin Franklin">
        </form>
      </div>
    </div>`

  function onsubmit (e) {
    const formData = getFormData(e.target)
    let path
    if (formData.address) path = '/address/' + formData.address
    else if (formData.block) path = '/block/' + formData.block
    else if (formData.owner) path = '/owner/' + formData.owner
    window.location.hash = path
    e.preventDefault()
  }
}
