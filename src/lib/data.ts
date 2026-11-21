export const COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'] as const;
export const SHAPES = ['Circle', 'Triangle', 'Square', 'Star', 'Diamond'] as const;
export const GENDERS = ['Boy', 'Girl'] as const;

export type Color = (typeof COLORS)[number];
export type Shape = (typeof SHAPES)[number];
export type Gender = (typeof GENDERS)[number];

export interface Participant {
	name: string;
	gender: Gender;
	color: Color;
	number: number;
	shape: Shape;
}

/**
 * Source of truth for card assignments. Do not edit, regenerate, or reassign.
 */
export const participants: readonly Participant[] = [
	// Boys
	{ name: 'Ray Sison', gender: 'Boy', color: 'Yellow', number: 4, shape: 'Diamond' },
	{ name: 'John Uy', gender: 'Boy', color: 'Blue', number: 2, shape: 'Circle' },
	{ name: 'Miguel Lamorena', gender: 'Boy', color: 'Purple', number: 4, shape: 'Star' },
	{ name: 'Jaylord Matanguihan', gender: 'Boy', color: 'Yellow', number: 3, shape: 'Triangle' },
	{ name: 'Gio Mascardo', gender: 'Boy', color: 'Red', number: 1, shape: 'Circle' },
	{ name: 'Jeremy Mercado', gender: 'Boy', color: 'Blue', number: 4, shape: 'Star' },
	{ name: 'Jovenalfrie Pancubila', gender: 'Boy', color: 'Green', number: 5, shape: 'Triangle' },
	{ name: 'Howard Muana', gender: 'Boy', color: 'Yellow', number: 2, shape: 'Circle' },
	{ name: 'Mark Cariño', gender: 'Boy', color: 'Red', number: 2, shape: 'Triangle' },
	{ name: 'Michael Gideon Genita', gender: 'Boy', color: 'Purple', number: 1, shape: 'Square' },
	{ name: 'Marvin Pelejo', gender: 'Boy', color: 'Green', number: 1, shape: 'Square' },
	{ name: 'Jerogel Picones', gender: 'Boy', color: 'Purple', number: 5, shape: 'Square' },
	{ name: 'Joel Fresco', gender: 'Boy', color: 'Blue', number: 3, shape: 'Diamond' },

	// Girls
	{ name: 'Bea Regala', gender: 'Girl', color: 'Green', number: 2, shape: 'Star' },
	{ name: 'Laiza Malazarte', gender: 'Girl', color: 'Yellow', number: 5, shape: 'Square' },
	{ name: 'Ruth Malazarte', gender: 'Girl', color: 'Purple', number: 3, shape: 'Circle' },
	{ name: 'Kathryn Villanueva', gender: 'Girl', color: 'Purple', number: 2, shape: 'Diamond' },
	{ name: 'Bei Asis', gender: 'Girl', color: 'Green', number: 3, shape: 'Diamond' },
	{ name: 'Grace Duro', gender: 'Girl', color: 'Blue', number: 1, shape: 'Star' },
	{ name: 'Leslie Maningan', gender: 'Girl', color: 'Blue', number: 5, shape: 'Triangle' },
	{ name: 'Hannah Baldivia', gender: 'Girl', color: 'Red', number: 3, shape: 'Star' },
	{ name: 'Danlyn Dalisay', gender: 'Girl', color: 'Green', number: 4, shape: 'Square' },
	{ name: 'Akira Grandia', gender: 'Girl', color: 'Red', number: 4, shape: 'Circle' },
	{ name: 'Gwen Mata', gender: 'Girl', color: 'Yellow', number: 1, shape: 'Triangle' },
	{ name: 'Jedearlie Vargas', gender: 'Girl', color: 'Red', number: 5, shape: 'Diamond' }
];
