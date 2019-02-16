# Pin Simple

> Pinterest, but just the pictures

Built with [Vue](https://vuejs.org/) and [Express](https://expressjs.com/)

**Disclaimer:** I made this because I wanted a way to cycle through pins on my Pinterest boards with my left and right arrow keys like you can on Facebook. I am not trying to recreate Pinterest in any way other than viewing images!

## Getting Started

1. Set up SSL for localhost by following this [local cert generator](https://github.com/dakshshah96/local-cert-generator) tool

2. Follow the "Create your app" section of the [Pinterest API overview](https://developers.pinterest.com/docs/api/overview/)

3. Add `https://localhost:8888/callback` as a Redirect URI in your Pinterest app

4. Create a `.env` file in the root of the project based on .env.example and fill in your `APP_ID`, `APP_SECRET`, and `REDIRECT_URI`

5. Install dependencies

   ```bash
   npm install && npm run client:install
   ```

6. Start up the express server and vue app

   ```bash
   npm run dev
   ```
