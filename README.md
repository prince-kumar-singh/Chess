# Chess Game

This repository contains a web-based chess game that allows two players to engage in real-time matches. The application leverages modern web technologies to provide an interactive and seamless gaming experience.

## Features

- **Real-Time Gameplay**: Utilizes Socket.IO for instantaneous communication between players.
- **Interactive UI**: Implements drag-and-drop functionality for moving pieces.
- **Responsive Design**: Ensures compatibility across various devices and screen sizes.

## Technologies Used

### Frontend:
- HTML5 and CSS3
- [EJS](https://ejs.co/) (Embedded JavaScript Templating)
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- JavaScript for client-side logic

### Backend:
- [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) framework
- [Socket.IO](https://socket.io/) for real-time communication
- [chess.js](https://github.com/jhlywa/chess.js) library for game logic

## Installation

### 1. Clone the Repository:
```bash
git clone https://github.com/prince-kumar-singh/Chess.git
cd Chess
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Start the Application:
```bash
node app.js
```
The server will start on `http://localhost:3000/`.

## Project Structure

```
Chess/
│── public/
│   ├── js/
│   │   └── chessgame.js   # Client-side game logic
│   ├── css/
│   │   └── styles.css     # Custom styles
│── views/
│   ├── index.ejs         # Main game interface
│── app.js                # Main server file
│── package.json          # Project metadata and dependencies
│── README.md             # Documentation
```

## Usage

1. **Access the Game**: Navigate to `http://localhost:3000/` in your web browser.
2. **Start Playing**: Share the URL with a friend to start a two-player game.



## Acknowledgements

- [chess.js](https://github.com/jhlywa/chess.js) for chess logic.
- [Socket.IO](https://socket.io/) for real-time communication.
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities.

---

For any questions or suggestions, feel free to open an issue or contact the repository owner.