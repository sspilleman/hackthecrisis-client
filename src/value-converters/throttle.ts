export function throttle(event: Event) {
    let state = this.throttleState;
    let elapsed = +new Date() - state.last;

    if (elapsed >= state.delay) {
        console.log("throttle: elapsed >= state.delay", elapsed, state.delay);
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
        state.last = +new Date();
        this.throttledMethod(event);
        return;
    }

    if (state.timeoutId === null) {
        console.log("throttle: state.timeoutId === null");
        state.timeoutId = setTimeout(() => {
            state.timeoutId = null;
            state.last = +new Date();
            this.throttledMethod(event);
        }, state.delay - elapsed);
    }
}

// callSource(event) {
//     const overrideContext = this.$scope.overrideContext;
//     overrideContext.$event = event;
//     const result = this.sourceExpression.evaluate(2097152 /* mustEvaluate */, this.$scope, this.locator, this.part);
//     Reflect.deleteProperty(overrideContext, '$event');
//     if (result !== true && this.preventDefault) {
//         event.preventDefault();
//     }
//     return result;
// }

export class ThrottleBindingBehavior {
    public bind(flags: any, scope: any, binding: any, delay = 200) {
        let methodToThrottle: string;
        methodToThrottle = 'callSource'; // 'updateSource', 'updateTarget', 'callSource'
        console.log("bind", binding, binding[methodToThrottle]);
        // ['callSource', 'updateSource', 'updateTarget'].forEach(method => {
        //     console.log(method, binding[methodToThrottle]);
        // });
        // stash the original method and it's name.
        // note: a generic name like "originalMethod" is not used to avoid collisions
        // with other binding behavior types.

        binding.throttledMethod = binding[methodToThrottle];
        binding.throttledMethod.originalName = methodToThrottle;

        // replace the original method with the throttling version.
        // ['callSource', 'updateSource', 'updateTarget'].forEach(method => {
        //     binding[method] = throttle;
        // });

        binding[methodToThrottle] = throttle;

        // create the throttle state.

        binding.throttleState = {
            delay: delay,
            last: 0,
            timeoutId: null
        };
    }

    public unbind(flags: any, scope: any, binding: any) {
        // restore the state of the binding.
        let methodToRestore = binding.throttledMethod.originalName;
        binding[methodToRestore] = binding.throttledMethod;
        binding.throttledMethod = null;
        clearTimeout(binding.throttleState.timeoutId);
        binding.throttleState = null;
    }
}