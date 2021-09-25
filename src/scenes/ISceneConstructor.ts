import { IScene } from './IScene';
import { ISceneConfig } from './ISceneConfig';

export type ISceneConstructor
{
    new (config?: string | ISceneConfig): IScene;
}
