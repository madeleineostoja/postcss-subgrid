const postcss = require('postcss');
const plugin = require('./');

function run(input, output, opts) {
  return postcss([ plugin(opts) ]).process(input)
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

it('shims display: subgrid', () => {
  return run('a{ display: subgrid; }', 'a{ display: grid; grid-column: 1 / -1; grid-template-columns: inherit; grid-gap: inherit; margin: 0; padding: 0; }', {});
});