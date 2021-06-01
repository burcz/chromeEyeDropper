import * as fs from 'fs-extra';
import { ISchemeColor } from '../ColorTranslator';

async function parseColorScheme(csvFile: string): Promise<ISchemeColor[]> {
	const scheme = [];
	const raw = (await fs.readFile(csvFile)).toString() as string;
	const lines = raw.split('\n');
	lines.shift();
	for (const line of lines) {
		// "RGB Hex", "RGB Hex3", "HSL", "RGB", "HTML Keyword
		const e = line.split(',');
		const rgb = getRgbJson(e[3]);
		const name = e[4];
		scheme.push({
			rgb: rgb,
			name: name
		});
	}
	return scheme;
}

function getRgbJson(rgb: string) {
	const clean = rgb.slice(rgb.indexOf('('), rgb.indexOf(')')).split(',');
	return {
		r: Number(clean[0]),
		g: Number(clean[1]),
		b: Number(clean[2])
	}

}

(function () {
	parseColorScheme(process.argv[1]).catch(function(err) {
		console.log(err);
	});
})();