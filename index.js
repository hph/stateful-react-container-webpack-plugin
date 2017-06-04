'use strict';

const defaults = require('lodash.defaults');


class StatefulReactContainerPlugin {
  constructor (options) {
    this.options = defaults(options || {}, {
      id: 'container',
      attribute: 'state',
      variable: 'state',
      noState: false,
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
    const { id, attribute, variable, noState } = this.options;
    const data = noState ? '' : ` data-${attribute}="<%= ${variable} %>"`;
    const content = `<body><div id="${id}"${data}></div>`;
    data.html = data.html.replace(/<body>/, content);
    callback(null, data);
  }
}


module.exports = StatefulReactContainerPlugin;
