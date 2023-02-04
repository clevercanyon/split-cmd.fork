export function splitCMD(cmd: string, to?: 'array' | 'object'): { cmd: string, args: string[] } | string[];
export function splitCMDToObject(cmd: string): { cmd: string, args: string[] };
export function splitCMDToArray(cmd: string): string[];
