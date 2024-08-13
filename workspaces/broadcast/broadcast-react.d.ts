import { TypedBroadcastChannel } from "./index";
export declare const useBroadcast: <T = any>(channelName: string) => TypedBroadcastChannel<T>;
