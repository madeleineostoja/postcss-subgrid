const postcss = require('postcss');

const DEFAULTS = {
  ieRows: 5
};

function createIERow(rule, n) {
  const row = postcss.rule({
    selector: `${rule.selector} > :nth-child(${n})`
  });

  row.append({
    prop: '-ms-grid-row',
    value: n
  });

  return row;
}

module.exports = postcss.plugin('postcss-subgrid', ({ ieHack }) => {
  const PROPS = [
    { prop: 'grid-column', value: ieHack ? '1 / 99' : '1 / -1' },
    { prop: 'grid', value: 'inherit' },
    { prop: 'grid-gap', value: 'inherit' }
  ];

  ieHack &&
    PROPS.push(
      { prop: 'grid-template-columns', value: 'inherit' },
      { prop: 'grid-template-areas', value: '' }
    );

  return root => {
    root.walkDecls('display', decl => {
      const { important, parent, value } = decl;

      if (value !== 'subgrid') {
        return;
      }

      decl.value = 'grid';
      PROPS.reverse().forEach(prop =>
        decl.after(Object.assign(prop, { important }))
      );

      if (ieHack) {
        let ieRows = DEFAULTS.ieRows;
        parent.walkDecls('-ms-subgrid-rows', decl => {
          ieRows = decl.value;
          decl.remove();
        });

        for (let i = ieRows; i > 0; i--) {
          root.insertAfter(parent, createIERow(parent, i));
        }
      }
    });
  };
});
