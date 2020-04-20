/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Florian Mertens
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { IVec2 } from '../../math/vec2/IVec2';
import { ILine } from '../line/ILine';

/**
 * Checks if the a Point falls between the two end-points of a Line, based on the given line thickness.
 * 
 * Assumes that the line end points are circular, not square.
 *
 * @function Phaser.Geom.Intersects.PointToLine
 * @since 3.0.0
 *
 * @param {(Phaser.Geom.Point|any)} point - The point, or point-like object to check.
 * @param {Phaser.Geom.Line} line - The line segment to test for intersection on.
 * @param {number} [lineThickness=1] - The line thickness. Assumes that the line end points are circular.
 *
 * @return {boolean} `true` if the Point falls on the Line, otherwise `false`.
 */
export function PointToLine (point: IVec2, line: ILine, lineThickness: number = 1): boolean
{
    const { x1, y1, x2, y2 } = line;
    const { x: px, y: py } = point;

    const L2 = (((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

    if (L2 === 0)
    {
        return false;
    }

    const r = (((px - x1) * (x2 - x1)) + ((py - y1) * (y2 - y1))) / L2;

    //  Assume line thickness is circular
    if (r < 0)
    {
        //  Outside line1
        return (Math.sqrt(((x1 - px) * (x1 - px)) + ((y1 - py) * (y1 - py))) <= lineThickness);
    }
    else if ((r >= 0) && (r <= 1))
    {
        //  On the line segment
        const s = (((y1 - py) * (x2 - x1)) - ((x1 - px) * (y2 - y1))) / L2;

        return (Math.abs(s) * Math.sqrt(L2) <= lineThickness);
    }
    else
    {
        //  Outside line2
        return (Math.sqrt(((x2 - px) * (x2 - px)) + ((y2 - py) * (y2 - py))) <= lineThickness);
    }
}
