export const addReview = () => {
  let ratingObj = {
    usuario : '',
    sendero : '',
    review : '',
    rating : ''
  }

  if (document.querySelector('.add-review')) {
    document.querySelector('.send-review').addEventListener('click', () => {

      if (document.querySelector('.review-content').value == '') {
        console.log('review cant be empty');
        document.querySelector('.review-content').classList.add('error');
        document.querySelector('.error-empty').classList.add('show');
      }
      else {
        let starNum = document.querySelector('input[name="stars"]:checked');
        let rating = (starNum != null) ? parseInt(starNum.value) : 0
        ratingObj.review = document.querySelector('.review-content').value;
        ratingObj.rating = rating;
        ratingObj.usuario = document.querySelector('.add-review').dataset.userId
        ratingObj.sendero = document.querySelector('.sendero-wrapper').dataset.senderoId

        let request = new XMLHttpRequest();
        
        request.open('POST', 'http://localhost:6700/api/reviews/');
        request.setRequestHeader("Content-Type", "application/json" );
  
        //For debugging
        request.onreadystatechange = () => {
          if(request.readyState == 4 && request.status == 200){
            setTimeout(() => {
              let successReview = '<div class="success-review">Valoración añadida correctamente</div>'
              document.querySelector('.popup__review--content').innerHTML = successReview;
            }, 300);
          }
          if(request.readyState == 4 && request.status == 404){
            setTimeout(() => {
              let errorReview = '<div class="error-review">Solo puede añadir una valoración por sendero.</div>'
              document.querySelector('.popup__review--content').innerHTML = errorReview;
            }, 300);
          }
        };
        request.send(JSON.stringify(ratingObj));

        // console.log(ratingObj);
      }
    });
  }
}