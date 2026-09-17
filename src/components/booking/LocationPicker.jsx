import { useEffect, useRef, useState, useCallback } from 'react'
import { LIVE_CITIES } from '../../data/site'
import { CITY_BOUNDARIES, getCityForPoint } from '../../data/cityBoundaries'

/**
 * An interactive Leaflet map where the customer can drop a pin to mark
 * their exact location. Supports click-to-place, GPS geolocation, and
 * reverse geocoding via Nominatim (free, no key).
 *
 * Renders the exact municipal / administrative boundary of each live city
 * (Greater Hyderabad, NCT of Delhi, BBMP Bengaluru) so the customer can
 * clearly see the serviceable territory.
 */

const MAP_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const MAP_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

/** Find the LIVE_CITIES entry for a city name, with a sensible fallback. */
function cityCoords(cityName) {
  const match = LIVE_CITIES.find((c) => c.name === cityName)
  return match ? [match.lat, match.lon] : [20.5937, 78.9629] // India center
}

export default function LocationPicker({ city, onLocationChange, initialCoords }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const leafletRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [locating, setLocating] = useState(false)
  const [locationLabel, setLocationLabel] = useState(null)
  const [outOfArea, setOutOfArea] = useState(false)
  const [hasPin, setHasPin] = useState(false)

  /**
   * Every time the pin moves, check if it falls within any live city boundary.
   */
  const handlePinUpdate = useCallback(
    (lat, lng) => {
      const matched = getCityForPoint(lat, lng)
      const isOutside = !matched
      setOutOfArea(isOutside)
      setHasPin(true)
      onLocationChange?.({ lat, lng, outOfArea: isOutside, city: matched || city })
    },
    [city, onLocationChange]
  )

  // Import Leaflet only on mount (code-split)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const L = await import('leaflet')
      await import('leaflet/dist/leaflet.css')

      // Fix Leaflet's default icon paths (broken by bundlers)
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      if (!cancelled) {
        leafletRef.current = L
        setReady(true)
      }
    })()
    return () => { cancelled = true }
  }, [])

  // Reverse-geocode a latlng to a human-readable label via Nominatim
  const reverseGeocode = useCallback(async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const data = await res.json()
      if (data.display_name) {
        const parts = data.display_name.split(', ')
        setLocationLabel(parts.slice(0, 3).join(', '))
      }
    } catch {
      // Silently ignore — the label is cosmetic
    }
  }, [])

  // Create or update the map whenever Leaflet is ready
  useEffect(() => {
    if (!ready || !containerRef.current) return
    const L = leafletRef.current

    const center = initialCoords
      ? [initialCoords.lat, initialCoords.lng]
      : cityCoords(city)
    const zoom = initialCoords ? 15 : 10

    if (!mapRef.current) {
      const map = L.map(containerRef.current, {
        center,
        zoom,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
      })
      L.control.zoom({ position: 'bottomright' }).addTo(map)
      L.tileLayer(MAP_TILE, { attribution: MAP_ATTR, maxZoom: 19 }).addTo(map)

      // Add official city boundary polygons for all live cities
      Object.entries(CITY_BOUNDARIES).forEach(([cityName, geom]) => {
        if (cityName === 'Bengaluru') return
        L.geoJSON(geom, {
          style: {
            color: '#008766',
            weight: 2.5,
            dashArray: '5, 5',
            fillColor: '#00a37a',
            fillOpacity: 0.1,
          },
          interactive: false,
        }).addTo(map)
      })

      // If no initialCoords, fit the map view to the selected city's exact boundary
      if (!initialCoords && CITY_BOUNDARIES[city]) {
        const bounds = L.geoJSON(CITY_BOUNDARIES[city]).getBounds()
        map.fitBounds(bounds, { padding: [15, 15] })
      }

      // Place initial marker if we have coords
      if (initialCoords) {
        markerRef.current = L.marker([initialCoords.lat, initialCoords.lng], {
          draggable: true,
        }).addTo(map)

        markerRef.current.on('dragend', () => {
          const pos = markerRef.current.getLatLng()
          handlePinUpdate(pos.lat, pos.lng)
          reverseGeocode(pos.lat, pos.lng)
        })
        handlePinUpdate(initialCoords.lat, initialCoords.lng)
        reverseGeocode(initialCoords.lat, initialCoords.lng)
      }

      // Click to place / move marker
      map.on('click', (e) => {
        const { lat, lng } = e.latlng
        if (map.getZoom() < 13) {
          map.setView(e.latlng, 14, { animate: true })
        }
        if (markerRef.current) {
          markerRef.current.setLatLng(e.latlng)
        } else {
          markerRef.current = L.marker(e.latlng, { draggable: true }).addTo(map)
          markerRef.current.on('dragend', () => {
            const pos = markerRef.current.getLatLng()
            handlePinUpdate(pos.lat, pos.lng)
            reverseGeocode(pos.lat, pos.lng)
          })
        }
        handlePinUpdate(lat, lng)
        reverseGeocode(lat, lng)
      })

      mapRef.current = map
      setTimeout(() => map.invalidateSize(), 300)
    }

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  // Fit map to city boundary when the city dropdown changes
  useEffect(() => {
    if (!mapRef.current || !ready) return
    const L = leafletRef.current
    if (L && CITY_BOUNDARIES[city]) {
      const bounds = L.geoJSON(CITY_BOUNDARIES[city]).getBounds()
      mapRef.current.fitBounds(bounds, { padding: [15, 15], animate: true })
    } else {
      const center = cityCoords(city)
      mapRef.current.setView(center, 11, { animate: true })
    }
  }, [city, ready])

  // GPS geolocation
  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation || !mapRef.current || !ready) return
    const L = leafletRef.current
    setLocating(true)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        mapRef.current.setView([lat, lng], 16, { animate: true })

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng])
        } else {
          markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(mapRef.current)
          markerRef.current.on('dragend', () => {
            const p = markerRef.current.getLatLng()
            handlePinUpdate(p.lat, p.lng)
            reverseGeocode(p.lat, p.lng)
          })
        }
        handlePinUpdate(lat, lng)
        reverseGeocode(lat, lng)
        setLocating(false)
      },
      () => {
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [ready, handlePinUpdate, reverseGeocode])

  const liveCityNames = LIVE_CITIES.map((c) => c.name).join(', ')

  return (
    <div className={`location-picker${outOfArea ? ' location-picker--error' : ''}`}>
      <div className="location-picker__header">
        <div className="location-picker__title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>Pin your location</span>
        </div>
        <button
          type="button"
          onClick={handleLocateMe}
          disabled={locating || !ready}
          className="location-picker__gps-btn"
        >
          {locating ? (
            <span className="location-picker__spinner" aria-hidden="true" />
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
              <circle cx="12" cy="12" r="8" strokeDasharray="2 3"/>
            </svg>
          )}
          {locating ? 'Locating…' : 'Use my location'}
        </button>
      </div>

      <div className="location-picker__map-wrap">
        {!ready && (
          <div className="location-picker__loading">
            <span className="location-picker__spinner location-picker__spinner--lg" />
            <span>Loading map…</span>
          </div>
        )}
        <div
          ref={containerRef}
          className="location-picker__map"
          style={{ opacity: ready ? 1 : 0 }}
        />
        {ready && (
          <div className="location-picker__zone-badge">
            <span className="location-picker__zone-dot" aria-hidden="true" />
            <span>{city} service boundary</span>
          </div>
        )}
        {!hasPin && ready && (
          <div className="location-picker__hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            Tap on the map to drop a pin
          </div>
        )}
      </div>

      {/* Out-of-area warning */}
      {outOfArea && (
        <div className="location-picker__out-of-area" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <div>
            <p className="location-picker__out-of-area-title">We're not in this area yet</p>
            <p className="location-picker__out-of-area-body">
              Kaaryo is currently live in <strong>{liveCityNames}</strong>.
              Please pin a location within one of these cities to book a service.
            </p>
          </div>
        </div>
      )}

      {/* Geocoded label — only shown when the pin is in a valid area */}
      {locationLabel && !outOfArea && (
        <div className="location-picker__label">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {locationLabel}
        </div>
      )}
    </div>
  )
}
