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
    'a{ display: grid; grid-column: 1 / -1; grid-template: inherit; grid-gap: inherit; }',
    {}
  );
});

it('carries !important', () => {
  return run(
    'a{ display: subgrid !important; }',
    'a{ display: grid !important; grid-gap: inherit !important; grid-template: inherit !important; grid-column: 1 / -1 !important; }',
    {}
  );
});
