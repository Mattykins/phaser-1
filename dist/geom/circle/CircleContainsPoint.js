/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {CircleContains} from "./CircleContains";
export function CircleContainsPoint(circle, point) {
  return CircleContains(circle, point.x, point.y);
}
