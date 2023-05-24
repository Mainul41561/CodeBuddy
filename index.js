
const font = new FontFace('DMSans', 'url(/fonts/DMSans-Regular.ttf)');
const serverUrl = 'http://localhost:3000';

font.load().then(() => {
  document.fonts.add(font);
  startApp();
}).catch((error) => {
  console.error('Error loading font:', error);
});

function startApp() {
  function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") {
      return;
    }

    displayMessage(userInput, "user");

    // Send user message to the server
    fetch(serverUrl + "/get-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    })
      .then((response) => response.text())
      .then((data) => {
        displayMessage(data, "chatbot");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    document.getElementById("user-input").value = "";
  }

  function displayMessage(message, sender) {
    const chatbox = document.getElementById("chatbox");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message", sender);

    const messageText = document.createElement("p");
    messageText.textContent = message;

    messageContainer.appendChild(messageText);
    chatbox.appendChild(messageContainer);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  document.getElementById("user-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });
}


