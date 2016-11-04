/**
 * Known issue: Memoized elements trigger onload on every render
 * This results in the map being re-initialized every time the state changes
 * See: https://github.com/shama/on-load/issues/10
 */
const html = require('choo/html')
const L = require('leaflet')
const esri = require('esri-leaflet')
L.Icon.Default.imagePath = '/images' // is there a better solution?

const config = require('../config')

module.exports = (handleUpdates) => {
  let coords, map

  console.log('map component called')

  handleUpdates(onUpdate)

  return html`<div class="map" id="map" onload=${onload} onunload=${onunload}></div>`

  function onUpdate (newCoords) {
    console.log('onUpdate called', newCoords)
    coords = newCoords
    if (map) map.setView(coords, 18)
  }

  function onload (el) {
    console.log('onload called', coords)
    map = initMap('map', coords)
  }

  function onunload (el) {
    // When page changes, remove event listeners and clear cache
    if (map) map.remove()
    map = null
  }
}

function initMap (el, coords) {
  console.log('initialising map', coords)
  const map = L.map(el).setView(coords, 18)
  esri.tiledMapLayer({
    url: config.basemap,
    minZoom: 12,
    maxZoom: 20
  }).addTo(map)
  L.marker(coords).addTo(map)
  return map
}
