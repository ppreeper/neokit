import type { AstroIntegration } from 'astro'
import type { Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export interface NeokitOptions {
  /**
   * DaisyUI themes to enable.
   * - `true`  → all themes
   * - `false` → no DaisyUI themes (disable plugin)
   * - `string[]` → specific themes, e.g. `["light", "dark", "corporate"]`
   * @default ["light", "dark"]
   */
  themes?: boolean | string[]

  /**
   * Base font-size applied to the `<html>` element via `@layer base`.
   * Set to `false` to omit the rule entirely.
   * @default "16px"
   */
  fontSize?: string | false
}

const VIRTUAL_ID = 'virtual:neokit/base.css'
const RESOLVED_VIRTUAL_ID = '\0' + VIRTUAL_ID

function buildCssContent(options: Required<NeokitOptions>, componentsDir: string): string {
  const { themes, fontSize } = options

  const lines: string[] = ['@import "tailwindcss";', `@source "${componentsDir}";`]

  if (themes !== false) {
    const themesValue =
      themes === true
        ? 'all'
        : (themes as string[]).map((t) => `"${t}"`).join(', ')

    lines.push(`\n@plugin "daisyui" {\n  themes: ${themesValue};\n}`)
  }

  if (fontSize !== false) {
    lines.push(`\n@layer base {\n  html {\n    font-size: ${fontSize};\n  }\n}`)
  }

  return lines.join('\n')
}

function virtualNeokitCssPlugin(cssContent: string): Plugin {
  return {
    name: 'vite-plugin-neokit-virtual-css',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) return cssContent
    },
  }
}

export default function neokit(options: NeokitOptions = {}): AstroIntegration {
  const resolvedOptions: Required<NeokitOptions> = {
    themes: options.themes ?? ['light', 'dark'],
    fontSize: options.fontSize ?? '16px',
  }

  // Resolve the path to neokit's own components directory at integration
  // instantiation time so Tailwind v4 scans neokit component classes.
  const componentsDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    'components',
  )

  const cssContent = buildCssContent(resolvedOptions, componentsDir)

  return {
    name: 'neokit',
    hooks: {
      'astro:config:setup': ({ updateConfig, injectScript, logger }) => {
        const { themes, fontSize } = resolvedOptions

        logger.info('Injecting Tailwind CSS v4 + DaisyUI')
        logger.info(`  components: ${componentsDir}`)
        logger.info(
          `  themes: ${themes === true ? 'all' : themes === false ? 'none' : (themes as string[]).join(', ')}`,
        )
        logger.info(`  font-size: ${fontSize === false ? 'unset' : fontSize}`)

        updateConfig({
          vite: {
            plugins: [
              // 1. The Tailwind v4 Vite plugin — processes @import "tailwindcss"
              tailwindcss(),
              // 2. Virtual CSS module that serves the neokit CSS entry point
              virtualNeokitCssPlugin(cssContent),
            ],
          },
        })

        // Inject the virtual CSS as a page-level import so it applies globally
        // without consumers needing to import anything in their layouts.
        injectScript('page-ssr', `import '${VIRTUAL_ID}';`)
      },
    },
  }
}
