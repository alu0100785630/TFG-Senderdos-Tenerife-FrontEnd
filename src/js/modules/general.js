export const greetingFunction = ()=> {
  console.log('%cGreetings from general', 'color: blue; font-weight: bold;');
}

export const clickFunctions = () => {
  document.addEventListener('click', (e) => {
    let elementTarget = e.target;
    if (elementTarget.classList.contains('add-review')) {
      document.querySelector('.popup').classList.add('popup-visible');
      document.querySelector('.popup__review').classList.add('pop');
    }

    if (elementTarget.classList.contains('popup__review--close') || elementTarget.classList.contains('popup-visible')){
      document.querySelector('.popup__review').classList.remove('pop');
      document.querySelector('.popup').classList.remove('popup-visible');
      document.querySelector('.review-content').classList.remove('error');
      document.querySelector('.error-empty').classList.remove('show');
    }
  });

  if (document.querySelector('.review-content')) {
    document.querySelector('.review-content').addEventListener('focus', () => {
      document.querySelector('.review-content').classList.remove('error');
      document.querySelector('.error-empty').classList.remove('show');
    });
  }
}

export const senderoReviews = () => {
  if (document.querySelector('.sendero-reviews')) {

    if (document.querySelectorAll('.sendero-reviews__single-review').length > 3) {
      $('.sendero-reviews').slick({
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        prevArrow: '<i class="fas fa-chevron-left prev"></i>',
        nextArrow: '<i class="fas fa-chevron-right next"></i>',
      });
    }
    else {
      document.querySelector('.sendero-reviews').classList.add('d-flex');
    }

  }
}

export const mapRender = ()=> {
  let mapEl = document.getElementById('tfg-map');
  if (mapEl) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxkb3JkYXIiLCJhIjoiY2t5MWkxNTd1MGJ1eTJ4bWtvNDVxemJvaiJ9.kZlkZTEyQb6Vs872TT00Iw';
    const map = new mapboxgl.Map({
      container: 'tfg-map', // container ID
      style: 'mapbox://styles/aldordar/cky1dy36d0jzl14qcyhuceb3q', // style URL
      zoom: 4,
      maxZoom: 13
    });
  
    let routeLocations = JSON.parse(mapEl.dataset.locations);
  
    map.addControl(new mapboxgl.NavigationControl());
  
    const mapBounds = new mapboxgl.LngLatBounds();
  
    routeLocations.forEach(el => {
      let markerPin = document.createElement('div');
      markerPin.classList.add('marker-tfg');
  
      let coordinates = el.coordenadas.reverse();
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        el.description
      );
      
      new mapboxgl.Marker({
        element: markerPin,
        anchor: 'bottom'
      })
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map);

      mapBounds.extend(coordinates);
    });

  
  let locations = routeLocations.map((loc) => {
    return loc.coordenadas;
  });

  map.on('load', () => {
    map.addSource('route', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': locations
        }
      }
    });
    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#44a3d3',
        'line-width': 5,
        'line-opacity': 0.7
      }
    });
  });
  
  map.fitBounds(mapBounds);
  }
}