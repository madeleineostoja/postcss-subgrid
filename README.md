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
  grid: inherit;
  grid-gap: inherit;
}
```

## Shimming IE for autoprefixer

If you are using [autoprefixer][autoprefixer] to attempt to shim grids in IE11, then pass `ieHack: true` to `postcss-subgrid`. It will output a hack for the `grid-column` property as well as an empty `grid-template-areas` and an explicit `grid-template-columns` inheritance in order for the subgrid to be transformed properly.

It will also generate explicit row placements for immediate children of the subgrid. You can configure how many chidren rows to create using the `-ms-subgrid-rows` meta property, which defaults to `5`;

```css
.foo {
  display: subgrid;
  -ms-subgrid-rows: 2;
}
```

```css
.foo {
  display: grid;
  grid-column: 1 / 99;
  grid: inherit;
  grid-gap: inherit;
  grid-template-columns: inherit;
  grid-template-areas: ;
}

.foo > :nth-child(1) {
  -ms-grid-row: 1;
}

.foo > :nth-child(2) {
  -ms-grid-row: 2;
}
```

---

Open to PRs for other hacks/patterns that could be included to shim more subgrid behavior

[spec]: https://www.w3.org/TR/css-grid-2/#subgrids
[postcss]: https://github.com/postcss/postcss
[codepen]: https://codepen.io/seaneking/pen/MVePPv
[ci-img]: https://travis-ci.org/seaneking/postcss-subgrid.svg
[ci]: https://travis-ci.org/seaneking/postcss-subgrid
[autoprefixer]: https://github.com/postcss/autoprefixer
