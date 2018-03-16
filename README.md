# PostCSS Subgrid
![[][ci-img]][ci]

[PostCSS] plugin that shims some _very_ basic behavior of the proposed CSS grid `display: subgrid` [spec].

**Note:** This plugin only provides a shorthand for mimicing a single use-case for CSS subgrids: inheriting the parent grid for full-width containers with placed children.

See [this Codepen][codepen] for a demonstration.

Open to suggestions and PRs for other hacks/patterns that could be included to mimic more advanced subgrid behavior.

```css
.foo {
  display: subgrid;
}
```

```css
.foo {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: inherit;
  grid-gap: inherit;
  margin: 0;
  padding: 0;
}
```

## Usage

```js
postcss([ require('postcss-subgrid') ])
```

See [PostCSS] docs for examples for your environment.

[spec]: https://www.w3.org/TR/css-grid-2/#subgrids
[PostCSS]: https://github.com/postcss/postcss
[codepen]: https://codepen.io/seaneking/pen/MVePPv
[ci-img]:  https://travis-ci.org/seaneking/postcss-subgrid.svg
[ci]:      https://travis-ci.org/seaneking/postcss-subgrid
