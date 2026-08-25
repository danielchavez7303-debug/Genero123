import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // La barra de desarrollo de Astro intenta optimizar aria-query y
  // axobject-query incluso durante el build estático. No forma parte del
  // sitio publicado y desactivarla evita ese paso innecesario del bundler.
  devToolbar: {
    enabled: false
  },
  vite: {
    optimizeDeps: {
      include: [],
      exclude: ['aria-query', 'axobject-query']
    },
    plugins: [{
      name: 'remove-dev-toolbar-a11y-optimizer',
      enforce: 'post',
      configResolved(config) {
        config.optimizeDeps.include = (config.optimizeDeps.include || []).filter(
          dependency => !dependency.includes('aria-query') && !dependency.includes('axobject-query')
        );
      }
    }]
  }
});

