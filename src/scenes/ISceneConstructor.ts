import { IScene, ISceneProps } from './IScene';
import { ISceneConfig } from './ISceneConfig';

export type ISceneConstructor =
{
    new (config?: string | ISceneConfig): IScene;
} | ISceneProps;
