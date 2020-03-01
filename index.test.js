const postcss = require('postcss');
const plugin = require('./');

function run(input, output, opts) {
  return postcss([plugin(opts)])
    .process(input)
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

it('shims display: subgrid', () => {
  return run(
    'a{ display: subgrid; }',
    'a{ display: grid; grid-column: 1 / -1; grid: inherit; grid-gap: inherit; }',
    {}
  );
});

it('applies a hack for IE autoprefixer when option enabled', () => {
  return run(
    'a{ display: subgrid; }',
    `a{ display: grid; grid-column: 1 / 99; grid: inherit; grid-gap: inherit; grid-template-columns: inherit; grid-template-areas: ; }
a > :nth-child(1){ -ms-grid-row: 1; }
a > :nth-child(2){ -ms-grid-row: 2; }
a > :nth-child(3){ -ms-grid-row: 3; }
a > :nth-child(4){ -ms-grid-row: 4; }
a > :nth-child(5){ -ms-grid-row: 5; }`,
    { ieHack: true }
  );
});

it('accepts a custom ms-subgrid-rows value when hacking IE', () => {
  return run(
    'a{ display: subgrid; -ms-subgrid-rows: 3; }',
    `a{ display: grid; grid-column: 1 / 99; grid: inherit; grid-gap: inherit; grid-template-columns: inherit; grid-template-areas: ; }
a > :nth-child(1){ -ms-grid-row: 1; }
a > :nth-child(2){ -ms-grid-row: 2; }
a > :nth-child(3){ -ms-grid-row: 3; }`,
    { ieHack: true }
  );
});

it('shims -ms-subgrid-rows on non-subgrid parents', () => {
  return run(
    'a{ -ms-subgrid-rows: 3; }',
    `a{ }
a > :nth-child(1){
    -ms-grid-row: 1
}
a > :nth-child(2){
    -ms-grid-row: 2
}
a > :nth-child(3){
    -ms-grid-row: 3
}`,
    {}
  );
});

it('carries !important', () => {
  return run(
    'a{ display: subgrid !important; }',
    'a{ display: grid !important; grid-column: 1 / -1 !important; grid: inherit !important; grid-gap: inherit !important; }',
    {}
  );
});
