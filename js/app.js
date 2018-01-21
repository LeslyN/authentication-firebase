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
    var btnEnter = document.getElementById('btn-enter');

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
    });
  });

  // Función observador de inicio de sesión
  function watcher() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        elementSeen();
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        console.log(email);
        console.log(user);

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
  function elementSeen() {
    var elementSeen = document.getElementById('see');
    elementSeen.innerHTML = `
    <p>Bienvenido!</p>
    <button id="btn-close">Cerrar Sesión</button>
    `;
    // elementSeen.innerHTML = '<div class="mt-3">Esto es parte de la sesion del usuario</div>';
    // elementSeen.innerHTML = 'Solo lo puede ver usuario activo';
    close();
  }

  function close() {
    var btnClose = document.getElementById('btn-close');
    firebase.auth().signOut()
      .then(function() {
        console.log('Saliendo ...');
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});
