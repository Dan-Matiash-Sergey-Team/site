path = require("path")
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  exclude: [ path.resolve(__dirname, 'node_modules'),path.resolve(__dirname, 'src/assets')],
  ignore: [path.resolve(__dirname, 'src/assets/ahegao.json')]
};
