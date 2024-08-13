export class TypedBroadcastChannel extends BroadcastChannel {
    constructor(name) {
        super(name);
        this.addEventListener('message', e => {
            const data = e.data;
            const event = new CustomEvent('data', { detail: data });
            this.dispatchEvent(event);
            if (typeof this.ondata === 'function') {
                this.ondata(event);
            }
        });
    }
    addEventListener(type, listener, options) {
        super.addEventListener(type, listener, options);
    }
    ondata;
    sendData(data) {
        this.postMessage(data);
    }
}
export const createChanel = (channel) => {
    return new TypedBroadcastChannel(channel);
};
export { useBroadcast as useBroadcastReact } from './broadcast-react';
