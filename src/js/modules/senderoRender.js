import { paginate } from './pagination';

export const senderoRender = (sArray, contAppend) => {
  sArray.forEach((sendero) => {
    let startsRating = '';
    let rating = '';
    if (sendero.gradeQuantity != 0) {
      startsRating = `${(sendero.gradeAverage / 5) * 100}%`
      rating = sendero.gradeAverage
    }
    else {
      startsRating = '0%'
      rating = '---'
    }
  
    let senderoDate = new Date(sendero.startDate)
    let monthsES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    let dif = '';
  
    if (sendero.difficulty == 'dificil')
      dif = 'Difícil';
    if (sendero.difficulty == 'medio')
      dif = 'Medio';
    if (sendero.difficulty == 'facil')
      dif = 'Fácil';
    
    let resultHtml = `
      <div class="senderos-main-wrapper__items--single">
        <div class="sendero-container">
          <img class="sendero-img" src="http://localhost:6700/img/senderos/${sendero.image}" alt="${sendero.name} Image">
          <div class="sendero-data">
            <div class="sendero-data__title">
              <h3 class="sendero-data__title--name">${sendero.name}</h3>
              <span class="sendero-data__title--dificultad ${sendero.difficulty}">${dif}</span>
            </div>
            <div class="sendero-data__info">
              <div class="sendero-data__info--rating">
                <div class="reviews-avg">
                  <div class="empty-stars"></div>
                  <div class="full-stars" style="width: ${startsRating}"></div>
                </div>
                <div class="reviews-avg-n">${rating}</div>
              </div>
              <div class="sendero-data__info--price">${sendero.price}€</div>
            </div>
            <div class="sendero-data__location">${sendero.mainLocation}</div>
            <div class="sendero-data__date">
              <div class="sendero-data__date--date">${senderoDate.getDate()} de ${monthsES[senderoDate.getMonth()]} de ${senderoDate.getFullYear()}</div>
              <div class="sendero-data__date--duration">${sendero.duration}h</div>
            </div>
            <div class="sendero-data__book"><a class="info-button ov-button" href="/sendero/${sendero.slug}">Info</a>
              <div class="book-button ov-button">Reserva</div>
            </div>
          </div>
        </div>
      </div>`;
      
    contAppend.insertAdjacentHTML('beforeend', resultHtml);
  });

  paginate();
}
