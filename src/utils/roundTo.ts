/**
 * Round a number to a specific precision
 * @param value - The number to round
 * @param precision - The number of decimal places to round to (e.g. 2 for `0.00`)
 */
export default function roundTo(value: number, precision: number) {
    const multiplier = 10 ** precision;
    return Math.round(value * multiplier) / multiplier;
}