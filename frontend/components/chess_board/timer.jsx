
import React from 'react'

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            minutes: 3,
            seconds: 0
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    render() {
        return (
        <div>
            <h1>{ minutes }:{ seconds < 10 ? `0${ seconds }` : seconds }</h1>
        </div>
        )
    }
}

export default Timer;