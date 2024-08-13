import { useParams } from "react-router"
import LiveCanvas from "../components/live-canvas"

export default () => {
    const { channel = '', color = '#222' } = useParams()

    return <div className="live-canvas-page">
        <div>Live Canvas [{channel}] [{color}]</div>
        <LiveCanvas channel={channel} color={color} />
    </div>
}
