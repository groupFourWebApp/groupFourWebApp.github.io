/* Hamburger nav bar */

 document.addEventListener('DOMContentLoaded', function () {
  const hamMenu = document.querySelector('.ham-menu');
  const offScreenMenu = document.getElementById('off-screen-menu');
  const closeIcon = document.querySelector('.close-icon');

hamMenu.addEventListener('click', function () {
  this.classList.toggle('open');
  offScreenMenu.style.right = offScreenMenu.style.right === '0px' ? '-250px' : '0px';
  });

closeIcon.addEventListener('click', function () {
  hamMenu.classList.remove('open');
  offScreenMenu.style.right = '-300px';
  });
 });


/* Font changer */


document.addEventListener('DOMContentLoaded', function () {

  const increaseFontSizeBtn = document.getElementById('increaseFontSizeBtn');
  const decreaseFontSizeBtn = document.getElementById('decreaseFontSizeBtn');
  const elementsWithText = document.querySelectorAll('*:not(script):not(style):not(br):not(hr):not(button):not(input):not(select):not(textarea)');

  increaseFontSizeBtn.addEventListener('click', function () {
    elementsWithText.forEach(function (element) {
      const currentSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
      const newSize = (parseInt(currentSize) + 2) + 'px';
      element.style.fontSize = newSize;
    });
  });

  decreaseFontSizeBtn.addEventListener('click', function () {
    elementsWithText.forEach(function (element) {
      const currentSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
      const newSize = (parseInt(currentSize) - 2) + 'px';
      element.style.fontSize = newSize;
    });
  });
});




/* Log In Feature */


document.addEventListener('DOMContentLoaded', function () {

  const loginToggleBtn = document.getElementById('loginToggleBtn');
  const loginModal = document.getElementById('loginModal');
  const submitLoginBtn = document.getElementById('submitLoginBtn');
  const loggedInUser = document.getElementById('loggedInUser');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  loginToggleBtn.addEventListener('click', function () {
    loginModal.style.display = 'block';
  });

  submitLoginBtn.addEventListener('click', function () {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    loggedInUser.innerText = ` ${username}`;
    loggedInUser.style.display = 'block';


    console.log('Password:', password);


    loginModal.style.display = 'none';


    loginToggleBtn.style.display = 'none';
  });


  modalCloseBtn.addEventListener('click', function () {
    loginModal.style.display = 'none';
  });
});






const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');

      const darkModeOn = body.classList.contains('dark-mode');
      darkModeToggle.textContent = darkModeOn ? '🌞' : '🌚';
    });
    
    
    
