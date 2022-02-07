export const createSendero = () => {
  if (document.querySelector('.create-section')) {
    console.log('create Sendero page');
    let coordinatesHtml = `<div class="locations">
      <input class="coordinates" type="text" placeholder="28.5654, -16.2962" required="">
      <input class="desc" type="text" placeholder="Mirador San Juan" required="">
    </div>`;

    document.querySelector('.add-more').addEventListener('click', () => {
      document.querySelector('.locations-container').insertAdjacentHTML('beforeend', coordinatesHtml);
    });
  }
}