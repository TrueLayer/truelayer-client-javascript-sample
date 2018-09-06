# [Express](https://expressjs.com/)

This simple node example stands up a bare-bones express server and takes a user through the authentication flow, then hits the data API `info` endpoint, and streams the results to a page.

## Prerequisites
---
Before you start, you will need:
* [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js and Node Package Manager (NPM)](https://nodejs.org/download/)

## Install the repo locally
---
```bash
$ git clone https://github.com/TrueLayer/truelayer-client-javascript-sample.git
```

## Steps to run the App :video_game:

1. Install the dependencies
```bash
$ npm install
```

2. Create the .env file 
```bash
$ cp .env.sample .env
```

3. Go to https://console.truelayer.com and set up your client account

4. Navigate to your app's settings page on https://console.truelayer.com/settings/Application

5. Obtain your client_id and client_secret on the page and store them safely locally

6. Whitelist your app's callback url in the redirect url section

7. Add the credentials obtained in the 3 steps above to `.env` file

8. Start the app
```bash
$ npm start
```

9. Navigate to `http://localhost:5000` and view the app!
