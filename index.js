const postcss = require('postcss');

module.exports = postcss.plugin('postcss-subgrid', opts => {
  const PROPS = [
    { prop: 'grid-column', value: opts.ieHack ? '1 / 99' : '1 / -1' },
    { prop: 'grid', value: 'inherit' }
  ];

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
