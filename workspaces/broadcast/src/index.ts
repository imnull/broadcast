type TypedBroadcastChannelEventMap<T> = {
    'message': MessageEvent<T>
    'messageerror': MessageEvent
    'data': CustomEvent<T>
}

export class TypedBroadcastChannel<T = any> extends BroadcastChannel {
    constructor(name: string) {
        super(name)
        this.addEventListener('message', e => {
            const data = e.data as T
            const event = new CustomEvent<T>('data', { detail: data });
            this.dispatchEvent(event)
            if (typeof this.ondata === 'function') {
                this.ondata(event)
            }
        })
    }

    addEventListener<K extends keyof TypedBroadcastChannelEventMap<T>>(type: K, listener: (this: TypedBroadcastChannel<T>, ev: TypedBroadcastChannelEventMap<T>[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: keyof TypedBroadcastChannelEventMap<T>, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: unknown, listener: unknown, options?: unknown): void {
        super.addEventListener(type as any, listener as any, options as any)
    }

    ondata?: (data: CustomEvent<T>) => void

    sendData(data: T) {
        this.postMessage(data)
    }
}

export const createChanel = <T = any>(channel: string) => {
    return new TypedBroadcastChannel<T>(channel)
}

export { useBroadcast as useBroadcastReact } from './broadcast-react'