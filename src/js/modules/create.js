export const createSendero = () => {
  if (document.querySelector('.create-section')) {
    let coordinatesHtml = `<div class="locations">
      <input class="coordinates skip-validate" type="text" placeholder="28.5654, -16.2962">
      <input class="desc" type="text" placeholder="Mirador San Juan">
    </div>`;

    let formFields = {
      name : document.getElementById('name'),
      duration : document.getElementById('duration'),
      price : document.getElementById('price'),
      difficulty : document.getElementById('difficulty'),
      description : document.getElementById('description'),
      mainLocation : document.getElementById('main-location'),
      startDate : document.getElementById('start-date'),
      image : document.getElementById('image'),
    }

    let responseObjPost = {};

    removeErrorsOnFocus(formFields);
    
    document.querySelector('.add-more').addEventListener('click', () => {
      document.querySelector('.locations-container').insertAdjacentHTML('beforeend', coordinatesHtml);
    });
    
    document.querySelector('.form').addEventListener('submit', (e)=> {
      let locationsArr = Array.from(document.querySelectorAll('.locations input'));
      let executeFlag = true;
      removeErrorsOnFocus(locationsArr);
      e.preventDefault();
      if (validateEmptyAndFormat(formFields))
        executeFlag = false;
      if (validateEmptyAndFormat(locationsArr))
        executeFlag = false;

      if (executeFlag) {
        let descD = formFields.description.value.split(/\r\n|\r|\n/gi).map(el => {
          if (el == '') return;
          el = `<p>${el}</p>`;
          return el;
        });

        responseObjPost.name = formFields.name.value;
        responseObjPost.duration = formFields.duration.value;
        responseObjPost.price = formFields.price.value;
        responseObjPost.difficulty = formFields.difficulty.value;
        responseObjPost.description = descD.join('');
        responseObjPost.mainLocation = formFields.mainLocation.value;
        responseObjPost.startDate = formFields.startDate.value;
        responseObjPost.image = formFields.image.files[0].name;
        responseObjPost.routeLocations = [];

        document.querySelectorAll('.locations').forEach(location => {
          let locObj = {}

          locObj.coordenadas = location.querySelector('.coordinates').value.split(',').map( x => {
            return parseFloat(x);
          });
          locObj.description = location.querySelector('.desc').value;
          locObj.type = 'Point';
          
          responseObjPost.routeLocations.push(locObj);
        });

        console.log(responseObjPost);

        let request = new XMLHttpRequest();
        let formData = new FormData();

        formData.append('senderoImage', formFields.image.files[0])
        
        request.open('POST', 'http://localhost:6700/upload');
  
        request.onreadystatechange = () => {
          if(request.readyState == 4 && request.status != 200){
            alert('La imagen no se puede subir');
          }
        };
        request.send(formData);

        
        let dRequest = new XMLHttpRequest();

        dRequest.open('POST', 'http://localhost:6700/api/senderos');
        dRequest.setRequestHeader("Content-Type", "application/json" );

        dRequest.onreadystatechange = () => {
          // console.log(dRequest);
          if(dRequest.readyState == 4 && dRequest.status == 201){
            let successCreate = '<div class="success-create">El sendero ha sido creado correctamente.</div>'
            document.querySelector('.form').innerHTML = successCreate;
            window.setTimeout(() => {
              location.assign('http://localhost:6700/overview');
            }, 1500);
          }
          if(dRequest.readyState == 4 && dRequest.status != 201){
            alert('Ha habido un error');
          }
        };

        dRequest.send(JSON.stringify(responseObjPost));
      }

    })
  }
}

//-------- Validation functions --------------

let addErrorMessage = function(input) {
  input.classList.add('novalid');
  document.querySelector('.error-create').classList.add('show');
}


//REMOVE ERRORS WHEN THE INPUT GETS THE FOCUS
let removeErrorsOnFocus = function (inputs) {
  if (!Array.isArray(inputs)) {
    for (let input in inputs) {
      if(inputs[input] && typeof inputs[input] != 'string') {
        inputs[input].addEventListener('focus', () => {
          document.querySelector('.error-create').classList.remove('show');
          inputs[input].classList.remove('novalid');
        });
      }
    }
  }
  else {
    inputs.forEach(input => {
      if(input && typeof input != 'string') {
        input.addEventListener('focus', () => {
          document.querySelector('.error-create').classList.remove('show');
          input.classList.remove('novalid');
        });
      }
    })
  }
}



//VALIDATE EMPTY FIELDS
let validateEmptyAndFormat = function(inputs) {

  //Variable to store if the regex (input format) is correct
  let regex;
  let wrongFormat = [];
  let emptyFields = [];

  if (!Array.isArray(inputs)) {
    for (let input in inputs) {
      if (inputs[input] && typeof inputs[input] != 'string') {
        if ((inputs[input].value === '' || inputs[input].value == null || inputs[input].value == 'placeholder') 
            && !inputs[input].classList.contains('not-required')) {
          addErrorMessage(inputs[input]);
          emptyFields.push(input);
        }
        regex = validFormats(inputs[input], regex);
        if (!regex.test(inputs[input].value) && (inputs[input].value != '' && inputs[input].value != null ) 
          && !inputs[input].classList.contains('skip-validate')) {
          addErrorMessage(inputs[input]);
          wrongFormat.push(input);
        }
      }
    }
  }
  else {
    inputs.forEach(input => {
      if (input && typeof input != 'string') {
        if ((input.value === '' || input.value == null || input.value == 'placeholder')
          && !input.classList.contains('not-required')) {
          addErrorMessage(input);
          emptyFields.push(input);
        }
        regex = validFormats(input, regex);
        if (!regex.test(input.value) && (input.value != '' && input.value != null ) 
          && !input.classList.contains('skip-validate')) {
          wrongFormat.push(input);
          addErrorMessage(input);
        }
      }
    });
  }
  return (emptyFields.length > 0 || wrongFormat.length > 0 ) ? true : false;
}

let validFormats = function(input, regex) {
  switch (input.type) {
    case 'text':
      //Accept symbols @, ø, æ, etc..
      regex = /^([^0-9]*)$/;
      break;
    case 'email':
      regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      break;
    default:
      regex = /.*/;
  }
  return regex;
}