import Color from "./Color";
import * as autumn from './colorSchemes/autumn.json';

const COLOR_OFFSET = 4;

enum schemeNames {
	autumn = 'autumn'
}

interface IColorSchemes {
	[schemeNames.autumn]: ISchemeColor[];
}

export interface ISchemeColor {
	name: string;
	rgb: {
		r: number,
		g: number,
		b: number
	};
}

export default class ColorTranslator {
	colorSchemes: IColorSchemes;

	constructor() {
		this.colorSchemes = this.getColorSchemes();
	}

	translateColor(color: Color): string {
		if (!this.colorSchemes) {
			throw new Error('init ColorTranslator first!');
		}

		return this.matchWithOffset(color, COLOR_OFFSET) as string;
	}

	matchWithOffset(color: Color, offset: number): schemeNames | "not found" {
		for (const scheme in schemeNames) {
			const matchedColor = this.colorSchemes[scheme].find(s => {
				return (
					Math.abs(s.rgb.r - color.r) <= offset &&
					Math.abs(s.rgb.g - color.g) <= offset &&
					Math.abs(s.rgb.b - color.b) <= offset
				);
			});
			if (matchedColor) {
				return schemeNames[scheme];
			}
		}
		return "not found";
	}

	getColorSchemes(): IColorSchemes {
		console.log(`Loaded: ${ JSON.stringify(autumn, null, 2) }`);
		return {
			autumn: autumn
		}
	}

	

}