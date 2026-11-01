# 🌟 My First Portfolio - Made with Astro & Tailwind CSS 🌟

![Astro](https://img.shields.io/badge/Astro-🚀-blue?style=flat&logo=astro&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-🌊-06B6D4?style=flat&logo=tailwind-css&logoColor=white) ![HTML](https://img.shields.io/badge/HTML-📄-orange?style=flat&logo=html5&logoColor=white)

Hey there! 👋

Welcome to my **very first portfolio** website! 🎉  
This project is something I started because I was *gabut* (bored) and wanted to experiment with Astro. 🚀 I’ve heard great things about it and thought, why not give it a shot? So, here it is—my humble portfolio made with **Astro** and **Tailwind CSS**! 🎨

## 🛠️ Technologies Used
- **[Astro](https://astro.build/)**: I used Astro as the main framework for this project. It's fast, easy to use, and perfect for static websites like this portfolio.
- **[Tailwind CSS](https://tailwindcss.com/)**: For styling, I chose Tailwind CSS because it's super flexible and helps me build clean, responsive designs easily.
- **HTML5**: Just the good ol' HTML for structure. 🏗️

## 🌐 Live Demo
You can check out the live version of my portfolio here:  
👉 [natabagas.tech](#)

## ✨ Features
- Simple and clean design 🌿
- Responsive layout 📱💻
- Minimalistic yet functional 🌟
- Built with Astro and Tailwind for high performance ⚡

## Spotify currently playing

The navbar reads the currently playing track with Spotify's Web API. The Spotify client ID, client secret, and first refresh token are server-only environment variables. The refresh token must be created with the `user-read-currently-playing` OAuth scope.

In production, the app uses Upstash Redis to persist Spotify's refresh token whenever Spotify returns a replacement. The first request seeds Redis from `SPOTIFY_REFRESH_TOKEN`; later requests use the Redis value. If a saved token is invalid and the environment token has been updated, the app clears the stale value and retries with the new one.

### Local setup

1. Copy `.env.example` to `.env` and add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and the initial `SPOTIFY_REFRESH_TOKEN`.
2. Run `npm run dev`. Redis is optional locally; without it, a replacement refresh token is kept in memory until the dev server restarts.

To obtain the initial refresh token, put the Spotify Client ID and Client Secret in `.env`, register the exact redirect URI used by the OAuth helper in the Spotify Developer Dashboard, then run `npm run spotify:auth`. Open the printed URL, sign in to Spotify, and approve access. Paste the full callback URL from the browser address bar into the terminal when prompted. The helper exchanges the authorization code and writes the refresh token into the ignored `.env` file without printing it.

For production, configure Upstash Redis so rotated refresh tokens are persisted across serverless instances.

### Vercel setup

Add the five environment variables from `.env.example` to the Vercel project, then redeploy. Production requires Redis so token replacements are saved across serverless instances. Vercel's Upstash integration variables `KV_REST_API_URL` and `KV_REST_API_TOKEN` are also supported.

Spotify refresh tokens expire six months after authorization. Refreshing an access token does not extend that lifetime; when it expires, authorize the app again, update `SPOTIFY_REFRESH_TOKEN`, and redeploy. See Spotify's [refresh token guide](https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens) and Upstash's [Vercel integration guide](https://upstash.com/docs/redis/howto/vercelintegration).

---

> 🚀 **Note**: This is just the beginning of my journey with **Astro** and web development in general. I look forward to improving this portfolio and adding more features as I learn more. Stay tuned!

---

Thanks for checking out my portfolio! 😄  
If you have any feedback or suggestions, I’d love to hear from you. Don't hesitate to open an issue or pull request on this repo. 💡

---

Made with ❤️ by Natabagas
