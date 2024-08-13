import { useEffect, useState } from "react"
import { TypedBroadcastChannel } from "./index"
export const useBroadcast = <T = any>(channelName: string) => {
    const [channel] = useState<TypedBroadcastChannel<T>>(new TypedBroadcastChannel<T>(channelName));
    useEffect(() => {
        return () => {
            console.log(`TypedBroadcastChannel ${channelName} closed`)
            channel.close()
        };
    }, [channelName])

    return channel
}