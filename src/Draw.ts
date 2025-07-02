import { Vec2 } from "./Vec2"

export function drawPolygon(
    ctx: CanvasRenderingContext2D,
    points: Vec2[],
    pointStyle: string = "rgb(128, 0, 0)",
    lineStyle: string = "rgb(0, 0, 0)"
) {
    drawPath(ctx, points, lineStyle)

    setStyle(ctx, pointStyle)
    points.forEach((point) => drawPoint(ctx, point))
}

export function drawPath(
    ctx: CanvasRenderingContext2D,
    points: Vec2[],
    lineStyle: string = "rgb(0, 0, 0)"
) {
    if (points.length < 2) {
        return
    }

    setStyle(ctx, lineStyle)
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; ++i) {
        ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.stroke()
}

export function drawLine(ctx: CanvasRenderingContext2D, from: Vec2, to: Vec2) {
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
}

function drawPoint(
    ctx: CanvasRenderingContext2D,
    point: Vec2,
    radius: number = 4
) {
    ctx.beginPath()
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
    ctx.fill()
}

function setStyle(ctx: CanvasRenderingContext2D, style: string) {
    ctx.fillStyle = style
    ctx.strokeStyle = style
}
