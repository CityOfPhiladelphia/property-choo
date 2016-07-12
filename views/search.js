const html = require('choo/html')
const getFormData = require('get-form-data')

module.exports = (state, prev, send) => {
  return html`
    <form onsubmit=${onsubmit}>
      <label for="address">Address</label>
      <input type="text" id="address" placeholder="ex. 1234 Market St">
    </form>`

  function onsubmit (e) {
    const formData = getFormData(e.target)
    if (formData.address) window.location.hash = '/address/' + formData.address
    e.preventDefault()
  }
}
