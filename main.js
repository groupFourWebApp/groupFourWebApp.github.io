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
      const newSize = (parseInt(currentSize) + 1.5) + 'px';
      element.style.fontSize = newSize;
    });
  });

  decreaseFontSizeBtn.addEventListener('click', function () {
    elementsWithText.forEach(function (element) {
      const currentSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
      const newSize = (parseInt(currentSize) - 1.5) + 'px';
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



// dark mode


const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');

      const darkModeOn = body.classList.contains('dark-mode');
      darkModeToggle.textContent = darkModeOn ? '🌞' : '🌚';
    });
    
    
    






const chatbotToggler = document.querySelector(".chatbot-toggler");

const closeBtn = document.querySelector(".close-btn");

const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = chatElement.querySelector("p");


    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
