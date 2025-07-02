const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

window.addEventListener("load", () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    draw()
})

function draw() {
    ctx.beginPath()
    ctx.moveTo(10, 10)
    ctx.lineTo(40, 30)
    ctx.lineTo(10, 50)
    ctx.closePath()
    ctx.stroke()
}
