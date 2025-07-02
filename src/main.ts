import { drawPolygon } from "./Draw"
import { Vec2 } from "./Vec2"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const mouseHandleRadius = 8
const points: Vec2[] = []

window.addEventListener("load", () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
})

canvas.addEventListener("contextmenu", (event) => event.preventDefault())

canvas.addEventListener("mousedown", (event) => {
    const mousePoint = mouseLocationInCanvas(event)

    if (event.button === 0) {
        points.push(mousePoint)
    } else if (event.button === 2) {
        const selectedPointIndex = points.findIndex((point) => {
            const dx = point.x - mousePoint.x
            const dy = point.y - mousePoint.y
            return dx * dx + dy * dy <= mouseHandleRadius * mouseHandleRadius
        })
        if (selectedPointIndex !== -1) {
            points.splice(selectedPointIndex, 1)
        }
    }
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
