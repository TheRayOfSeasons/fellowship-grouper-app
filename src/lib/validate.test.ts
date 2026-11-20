import { describe, expect, it } from 'vitest';
import { participants } from './data';
import { validate } from './validate';

const clone = () => participants.map((p) => ({ ...p })) as Record<string, unknown>[];

describe('validate', () => {
	it('accepts the real assignment data', () => {
		expect(validate(participants)).toEqual([]);
	});

	it('rejects a duplicate combination', () => {
		const d = clone();
		d[1] = { ...d[1], color: d[0].color, number: d[0].number, shape: d[0].shape };
		expect(validate(d).some((e) => e.includes('duplicates the combination'))).toBe(true);
	});

	it('rejects an out-of-range number', () => {
		const d = clone();
		d[0].number = 6;
		expect(validate(d).some((e) => e.includes('invalid number'))).toBe(true);
	});

	it('rejects a non-integer number', () => {
		const d = clone();
		d[0].number = 2.5;
		expect(validate(d).some((e) => e.includes('invalid number'))).toBe(true);
	});

	it('rejects an unknown color and shape', () => {
		const d = clone();
		d[0].color = 'Orange';
		d[1].shape = 'Hexagon';
		const errors = validate(d);
		expect(errors.some((e) => e.includes('invalid color'))).toBe(true);
		expect(errors.some((e) => e.includes('invalid shape'))).toBe(true);
	});

	it('rejects a missing field', () => {
		const d = clone();
		delete d[3].shape;
		expect(validate(d).some((e) => e.includes('missing a shape'))).toBe(true);
	});

	it('rejects the wrong participant count', () => {
		const errors = validate(clone().slice(0, 24));
		expect(errors.some((e) => e.includes('Expected 25 participants'))).toBe(true);
		expect(errors.some((e) => e.includes('girls'))).toBe(true);
	});

	it('rejects the wrong gender split', () => {
		const d = clone();
		d[0].gender = 'Girl';
		expect(validate(d).some((e) => e.includes('Expected 13 boys'))).toBe(true);
	});
});
