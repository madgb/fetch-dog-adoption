# Dog Adoption Platform

## 📌 Introduction
This is a **Dog Adoption Platform** where users can search for dogs, add them to favorites, and find their best match. The project is built using **React** and interacts with the provided API to fetch dog data and handle user interactions.

## 🚀 Getting Started

### 🌍 Live Demo
The application is live at: [Find My Match! Dog](https://find-my-favorite-dog-c9957c06b52b.herokuapp.com/)

### ⚡ Development Note
This project uses Tailwind CSS CDN for styling to simplify setup and development.

### **1️⃣ Prerequisites**
- Node.js **21.6.0** (Recommended)
- npm (Comes with Node.js)

### **2️⃣ Installation**
Clone the repository and install dependencies:
```sh
npm install
```

### **3️⃣ Run the Project**
Start the development server:
```sh
npm start
```

The application will be available at `http://localhost:3000`.

## 📌 Features
- **🔍 Search Dogs**: Users can filter dogs by breed, location, and age.
- **⭐ Favorites**: Users can add dogs to favorites and view them on a separate page.
- **🔄 Persistent Data**: Favorite selections are stored in localStorage.
- **💑 Match Feature**: Find the best dog match based on selected favorites.

## 📌 Project Structure
```
├── src
│   ├── components
│   ├── pages
│   ├── subModules
│   ├── atoms
│   ├── styles
│   ├── App.js
│   ├── index.js
│
├── public
├── package.json
├── README.md
```

## 📌 API Endpoints Used
- `POST /auth/login` - Authenticate users.
- `GET /dogs/breeds` - Fetch list of breeds.
- `GET /dogs/search` - Fetch list of dogs with filters.
- `POST /dogs` - Fetch detailed information of selected dogs.
- `POST /dogs/match` - Find a single match from selected favorites.

## 📌 Notes
- This project was developed and tested using **Node.js v21.6.0**.
- Ensure you are running the correct Node.js version for best compatibility.

---
🚀 **Happy Adopting!**