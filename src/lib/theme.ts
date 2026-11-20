import type { Color } from './data';

/** Static class strings so Tailwind can detect every class at build time. */
export const colorTheme: Record<Color, { fill: string; band: string; bandText: string; chip: string }> = {
	Red: { fill: '#dc2626', band: 'bg-red-600', bandText: 'text-white', chip: 'bg-red-50 text-red-800 ring-red-200' },
	Blue: { fill: '#2563eb', band: 'bg-blue-600', bandText: 'text-white', chip: 'bg-blue-50 text-blue-800 ring-blue-200' },
	Green: { fill: '#16a34a', band: 'bg-green-600', bandText: 'text-white', chip: 'bg-green-50 text-green-800 ring-green-200' },
	Yellow: { fill: '#facc15', band: 'bg-yellow-400', bandText: 'text-yellow-950', chip: 'bg-yellow-50 text-yellow-900 ring-yellow-300' },
	Purple: { fill: '#9333ea', band: 'bg-purple-600', bandText: 'text-white', chip: 'bg-purple-50 text-purple-800 ring-purple-200' }
};
