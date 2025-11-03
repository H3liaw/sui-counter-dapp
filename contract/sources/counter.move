module counter::counter {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;

    // Counter object - shared so anyone can interact
    public struct Counter has key {
        id: UID,
        owner: address,
        value: u64,
    }

    // Event emitted when counter changes
    public struct CounterEvent has copy, drop {
        counter_id: address,
        old_value: u64,
        new_value: u64,
    }

    // Create new counter
    public entry fun create(ctx: &mut TxContext) {
        let counter = Counter {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            value: 0,
        };
        transfer::share_object(counter);
    }

    // Increment counter
    public entry fun increment(counter: &mut Counter) {
        let old = counter.value;
        counter.value = old + 1;
        event::emit(CounterEvent {
            counter_id: object::uid_to_address(&counter.id),
            old_value: old,
            new_value: counter.value,
        });
    }

    // Decrement counter
    public entry fun decrement(counter: &mut Counter) {
        let old = counter.value;
        counter.value = old - 1;
        event::emit(CounterEvent {
            counter_id: object::uid_to_address(&counter.id),
            old_value: old,
            new_value: counter.value,
        });
    }

    // Reset to zero
    public entry fun reset(counter: &mut Counter) {
        let old = counter.value;
        counter.value = 0;
        event::emit(CounterEvent {
            counter_id: object::uid_to_address(&counter.id),
            old_value: old,
            new_value: 0,
        });
    }

    // Read value
    public fun value(counter: &Counter): u64 {
        counter.value
    }
}