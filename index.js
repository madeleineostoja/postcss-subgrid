const postcss = require('postcss');

const PROPS = [
  { prop: 'grid-column', value: '1 / -1' },
  { prop: 'grid-template-columns', value: 'inherit' },
  { prop: 'grid-gap', value: 'inherit' },
  { prop: 'margin', value: '0' },
  { prop: 'padding', value: '0' },
];

module.exports = postcss.plugin('postcss-subgrid', () => {

  return root => {
    root.walkDecls('display', decl => {
      if (decl.value === 'subgrid') {
        decl.value = 'grid';
        PROPS.reverse().forEach(prop => decl.after(prop));
      }
    });
  };
});
