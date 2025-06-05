# 🎬 BingeBox

**BingeBox** is a personal project to showcase my skills as a frontend developer. It provides a sleek and interactive platform to explore trending movies and TV shows, search for titles, mark favorites, 
and get detailed information. With AI integration, BingeBox also offers **personalized recommendations** based on your favorite content.

🌐 **Live Demo**: [https://zhouw9n.github.io/BingeBox/](https://zhouw9n.github.io/BingeBox/)

> ⚠️ **Note**: The backend server is hosted on Render’s free tier and may take **30–60 seconds to spin up** if inactive. Thank you for your patience!
>
> ---
>
> ## ✨ Features

- Display trending movies and TV shows
- Show upcoming movie releases
- Personalized recommendations based on favorites
- Browse content by genre (Movies & TV Shows)
- Save and view favorites (stored in `localStorage`)
- Search for movies and TV shows by title
- Detailed information view for each movie/show
- Sleek and modern UI
- Responsiveness across all major devices and screen sizes
- Error handling and UI states (error message, loading animation)

---

## 🤖 AI Integration

BingeBox uses **Datastax AstraDB**'s vector capabilities to provide **personalized recommendations**:

- The last **5 favorite** movies/TV shows are used to build a sample query string.
- Each description is truncated to **100 characters** and combined into a single query (max 512 characters).
- This query is **vectorized** via AstraDB's API.
- The database (based on ~18,000 scraped titles) returns results using **cosine similarity** for recommendation.

- ---

## 🛠️ Tech Stack

### Frontend

- JavaScript / HTML / CSS
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

### Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- Hosted on: [Render](https://render.com/)
- Vector DB: [DataStax AstraDB](https://www.datastax.com/astra)

### APIs Used

- [TMDB API](https://www.themoviedb.org/documentation/api)
- [AstraDB Vector Search API](https://docs.datastax.com/en/astra/)

---

## 📁 Project Structur

BingeBox/
├── client/
│   ├── dist/                  # Build output
│   ├── node_modules/          # Project dependencies
│   ├── public/                # Public assets (favicon, etc.)
│   ├── src/                   # Source code
│   │    ├── assets/           
│   │    │   ├── fonts/         # Custom fonts
│   │    │   ├── icons/         # Favicons and SVGs
│   │    │   └── images/        # Image assets
│   │    ├── components/        # Reusable components (Header, Footer, etc.)
│   │    ├── constants/         # Static config (e.g., genre mapping)
│   │    ├── pages/             # Main route components (Home, Movies, Shows, etc.)
│   │    ├── services/          # API service handlers (e.g., TMDB, favorites)
│   │    ├── utils/             # Utility functions (vector query builder, etc.)
│   │    ├── App.jsx            # Root app component
│   │    ├── main.jsx           # App entry point
│   │    ├── global.css         # Global styles
│   ├── .gitignore
│   ├── index.html              # HTML entry point
│   ├── package.json            # Frontend dependencies and scripts      
│   └── vite.config.js          # vite.config.js
│
└── server/                      # Backend Express server
    ├── node_modules/            # Backend dependencies
    ├── server.js                # Entry point for Express server                  
    └── package.json             # Backend dependencies and scripts

---

