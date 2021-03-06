module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        "exclude": [
          "transform-for-of"
        ],
        "loose": true,
        "modules": false
      }
    ]
  ],
  "plugins": [
    [
      "@babel/transform-for-of",
      {
        "assumeArray": true
      }
    ]
  ]
};
