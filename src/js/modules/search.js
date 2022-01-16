import { senderoRender } from './senderoRender';

export const dynamicSearch = () => {
  if (document.querySelector('.senderos__data--query-search')) {
    let senderosContainer = document.querySelector('.senderos-main-wrapper__items');
    let myPagination = document.querySelector('.senderos__data--query-pagination');
    let spinnerWrap = document.querySelector('.spinner-container');
    document.getElementById('sendero-search').addEventListener('keyup', function() {
      if (this.value.length > 2)
        spinnerWrap.classList.add('show');
      else
        spinnerWrap.classList.remove('show');

      setTimeout(()=> {
        if (this.value.length > 2) {
          let request = new XMLHttpRequest();
        
          request.open('GET', `http://localhost:6700/api/senderos?regex=${this.value}`);
    
          request.onreadystatechange = () => {
            if(request.readyState == 4 && request.status == 200){
              senderosContainer.innerHTML = '';
              spinnerWrap.classList.remove('show');
            }
          };
          request.onload = () => {
            let senderosData = JSON.parse(request.responseText);
            if (senderosData.amount > 0) {
              myPagination.style.display = 'flex';
              senderoRender(senderosData.data.senderos, senderosContainer);
            }
            else {
              myPagination.style.display = 'none';
              let noResultsHtml = `<div class="no-results">No existen resultados que coincidan con la búsqueda "<span>${this.value}</span>"</div>`;
              senderosContainer.insertAdjacentHTML('beforeend', noResultsHtml);
            }
          };
          request.send();
        }
        else if (this.value == '') {
          //Cuando el valor del input está vacío hacemos la request a todos los senderos
          let request = new XMLHttpRequest();
        
          request.open('GET', `http://localhost:6700/api/senderos/`);
    
          request.onreadystatechange = () => {
            if(request.readyState == 4 && request.status == 200){
              senderosContainer.innerHTML = '';
              spinnerWrap.classList.remove('show');
            }
          };
          request.onload = () => {
            myPagination.style.display = 'flex';
            let senderosData = JSON.parse(request.responseText);
            senderoRender(senderosData.data.senderos, senderosContainer);
          };
          request.send();
        }
      }, 800);
    })
  }
}