
enum BindingMode {
    oneTime  = 0b0001,
    toView   = 0b0010,
    fromView = 0b0100,
    twoWay   = 0b0110,
    default  = 0b1000
  };

enum BindingFlags {
    none = 0b000000000000000000_00000000_000_00,
    mustEvaluate = 0b100000000000000000_00000000_000_00,

    mutation = 0b000000000000000000_00000000_000_11,
    isCollectionMutation = 0b000000000000000000_00000000_000_01,
    isInstanceMutation = 0b000000000000000000_00000000_000_10,

    update = 0b000000000000000000_00000000_111_00,
    updateTargetObserver = 0b000000000000000000_00000000_001_00,
    updateTargetInstance = 0b000000000000000000_00000000_010_00,
    updateSourceExpression = 0b000000000000000000_00000000_100_00,

    from = 0b000000000000000000_11111111_000_00,
    fromFlushChanges = 0b000000000000000000_00000001_000_00,
    fromStartTask = 0b000000000000000000_00000010_000_00,
    fromStopTask = 0b000000000000000000_00000100_000_00,
    fromBind = 0b000000000000000000_00001000_000_00,
    fromUnbind = 0b000000000000000000_00010000_000_00,
    fromDOMEvent = 0b000000000000000000_00100000_000_00,
    fromObserverSetter = 0b000000000000000000_01000000_000_00,
    fromBindableHandler = 0b000000000000000000_10000000_000_00,
}

const unset = {};

export function debounceCallSource(event: Event) {
    const state = this.debounceState;
    clearTimeout(state.timeoutId);
    state.timeoutId = setTimeout(() => this.debouncedMethod(event), state.delay);
}

export function debounceCall(this: any, newValue: any, oldValue: any, flags: any) {
    const state = this.debounceState;
    clearTimeout(state.timeoutId);
    // tslint:disable-next-line: no-bitwise
    if (!(flags & state.callContextToDebounce)) {
        state.oldValue = unset;
        this.debouncedMethod(newValue, oldValue, flags);
        return;
    }
    if (state.oldValue === unset) {
        state.oldValue = oldValue;
    }
    state.timeoutId = setTimeout(() => {
        const ov = state.oldValue;
        state.oldValue = unset;
        this.debouncedMethod(newValue, ov, flags);
    }, state.delay);
}

const fromView = BindingMode.fromView;

export class DebounceBindingBehavior {
    public bind(flags: any, scope: any, binding: any, delay = 200) {
        let methodToDebounce;
        let callContextToDebounce;
        let debouncer;

        methodToDebounce = 'callSource';
        debouncer = debounceCallSource;
        callContextToDebounce = BindingFlags.updateTargetInstance;

        // if (binding instanceof Binding) {
        //     methodToDebounce = 'handleChange';
        //     debouncer = debounceCall;
        //     // tslint:disable-next-line: no-bitwise
        //     callContextToDebounce = binding.mode & fromView ? BindingFlags.updateSourceExpression : BindingFlags.updateTargetInstance;
        // } else {
        //     methodToDebounce = 'callSource';
        //     debouncer = debounceCallSource;
        //     callContextToDebounce = BindingFlags.updateTargetInstance;
        // }

        // stash the original method and it's name.
        // note: a generic name like "originalMethod" is not used to avoid collisions
        // with other binding behavior types.
        binding.debouncedMethod = binding[methodToDebounce];
        binding.debouncedMethod.originalName = methodToDebounce;

        // replace the original method with the debouncing version.
        binding[methodToDebounce] = debouncer;

        // create the debounce state.
        binding.debounceState = {
            callContextToDebounce,
            delay,
            timeoutId: 0,
            oldValue: unset
        };
    }

    public unbind(flags: any, scope: any, binding: any) {
        // restore the state of the binding.
        const methodToRestore = binding.debouncedMethod.originalName;
        binding[methodToRestore] = binding.debouncedMethod;
        binding.debouncedMethod = null;
        clearTimeout(binding.debounceState.timeoutId);
        binding.debounceState = null;
    }
}