/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { IRectangle } from './IRectangle';

/**
 * Merges the source rectangle into the target rectangle and returns the target.
 * Neither rectangle should have a negative width or height.
 *
 * @function Phaser.Geom.Rectangle.MergeRect
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.Rectangle} O - [target,$return]
 *
 * @param {Phaser.Geom.Rectangle} target - Target rectangle. Will be modified to include source rectangle.
 * @param {Phaser.Geom.Rectangle} source - Rectangle that will be merged into target rectangle.
 *
 * @return {Phaser.Geom.Rectangle} Modified target rectangle that contains source rectangle.
 */
export function MergeRect (target: IRectangle, source: IRectangle): IRectangle
{
    const minX = Math.min(target.x, source.x);
    const maxX = Math.max(target.right, source.right);
    const minY = Math.min(target.y, source.y);
    const maxY = Math.max(target.bottom, source.bottom);

    return target.set(
        minX,
        minY,
        maxX - minX,
        maxY - minY
    );
}
