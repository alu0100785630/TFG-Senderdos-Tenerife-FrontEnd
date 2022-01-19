export const loginUser = () => {
  if (document.querySelector('.login-section')) {
    document.getElementById('email').addEventListener('focus', () => {
      document.querySelector('.login-form-wrapper').classList.remove('error');
      document.querySelector('.error-login').classList.remove('show');
    });
    document.getElementById('password').addEventListener('focus', () => {
      document.querySelector('.login-form-wrapper').classList.remove('error');
      document.querySelector('.error-login').classList.remove('show');
    });
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
            let successLogin = '<div class="success-login">Inicio de sesión satisfactorio.</div>'
            document.querySelector('.form').innerHTML = successLogin;
            window.setTimeout(() => {
              location.assign('http://localhost:6700/overview');
            }, 1000);
          }
          if(request.readyState == 4 && request.status == 400){
            console.log('Usuario o contraseña incorrectos');
            document.querySelector('.login-form-wrapper').classList.add('error');
            document.querySelector('.error-login').classList.add('show');
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
      request.send();
    });
  }
}

export const registerUser = () => {
    if (document.querySelector('.register-section')) {
      document.getElementById('r-rep-password').addEventListener('focus', () => {
        document.getElementById('r-password').classList.remove('error');
        document.getElementById('r-rep-password').classList.remove('error');
        document.querySelector('.error-register').classList.remove('show');
        document.querySelector('.register-form-wrapper').classList.remove('error');
      });
      document.getElementById('r-password').addEventListener('focus', () => {
        document.getElementById('r-password').classList.remove('error');
        document.getElementById('r-rep-password').classList.remove('error');
        document.querySelector('.error-register').classList.remove('show');
        document.querySelector('.register-form-wrapper').classList.remove('error');
      });
      document.getElementById('r-name').addEventListener('focus', () => {
        document.getElementById('r-password').classList.remove('error');
        document.getElementById('r-rep-password').classList.remove('error');
        document.querySelector('.error-register').classList.remove('show');
        document.querySelector('.register-form-wrapper').classList.remove('error');
      });
      document.getElementById('r-email').addEventListener('focus', () => {
        document.getElementById('r-password').classList.remove('error');
        document.getElementById('r-rep-password').classList.remove('error');
        document.querySelector('.error-register').classList.remove('show');
        document.querySelector('.register-form-wrapper').classList.remove('error');
      });
      document.querySelector('.register-form').addEventListener('submit', (event) => {

      event.preventDefault();

      let userName = document.getElementById('r-name').value;
      let userEmail = document.getElementById('r-email').value;
      let userPW = document.getElementById('r-password').value;
  
      if(userEmail && userPW && userName) {
        let dataObj = {
          name : userName,
          email : userEmail,
          password : userPW,
          passwordConfirm : userPW
        }
        
        if (userPW == document.getElementById('r-rep-password').value) {
          let request = new XMLHttpRequest();
          
          request.open('POST', 'http://localhost:6700/api/usuarios/registro');
          request.setRequestHeader("Content-Type", "application/json" );
    
          //For debugging
          request.onreadystatechange = () => {
            if(request.readyState == 4 && request.status == 201){
              let successRegister = '<div class="success-register">Usuario creado correctamente.</div>'
              document.querySelector('.register-form').innerHTML = successRegister;
              window.setTimeout(() => {
                location.assign('http://localhost:6700/overview');
              }, 1000);
            }
            if(request.readyState == 4 && request.status == 400){
              document.querySelector('.error-register').textContent = JSON.parse(request.responseText).message;
              document.querySelector('.register-form-wrapper').classList.add('error');
              document.querySelector('.error-register').classList.add('show');
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
          document.querySelector('.error-register').textContent = 'Las contraseñas no coinciden';
          document.querySelector('.error-register').classList.add('show');

          document.getElementById('r-password').classList.add('error');
          document.getElementById('r-rep-password').classList.add('error');
        }
      }

    });
  }
}