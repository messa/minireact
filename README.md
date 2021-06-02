MiniReact
=========

Reimplementation of [React.js](https://reactjs.org/) subset for educational purposes.

Files:

- `index.html` - HTML page for the Poll app
- `app.jsx` - the Poll app JSX source code
- `app.js` - pure-JavaScript version generated from `app.jsx` by [Babel.js](https://babeljs.io/repl/), run following if you modify app.jsx
  ```sh
  $ npm install --save-dev @babel/core @babel/cli @babel/preset-react
  $ npx babel app.jsx --out-file app.js --presets=@babel/react
  ```
- `minireact.js` - MiniReact implementation (in ES6 JavaScript, compatible with most modern browsers)


Screenshot
----------

<a href='https://minireact.vercel.app/'><img alt='Screenshot' src='https://user-images.githubusercontent.com/115487/120337946-0ebce000-c2f4-11eb-9af9-9e0ee9ed5f52.png' width=300></a>


Links
-----

Discussion:

- [Junior.guru](https://junior.guru/) Discord: https://discord.com/channels/769966886598737931/811910782664704040/849292462488944690

Similar React-from-scratch approaches:

- https://andela.com/insights/building-your-own-version-of-react-from-scratch-part-1/
- https://pomb.us/build-your-own-react/
- https://zserge.com/posts/worst-react-ever/

Actual React source code:

- https://unpkg.com/react@17.0.2/umd/react.development.js
- https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js
- https://github.com/facebook/react

React now transitions to an internal async render architecture named Fiber:

- https://github.com/acdlite/react-fiber-architecture#readme
- https://dev.to/burhanuday/react-internals-fiber-architecture-280l
