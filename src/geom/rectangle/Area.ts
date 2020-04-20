/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { IRectangle } from './IRectangle';

/**
 * Calculates the area of the given Rectangle object.
 *
 * @function Phaser.Geom.Rectangle.Area
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Rectangle} rect - The rectangle to calculate the area of.
 *
 * @return {number} The area of the Rectangle object.
 */
export function Area (rect: IRectangle): number
{
    return rect.width * rect.height;
}
