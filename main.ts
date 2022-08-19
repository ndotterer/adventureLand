enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
    export const snaper = SpriteKind.create()
    export const hardHatBumper = SpriteKind.create()
    export const flierBoss = SpriteKind.create()
    export const blueflier = SpriteKind.create()
    export const fish = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    water = 2
    inWater = game.runtime()
    canDoubleJump = true
})
function createBoss () {
    for (let value of tiles.getTilesByType(assets.tile`tile22`)) {
        redFlier = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 4 4 4 4 4 4 4 f . . . 
            . . . f 4 2 2 4 4 4 2 2 4 f . . 
            . f . f 4 4 4 2 4 2 4 4 4 f . f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . f 4 4 4 4 4 2 4 2 4 4 4 4 4 f 
            . f 4 4 4 4 4 2 4 2 4 4 4 4 4 f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . . . f 4 4 2 2 2 2 2 4 4 f . . 
            . . . . f 4 2 4 4 4 2 4 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.flierBoss)
        tiles.placeOnTile(redFlier, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        boss += 1
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(1)
        music.powerUp.play()
    } else {
        info.changeLifeBy(-1)
        sprite.say("Ow!", invincibilityPeriod)
        music.powerDown.play()
    }
    pause(invincibilityPeriod)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile`, function (sprite, location) {
    lavaburn()
})
function initializeAnimations () {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
    initializeblueFlierAnimations()
}
function giveIntroduction () {
    game.setDialogFrame(img`
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        2 2 1 1 1 1 1 1 1 1 1 1 1 2 2 . 
        2 1 1 2 2 2 2 2 2 2 2 2 1 1 2 . 
        2 1 2 2 1 1 1 1 1 1 1 2 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 2 1 1 1 1 1 1 1 2 2 1 2 . 
        2 1 1 2 2 2 2 2 2 2 2 2 1 1 2 . 
        2 2 1 1 1 1 1 1 1 1 1 1 1 2 2 . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    showInstruction("Move with the left and right buttons.")
    showInstruction("Jump with the A button.")
    showInstruction("Double jump by pressing jump again.")
}
function initializeCoinAnimation () {
    coinAnimation = animation.createAnimation(ActionKind.Idle, 200)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . f 5 f 5 5 5 5 5 f . . . . 
        . . f 5 f 5 5 5 4 5 5 f . . . . 
        . . f 5 f 5 5 5 4 4 5 5 f . . . 
        . . f 5 f 5 5 5 4 4 5 5 f . . . 
        . . f 5 f 5 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 5 5 5 f . . . . 
        . . . . f 5 f 5 5 5 f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f 5 f 5 f f . . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . f 5 f 5 5 5 5 f f . . . . 
        . . . f 5 f 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 5 5 f f . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . . f f 5 f 5 f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . f 5 f 5 f f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f f 5 f 5 f . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f 5 f 5 f f . . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . f f 5 5 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 f 5 f . . . 
        . . . . f f 5 5 5 5 f 5 f . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . . f f 5 f 5 f f . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . f 5 5 5 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 5 f 5 f . . 
        . . . f 5 5 4 4 5 5 5 f 5 f . . 
        . . . f 5 5 4 4 5 5 5 f 5 f . . 
        . . . . f 5 5 4 5 5 5 f 5 f . . 
        . . . . f 5 5 5 5 5 f 5 f . . . 
        . . . . . f 5 5 5 f 5 f . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
scene.onOverlapTile(SpriteKind.hardHatBumper, assets.tile`tile16`, function (sprite, location) {
    if (sprite.tileKindAt(TileDirection.Left, assets.tile`tile16`)) {
        sprite.vx = Math.randomRange(30, 60)
    } else if (sprite.tileKindAt(TileDirection.Right, assets.tile`tile16`)) {
        sprite.vx = Math.randomRange(-60, -30)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(3)
    music.baDing.play()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile21`, function (sprite, location) {
    if (boss < 1) {
        info.changeLifeBy(1)
        if (bonus > 0) {
            if (game.ask("you got the cherry!", "go to bonus level?")) {
                bonusLevel()
            } else {
                normalLevel()
            }
        } else {
            normalLevel()
        }
        bonus = 0
    }
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters / water
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (hero.vy >= -40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed / water
        canDoubleJump = false
    }
}
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f d d f d d d d f d d e d f . 
        . f d d f d d d d f d d d e f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d d c c c c c c d d d f . . 
        . f d f f f b b f f f d d f . . 
        . . f a a a a a a a a a b f . . 
        . . . f a a b f f a a b f . . . 
        . . . f a a b f f a a b f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d d f d d d d f d d f . 
        . f e d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . . f d d d c c c c c c d d f . 
        . . f d d f f f b b f f f d f . 
        . . f b a a a a a a a a a f . . 
        . . . f b a a f f b a a f . . . 
        . . . f b a a f f b a a f . . . 
        . . . . f f f . . f f f . . . . 
        `)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    lavaburn()
})
function setLevelTileMap (level: number) {
    if (level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 4) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 5) {
        tiles.setTilemap(tilemap`level_4`)
    } else if (level == 6) {
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 7) {
        tiles.setTilemap(tilemap`level_6`)
    } else if (level == 8) {
        tiles.setTilemap(tilemap`level1`)
    } else if (level == 9) {
        tiles.setTilemap(tilemap`level2`)
    } else if (level == 10) {
        tiles.setTilemap(tilemap`level3`)
    } else if (level == 11) {
        tiles.setTilemap(tilemap`level4`)
    } else if (level == 12) {
        tiles.setTilemap(tilemap`level8`)
    } else if (level == 13) {
        tiles.setTilemap(tilemap`level9`)
    } else if (level == 14) {
        tiles.setTilemap(tilemap`level12`)
    } else if (level == 15) {
        tiles.setTilemap(tilemap`level13`)
    } else if (level == 16) {
        tiles.setTilemap(tilemap`level14`)
    } else if (level == 17) {
        tiles.setTilemap(tilemap`level15`)
    } else if (level == 18) {
        tiles.setTilemap(tilemap`level17`)
    } else if (level == 19) {
        tiles.setTilemap(tilemap`level19`)
    } else if (level == 20) {
        tiles.setTilemap(tilemap`level20`)
    } else if (level == 21) {
        tiles.setTilemap(tilemap`level46`)
    } else if (level == 22) {
        tiles.setTilemap(tilemap`level47`)
    } else if (level == 23) {
        tiles.setTilemap(tilemap`level49`)
    } else {
        if (level == 24) {
            tiles.setCurrentTilemap(tilemap`level82`)
        }
    }
    clearGame()
    initializeLevel(level)
}
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Flying, 100)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . f . f 4 4 4 5 4 5 4 4 4 f . f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . . . f 4 4 5 5 5 5 5 4 4 f . . 
        . . . . f 4 5 4 4 4 5 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . . . f 4 4 4 5 4 5 4 4 4 f . . 
        . . f 4 4 4 4 4 4 4 4 4 4 4 f . 
        . . f 4 4 4 4 5 4 5 4 4 4 4 f . 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
        . f 4 f 4 4 5 5 5 5 5 4 4 f 4 f 
        . f f . f 4 5 4 4 4 5 4 f . f f 
        . f . . . f f f f f f f . . . f 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . f . f 4 4 4 5 4 5 4 4 4 f . f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . . . f 4 4 5 5 5 5 5 4 4 f . . 
        . . . . f 4 5 4 4 4 5 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierIdle = animation.createAnimation(ActionKind.Idle, 100)
    flierIdle.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . f . f 4 4 4 5 4 5 4 4 4 f . f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . . . f 4 4 5 5 5 5 5 4 4 f . . 
        . . . . f 4 5 4 4 4 5 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    if (info.life() < 8) {
        info.changeLifeBy(1)
    }
    if (bonus > 0) {
        game.splash("Next level unlocked!")
        if (game.ask("you got the cherry!", "go to bonus level?")) {
            bonusLevel()
        } else {
            normalLevel()
        }
    } else {
        normalLevel()
    }
    bonus = 0
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 100)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d d f d d e d e e f . . . . 
        . f d d f d d d e e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c c c a a c c b f . . . . 
        . . f c c d d d c c b f . . . . 
        . . f b f f d d f f f f . . . . 
        . . f a a a a a a a b f . . . . 
        . . . f a a a a b f f . . . . . 
        . . . f a a a a b f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d d f d d e d e e f . . . . 
        . f d d f d d d e e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c c c c a a c b f . . . . 
        . . f c c c c d d c b f . . . . 
        . . f b f f d d d f f f f . . . 
        . . f a a a a a a a a b f f . . 
        . . . f a a b f f a a a f f . . 
        . . . . f f f . f f f f f . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d d f d d e d e e f . . . . 
        . f d d f d d d e e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c c c a a c c b f . . . . 
        . . f c c d d d c c b f . . . . 
        . . f b f f d d f f f f . . . . 
        . . f a a a a a a a b f . . . . 
        . . . f a a a a b f f . . . . . 
        . . . f a a a a b f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d d f d d e d e e f . . . . 
        . f d d f d d d e e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c a a c c c c b f . . . . 
        . f d d d b c c c c b f . . . . 
        f f f d d f f f f f f f . . . . 
        f f f a a a a a a a b f . . . . 
        . f a a b f a a b f f . . . . . 
        . f f f f . f f f . . . . . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 100)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d d f d d f . 
        . . . . f e e e d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c c a a c c c f . . 
        . . . . f b c c d d d c c f . . 
        . . . . f f f f d d f f b f . . 
        . . . . f b a a a a a a a f . . 
        . . . . . f f b a a a a f . . . 
        . . . . . . f b a a a a f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d d f d d f . 
        . . . . f e e e d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c a a c c c c f . . 
        . . . . f b c d d c c c c f . . 
        . . . f f f f d d d f f b f . . 
        . . f f b a a a a a a a a f . . 
        . . f f a a a f f b a a f . . . 
        . . . f f f f . . f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d d f d d f . 
        . . . . f e e e d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c c a a c c c f . . 
        . . . . f b c c d d d c c f . . 
        . . . . f f f f d d f f b f . . 
        . . . . f b a a a a a a a f . . 
        . . . . . f f b a a a a f . . . 
        . . . . . . f b a a a a f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d d f d d f . 
        . . . . f e e e d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c c c c a a c f . . 
        . . . . f b c c c c b d d d f . 
        . . . . f f f f f f f d d f f f 
        . . . . f b a a a a a a a f f f 
        . . . . . f f b a a f b a a f . 
        . . . . . . . f f f . f f f . . 
        `)
}
scene.onOverlapTile(SpriteKind.Flier, assets.tile`tile`, function (sprite, location) {
    sprite.destroy(effects.fire, 500)
})
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f d d f d d d d f d d e d f . 
        . f d d f d d d d f d d d e f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d d c c c c c c d d d f . . 
        . f d f f f b b f f f d d f . . 
        . . f a a a a a a a a a b f . . 
        . . . f a a b f f a a b f . . . 
        . . . f a a b f f a a b f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f d d f d d d d f d d e d f . 
        . f d d f d d d d f d d d e f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d d c c c c c c d d d f . . 
        . f d f f f b b f f f d d f . . 
        . . f a a a a a a a a a b f . . 
        . . . f a a b f f a a b f . . . 
        . . . . f f f . . f f f . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f f . . . 
            . . f e e e e e e e e e e f . . 
            . f e e e e e e e e e e e e f . 
            . f d d d d d d d d d e e d f . 
            . f d d f d d d d f d d e d f . 
            . f d d f d d d d f d d d e f . 
            . f d d f d d d d f d d d f . . 
            . f d d d d d d d d d d d f f . 
            . d a b c c c c c c c c b a d . 
            . d a c c c c c c c c c c a d . 
            . f f f f f b b f f f f f f f . 
            . . f a a a a a a a a a b f . . 
            . . . f a a b f f a a b f . . . 
            . . . . f f f . . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d d f d d d d f d d f . 
        . f e d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . . f d d d c c c c c c d d f . 
        . . f d d f f f b b f f f d f . 
        . . f b a a a a a a a a a f . . 
        . . . f b a a f f b a a f . . . 
        . . . f b a a f f b a a f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d d f d d d d f d d f . 
        . f e d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . . f d d d c c c c c c d d f . 
        . . f d d f f f b b f f f d f . 
        . . f b a a a a a a a a a f . . 
        . . . f b a a f f b a a f . . . 
        . . . . f f f . . f f f . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f f . . . 
            . . f e e e e e e e e e e f . . 
            . f e e e e e e e e e e e e f . 
            . f d e e d d d d d d d d d f . 
            . f d e d d f d d d d f d d f . 
            . f e d d d f d d d d f d d f . 
            . . f d d d f d d d d f d d f . 
            . f f d d d d d d d d d d d f . 
            . d a b c c c c c c c c b a d . 
            . d a c c c c c c c c c c a d . 
            . f f f f f f f b b f f f f f . 
            . . f b a a a a a a a a a f . . 
            . . . f b a a f f b a a f . . . 
            . . . . f f f . . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
}
scene.onOverlapTile(SpriteKind.Bumper, assets.tile`myTile`, function (sprite, location) {
    sprite.destroy(effects.rings, 500)
})
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f d d f d d d d f d d e d f . 
        . f d d f d d d d f d d d e f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d c c c c c c c c c d d f . 
        f d d f f f b b f f f f d d f . 
        . f f a a a a a a a a a b f . . 
        . . . f f f f . f f f f f . . . 
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d d f d d d d f d d f . 
        . f e d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . f d d c c c c c c c c c d f . 
        . f d d f f f f b b f f f d d f 
        . . f b a a a a a a a a a f f . 
        . . . f f f f f . f f f f . . . 
        `)
}
scene.onOverlapTile(SpriteKind.Bumper, assets.tile`tile`, function (sprite, location) {
    sprite.destroy(effects.fire, 500)
})
function clearGame () {
    for (let value2 of sprites.allOfKind(SpriteKind.snaper)) {
        value2.destroy()
    }
    for (let value10 of sprites.allOfKind(SpriteKind.Bumper)) {
        value10.destroy()
    }
    for (let value102 of sprites.allOfKind(SpriteKind.hardHatBumper)) {
        value102.destroy()
    }
    for (let value22 of sprites.allOfKind(SpriteKind.Coin)) {
        value22.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
    for (let value5 of sprites.allOfKind(SpriteKind.Food)) {
        value5.destroy()
    }
    for (let value6 of sprites.allOfKind(SpriteKind.blueflier)) {
        value6.destroy()
    }
    for (let value6 of sprites.allOfKind(SpriteKind.fish)) {
        value6.destroy()
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile26`, function (sprite, location) {
    water = 2
    inWater = game.runtime()
    canDoubleJump = true
})
function lavaburn () {
    if (lava + 499 < game.runtime()) {
        info.changeLifeBy(-1)
        lava = game.runtime()
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile1`, function (sprite, location) {
    if (info.life() < 8) {
        info.changeLifeBy(1)
    }
    if (bonus > 0) {
        game.splash("Next level unlocked!")
        if (game.ask("you got the cherry!", "go to bonus level?")) {
            bonusLevel()
        } else {
            normalLevel()
        }
    } else {
        normalLevel()
    }
    bonus = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("Ow!", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
scene.onOverlapTile(SpriteKind.Bumper, assets.tile`tile16`, function (sprite, location) {
    if (sprite.tileKindAt(TileDirection.Left, assets.tile`tile16`)) {
        sprite.vx = Math.randomRange(30, 60)
    } else if (sprite.tileKindAt(TileDirection.Right, assets.tile`tile16`)) {
        sprite.vx = Math.randomRange(-60, -30)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.hardHatBumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        sprite.vy = -2 * pixelsToMeters
    } else {
        info.changeLifeBy(-1)
        sprite.say("Ow!", invincibilityPeriod)
        music.powerDown.play()
    }
    pause(invincibilityPeriod)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.flierBoss, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    hero.say("ow", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function createEnemies () {
    // enemy that moves back and forth
    for (let value52 of tiles.getTilesByType(assets.tile`tile4`)) {
        bumper = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . f 7 2 7 7 7 2 f . . . . . 
            . . f 7 7 7 2 7 2 7 7 f . . . . 
            . . f 7 7 7 7 7 7 7 7 7 f . . . 
            . f 7 7 7 2 7 7 7 2 7 7 f . . . 
            . f 7 7 7 2 7 7 7 2 7 7 7 f . . 
            . f 7 7 7 7 7 7 7 7 7 7 7 7 f . 
            . f 7 7 7 7 2 2 2 7 7 7 7 7 f . 
            . . f 7 7 2 2 7 2 2 7 7 7 7 f . 
            . . f 7 7 2 7 7 7 2 2 7 7 7 f . 
            . . . f 7 7 7 7 7 7 7 7 7 7 f . 
            . . . . f f 7 7 7 7 7 7 7 f . . 
            . . . . . . f f f f f f f . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value52)
        tiles.setTileAt(value52, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
    // enemy that flies at player
    for (let value62 of tiles.getTilesByType(assets.tile`tile7`)) {
        flier = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 4 4 4 4 4 4 4 f . . . 
            . . . f 4 5 5 4 4 4 5 5 4 f . . 
            . f . f 4 4 4 5 4 5 4 4 4 f . f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . . . f 4 4 5 5 5 5 5 4 4 f . . 
            . . . . f 4 5 4 4 4 5 4 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value62)
        tiles.setTileAt(value62, assets.tile`tile0`)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
    for (let value103 of tiles.getTilesByType(assets.tile`tile13`)) {
        snapey = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . a a 1 . . . 1 a a . . . . 
            . . . a a . . . . . a a . . . . 
            . . . . a a 1 . 1 a a . . . . . 
            . . . . a a . . . a a . . . . . 
            . . . . . a a . a a . . . . . . 
            . . . . . a a 1 a a . . . . . . 
            . . . . . . a a a . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            . . . . 7 . . 7 . . 7 . . . . . 
            . . . . . 7 . 7 . 7 . . . . . . 
            . . . . . . 7 7 7 . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            `, SpriteKind.snaper)
        tiles.placeOnTile(snapey, value103)
        tiles.setTileAt(value103, assets.tile`transparency16`)
        animation.runImageAnimation(
        snapey,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . a a 1 . . . 1 a a . . . . 
            . . . a a . . . . . a a . . . . 
            . . . . a a 1 . 1 a a . . . . . 
            . . . . a a . . . a a . . . . . 
            . . . . . a a . a a . . . . . . 
            . . . . . a a 1 a a . . . . . . 
            . . . . . . a a a . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            . . . . 7 . . 7 . . 7 . . . . . 
            . . . . . 7 . 7 . 7 . . . . . . 
            . . . . . . 7 7 7 . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . a c a . . . . . . . 
            . . . . . a a c a a . . . . . . 
            . . . . a a a 1 a a a . . . . . 
            . . . . a a a c a a a . . . . . 
            . . . . a a a c a a a . . . . . 
            . . . . . a a 1 a a . . . . . . 
            . . . . . a a c a a . . . . . . 
            . . . . . . a c a . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            . . . . 7 . . 7 . . 7 . . . . . 
            . . . . . 7 . 7 . 7 . . . . . . 
            . . . . . . 7 7 7 . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            `],
        200,
        true
        )
    }
    for (let value103 of tiles.getTilesByType(assets.tile`myTile3`)) {
        snapey = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . a a 1 . . . 1 a a . . . . 
            . . . a a . . . . . a a . . . . 
            . . . . a a 1 . 1 a a . . . . . 
            . . . . a a . . . a a . . . . . 
            . . . . . a a . a a . . . . . . 
            . . . . . a a 1 a a . . . . . . 
            . . . . . . a a a . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            . . . . 7 . . 7 . . 7 . . . . . 
            . . . . . 7 . 7 . 7 . . . . . . 
            . . . . . . 7 7 7 . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            `, SpriteKind.snaper)
        tiles.placeOnTile(snapey, value103)
        tiles.setTileAt(value103, assets.tile`myTile0`)
        animation.runImageAnimation(
        snapey,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . a a 1 . . . 1 a a . . . . 
            . . . a a . . . . . a a . . . . 
            . . . . a a 1 . 1 a a . . . . . 
            . . . . a a . . . a a . . . . . 
            . . . . . a a . a a . . . . . . 
            . . . . . a a 1 a a . . . . . . 
            . . . . . . a a a . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            . . . . 7 . . 7 . . 7 . . . . . 
            . . . . . 7 . 7 . 7 . . . . . . 
            . . . . . . 7 7 7 . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . a c a . . . . . . . 
            . . . . . a a c a a . . . . . . 
            . . . . a a a 1 a a a . . . . . 
            . . . . a a a c a a a . . . . . 
            . . . . a a a c a a a . . . . . 
            . . . . . a a 1 a a . . . . . . 
            . . . . . a a c a a . . . . . . 
            . . . . . . a c a . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            . . . . 7 . . 7 . . 7 . . . . . 
            . . . . . 7 . 7 . 7 . . . . . . 
            . . . . . . 7 7 7 . . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            `],
        200,
        true
        )
    }
    for (let value7 of tiles.getTilesByType(assets.tile`tile18`)) {
        hatBumper = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 . . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . c c c c c c c c c c . . . . 
            . c c c c c c c c c c c c . . . 
            . . f 7 7 7 7 7 7 7 7 7 f . . . 
            . f 7 7 7 2 7 7 7 2 7 7 f . . . 
            . f 7 7 7 2 7 7 7 2 7 7 7 f . . 
            . f 7 7 7 7 7 7 7 7 7 7 7 7 f . 
            . f 7 7 7 7 2 2 2 7 7 7 7 7 f . 
            . . f 7 7 2 2 7 2 2 7 7 7 7 f . 
            . . f 7 7 2 7 7 7 2 2 7 7 7 f . 
            . . . f 7 7 7 7 7 7 7 7 7 7 f . 
            . . . . f f 7 7 7 7 7 7 7 f . . 
            . . . . . . f f f f f f f . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.hardHatBumper)
        tiles.placeOnTile(hatBumper, value7)
        tiles.setTileAt(value7, assets.tile`transparency16`)
        hatBumper.ay = gravity
        if (Math.percentChance(50)) {
            hatBumper.vx = Math.randomRange(30, 60)
        } else {
            hatBumper.vx = Math.randomRange(-60, -30)
        }
    }
    for (let value8 of tiles.getTilesByType(assets.tile`Temporary asset`)) {
        mySprite = sprites.create(assets.tile`Temporary asset`, SpriteKind.blueflier)
        tiles.placeOnTile(mySprite, value8)
        tiles.setTileAt(value8, assets.tile`transparency16`)
        animation.attachAnimation(mySprite, blueFlierFlying)
        animation.attachAnimation(mySprite, blueFlierIdle)
    }
    for (let value7 of tiles.getTilesByType(assets.tile`myTile2`)) {
        hatBumper = sprites.create(assets.image`myImage0`, SpriteKind.fish)
        tiles.placeOnTile(hatBumper, value7)
        tiles.setTileAt(value7, assets.tile`myTile0`)
        hatBumper.vx = -45
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile17`, function (sprite, location) {
    info.changeScoreBy(20)
    info.setLife(bonusLife)
    info.changeLifeBy(1)
    normalLevel()
})
function normalLevel () {
    currentLevel += 1
    levelnumber += 1
    if (hasNextLevel()) {
        if (bonus < 1) {
            game.splash("Next level unlocked!")
        }
        setLevelTileMap(currentLevel)
    } else {
        game.over(true, effects.confetti)
    }
    if (levelnumber > 4) {
        world += 1
        levelnumber = 1
    }
    bonusPick = 0
    hero.say("" + world + "-" + levelnumber, 1000)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.fish, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("Ow!", invincibilityPeriod)
    music.powerDown.play()
    pause(invincibilityPeriod)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(hero.isHittingTile(CollisionDirection.Bottom))) {
        hero.vy += 80
    }
})
scene.onOverlapTile(SpriteKind.Flier, assets.tile`myTile`, function (sprite, location) {
    sprite.destroy(effects.rings, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    info.changeScoreBy(20)
    info.setLife(bonusLife)
    info.changeLifeBy(1)
    normalLevel()
})
info.onLifeZero(function () {
    if (bonusPick > 0) {
        bonusPick = 0
        game.splash("oops. you failed the bonus level")
        info.setLife(bonusLife)
        bonusLife = 0
        normalLevel()
    } else {
        game.over(false, effects.melt)
    }
})
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.blueflier, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    hero.say("ow", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 500)
    info.changeScoreBy(5)
    bonus = 1
    music.magicWand.playUntilDone()
})
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.snaper, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    hero.say("ow", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function initializeLevel (level: number) {
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(assets.tile`tile6`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    createBoss()
    spawnGoals()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile10`, function (sprite, location) {
    lavaburn()
})
scene.onOverlapTile(SpriteKind.flierBoss, assets.tile`tile`, function (sprite, location) {
    boss += -1
    sprite.destroy(effects.confetti, 500)
})
function hasNextLevel () {
    return currentLevel != levelCount
}
function initializeblueFlierAnimations () {
    blueFlierFlying = animation.createAnimation(ActionKind.Flying, 100)
    blueFlierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 8 8 8 8 8 8 8 f . . . 
        . . . f 8 6 6 8 8 8 6 6 8 f . . 
        . f . f 8 8 8 6 8 6 8 8 8 f . f 
        . f f 8 8 8 8 8 8 8 8 8 8 8 f f 
        . f 8 8 8 8 8 6 8 6 8 8 8 8 8 f 
        . f 8 8 8 8 8 6 8 6 8 8 8 8 8 f 
        . f f 8 8 8 8 8 8 8 8 8 8 8 f f 
        . . . f 8 8 6 6 6 6 6 8 8 f . . 
        . . . . f 8 6 8 8 8 6 8 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    blueFlierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 8 8 8 8 8 8 8 f . . . 
        . . . f 8 6 6 8 8 8 6 6 8 f . . 
        . . . f 8 8 8 6 8 6 8 8 8 f . . 
        . . f 8 8 8 8 8 8 8 8 8 8 8 f . 
        . . f 8 8 8 8 6 8 6 8 8 8 8 f . 
        . f 8 8 8 8 8 6 8 6 8 8 8 8 8 f 
        . f 8 8 8 8 8 8 8 8 8 8 8 8 8 f 
        . f 8 f 8 8 6 6 6 6 6 8 8 f 8 f 
        . f f . f 8 6 8 8 8 6 8 f . f f 
        . f . . . f f f f f f f . . . f 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    blueFlierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 8 8 8 8 8 8 8 f . . . 
        . . . f 8 6 6 8 8 8 6 6 8 f . . 
        . f . f 8 8 8 6 8 6 8 8 8 f . f 
        . f f 8 8 8 8 8 8 8 8 8 8 8 f f 
        . f 8 8 8 8 8 6 8 6 8 8 8 8 8 f 
        . f 8 8 8 8 8 6 8 6 8 8 8 8 8 f 
        . f f 8 8 8 8 8 8 8 8 8 8 8 f f 
        . . . f 8 8 6 6 6 6 6 8 8 f . . 
        . . . . f 8 6 8 8 8 6 8 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    blueFlierIdle = animation.createAnimation(ActionKind.Idle, 100)
    blueFlierIdle.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 9 9 9 9 9 9 9 f . . . 
        . . . f 9 6 6 9 9 9 6 6 9 f . . 
        . f . f 9 9 9 6 9 6 9 9 9 f . f 
        . f f 9 9 9 9 9 9 9 9 9 9 9 f f 
        . f 9 9 9 9 9 6 9 6 9 9 9 9 9 f 
        . f 9 9 9 9 9 6 9 6 9 9 9 9 9 f 
        . f f 9 9 9 9 9 9 9 9 9 9 9 f f 
        . . . f 9 9 6 6 6 6 6 9 9 f . . 
        . . . . f 9 6 9 9 9 6 9 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
scene.onOverlapTile(SpriteKind.hardHatBumper, assets.tile`tile`, function (sprite, location) {
    sprite.destroy(effects.fire, 500)
})
function bonusLevel () {
    bonusLife = info.life()
    bonusPick = 1
    if (world == 1) {
        tiles.setTilemap(tilemap`level5`)
    } else if (world == 2) {
        tiles.setTilemap(tilemap`level6`)
    } else if (world == 3) {
        tiles.setTilemap(tilemap`level7`)
    } else if (world == 4) {
        tiles.setTilemap(tilemap`level11`)
    } else if (world == 5) {
        tiles.setTilemap(tilemap`level18`)
    } else {
        if (world == 6) {
            tiles.setCurrentTilemap(tilemap`level48`)
        }
    }
    hero.say("" + world + "-" + "bonus", 1000)
    clearGame()
    initializeLevel(currentLevel)
}
function spawnGoals () {
    for (let value104 of tiles.getTilesByType(assets.tile`tile5`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value104)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Idle)
        tiles.setTileAt(value104, assets.tile`tile0`)
    }
    for (let value9 of tiles.getTilesByType(assets.tile`tile15`)) {
        cherry = sprites.create(img`
            . . . . . . . . . . . 6 6 6 6 6 
            . . . . . . . . . 6 6 7 7 7 7 8 
            . . . . . . 8 8 8 7 7 8 8 6 8 8 
            . . e e e e c 6 6 8 8 . 8 7 8 . 
            . e 2 5 4 2 e c 8 . . . 6 7 8 . 
            e 2 4 2 2 2 2 2 c . . . 6 7 8 . 
            e 2 2 2 2 2 2 2 c . . . 8 6 8 . 
            e 2 e e 2 2 2 2 e e e e c 6 8 . 
            c 2 e e 2 2 2 2 e 2 5 4 2 c 8 . 
            . c 2 e e e 2 e 2 4 2 2 2 2 c . 
            . . c 2 2 2 e e 2 2 2 2 2 2 2 e 
            . . . e c c e c 2 2 2 2 2 2 2 e 
            . . . . . . . c 2 e e 2 2 e 2 c 
            . . . . . . . c e e e e e e 2 c 
            . . . . . . . . c e 2 2 2 2 c . 
            . . . . . . . . . c c c c c . . 
            `, SpriteKind.Food)
        tiles.placeOnTile(cherry, value9)
        tiles.setTileAt(value9, assets.tile`transparency16`)
    }
    for (let value104 of tiles.getTilesByType(assets.tile`myTile1`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value104)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Idle)
        tiles.setTileAt(value104, assets.tile`myTile0`)
    }
}
let musicRally = 0
let outWater = false
let heroFacingLeft = false
let cherry: Sprite = null
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let bonusPick = 0
let bonusLife = 0
let blueFlierIdle: animation.Animation = null
let blueFlierFlying: animation.Animation = null
let mySprite: Sprite = null
let hatBumper: Sprite = null
let snapey: Sprite = null
let flier: Sprite = null
let bumper: Sprite = null
let lava = 0
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let doubleJumpSpeed = 0
let bonus = 0
let coinAnimation: animation.Animation = null
let boss = 0
let redFlier: Sprite = null
let canDoubleJump = false
let inWater = 0
let water = 0
let levelnumber = 0
let world = 0
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero: Sprite = null
hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . f f f f f f f f f f . . . 
    . . f e e e e e e e e e e f . . 
    . f e e e e e e e e e e e e f . 
    . f d e e d d d d d d d d d f . 
    . f d e d d f d d d d f d d f . 
    . f e d d d f d d d d f d d f . 
    . . f d d d f d d d d f d d f . 
    . . f d d d d d d d d d d d f . 
    . . f b a c c c c c c c c a f . 
    . . f d d d c c c c c c d d f . 
    . . f d d f f f b b f f f d f . 
    . . f b a a a a a a a a a f . . 
    . . . f b a a f f b a a f . . . 
    . . . f b a a f f b a a f . . . 
    . . . . f f f . . f f f . . . . 
    `, SpriteKind.Player)
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    `)
initializeAnimations()
createPlayer(hero)
levelCount = 25
currentLevel = 24
world = 1
levelnumber = 1
giveIntroduction()
setLevelTileMap(currentLevel)
hero.say("" + world + "-" + levelnumber, 1000)
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value92 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value92.isHittingTile(CollisionDirection.Left)) {
            value92.vx = Math.randomRange(30, 60)
        } else if (value92.isHittingTile(CollisionDirection.Right)) {
            value92.vx = Math.randomRange(-60, -30)
        }
    }
})
game.onUpdate(function () {
    for (let value93 of sprites.allOfKind(SpriteKind.hardHatBumper)) {
        if (value93.isHittingTile(CollisionDirection.Left)) {
            value93.vx = Math.randomRange(30, 60)
        } else if (value93.isHittingTile(CollisionDirection.Right)) {
            value93.vx = Math.randomRange(-60, -30)
        }
    }
})
// Flier movement
game.onUpdate(function () {
    for (let value82 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value82.x - hero.x) < 60) {
            if (value82.x - hero.x < -5) {
                value82.vx = 25
            } else if (value82.x - hero.x > 5) {
                value82.vx = -25
            }
            if (value82.y - hero.y < -5) {
                value82.vy = 25
            } else if (value82.y - hero.y > 5) {
                value82.vy = -25
            }
            animation.setAction(value82, ActionKind.Flying)
        } else {
            value82.vy = -20
            value82.vx = 0
            animation.setAction(value82, ActionKind.Idle)
        }
    }
})
game.onUpdate(function () {
    for (let value83 of sprites.allOfKind(SpriteKind.blueflier)) {
        if (Math.abs(value83.x - hero.x) < 60) {
            if (value83.x - hero.x < -5) {
                value83.vx = 25
            } else if (value83.x - hero.x > 5) {
                value83.vx = -25
            }
            if (value83.y - hero.y < -5) {
                value83.vy = 25
            } else if (value83.y - hero.y > 5) {
                value83.vy = -25
            }
            animation.setAction(value83, ActionKind.Flying)
        } else {
            value83.vy = -20
            value83.vx = 0
            animation.setAction(value83, ActionKind.Idle)
        }
    }
})
game.onUpdate(function () {
    for (let value84 of sprites.allOfKind(SpriteKind.flierBoss)) {
        if (Math.abs(value84.x - hero.x) < 60) {
            if (value84.x - hero.x < -5) {
                value84.vx = 25
            } else if (value84.x - hero.x > 5) {
                value84.vx = -25
            }
            if (value84.y - hero.y < -5) {
                value84.vy = 25
            } else if (value84.y - hero.y > 5) {
                value84.vy = -25
            }
            animation.setAction(value84, ActionKind.Flying)
        } else {
            value84.vy = -20
            value84.vx = 0
            animation.setAction(value84, ActionKind.Idle)
        }
    }
})
// set up hero animations
game.onUpdate(function () {
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.CrouchLeft)
        } else {
            animation.setAction(hero, ActionKind.CrouchRight)
        }
    } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.JumpingLeft)
        } else {
            animation.setAction(hero, ActionKind.JumpingRight)
        }
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.RunningLeft)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.RunningRight)
    } else {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.IdleLeft)
        } else {
            animation.setAction(hero, ActionKind.IdleRight)
        }
    }
})
game.onUpdate(function () {
    for (let value93 of sprites.allOfKind(SpriteKind.fish)) {
        if (value93.isHittingTile(CollisionDirection.Left)) {
            value93.vx = 45
            value93.setImage(assets.image`myImage`)
        } else if (value93.isHittingTile(CollisionDirection.Right)) {
            value93.vx = -45
            value93.setImage(assets.image`myImage0`)
        }
    }
})
game.onUpdate(function () {
    if (inWater < game.runtime()) {
        water = 1
        outWater = true
    } else {
        if (outWater) {
            outWater = false
            hero.vy = hero.vy / water
        }
    }
    hero.ay = gravity / water
    controller.moveSprite(hero, 100 / water, 0)
})
forever(function () {
    if (boss > 0) {
        music.playMelody("F G F - A G F E ", 380)
        musicRally += 1
        if (musicRally > 4) {
            musicRally = 0
            music.playMelody("F - G G F E B C5 ", 380)
        }
    } else {
        musicRally = 0
    }
})
