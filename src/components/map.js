/**
 * Known issue: Memoized elements trigger onload on every render
 * This results in the map being re-initialized every time the state changes
 * See: https://github.com/shama/on-load/issues/10
 */
const html = require('choo/html')
const L = require('leaflet')
const isEqual = require('lodash/isequal')
const esri = require('esri-leaflet')
L.Icon.Default.imagePath = '/images' // is there a better solution?

const config = require('../config')

const cache = {
  coords: null,
  map: null,
  el: null
}
module.exports = (coords) => {
  if (coords) {
    // If new coords or el hasn't been created already, create one
    // otherwise, cached el will be returned
    if (!isEqual(coords, cache.coords) || !cache.el) {
      cache.coords = coords
      if (cache.map) cache.map.remove()
      cache.el = html`<div class="map" id="map" onload=${onload} onunload=${onunload}></div>`
    }
    return cache.el
  } else {
    return html`<div class="map"></div>`
  }

  function onload (el) {
    cache.map = initMap('map', coords)
  }

  function onunload (el) {
    // When page changes, remove event listeners and clear cache
    if (cache.map) cache.map.remove()
    cache.coords = null
    cache.map = null
  }
}

function initMap (el, coords) {
  const map = L.map(el).setView(coords, 18)
  esri.tiledMapLayer({
    url: config.basemap,
    minZoom: 12,
    maxZoom: 20
  }).addTo(map)
  L.marker(coords).addTo(map)
  return map
}
