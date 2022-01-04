export const greetingFunction = ()=> {
  console.log('%cGreetings from general', 'color: blue; font-weight: bold;');
}

export const senderoReviews = () => {
  if (document.querySelector('.sendero-reviews')) {

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
}