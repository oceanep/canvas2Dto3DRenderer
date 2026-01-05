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

// Draws line between points
function line(p1: vec2, p2: vec2): void {
    ctx.lineWidth = 2
    ctx.strokeStyle = FOREGROUND
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
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

function translateX({ x, y, z }: vec3, dx: number): vec3 {
    return { x: x + dx, y, z }
}

function translateY({ x, y, z }: vec3, dy: number): vec3 {
    return { x, y: y + dy, z }
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

// rotate on x axis (yz)
function rotateYZ({ x, y, z }: vec3, angle: number): vec3 {
    const c = Math.cos(angle)
    const s = Math.sin(angle)

    return {
        x: x,
        y: y * c - z * s,
        z: y * s + z * c
    }
}

// rotate on z axis (xy)
function rotateXY({ x, y, z }: vec3, angle: number): vec3 {
    const c = Math.cos(angle)
    const s = Math.sin(angle)

    return {
        x: x * c - y * s,
        y: x * s + y * c,
        z: z
    }
}

const vecs: vec3[] = [
    { x: 0.25, y: 0.25, z: 0.25 },
    { x: -0.25, y: 0.25, z: 0.25 },
    { x: -0.25, y: -0.25, z: 0.25 },
    { x: 0.25, y: -0.25, z: 0.25 },

    { x: 0.25, y: 0.25, z: -0.25 },
    { x: -0.25, y: 0.25, z: -0.25 },
    { x: -0.25, y: -0.25, z: -0.25 },
    { x: 0.25, y: -0.25, z: -0.25 },
]

//array that keeps track of vertex indices to create each face
const faces = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
]

const FPS = 60
let dz = .7
let angle = 0
let counter = 0

function frame(): void {
    counter += 1
    const dt = 1 / FPS
    //when 2 seconds pass stop animation for delta z
    dz += dz > 120 * dt ? 0 : 1 * dt
    angle += Math.PI * dt
    clear()
    for (const v of vecs) {
        point(screen(project(translateZ(rotateXZ(rotateYZ(v, angle), angle), dz))))
    }
    for (const f of faces) {
        // [0,1,2,3]
        // 0->1, 1->2, 2->3, 3->0
        for (let i = 0; i < f.length; i++) {
            const a = vecs[f[i]]
            const b = vecs[f[(i + 1) % f.length]]
            line(
                screen(project(translateZ(rotateXZ(rotateYZ(a, angle), angle), dz))),
                screen(project(translateZ(rotateXZ(rotateYZ(b, angle), angle), dz)))
            )
        }
    }
    setTimeout(frame, 1000 / FPS)
}

setTimeout(frame, 1000 / FPS)