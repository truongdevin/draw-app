import * as React from "react"

export default class Hello extends React.Component<{}, {}> {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    width: number = 500
    height: number = 500
    mouseDown: boolean = false
    points: {x: number, y: number}[] = []

    componentDidMount = () => {
        this.canvas = document.querySelector(".whiteboard") as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d")
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = "red"
        this.ctx.lineCap = "round"
        this.ctx.lineJoin = "round"
    }

    midpoint = (p1, p2): { x: number, y:number } => {
        return {
            x: p1.x + (p2.x - p1.x) / 2,
            y: p1.y + (p2.y - p1.y) / 2
        }
    }

    handleMouseDown = (e) => {
        this.mouseDown = true
        const pos = this.getMousePos(e)
        this.points.push({ x: pos.x, y: pos.y })
    }

    handleMouseMove = (e) => {
        // http://perfectionkills.com/exploring-canvas-drawing-techniques/#bezier-curves
        if (this.mouseDown) {
            const pos = this.getMousePos(e)
            this.points.push({ x: pos.x, y: pos.y })
            this.ctx.clearRect(0, 0, this.width, this.height)
            let p1 = this.points[0]
            let p2 = this.points[1]
            this.ctx.beginPath()
            this.ctx.moveTo(p1.x, p1.y)

            for (let i = 1; i < this.points.length; i++) {
                const midpoint = this.midpoint(p1, p2)
                this.ctx.quadraticCurveTo(p1.x, p1.y, midpoint.x, midpoint.y)
                p1 = this.points[i]
                p2 = this.points[i+1]
            }
            this.ctx.lineTo(p1.x, p1.y)
            this.ctx.stroke()
        }
    }

    handleMouseUp = (e) => {
        this.mouseDown = false
        this.points = []
    }

    getMousePos = (evt) => {
        const rect = this.canvas.getBoundingClientRect()
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        }
    }

    render() {
        return (
        <div>
            <h1>Draw App</h1>
            <div className="red">Draw on me!</div>
            <canvas 
                className="whiteboard" 
                width={`${this.width}px`} 
                height={`${this.height}px`}
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp} 
            />
        </div>
        )
    }
}