/**
 * Handy utilities for Arcade games
 */
//% weight=100 color=#0A5B9E icon="\uf1ec"
namespace utils {

    /**
     * Create a sprite with random position in the screen bounds.
     */
    //% block="create sprite at random position with image %img"
    //% img.shadow="screen_image_picker"
    //% group="Sprites"
    export function createSpriteAtRandom(img: Image): Sprite {
        const sprite = sprites.create(img, SpriteKind.Player);
        sprite.setPosition(randint(10, screen.width() - 10), randint(10, screen.height() - 10));
        return sprite;
    }

    /**
     * Shake the camera for a dramatic effect.
     */
    //% block="shake camera for %duration ms with intensity %intensity"
    //% duration.defl=500 intensity.defl=4
    //% group="Effects"
    export function shakeCamera(duration: number = 500, intensity: number = 4) {
        const scene = game.currentScene();
        if (scene && scene.camera) {
            scene.camera.shake(intensity, duration);
        }
    }

    /**
     * Destroy all sprites of a given kind after a delay.
     */
    //% block="destroy all sprites of kind %kind after %delay ms"
    //% delay.defl=0
    //% group="Sprites"
    export function destroyAllOfKind(kind: number, delay: number = 0) {
        if (delay <= 0) {
            sprites.allOfKind(kind).forEach(s => s.destroy());
        } else {
            timer.after(delay, () => {
                sprites.allOfKind(kind).forEach(s => s.destroy());
            });
        }
    }

    /**
     * Return a random color from the standard Arcade palette.
     */
    //% block="random arcade color"
    //% group="Random"
    export function randomColor(): number {
        const colors = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        return colors[randint(0, colors.length - 1)];
    }

    /**
     * Simple countdown timer that shows on screen.
     */
    //% block="start countdown from %seconds"
    //% group="Timers"
    export function startCountdown(seconds: number) {
        let timeLeft = seconds;
        const textSprite = textsprite.create(timeLeft.toString(), 1, 15);
        textSprite.setPosition(screen.width() / 2, 20);

        game.onUpdateInterval(1000, () => {
            timeLeft--;
            textSprite.setText(timeLeft.toString());
            if (timeLeft <= 0) {
                textSprite.destroy();
            }
        });
    }
}
