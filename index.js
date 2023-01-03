/**
 * Splits a CMD.
 *
 * @param cmd CMD to split.
 * @param to  One of: `array` or `object`.
 *            If not given, defaults to `object`.
 *
 * @returns   Object or array containing CMD parts.
 */
function split( cmd, to = 'object' ) {
    return 'array' === to ? splitToArray( cmd ) : splitToObject( cmd );
}

/**
 * Splits a CMD into an array.
 *
 * @param cmd CMD to split into an array.
 *
 * @returns   Array of CMD parts.
 */
function splitToArray( cmd ) {
    if ( typeof cmd !== 'string' ) {
        throw new Error( 'Command must be a string.' );
    }
    const m = cmd.match( /[^'"\s]+|'(?:\\'|[^'])*'|"(?:\\"|[^"])*"/ug ) || [];

    return m.map( ( m ) => {
        return (m.charAt( 0 ) === "'" && m.charAt( m.length - 1 ) === "'")
            || (m.charAt( 0 ) === '"' && m.charAt( m.length - 1 ) === '"')
            ? m.slice( 1, -1 )
            : m;
    } );
}

/**
 * Splits a CMD into an object.
 *
 * @param cmd CMD to split into an object.
 *
 * @returns   Object `{cmd: '', args: []}`.
 */
function splitToObject( cmd ) {
    const arr = splitToArray( cmd );

    switch( arr.length ) {
        case 0:  return { cmd: '', args: [] };
        case 1:  return { cmd: arr[ 0 ], args: [] };
        default: return { cmd: arr.slice(0, 1), args: arr.slice(1) };
    }
}

/**
 * Exports.
 */
module.exports = { split, splitToArray, splitToObject };
