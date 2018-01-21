// /* VERSIÓN 1 */
// $(document).ready(function() {

// });


// /* VERSIÓN 2 */
// function begin() {

// }
// $(document).ready(begin);
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCdifpapIhjbcp5x0NiUvbJHpWxak5uq6Y',
  authDomain: 'proyect-authentication.firebaseapp.com',
  databaseURL: 'https://proyect-authentication.firebaseio.com',
  projectId: 'proyect-authentication',
  storageBucket: 'proyect-authentication.appspot.com',
  messagingSenderId: '271694851319'
};
firebase.initializeApp(config);

window.addEventListener('load', function() {
  var btnSend = document.getElementById('btn-send');
  var btnEnter = document.getElementById('btn-enter');
  
  btnSend.addEventListener('click', function() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
        authenticationUser();
      })  
    
      .catch(function(error) {
      // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

      // ...
      });
  });

  btnEnter.addEventListener('click', function() {
    var enterEmail = document.getElementById('enter-email').value;
    var enterPassword = document.getElementById('enter-password').value;

    // console.log(enterEmail);
    // console.log(enterPassword);
      
    // Inicia sesión
    firebase.auth().signInWithEmailAndPassword(enterEmail, enterPassword)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
    console.log('Accediste');
  });
  
  // Función observador de inicio de sesión
  function watcher() {
    firebase.auth().onAuthStateChanged(function(user) {
      // El user pasará en elementUser
      if (user) {
        elementSeen(user);
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        // console.log(email);
        // console.log(user);
        console.log('***************');
        console.log(user.emailVerified);
        console.log('***************');
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
        console.log('Existe usuario activo');
      } else {
        // User is signed out.
        console.log('No existe usuario activo');
        // ...
      }
    });
  }
  watcher();

  // Función de lo que verá el usuario activo 
  function elementSeen(user) {
    var user = user;
    var elementSeen = document.getElementById('content');
    if (user.emailVerified) {
      elementSeen.innerHTML = `
      <p>Bienvenido!</p>
      <button id="btn-close">Cerrar Sesión</button>
      `;
      // elementSeen.innerHTML = '<div class="mt-3">Esto es parte de la sesion del usuario</div>';
      // elementSeen.innerHTML = 'Solo lo puede ver usuario activo';
      close();
    } else {
      console.log('cuenta no verificada');
    }
  }

  function close() {
    var btnClose = document.getElementById('btn-close');
    btnClose.addEventListener('click', function() {
      firebase.auth().signOut()
        .then(function() {
          console.log('Saliendo ...');
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  function authenticationUser() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log('Enviando correo...');
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  }
});
