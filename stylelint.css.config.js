module.exports = {
  extends: ['stylelint-config-recommended'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'include',
          'use',
          'function',
          'return',
          'mixin',
          'each',
        ],
      },
    ],
  },
};
