/**
 * Rollup config file.
 *
 * Rollup is not aware of this config file's location.
 *
 * @note PLEASE DO NOT EDIT THIS FILE!
 * @note This entire file will be updated automatically.
 * @note Instead of editing here, please review <https://github.com/clevercanyon/skeleton>.
 *
 * @see https://rollupjs.org/guide/en/#big-list-of-options
 * @see https://vitejs.dev/config/build-options.html#build-rollupoptions
 */

import path from 'node:path';
import { $path, $str } from '../../../../../node_modules/@clevercanyon/utilities/dist/index.js';
import extensions from '../../../bin/includes/extensions.mjs';

/**
 * Configures rollup for Vite.
 *
 * @param   props Props from vite config file driver.
 *
 * @returns       Rollup configuration.
 */
export default async ({ projDir, srcDir, distDir, a16sDir, appType, appEntries, peerDepKeys, minifyEnable, sideEffects }) => {
    return {
        input: appEntries, // App entry file paths.
        ...(['lib'].includes(appType) ? { preserveEntrySignatures: 'strict' } : {}),

        treeshake: {
            // {@see https://o5p.me/7YF2NU}.
            moduleSideEffects: (id /*, external */) => {
                return sideEffects.includes('./' + path.relative(projDir, id));
            },
        },
        external: [
            ...(['lib'].includes(appType) ? [/^(?![./]|file:|data:).*$/iu] : []),
            ...peerDepKeys.map((k) => new RegExp('^' + $str.escRegExp(k) + '(?:$|[/?])')),
            '__STATIC_CONTENT_MANIFEST', // Cloudflare worker sites use this for static assets.
        ],
        output: {
            interop: 'auto', // Matches TypeScript configuration.
            exports: 'named', // Matches TypeScript configuration.
            esModule: true, // Matches TypeScript configuration.

            extend: true, // i.e., UMD global `||` checks.
            noConflict: true, // Behaves the same as `jQuery.noConflict()`.
            compact: minifyEnable, // Minify wrapper code generated by rollup?

            // By default, special chars in a path like `[[name]].js` get changed to `__name__.js`.
            // This prevents that by enforcing a custom sanitizer. More details: <https://o5p.me/Y2fNf9>.
            sanitizeFileName: (fileName) => fileName.replace(/[\0?*]/gu, ''),

            // By default, in SSR mode, Vite forces all entry files into the `distDir` root.
            // This prevents that by enforcing a consistently relative location for all entries.
            entryFileNames: (entry) => {
                if (extensions.noDot([...extensions.byCanonical.html]).includes($path.ext(entry.facadeModuleId))) {
                    if (/\//u.test(entry.name)) return '[name]-[hash].js'; // Already a subpath.
                    return path.join(path.relative(distDir, a16sDir), '[name]-[hash].js');
                }
                if (/\//u.test(entry.name)) return '[name].js'; // Already a subpath.
                return path.join(path.relative(srcDir, path.dirname(entry.facadeModuleId)), '[name].js');
            },

            // By default, in library mode, Vite ignores `build.assetsDir`.
            // This prevents that by enforcing a consistent location for chunks and assets.
            chunkFileNames: (/* chunk */) => {
                return path.join(path.relative(distDir, a16sDir), '[name]-[hash].js');
            },

            // By default, in library mode, Vite ignores `build.assetsDir`.
            // This prevents that by enforcing a consistent location for chunks and assets.
            assetFileNames: (/* asset */) => path.join(path.relative(distDir, a16sDir), '[name]-[hash].[ext]'),

            // Preserves module structure in apps built explicitly as libraries.
            // Cannot inline dynamic imports when `preserveModules` is enabled, so set as `false` explicitly.
            ...(['lib'].includes(appType) ? { preserveModules: true, hoistTransitiveImports: false, inlineDynamicImports: false } : {}),
        },
    };
};
