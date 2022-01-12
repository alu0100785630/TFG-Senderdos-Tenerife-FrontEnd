export const loginUser = () => {
  if (document.querySelector('.login-section')) {
    document.querySelector('.form').addEventListener('submit', (event) => {
      event.preventDefault();
  
      let userEmail = document.getElementById('email').value;
      let userPW = document.getElementById('password').value;
  
      if(userEmail && userPW) {
        let dataObj = {
          email : userEmail,
          password : userPW
        }
        
        let request = new XMLHttpRequest();
        
        request.open('POST', 'http://localhost:6700/api/usuarios/login');
        request.setRequestHeader("Content-Type", "application/json" );
  
        //For debugging
        request.onreadystatechange = () => {
          if(request.readyState == 4 && request.status == 200){
            window.setTimeout(() => {
              location.assign('http://localhost:6700/overview');
            }, 1000);
          }
          if(request.readyState == 4 && request.status == 500){
            console.log('wrong user');
          }
        };
        request.onload = () => {
          // console.log('loading');
          // console.log(JSON.stringify(dataObj));
        };
        //La API espera un JSON, si no hacemos stringify estaremos mandando un objeto JS
        request.send(JSON.stringify(dataObj));
      }
      else {
        console.log('add validation');
      }
    });
  }
}

export const logOutUser = () => {
  if (document.querySelector('.log-out')) {
    document.querySelector('.log-out').addEventListener('click', (event) => {

      event.preventDefault();
 
      let request = new XMLHttpRequest();
      
      request.open('GET', 'http://localhost:6700/api/usuarios/logout');

      //For debugging
      request.onreadystatechange = () => {
        // console.log(request);
        if(request.readyState == 4 && request.status == 200){
          window.setTimeout(() => {
            location.assign('http://localhost:6700/login');
          }, 1000);
        }
      };
      request.onload = () => {
      };
      //La API espera un JSON, si no hacemos stringify estaremos mandando un objeto JS
      request.send();
    });
  }
}