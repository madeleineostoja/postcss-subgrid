# PostCSS Subgrid
[![][ci-img]][ci]

[PostCSS] plugin that shims basic behavior of the proposed CSS `display: subgrid` [spec]. 

Easily inherit full-width subgrids. This plugin **is not** a polyfill for real subgrids, and doesn't help with doing things like creating consistent partial/nested grids as part of a complex layout.

See **[this Codepen][codepen]** for a demonstration.

#### Input
```css
.foo {
  display: subgrid;
}
```

#### Output
```css
.foo {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: inherit;
  grid-gap: inherit;
  margin: 0;
  padding: 0;
}
```

Open to suggestions and PRs for other hacks/patterns that could be included to shim more advanced subgrid behavior.

[spec]: https://www.w3.org/TR/css-grid-2/#subgrids
[PostCSS]: https://github.com/postcss/postcss
[codepen]: https://codepen.io/seaneking/pen/MVePPv
[ci-img]:  https://travis-ci.org/seaneking/postcss-subgrid.svg
[ci]:      https://travis-ci.org/seaneking/postcss-subgrid
