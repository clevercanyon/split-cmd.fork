/**
 * Dotfiles generated regexp.
 *
 * @note PLEASE DO NOT EDIT THIS FILE!
 * @note This entire file will be updated automatically.
 * @note Instead of editing here, please review <https://github.com/clevercanyon/skeleton>.
 */

/**
 * There are three capture groups:
 *
 * 1. Everything beginning with `#` or `/*` leading up to and including a `<generated:start>` tag piece.
 * 2. The generated code itself, including all newlines, inside the `<generated:start></generated:end>` tag pieces.
 * 3. The closing `</generated:end>` tag piece.
 *
 * This expression supports the `/g` flag, in case that's ever needed, but we don't currently use it. i.e., Our goal is
 * simply to preserve the first `<generated:start></generated:end>` block found in any given dotfile.
 */
export default /((?<=(?:^|[\r\n]))[\t ]*(?:#+|\/\*+)(?:.(?!<\/generated:end>))*<generated:start>(?:[\t ]*\*+\/)?[\t ]*(?=[\r\n]))((?:.(?!(?:#+|\/\*+)[\t ]*<\/?generated:))*[\r\n]*)([\t ]*(?:#+|\/\*+)[\t ]*<\/generated:end>(?:[\t ]*\*+\/)?)/isu;
