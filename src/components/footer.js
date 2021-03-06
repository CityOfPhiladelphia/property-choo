const html = require('choo/html')

module.exports = () => {
  return html`
    <footer data-swiftype-index='false' class="site-footer">
      <section class="fat">
        <div class="row">
          <div class="large-8 columns">
            <h1>Government</h1>
            <nav>
              <ul>
                <li><a href="http://alpha.phila.gov">alpha.phila.gov</a></li>
                <li><a href="http://alpha.phila.gov/departments">City Government Directory</a></li>
                <li><a href="http://www.phila.gov/mayor">Mayor's Office</a></li>
                <li><a href="http://iframe.publicstuff.com/#?client_id=242">Report an Issue / 311</a></li>
                <li><a href="http://cityofphiladelphia.wordpress.com/">News</a></li>
              </ul>
            </nav>
          </div>
          <div class="large-16 columns">
            <h1>Browse alpha.phila.gov</h1>
            <nav>
              <ul class="columns-2">
                <li><a href="http://alpha.phila.gov/browse/health">Health</a></li>
                <li><a href="http://alpha.phila.gov/browse/legal">Legal</a></li>
                <li><a href="http://alpha.phila.gov/browse/payments-and-taxes">Payments and Taxes</a></li>
                <li><a href="http://alpha.phila.gov/browse/permits-licenses">Permits and Licenses</a></li>
                <li><a href="http://alpha.phila.gov/browse/property-housing">Property and Housing</a></li>
                <li><a href="http://alpha.phila.gov/browse/public-safety">Public Safety</a></li>
                <li><a href="http://alpha.phila.gov/browse/streets-and-utilities">Streets and Utilities</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div class="row classic center">
        <div class="columns">
          <nav>
            <ul class="inline-list">
              <li><a href="http://alpha.phila.gov/terms-of-use">Terms of use</a></li>
              <li><a href="http://www.phila.gov/privacy/pdfs/FinalCityOpenRecords.pdf">Right to know (pdf)</a></li>
              <li><a href="http://alpha.phila.gov/privacypolicy">Privacy Policy</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>`
}
