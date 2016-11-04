const html = require('choo/html')

module.exports = (permits) => {
  const activePermits = permits.filter((permit) => permit.status === 'ACTIVE')
  const inactivePermitCount = permits.length - activePermits.length

  return html`
    <div class="row">
      <div class="columns">
        <h2 class="alternate divide">Permits, Licenses, and Violations</h2>
        <div class="row">
          <div class="columns">
            <table role="grid" summary="Permits, licenses, and violations" class="tablesaw tablesaw-stack" data-tablesaw-mode="stack">
              <thead>
                <tr>
                  <th scope="col">Permit Number</th>
                  <th scope="col">Issue Date</th>
                  <th scope="col">Permit Type</th>
                  <th scope="col">Permit Status</th>
                </tr>
              </thead>
              <tbody>
              ${activePermits.map((permit) => html`
                <tr>
                  <td>${permit.permitnumber}</td>
                  <td>${permit.permitissuedate}</td>
                  <td>${permit.permitdescription}</td>
                  <td>${permit.status}</td>
                </tr>`)}
              ${inactivePermitCount > 0 ? html`
                <tr>
                  <td colspan="4"><i>${inactivePermitCount} inactive permits</i></td>
                </tr>` : ''}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`
}
