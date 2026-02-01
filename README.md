# 💬 GlobalChat - Real-time Messaging App

A real-time chat application built with **ASP.NET Core SignalR** backend and **vanilla JavaScript** frontend. Demonstrates WebSocket-based instant messaging with modern UI/UX.

## 📁 Project Structure

```
SignalRChatApp/
├── 🎨 Frontend (wwwroot/)
│   ├── index.html              # Main HTML page
│   ├── css/
│   │   └── styles.css          # Custom styling
│   └── js/
│       └── chat.js             # Client-side logic & SignalR connection
│
├── 🔧 Backend
│   ├── Program.cs              # Server configuration & startup
│   ├── Hubs/
│   │   └── ChatHub.cs          # SignalR Hub (message broadcasting)
│   ├── appsettings.json        # App configuration
│   └── SignalRChatApp.csproj   # Project file
│
└── ⚙️ Configuration
    └── Properties/
        └── launchSettings.json # Launch profiles & ports
```

## 🚀 How to Run

1. **Prerequisites**: .NET 10 SDK installed
2. **Start Server**:
   ```bash
   cd SignalRChatApp
   dotnet run
   ```
3. **Open Browser**: Navigate to `http://localhost:5248`
4. **Test**: Open multiple browser tabs to chat between users

## ✨ Frontend Features

### Recent Improvements:

- ✅ **Modern UI**: Gradient design with smooth animations
- ✅ **User Avatars**: Color-coded initials for each user
- ✅ **Timestamps**: Shows message time
- ✅ **Auto-reconnect**: Handles connection drops gracefully
- ✅ **Connection Status**: Visual online/offline indicator
- ✅ **Username Memory**: Saves your name in localStorage
- ✅ **Message Validation**: Prevents empty messages
- ✅ **Smooth Scrolling**: Auto-scrolls to latest message
- ✅ **Responsive Design**: Works on mobile & desktop
- ✅ **No jQuery**: Pure vanilla JavaScript

### Tech Stack (Frontend):

- HTML5
- CSS3 (Custom styling, no framework)
- Vanilla JavaScript (ES6+)
- SignalR Client Library

## 🔌 Backend Architecture

### How SignalR Works:

**Connection Flow:**

```
Browser → SignalR Client → WebSocket → Server Hub → Broadcast → All Clients
```

**Key Components:**

**ChatHub.cs** (Backend):

```csharp
public async Task SendMessage(string user, string message)
{
    // Broadcasts to ALL connected clients
    await Clients.All.SendAsync("ReceiveMessage", user, message);
}
```

**chat.js** (Frontend):

```javascript
// Call backend method
connection.invoke("SendMessage", user, message);

// Receive broadcasts
connection.on("ReceiveMessage", (user, message) => {
  displayMessage(user, message);
});
```

- **User Authentication**: Options for authenticating users and ensuring secure communication.
- **Message History**: Storing and displaying chat message history.

## Features

- **Real-Time Messaging**: Instantaneous message delivery between users.
- **Chat Rooms**: Support for creating or joining different chat rooms.
- **User Authentication and Authorization**: Secure user login and access control.
- **Message Persistence**: Saving and displaying chat history.

## Installation

1. Clone the repository: `git clone https://github.com/iAmitMohanty/signal-r-chat-app.git`
2. Navigate to the project directory.
3. Open the project in your preferred IDE or text editor.
4. Ensure you have the necessary prerequisites and .NET SDK installed on your system.
5. Configure any required settings (e.g., database connection strings, authentication methods).
6. Build and run the application.

## Usage

1. Upon running the application, access the chat application through a web browser.
2. Register or log in to the chat application, if required.
3. Explore the chat interface, create or join chat rooms, and start communicating in real-time.
4. Test the real-time messaging functionality across multiple user sessions or devices.
5. Use this project as a starting point for integrating SignalR into your real-time communication applications.

## Dependencies

- .NET SDK
- SignalR library
- Front-end framework or library for the web interface (e.g., HTML, CSS, JavaScript)

## Contributing

Contributions are welcome! Feel free to contribute by:

- Opening issues for bugs or feature requests.
- Forking the repository and creating pull requests for suggested enhancements.
- Providing feedback or suggestions for improvements.

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

## Acknowledgments

Special thanks to the SignalR community and contributors for their support, resources, and insights into real-time web functionality.
