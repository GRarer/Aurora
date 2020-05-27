# Aurora

Aurora is a game about space colonization, artificial intelligence, and
eschatology.

You can play it at <https://grarer.github.io/Aurora/>

This project was led by Grace Rarer as part of Georgia Tech's VGDev club.

## How to build and run locally

- Anyone can play Aurora on the web, but Node.js is required for developers to build and run a local copy of the game.
- After forking and cloning the repository, navigate to the `Aurora` directory and run `npm install` to install the
developer dependencies. We have included some helpful node scripts:
  - `npm run build` to compile the game
  - `npm run lint` to run code style checking
  - `npm run start` to start a local server. You can then navigate your web browser to
`http://localhost:<port#>/index.html` to test your local copy (the default port will usually be 8080). After starting
the live server, you do not need to restart it after each build; it will reload automatically.

## Credits

- Game design, programming, and art assets by Grace Rarer
- Programming, DevOps, and serialization framework by Prindle
- Procedural music generation by May Lawver
- Environment art by Seong Ryoo
- Additional programming by Mitchell Philipp, Brad Baker, and Will Cooper

## Attributions

- To save and load the game, we use [Augustus](https://www.npmjs.com/package/@nprindle/augustus) (MIT License)
- For emoji rendering, we use [Twemoji](https://github.com/twitter/twemoji) by
  Twitter (MIT license for code, CC-BY 4.0 license for emoji graphics)
- The game's UI uses IBM Plex Mono (Open Font License)
- Menu background image via NASA (public domain)

## License

- This project is released under the MIT license.
