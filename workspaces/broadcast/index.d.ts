type TypedBroadcastChannelEventMap<T> = {
    'message': MessageEvent<T>;
    'messageerror': MessageEvent;
    'data': CustomEvent<T>;
};
export declare class TypedBroadcastChannel<T = any> extends BroadcastChannel {
    constructor(name: string);
    addEventListener<K extends keyof TypedBroadcastChannelEventMap<T>>(type: K, listener: (this: TypedBroadcastChannel<T>, ev: TypedBroadcastChannelEventMap<T>[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: keyof TypedBroadcastChannelEventMap<T>, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    ondata?: (data: CustomEvent<T>) => void;
    sendData(data: T): void;
}
export declare const createChanel: <T = any>(channel: string) => TypedBroadcastChannel<T>;
export { useBroadcast as useBroadcastReact } from './broadcast-react';
