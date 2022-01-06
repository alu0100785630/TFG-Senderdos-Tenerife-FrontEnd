export const paginate = ()=> {

  let currentPage = 1;
  let itemsPerPage = 6;
  //Add the class that contains the item
  let itemsClass = '.senderos__items--single';
  //Container of pagination
  let pageContainer = document.querySelector('.senderos__data--query-pagination');

  let prevButton = '.page-item.prev';
  let nextButton = '.page-item.next';
  
  let pagesCount = Math.ceil(document.querySelectorAll(itemsClass).length / itemsPerPage);

  if (pageContainer) {
    const currentPageBtn = (page) => {
      if (document.querySelector('.page-item.current'))
        document.querySelector('.page-item.current').classList.remove('current');
      document.querySelectorAll('.page-item')[page].classList.add('current');
    }
  
    const pagination = (actualPage) => {
      pageContainer.innerHTML = '';
      pageContainer.insertAdjacentHTML('beforeend', '<li class="page-item prev"><i class="fas fa-chevron-left prev-page"></i></li>');
      let pagesBtns = [];
      for (let i = 1; i <= pagesCount; i++) {
          pagesBtns.push(i);
      }
      pagesBtns.forEach((el) => {
          pageContainer.insertAdjacentHTML('beforeend', `<li class="page-item"><span class="page-link">${el}</span></li>`)
      });
      pageContainer.insertAdjacentHTML('beforeend', '<li class="page-item next"><i class="fas fa-chevron-right next-page"></i></li>');
    }
  
    const showItems = (actualPage) => {
      if (actualPage === 1) {
        document.querySelector(prevButton).classList.add('disabled');
      } 
      if (actualPage === pagesCount) {
        document.querySelector(nextButton).classList.add('disabled');
      }
      
      let firstItem = (actualPage - 1) * itemsPerPage;
      let lastItem = firstItem + itemsPerPage;
  
      document.querySelectorAll(itemsClass).forEach(el => {
        el.style.display = 'none';
      });
  
  
      let itemsToShow =[...document.querySelectorAll(itemsClass)]
      itemsToShow.slice(firstItem, lastItem).forEach(el => {
        el.style.display = 'block';
      });
  
      currentPageBtn(actualPage);
    }
  
    const changePage = (num) => {
      showItems(currentPage = currentPage + num);
      currentPageBtn(currentPage);
    }
  
    const setPage = (num) => {
      showItems(currentPage = num);
      currentPageBtn(currentPage);
    }
  
  
    document.addEventListener('click',  (event) => {
      let elementTarget = event.target;
  
      if (elementTarget.classList.contains('page-link')) {
        if (document.querySelector('.page-item.disabled'))
          document.querySelector('.page-item.disabled').classList.remove('disabled');
        
        setPage(parseInt(elementTarget.textContent));
  
        if (parseInt(elementTarget.textContent) === 1) {
          document.querySelector(prevButton).classList.add('disabled');
        }
        if (parseInt(elementTarget.textContent) === pagesCount) {
          document.querySelector(nextButton).classList.add('disabled');
        }
      }
  
      if (elementTarget.classList.contains('prev-page')) {
        document.querySelector(nextButton).classList.remove('disabled');
        changePage(-1);
      }
  
      if (elementTarget.classList.contains('next-page')) {
        document.querySelector(prevButton).classList.remove('disabled');
        changePage(1);
      }
    });
  
    pagination(currentPage);
    showItems(currentPage);
  }
}