# 🎬 BingeBox

**BingeBox** is a personal project to showcase my skills as a frontend developer. It provides a sleek and interactive platform to explore trending movies and TV shows, search for titles, mark favorites, and get detailed information. With AI integration, BingeBox also offers **personalized recommendations** based on your favorite content.

🌐 **Live Demo**: [BingeBox](https://zhouw9n.github.io/BingeBox/)

> ⚠️ **Note**: The backend server is hosted on Render’s free tier and may take **30–60 seconds to spin up** if inactive. Thank you for your patience!

---

> ## ✨ Features

- Displays trending movies and TV shows
- Shows upcoming movie releases
- Provides personalized recommendations based on favorites
- Allows browsing content by genre (Movies & TV Shows)
- Saves and views favorites (stored in `localStorage`)
- Enables search for movies and TV shows by title
- Shows detailed information for each movie/show
- Features a sleek and modern UI
- Fully responsive across all major devices and screen sizes
- Handles errors and provides proper UI states (e.g., error messages, loading animations)

---

> ## 🤖 AI Integration

BingeBox uses **Datastax AstraDB**'s vector capabilities to provide **personalized recommendations**:

- The last **5 favorite** movies/TV shows are used to build a sample query string.
- Each description is truncated to **100 characters** and combined into a single query (max 512 characters).
- This query is **vectorized** via AstraDB's API.
- The database (based on ~18,000 scraped titles from TMDB) returns results using **cosine similarity** for recommendation.

---

> ## 🛠️ Tech Stack

This project emphasizes reusable components and a clean UI using React and TailwindCSS.

### Frontend

- JavaScript / HTML / CSS
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

### Backend

The backend is a lightweight server handling API requests securely, including API key management.

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- Hosted on: [Render](https://render.com/)
- Vector DB: [DataStax AstraDB](https://www.datastax.com/astra)

### APIs Used

- [TMDB API](https://www.themoviedb.org/documentation/api) - for movie and TV show data
- [AstraDB Vector Search API](https://docs.datastax.com/en/astra/) - for vector search

---

> ## 📁 Project Structure

![Capture](https://github.com/user-attachments/assets/b90a4766-81fd-4311-b356-08bdb61df1d4)

---

> ## 📸 Screenshots

### Home Page

![Capture](https://github.com/user-attachments/assets/62d42f34-6a03-4ce2-8e25-0ec4774d2aa6)

### Movies Page

![Capture](https://github.com/user-attachments/assets/ac3dd538-7b51-4f4a-804c-1a9cf609e296)

### Shows Page

![Capture](https://github.com/user-attachments/assets/4e474a3e-16ea-4d88-b4b8-d2c4fc379778)

### Favorites Page

![Capture](https://github.com/user-attachments/assets/2205834a-5007-464e-82ba-70fcd11cd9e3)

### Details Page

![Capture](https://github.com/user-attachments/assets/529210ff-bbac-4ae0-b51f-7e79e41a3230)
![Capture](https://github.com/user-attachments/assets/dd6167eb-aa31-4d9b-9d83-01da0b51ca61)

### Search Results Page

![Capture](https://github.com/user-attachments/assets/808bf8e1-12a6-47e6-abcc-3c87149cd944)

### Mobile Devices
![Capture](https://github.com/user-attachments/assets/2b09484b-3b93-4155-8329-f1acc0317e41)

![Capture](https://github.com/user-attachments/assets/57898648-36c7-4298-a05c-e7fcd375d1ce)

![Capture](https://github.com/user-attachments/assets/20f59303-4f52-421d-86f1-ddcde0d9a82a)
