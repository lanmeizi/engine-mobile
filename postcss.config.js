// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require("postcss-pxtorem")({
      rootValue:37.5,
      selectorBlackList: [],
      propList: ["*"]
    })
  ]
  // to edit target browsers: use "browserslist" field in package.json
  // autoprefixer: {},
};

// module.exports = {
//   plugins: {
//     autoprefixer: {},
//     "postcss-px2rem-exclude": {
//       remUnit: 75,
//       remPrecision: 2,
//       exclude: /node_modules|folder_name/i
//     }
//   }
// };
