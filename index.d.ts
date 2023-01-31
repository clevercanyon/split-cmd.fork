declare function splitCMD(cmd:string, to?:string = 'array' | 'object'): {cmd:string, args:string[]} | Array<string>;
declare function splitCMDToObject(cmd:string): {cmd:string, args:string[]};
declare function splitCMDToArray(cmd:string): Array<string>;
export = {
	splitCMD,
	splitCMDToObject,
	splitCMDToArray,
};
