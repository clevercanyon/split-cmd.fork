#!/usr/bin/env node
/**
 * Tailwind brand acquisition.
 *
 * @note PLEASE DO NOT EDIT THIS FILE!
 * @note This entire file will be updated automatically.
 * @note Instead of editing here, please review <https://github.com/clevercanyon/skeleton>.
 */

import { $json } from '../../../../node_modules/@clevercanyon/utilities/dist/index.js';
import u from '../../bin/includes/utilities.mjs';

/**
 * Acquires app’s brand config; i.e., here within a separate CLI process.
 */
console.log(
    $json.stringify(
        await u.brandConfig({
            mode: process.argv[2],
            baseURL: process.argv[3],
        }),
        { pretty: true },
    ),
);