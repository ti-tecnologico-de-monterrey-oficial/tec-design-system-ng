const whitespaceRegex = /^\s+$/;
const nonWordRegex = /^[`~!@#$%^&*()\-=_+{}[\]\|\\;':",./<>?]+$/;

export class NormalizePlugin {
	constructor({}) {

	}
	normalize(input: string): string {
		const normal = input.normalize();
	}
}
