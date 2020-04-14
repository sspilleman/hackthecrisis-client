export class Signal<T> {
    private handlers: ((T) => any)[] = [];
    private lastDispatched: T;

    public add(f: (t: T) => any) {
        this.handlers.push(f);
        // console.log("add", f, this.handlers.length);
        if (this.lastDispatched) f(this.lastDispatched);
    }

    public remove(f: (t: T) => any) {
        this.handlers = this.handlers.filter(handler => (handler !== f));
        // console.log("remove", f, this.handlers.length);
    }

    public dispatch(t: T) {
        this.lastDispatched = t;
        this.handlers.forEach(f => f(t));
    }
}