module.exports = {
  root: true,
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "plugins": [
    "@typescript-eslint",
    "import",
    "prettier"
  ],
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "rules": {
    "import/prefer-default-export": "off",
    "import/no-cycle": 2,
    "dot-notation": 2,
    "id-length": 2,
    "no-console": 1,
    "no-const-assign": 2,
    "no-dupe-class-members": 2,
    "no-else-return": 2,
    "no-inner-declarations": 2,
    "no-lonely-if": 2,
    "no-shadow": 2,
    "no-unneeded-ternary": 2,
    "no-unused-expressions": 2,
    "no-unused-vars": [
      2,
      {
        "args": "none"
      }
    ],
    "no-useless-return": 2,
    "no-var": 2,
    "one-var": [
      2,
      "never"
    ],
    "prefer-arrow-callback": 2,
    "prefer-const": 2,
    "prefer-promise-reject-errors": 2,
    "prettier/prettier": 2,
    "react/prop-types": 0,
    "@typescript-eslint/no-use-before-define": 0,
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  }
};
