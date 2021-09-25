import { Game } from '../Game';
import { IEventInstance } from '../events/IEventInstance';

export type IScene = {
    key?: string;
    game: Game;
    events: Map<string, Set<IEventInstance>>;
} & ISceneProps;

export type ISceneProps = {
    create? (): void;
    update? (delta: number, time: number): void;
    shutdown? (): void;
    destroy? (): void;
}