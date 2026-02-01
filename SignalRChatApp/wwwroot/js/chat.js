// ============================================
// GlobalChat - SignalR Real-time Chat Client
// ============================================

// Utility: Generate random color for user avatar
function generateColor(name) {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
    "#F8B739",
    "#52B788",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// Utility: Get user initials for avatar
function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Utility: Format timestamp
function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Utility: Remove empty state message
function removeEmptyState() {
  const emptyState = document.querySelector(".empty-state");
  if (emptyState) {
    emptyState.remove();
  }
}

// ============================================
// SignalR Connection Setup
// ============================================

const connection = new signalR.HubConnectionBuilder()
  .withUrl("/chatHub")
  .withAutomaticReconnect()
  .build();

// Start connection
connection
  .start()
  .then(() => {
    console.log("✅ Connected to SignalR!");
    updateConnectionStatus(true);
  })
  .catch((err) => {
    console.error("❌ Error connecting to SignalR:", err.toString());
    updateConnectionStatus(false);
  });

// Handle reconnection
connection.onreconnecting(() => {
  console.log("🔄 Reconnecting...");
  updateConnectionStatus(false);
});

connection.onreconnected(() => {
  console.log("✅ Reconnected!");
  updateConnectionStatus(true);
});

connection.onclose(() => {
  console.log("❌ Connection closed");
  updateConnectionStatus(false);
});

// Update connection status UI
function updateConnectionStatus(isConnected) {
  const statusIndicator = document.querySelector(".status-indicator");
  const statusText = document.querySelector(".online-status span:last-child");

  if (isConnected) {
    statusIndicator.style.backgroundColor = "#4ade80";
    statusText.textContent = "Online";
  } else {
    statusIndicator.style.backgroundColor = "#ef4444";
    statusText.textContent = "Offline";
  }
}

// ============================================
// Message Handling
// ============================================

// Receive messages from server
connection.on("ReceiveMessage", function (user, message) {
  removeEmptyState();
  displayMessage(user, message);
});

// Display message in chat
function displayMessage(user, message) {
  const chatBox = document.getElementById("chatBox");
  const userColor = generateColor(user);
  const initials = getInitials(user);
  const time = formatTime();

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.innerHTML = `
    <div class="message-avatar" style="background-color: ${userColor}">
      ${initials}
    </div>
    <div class="message-content">
      <div class="message-user">${escapeHtml(user)}</div>
      <div class="message-text">${escapeHtml(message)}</div>
      <div class="message-time">${time}</div>
    </div>
  `;

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// User Input Handling
// ============================================

const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("sendButton");

// Send message on button click
sendButton.addEventListener("click", sendMessage);

// Send message on Enter key
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// Save username to localStorage
usernameInput.addEventListener("change", () => {
  const username = usernameInput.value.trim();
  if (username) {
    localStorage.setItem("chatUsername", username);
  }
});

// Load saved username
window.addEventListener("load", () => {
  const savedUsername = localStorage.getItem("chatUsername");
  if (savedUsername) {
    usernameInput.value = savedUsername;
  }
});

// Send message function
function sendMessage() {
  const user = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (!user) {
    usernameInput.focus();
    usernameInput.style.borderColor = "#ef4444";
    setTimeout(() => {
      usernameInput.style.borderColor = "#e0e0e0";
    }, 2000);
    return;
  }

  if (!message) {
    return;
  }

  // Disable button while sending
  sendButton.disabled = true;

  // Send message to server via SignalR
  connection
    .invoke("SendMessage", user, message)
    .then(() => {
      messageInput.value = "";
      messageInput.focus();
      sendButton.disabled = false;
    })
    .catch((err) => {
      console.error("Error sending message:", err.toString());
      alert("Failed to send message. Please try again.");
      sendButton.disabled = false;
    });
}

// Auto-focus message input when username is entered
usernameInput.addEventListener("input", () => {
  if (usernameInput.value.trim().length > 0) {
    messageInput.focus();
  }
});

console.log("💬 GlobalChat initialized!");
