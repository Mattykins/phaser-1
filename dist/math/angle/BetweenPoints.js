/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
/**
 * Find the angle of a segment from (point1.x, point1.y) -> (point2.x, point2.y).
 *
 * Calculates the angle of the vector from the first point to the second point.
 *
 * @function Phaser.Math.Angle.BetweenPoints
 * @since 3.0.0
 *
 * @param {IVec2} point1 - The first point.
 * @param {IVec2} point2 - The second point.
 *
 * @return {number} The angle in radians.
 */
export default function BetweenPoints(point1, point2) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x);
}
//# sourceMappingURL=BetweenPoints.js.map