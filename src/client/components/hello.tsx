import * as React from "react"

export default class Hello extends React.Component<{}, {}> {
    render() {
        return (
        <div>
            <h1>Hello from React</h1>
            <div className="red">I am red.</div>
        </div>
        )
    }
}