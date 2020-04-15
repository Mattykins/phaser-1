/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
/**
 * Check whether `a` is fuzzily greater than `b`.
 *
 * `a` is fuzzily greater than `b` if it is more than `b - epsilon`.
 *
 * @function Phaser.Math.Fuzzy.GreaterThan
 * @since 3.0.0
 *
 * @param {number} a - The first value.
 * @param {number} b - The second value.
 * @param {number} [epsilon=0.0001] - The epsilon.
 *
 * @return {boolean} `true` if `a` is fuzzily greater than than `b`, otherwise `false`.
 */
export default function GreaterThan(a, b, epsilon = 0.0001) {
    return a > b - epsilon;
}
//# sourceMappingURL=GreaterThan.js.map