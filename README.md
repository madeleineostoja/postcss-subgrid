# PostCSS Subgrid

[![][ci-img]][ci]

[PostCSS] plugin that shims basic behavior of the proposed CSS `display: subgrid` [spec].

Use as an easy shortcut to inherit full-width subgrids. This plugin **is not** a polyfill for real subgrids, and doesn't help with creating partial/properly nested grids as part of a complex layout.

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
  grid-template: inherit;
  grid-gap: inherit;
}
```

---

Open to PRs for other hacks/patterns that could be included to shim more subgrid behavior. Eg: Could we find the parent grid and use that to calculate a proper subgrid template?

[spec]: https://www.w3.org/TR/css-grid-2/#subgrids
[postcss]: https://github.com/postcss/postcss
[codepen]: https://codepen.io/seaneking/pen/MVePPv
[ci-img]: https://travis-ci.org/seaneking/postcss-subgrid.svg
[ci]: https://travis-ci.org/seaneking/postcss-subgrid
