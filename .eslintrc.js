module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": "plugin:react/recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "comma-dangle": ["error", "never"],
      "semi-style": ["error", "last"],
      semi: "error"
      // or
    },

};

/*
    "react/display-name": [
      "error",
      {
        "ignoreTranspilerName": false
      }
    ],
    "editor.codeActionsOnSave": {
      "source.fixAll": true
  }

*/ 