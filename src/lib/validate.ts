import { COLORS, GENDERS, SHAPES, type Participant } from './data';

export const EXPECTED_TOTAL = 25;
export const EXPECTED_BOYS = 13;
export const EXPECTED_GIRLS = 12;

/**
 * Validates assignment data. Returns a list of human-readable errors (empty when valid).
 * Never mutates or "fixes" the data.
 */
export function validate(list: readonly unknown[]): string[] {
	const errors: string[] = [];

	if (list.length !== EXPECTED_TOTAL) {
		errors.push(`Expected ${EXPECTED_TOTAL} participants, found ${list.length}.`);
	}

	const names = new Set<string>();
	const combos = new Map<string, string>();
	let boys = 0;
	let girls = 0;

	list.forEach((raw, i) => {
		const p = (raw ?? {}) as Partial<Participant>;
		const label =
			typeof p.name === 'string' && p.name.trim() ? `"${p.name}"` : `Entry #${i + 1}`;

		if (typeof p.name !== 'string' || !p.name.trim()) {
			errors.push(`${label} is missing a name.`);
		} else if (names.has(p.name)) {
			errors.push(`${label} appears more than once.`);
		} else {
			names.add(p.name);
		}

		if (p.gender === 'Boy') boys++;
		else if (p.gender === 'Girl') girls++;
		else errors.push(`${label} has an invalid gender (${String(p.gender)}); allowed: ${GENDERS.join(', ')}.`);

		const colorOk = (COLORS as readonly unknown[]).includes(p.color);
		const shapeOk = (SHAPES as readonly unknown[]).includes(p.shape);
		const numberOk = Number.isInteger(p.number) && p.number! >= 1 && p.number! <= 5;

		if (p.color === undefined || p.color === null) errors.push(`${label} is missing a color.`);
		else if (!colorOk) errors.push(`${label} has an invalid color "${String(p.color)}"; allowed: ${COLORS.join(', ')}.`);

		if (p.number === undefined || p.number === null) errors.push(`${label} is missing a number.`);
		else if (!numberOk) errors.push(`${label} has an invalid number "${String(p.number)}"; must be an integer from 1 to 5.`);

		if (p.shape === undefined || p.shape === null) errors.push(`${label} is missing a shape.`);
		else if (!shapeOk) errors.push(`${label} has an invalid shape "${String(p.shape)}"; allowed: ${SHAPES.join(', ')}.`);

		if (colorOk && shapeOk && numberOk) {
			const key = `${p.color} ${p.number} ${p.shape}`;
			const prev = combos.get(key);
			if (prev) errors.push(`${label} duplicates the combination ${key} already assigned to ${prev}.`);
			else combos.set(key, label);
		}
	});

	if (boys !== EXPECTED_BOYS) errors.push(`Expected ${EXPECTED_BOYS} boys, found ${boys}.`);
	if (girls !== EXPECTED_GIRLS) errors.push(`Expected ${EXPECTED_GIRLS} girls, found ${girls}.`);
	if (combos.size !== EXPECTED_TOTAL) {
		errors.push(`Expected ${EXPECTED_TOTAL} unique color-number-shape combinations, found ${combos.size}.`);
	}

	return errors;
}
