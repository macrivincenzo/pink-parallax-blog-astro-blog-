// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.thevaluationgenie.com',
	integrations: [
		mdx(), 
		sitemap(),
		compress({
			CSS: true,
			HTML: {
				'remove-tags': ['script[type="application/ld+json"]'],
				'remove-empty-attributes': false
			},
			Image: true,
			JavaScript: true,
			SVG: false,
		})
	],
	build: {
		inlineStylesheets: 'auto',
		assets: '_astro'
	},
	output: 'static',
	vite: {
		build: {
			cssMinify: true,
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true
				}
			},
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ['astro']
					}
				}
			}
		},
		css: {
			transformer: 'lightningcss'
		}
	},
	compressHTML: true
});
