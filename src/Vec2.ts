export type Vec2 = {
    x: number
    y: number
}

export function Vec2(x: number, y: number): Vec2 {
    return { x, y }
}

export function add(u: Vec2, v: Vec2): Vec2 {
    return Vec2(u.x + v.x, u.y + v.y)
}

export function subtract(u: Vec2, v: Vec2): Vec2 {
    return Vec2(u.x - v.x, u.y - v.y)
}

export function scale(v: Vec2, s: number): Vec2 {
    return Vec2(v.x * s, v.y * s)
}
