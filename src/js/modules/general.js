export const greetingFunction = ()=> {
  console.log('%cGreetings from general', 'color: blue; font-weight: bold;');
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
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWxkb3JkYXIiLCJhIjoiY2t5MWRuOXYxMGFrdDJ1bzY5ZDlqcng5bCJ9.bx4weBBXgUG6lL_HI2WRPA';
  const map = new mapboxgl.Map({
    container: 'tfg-map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
}