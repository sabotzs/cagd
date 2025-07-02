import { drawPolygon } from "./Draw"
import { Vec2 } from "./Vec2"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const points: Vec2[] = []

window.addEventListener("load", () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
})

canvas.addEventListener("mousedown", (event) => {
    const point = mouseLocationInCanvas(event)

    points.push(point)
    draw()
})

function draw() {
    ctx.reset()
    drawPolygon(ctx, points)
}

function mouseLocationInCanvas(event: MouseEvent): Vec2 {
    const rect = canvas.getBoundingClientRect()
    return Vec2(event.clientX - rect.x, event.clientY - rect.y)
}
