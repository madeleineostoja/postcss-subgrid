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

If you are using [autoprefixer][autoprefixer] to attempt to shim grids in IE11, then `postcss-subgrid` can output a hack for the `grid-column` property that is able to be transformed by autoprefixer, since negative column values cannot be. It also outputs an empty `grid-template-areas` property and an explicit `grid-template-columns` inherit to satisfy autoprefier's IE grid shimming if it is being used.

Pass `ieHack: true` to `postcss-subgrid` and it will output the following declaration instead

```css
.foo {
  display: grid;
  grid-column: 1 / 99;
  grid: inherit;
  grid-gap: inherit;
  grid-template-columns: inherit;
  grid-template-areas: ;
}
```

---

Open to PRs for other hacks/patterns that could be included to shim more subgrid behavior. Eg: Could we find the parent grid and use that to calculate a proper subgrid template?

[spec]: https://www.w3.org/TR/css-grid-2/#subgrids
[postcss]: https://github.com/postcss/postcss
[codepen]: https://codepen.io/seaneking/pen/MVePPv
[ci-img]: https://travis-ci.org/seaneking/postcss-subgrid.svg
[ci]: https://travis-ci.org/seaneking/postcss-subgrid
[autoprefxer]: https://github.com/postcss/autoprefixer
