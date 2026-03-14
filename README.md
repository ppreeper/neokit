# neokit

An [Astro](https://astro.build) component library built on [DaisyUI](https://daisyui.com) and [Tailwind CSS v4](https://tailwindcss.com). Adds an Astro integration that automatically injects Tailwind + DaisyUI into your project — no manual CSS imports needed.

## Installation

```sh
bun add neokit
# or
npm install neokit
```

## Setup

Add the integration to your `astro.config.mjs`:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import neokit from 'neokit';

export default defineConfig({
  integrations: [
    neokit({
      themes: ['light', 'dark'],  // DaisyUI themes — true = all, false = none
      fontSize: '16px',           // base font-size on <html>, or false to skip
    }),
  ],
});
```

That's it. Tailwind CSS v4 and DaisyUI are injected automatically — no `@import` in your layouts required.

## Usage

Import any component directly by path:

```astro
---
import Button from 'neokit/components/Button.astro';
import Card from 'neokit/components/Card.astro';
import Badge from 'neokit/components/Badge.astro';
---

<Button color="primary">Click me</Button>

<Card classes="w-80 card-border shadow">
  <div class="card-body">
    <h2 class="card-title">Hello</h2>
    <Badge color="success">New</Badge>
  </div>
</Card>
```

You can also import from the barrel (named exports):

```ts
import { Button, Card, Badge } from 'neokit';
```

## Components

All 61 components map 1:1 to DaisyUI's component list.

### Actions
`Button` · `Dropdown` · `Modal` · `Swap` · `ThemeController`

### Data Display
`Accordion` · `Avatar` · `Badge` · `Card` · `Carousel` · `ChatBubble` · `Collapse` · `Countdown` · `Diff` · `Kbd` · `List` · `Stat` · `Stats` · `Status` · `Table` · `Timeline`

### Navigation
`Breadcrumbs` · `Dock` · `Menu` · `Navbar` · `Pagination` · `Steps` · `Tabs`

### Feedback
`Alert` · `Loading` · `Progress` · `Skeleton` · `Toast` · `Tooltip`

### Data Input
`Checkbox` · `FileInput` · `Input` · `Radio` · `Range` · `Rating` · `Select` · `Textarea` · `Toggle`

### Layout
`Artboard` · `Divider` · `Drawer` · `Footer` · `Hero` · `Indicator` · `Join` · `Mask` · `Stack`

### Mockup
`MockupBrowser` · `MockupCode` · `MockupPhone` · `MockupWindow`

## Integration options

| Option | Type | Default | Description |
|---|---|---|---|
| `themes` | `boolean \| string[]` | `["light", "dark"]` | DaisyUI themes to enable. `true` = all, `false` = none. |
| `fontSize` | `string \| false` | `"16px"` | Base font-size set on `<html>`. Pass `false` to skip. |

## Peer dependencies

- `astro >= 5.0.0`
- `@tailwindcss/vite >= 4.0.0`

Both are `devDependencies` in your Astro project and do not need to be added separately if you already have Astro installed.

## License

MIT
