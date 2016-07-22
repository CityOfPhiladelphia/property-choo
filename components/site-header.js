const html = require('choo/html')

module.exports = () => {
  return html`
    <header data-swiftype-index="false" id="masthead" class="site-header app" role="banner">
      <div class="row site-branding">
        <div class="small-24 columns">
          <a href="http://alpha.phila.gov/" class="logo">
            <img src="//cityofphiladelphia.github.io/patterns/images/city-of-philadelphia-white.png"
              data-interchange="[//cityofphiladelphia.github.io/patterns/images/city-of-philadelphia-mobile.png, small], [//cityofphiladelphia.github.io/patterns/images/city-of-philadelphia-white.png, medium] ">
          </a>
          <div class="page-title-container">
            <h1 data-hook="app-title" class="page-title">Property</h1>
          </div>
        </div>

        <a class="skip-link screen-reader-text" href="#content">Skip to content</a>
      </div>
      <div class="row expanded">
        <div class="columns">
          <div class="row">
            <div data-swiftype-index="false" class="large-24 columns">
              <nav>
                <ul data-hook="crumbs" class="breadcrumbs">
                  <li><a href="http://alpha.phila.gov">alpha.phila.gov</a></li>
                  <li>Property</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>`
}
