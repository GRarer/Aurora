# Aurora

Aurora is a game about space colonization, artificial intelligence, and
eschatology.

This project is led by Grace Rarer as part of Georgia Tech's VGDev club.

You can play the most recent build in your browser at <https://grarer.github.io/Aurora/>

## How to build and run locally

- Node.js is required to build and run the game locally. If you don't already have node.js installed, get it at <https://nodejs.org>
- After forking and cloning the repository, navigate to the `Aurora` directory with your preferred terminal and enter `npm install`. This tells node.js to install all of the developer dependencies, including the typescript compiler and the live server that we use for local testing. You only have to do this once.
- To compile the game, enter `npm run build`
- To test the game locally, you need to start a local server and then navigate your web browser to `http://localhost:<port#>/index.html`. Enter `npm run start` in your terminal to start live-server, which will default to `http://localhost:8080` but will use a different port if 8080 is unavailable. After starting the live server, you do not need to restart it after each build; it will reload automatically.

# License and Credits

- For emoji rendering, we use [Twemoji](https://github.com/twitter/twemoji) by
  Twitter (CC-BY 4.0 license).
- This project is licensed under the MIT license.
