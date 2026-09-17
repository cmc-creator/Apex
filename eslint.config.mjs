import next from 'eslint-config-next';
import nextTypeScript from 'eslint-config-next/typescript';

const config = [
  ...next,
  ...nextTypeScript,
  {
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];

export default config;
