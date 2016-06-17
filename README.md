# stateful-react-container-webpack-plugin

This [Webpack](https://webpack.github.io/) plugin in intended to be used with
[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) in
projects using React.js. This plugin allows you to use html-webpack-plugin to
build templates automatically with Webpack while also server-side rendering and
passing initial state to the React.js client-side app.

There may be an example of the usage over at [Kit](https://github.com/hph/kit)
when I've had time to update it. See the [Example output](#Example-output) to
get an idea what this does.

### Installation

    npm install -S stateful-react-container-webpack-plugin

### Setup

After installing the plugin, you will need to add it to the plugins in your
Webpack configuration:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new StatefulReactContainerPlugin(),
],
```

### Options

The plugin provides three options (passed as an object argument to the plugin)
to customize usage:

- `id` (default: `container`): The id of the React container.js element.
- `attribute` (default: `state`): The name of the data attribute to store the
  initial state for the React.js app.
- `variable` (default: `state`): The name of the variable containing the
  initial state in the template.

### Example output

With the default configuration, the `<body>` tag is replaced with the following
markup:

```html
<body><div id="container" data-state="<%= state %>"></div>
```

### Notes

This plugin assumes that you're using `ejs` to render your templates on the
server side (hence the `<%= state %>` in the output). Using Express.js, you
might render the built template as follows:

```javascript
// in a request handler
const state = JSON.stringify({
  user: req.session.user,
});
res.render('app.ejs', { state });
```
