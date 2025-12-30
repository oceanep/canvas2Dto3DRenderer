import './style.css'

const BACKGROUND = "#101010"
const FOREGROUND = "#50ff50"

const game = document.getElementById('game') as HTMLCanvasElement
console.log(game)

game.width = 800
game.height = 800
const ctx = game.getContext('2d') as CanvasRenderingContext2D

console.log(ctx)

function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, game.width, game.height)
}

function point({ x, y }: { x: number, y: number }) {
    const s: number = 20
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - s / 2, y - s / 2, s, s)
}

function project(p: { x: number, y: number }) {
    // -1..1 => 0..2 => 0..1 => 0..w
    // 1 - (-1..1 => 0..2 => 0..1) => 0..h
    return {
        x: (p.x + 1) / 2 * game.width,
        y: (1 - (p.y + 1) / 2) * game.height,
    }
}

clear()
point(project({ x: 0, y: 0 }))