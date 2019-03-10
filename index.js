const postcss = require('postcss');

module.exports = postcss.plugin('postcss-subgrid', opts => {
  let PROPS = [
    { prop: 'grid-column', value: opts.ieHack ? '1 / 99' : '1 / -1' },
    { prop: 'grid', value: 'inherit' },
    { prop: 'grid-gap', value: 'inherit' }
  ];

  opts.ieHack &&
    PROPS.push(
      { prop: 'grid-template-columns', value: 'inherit' },
      { prop: 'grid-template-areas', value: '' }
    );

  return root => {
    root.walkDecls('display', decl => {
      let { important } = decl;

      if (decl.value === 'subgrid') {
        decl.value = 'grid';
        PROPS.reverse().forEach(prop =>
          decl.after(Object.assign(prop, { important }))
        );
      }
    });
  };
});
