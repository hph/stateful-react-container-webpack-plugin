'use strict';

const defaults = require('lodash.defaults');


class StatefulReactContainerPlugin {
  constructor (options) {
    this.options = defaults(options || {}, {
      id: 'container',
      attribute: 'state',
      variable: 'state',
      noState: false,
      position: 'start',
    });
  }

  apply (compiler) {
    compiler.plugin('compilation', this.compiler.bind(this));
  }

  compiler (compilation) {
    const event = 'html-webpack-plugin-after-html-processing';
    compilation.plugin(event, this.addContainer.bind(this));
  }

  addContainer (data, callback) {
    const { id, attribute, variable, noState, position } = this.options;
    const state = noState ? '' : ` data-${attribute}="<%= ${variable} %>"`;
    let pattern, content;
    if (position === 'start') {
      content = `<body><div id="${id}"${state}></div>`;
      pattern = /<body>/;
    } else if (position === 'end') {
      content = `<div id="${id}"${state}></div></body>`;
      pattern = /<\/body>/;
    }
    data.html = data.html.replace(pattern, content);
    callback(null, data);
  }
}


module.exports = StatefulReactContainerPlugin;
