import * as React from "react"

export default class Hello extends React.Component<{}, {}> {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    width: number = 500
    height: number = 500
    mouseDown: boolean = false

    componentDidMount = () => {
        this.canvas = document.querySelector(".whiteboard") as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d")
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = "red"
        this.ctx.lineCap = "round"
        this.ctx.lineJoin = "round"
    }

    handleMouseDown = (e) => {
        this.mouseDown = true
        const pos = this.getMousePos(e)
        this.ctx.beginPath()
        this.ctx.moveTo(pos.x, pos.y)
        this.ctx.lineTo(pos.x, pos.y)
        this.ctx.stroke()
    }

    handleMouseMove = (e) => {
        if (this.mouseDown) {
            const pos = this.getMousePos(e)
            this.ctx.lineTo(pos.x, pos.y)
            this.ctx.stroke()
        }
    }

    handleMouseUp = (e) => {
        this.mouseDown = false
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