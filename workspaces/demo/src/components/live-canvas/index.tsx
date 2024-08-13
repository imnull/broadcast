import { useEffect, useState } from 'react'
import { createChanel } from '@imnull/broadcast'
import './index.scss'

const isTouchable = typeof document?.ontouchstart === 'undefined' ? false : true

const EVENT_START = isTouchable ? 'touchstart' : 'mousedown'
const EVENT_MOVE = isTouchable ? 'touchmove' : 'mousemove'
const EVENT_END = isTouchable ? 'touchend' : 'mouseup'

const getEventPosition = (e: any) => {
    let evt = e
    if(e.touches && typeof e.touches.length === 'number' && e.touches.length > 0) {
        evt = e.touches[0]
    }
    return {
        clientX: evt.clientX as number,
        clientY: evt.clientY as number,
    }
}

type TPosition = {
    x: number;
    y: number;
}
type TPaintCommand = {
    command: 'track';
    from: TPosition;
    to: TPosition;
    color?: string;
    size?: number;
} | {
    command: 'reset'
}



const drawTrack = (ctx: CanvasRenderingContext2D, to: TPosition, from: TPosition, color: string = '#222', size: number = 2) => {
    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
    ctx.restore()
}

const resetCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export default (props: {
    channel: string;
    color?: string;
    size?: number;
    width?: number;
    height?: number;
    onCanvas?: (canvas: HTMLCanvasElement) => void;
}) => {
    const {
        channel,
        color = '#222',
        size = 2,
        width = 360,
        height = 360,
        onCanvas,
    } = props
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
    const [selfSize, setSelfSize] = useState(2)

    useEffect(() => {
        if (canvas) {
            const ctx = canvas.getContext('2d')!
            const client = createChanel<TPaintCommand>(channel)
            client.ondata = event => {
                const data = event.detail
                if (data.command === 'track') {
                    const { from, to, color = '#222', size = 2 } = data
                    drawTrack(ctx, to, from, color, size)
                } else if (data.command === 'reset') {
                    resetCanvas(ctx)
                }
            }
            const { left, top } = canvas.getBoundingClientRect()
            let X = 0, Y = 0, active = false
            const mousedown = (raw: any) => {
                const e = getEventPosition(raw)
                const x = e.clientX - left
                const y = e.clientY - top
                X = x
                Y = y
                active = true
            }
            const mousemove = (raw: any) => {
                const e = getEventPosition(raw)
                const x = e.clientX - left
                const y = e.clientY - top
                if (active) {
                    const from = { x: X, y: Y }
                    const to = { x, y }
                    drawTrack(ctx, to, from, color, selfSize)
                    client.sendData({ command: 'track', from, to, color, size: selfSize })
                }
                X = x
                Y = y
            }
            const mouseup = () => {
                active = false
            }
            canvas.addEventListener(EVENT_START, mousedown)
            document.addEventListener(EVENT_MOVE, mousemove)
            document.addEventListener(EVENT_END, mouseup)

            return () => {
                client.close()
                canvas.removeEventListener(EVENT_START, mousedown)
                document.removeEventListener(EVENT_END, mouseup)
                document.removeEventListener(EVENT_MOVE, mousemove)
            }
        }
    }, [canvas, channel, color, size, selfSize])

    useEffect(() => {
        const client = createChanel<TPaintCommand>(channel)
        client.sendData({ command: 'reset' })
        client.close()
    }, [])

    return <div>
        <canvas ref={setCanvas} className="live-canvas" width={width} height={height} />
        <input value={selfSize} type="range" min={1} max={20} onChange={e => {
            setSelfSize(Number(e.target.value))
        }} />
        <button disabled={!canvas} onClick={() => {
            const client = createChanel<TPaintCommand>(channel)
            client.sendData({ command: 'reset' })
            client.close()

            if (!canvas) {
                return
            }
            const ctx = canvas.getContext('2d')!
            resetCanvas(ctx)
        }}>reset</button>
    </div>
}