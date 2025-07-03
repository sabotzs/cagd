import { bezierCurve, elevateDegree } from "./Bezier"
import { drawPath, drawPolygon } from "./Draw"
import { Vec2 } from "./Vec2"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const elevatedDegreeInput = document.getElementById(
    "elevatedDegreeInput"
) as HTMLInputElement
const curveStepsInput = document.getElementById(
    "curveStepsInput"
) as HTMLInputElement
const showPolygonCheckbox = document.getElementById(
    "showPolygonCheckbox"
) as HTMLInputElement
const resetButton = document.getElementById("resetButton") as HTMLButtonElement

const mouseHandleRadius = 8
const points: Vec2[] = []
let elevatedPoints: Vec2[] = []
let curveSteps: number = curveStepsInput.valueAsNumber
let movedPoint: Vec2 | undefined

window.addEventListener("load", () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
})

canvas.addEventListener("mousedown", handleMouseDown)
canvas.addEventListener("mousemove", handleMouseMove)
canvas.addEventListener("mouseup", handleMouseUp)
elevatedDegreeInput.addEventListener("change", handleDegreeChange)
curveStepsInput.addEventListener("change", handleCurveStepsChange)
showPolygonCheckbox.addEventListener("change", draw)
resetButton.addEventListener("click", resetEverything)

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
            resetElevatedDegree()
        } else if (event.button === 2) {
            points.splice(selectedPointIndex, 1)
            resetElevatedDegree()
            draw()
        }
    } else if (event.button === 0) {
        points.push(mousePoint)
        resetElevatedDegree()
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
    const curve = bezierCurve(points, curveSteps)
    drawPath(ctx, curve, "rgb(0, 100, 200)")
    if (showPolygonCheckbox.checked) {
        drawPolygon(ctx, points)
        drawPolygon(ctx, elevatedPoints, "rgb(0, 100, 0)")
    }
}

function handleDegreeChange() {
    const multiElevateDegree = (points: Vec2[], n: number): Vec2[] => {
        if (n <= 0) {
            return points
        }

        let result = points
        for (let i = 0; i < n; ++i) {
            result = elevateDegree(result)
        }
        return result
    }

    if (elevatedDegreeInput.valueAsNumber < Number(elevatedDegreeInput.min)) {
        elevatedDegreeInput.valueAsNumber =
            elevatedPoints.length > 0 ? elevatedPoints.length : points.length
        return
    }

    const diff = elevatedDegreeInput.valueAsNumber - elevatedPoints.length
    if (diff > 0 && elevatedPoints.length > 0) {
        elevatedPoints = multiElevateDegree(elevatedPoints, diff)
    } else {
        const diff = elevatedDegreeInput.valueAsNumber - points.length
        elevatedPoints = multiElevateDegree(points, diff)
    }
    draw()
}

function handleCurveStepsChange() {
    curveSteps = curveStepsInput.valueAsNumber
    draw()
}

function resetEverything() {
    points.splice(0, points.length)
    elevatedPoints = []
    elevatedDegreeInput.value = ""
    ctx.reset()
}

function resetElevatedDegree() {
    elevatedDegreeInput.min = String(points.length)
    elevatedDegreeInput.valueAsNumber = points.length
    elevatedPoints = []
}

function mouseLocationInCanvas(event: MouseEvent): Vec2 {
    const rect = canvas.getBoundingClientRect()
    return Vec2(event.clientX - rect.x, event.clientY - rect.y)
}
