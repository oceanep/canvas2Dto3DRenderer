import './style.css'

const BACKGROUND = "#101010"
const FOREGROUND = "#50ff50"

const game = document.getElementById('game') as HTMLCanvasElement
console.log(game)

game.width = 800
game.height = 800
const ctx = game.getContext('2d') as CanvasRenderingContext2D

console.log(ctx)

interface vec2 {
    x: number,
    y: number
}

interface vec3 extends vec2 {
    z: number
}


function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, game.width, game.height)
}

// Renders point
function point({ x, y }: vec2): void {
    const s: number = 10
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - s / 2, y - s / 2, s, s)
}

// Calculates where to play point on screen in 2D
function screen(p: vec2): vec2 {
    // -1..1 => 0..2 => 0..1 => 0..w
    // 1 - (-1..1 => 0..2 => 0..1) => 0..h
    return {
        x: (p.x + 1) / 2 * game.width,
        y: (1 - (p.y + 1) / 2) * game.height,
    }
}

// Translates 3D space coordinate into 2D space
function project({ x, y, z }: vec3): vec2 {
    return {
        x: x / z,
        y: y / z,
    }
}

function translateZ({ x, y, z }: vec3, dz: number): vec3 {
    return { x, y, z: z + dz }
}

// rotate on y axis (xz)
// x' = xcos(ang) - ysin(ang)
// y' = xsin(ang) + ycos(ang)
function rotateXZ({ x, y, z }: vec3, angle: number): vec3 {
    const c = Math.cos(angle)
    const s = Math.sin(angle)

    return {
        x: x * c - z * s,
        y,
        z: x * s + z * c
    }
}

const vecs: vec3[] = [
    { x: 0.25, y: 0.25, z: 0.25 },
    { x: -0.25, y: 0.25, z: 0.25 },
    { x: 0.25, y: -0.25, z: 0.25 },
    { x: -0.25, y: -0.25, z: 0.25 },

    { x: 0.25, y: 0.25, z: -0.25 },
    { x: -0.25, y: 0.25, z: -0.25 },
    { x: 0.25, y: -0.25, z: -0.25 },
    { x: -0.25, y: -0.25, z: -0.25 },
]

const FPS = 60
let dz = .7
let angle = 0

function frame(): void {
    const dt = 1 / FPS
    //when 2 seconds pass stop animation for delta z
    dz += dz > 120 * dt ? 0 : 1 * dt
    angle += Math.PI * dt
    clear()
    for (const v of vecs) {
        point(screen(project(translateZ(rotateXZ(v, angle), dz))))
    }
    setTimeout(frame, 1000 / FPS)
}

setTimeout(frame, 1000 / FPS)