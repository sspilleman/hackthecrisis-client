import { Signal } from "./signal";

export function connectTo(settings: any) {
    return (target: any) => {
        const originalBeforeBind = target.prototype.beforeBind;
        const originalAfterUnbind = target.prototype.afterUnbind
        let serviceClass;
        let serviceMethod;
        let subscription;

        target.prototype.beforeBind = function beforeBind() {
            serviceClass = this[settings.service];
            subscription = this[settings.method].bind(this);
            serviceMethod = Object.keys(serviceClass).filter(s => serviceClass[s] instanceof Signal)[0];
            serviceClass[serviceMethod].add(subscription);
            if (originalBeforeBind) {
                return originalBeforeBind.apply(this, arguments);
            }
        }

        target.prototype.afterUnbind = function afterUnbind() {
            serviceClass[serviceMethod].remove(subscription);
            if (originalAfterUnbind) {
                return originalAfterUnbind.apply(this, arguments);
            }
        }
    }
}

//   if (typeof settings == "object" &&
//     typeof settings.onChanged === "string" &&
//     !(settings.onChanged in this)) {
//     throw new Error("Provided onChanged handler does not exist on target VM");
//   }

//   this._stateSubscriptions = createSelectors().map(s => getSource(s.selector).subscribe((state: any) => {
//     const lastTargetIdx = s.targets.length - 1;
//     const oldState = s.targets.reduce((accu = {}, curr) => accu[curr], this);

//     Object.entries(s.changeHandlers).forEach(([handlerName, args]) => {
//       if (handlerName in this) {
//         this[handlerName](...[ s.targets[lastTargetIdx], state, oldState ].slice(args, 3))
//       }
//     });

//     s.targets.reduce((accu, curr, idx) => {
//       accu[curr] = idx === lastTargetIdx ? state : accu[curr] || {};
//       return accu[curr];
//     }, this);
//   }));

//   if (this._stateSubscriptions && Array.isArray(this._stateSubscriptions)) {
//     this._stateSubscriptions.forEach((sub: Subscription) => {
//       if (sub instanceof Subscription && sub.closed === false) {
//         sub.unsubscribe();
//       }
//     });
//   }
