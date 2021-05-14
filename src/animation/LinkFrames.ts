import { IAnimation } from './IAnimation';
import { IAnimationFrame } from './IAnimationFrame';

export function LinkFrames (animation: IAnimation): IAnimation
{
    const totalFrames = animation.frames.size;

    if (totalFrames === 0)
    {
        return animation;
    }

    //  Link the AnimationFrames together, so we can advance from one to the next without searching the Set
    let i = 0;

    const framePercent = 1 / totalFrames;

    let firstFrame: IAnimationFrame;
    let prevFrame: IAnimationFrame;

    for (const frame of animation.frames.values())
    {
        if (!prevFrame)
        {
            frame.isFirst = true;

            animation.firstFrame = frame;

            firstFrame = frame;
        }
        else
        {
            prevFrame.nextFrame = frame;

            frame.prevFrame = prevFrame;
        }

        prevFrame = frame;

        i++;

        frame.progress = framePercent * i;

        if (i === totalFrames)
        {
            //  Link them end-to-end, so they loop
            frame.isLast = true;

            frame.nextFrame = firstFrame;

            firstFrame.prevFrame = frame;
        }
    }

    return animation;
}
