export function splitCMD(cmd:string, to?:string = 'array' | 'object'): {cmd:string, args:string[]} | Array<string>;
export function splitCMDToObject(cmd:string): {cmd:string, args:string[]};
export function splitCMDToArray(cmd:string): Array<string>;
