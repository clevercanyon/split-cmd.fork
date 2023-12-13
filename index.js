/**
 * Splits a CMD.
 *
 * @param   cmd CMD to split.
 * @param   to  One of: `array` or `object`. Default: `object`.
 *
 * @returns     Object or array containing CMD parts.
 */
function splitCMD(cmd, to = 'object') {
	return 'array' === to ? splitCMDToArray(cmd) : splitCMDToObject(cmd);
}

/**
 * Splits a CMD into an object.
 *
 * @param   cmd CMD to split into an object.
 *
 * @returns     Object `{cmd: '', args: []}`.
 */
function splitCMDToObject(cmd) {
	const arr = splitCMDToArray(cmd);

	switch (arr.length) {
		case 0:
			return { cmd: '', args: [] };
		case 1:
			return { cmd: arr[0], args: [] };
		default:
			return { cmd: arr[0], args: arr.slice(1) };
	}
}

/**
 * Splits a CMD into an array.
 *
 * @param   cmd CMD to split into an array.
 *
 * @returns     Array of CMD parts.
 */
function splitCMDToArray(cmd) {
	if (typeof cmd !== 'string') {
		throw Error('Command must be a string.');
	}
	const m = cmd.match(/[^'"\s]+|'(?:\\'|[^'])*'|"(?:\\"|[^"])*"/gu) || [];

	return m.map((m) => {
		return (m.charAt(0) === "'" && m.charAt(m.length - 1) === "'") || (m.charAt(0) === '"' && m.charAt(m.length - 1) === '"') ? m.slice(1, -1) : m;
	});
}

/**
 * Exports.
 */
module.exports = { splitCMD, splitCMDToObject, splitCMDToArray };
