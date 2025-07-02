import { bezierCurve } from "./DeCasteljau"
import { drawPath, drawPolygon } from "./Draw"
import { Vec2 } from "./Vec2"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const mouseHandleRadius = 8
const points: Vec2[] = []
let movedPoint: Vec2 | undefined

window.addEventListener("load", () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
})

canvas.addEventListener("mousedown", handleMouseDown)
canvas.addEventListener("mousemove", handleMouseMove)
canvas.addEventListener("mouseup", handleMouseUp)

// suppress contex menu for removing points on right click
canvas.addEventListener("contextmenu", (event) => event.preventDefault())

function handleMouseDown(event: MouseEvent) {
    const mousePoint = mouseLocationInCanvas(event)
    const selectedPointIndex = points.findIndex((point) => {
        const dx = point.x - mousePoint.x
        const dy = point.y - mousePoint.y
        return dx * dx + dy * dy <= mouseHandleRadius * mouseHandleRadius
    })

    if (selectedPointIndex !== -1) {
        if (event.button === 0) {
            movedPoint = points[selectedPointIndex]
        } else if (event.button === 2) {
            points.splice(selectedPointIndex, 1)
            draw()
        }
    } else if (event.button === 0) {
        points.push(mousePoint)
        draw()
    }
}

function handleMouseMove(event: MouseEvent) {
    if (movedPoint) {
        movedPoint.x += event.movementX
        movedPoint.y += event.movementY
        draw()
    }
}

function handleMouseUp() {
    movedPoint = undefined
}

function draw() {
    ctx.reset()
    const curve = bezierCurve(points)
    drawPath(ctx, curve, "rgb(0, 100, 200)")
    drawPolygon(ctx, points)
}

function mouseLocationInCanvas(event: MouseEvent): Vec2 {
    const rect = canvas.getBoundingClientRect()
    return Vec2(event.clientX - rect.x, event.clientY - rect.y)
}
