import { useEffect, useState } from "react";
import { TypedBroadcastChannel } from "./index";
export const useBroadcast = (channelName) => {
    const [channel] = useState(new TypedBroadcastChannel(channelName));
    useEffect(() => {
        return () => {
            console.log(`TypedBroadcastChannel ${channelName} closed`);
            channel.close();
        };
    }, [channelName]);
    return channel;
};
