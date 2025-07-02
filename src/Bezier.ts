import { add, scale, Vec2 } from "./Vec2"

export function elevateDegree(points: Vec2[]): Vec2[] {
    const result = new Array<Vec2>(points.length + 1)

    result[0] = points[0]
    for (let i = 1; i < points.length; ++i) {
        const t = i / points.length
        result[i] = add(scale(points[i - 1], t), scale(points[i], 1 - t))
    }
    result[result.length - 1] = points[points.length - 1]

    return result
}

export function bezierCurve(
    controlPoints: Vec2[],
    steps: number = 100
): Vec2[] {
    const step = 1 / (steps - 1)
    return [...Array(steps).keys()].map((n) =>
        deCasteljau(controlPoints, n * step)
    )
}

function deCasteljau(controlPoints: Vec2[], t: number): Vec2 {
    const points = structuredClone(controlPoints)

    for (let i = 0; i < points.length; ++i) {
        for (let j = 0; j < points.length - i - 1; ++j) {
            points[j] = add(scale(points[j], 1 - t), scale(points[j + 1], t))
        }
    }

    return points[0]
}
