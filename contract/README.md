# 📦 Smart Contract

Located in `contract/` directory.

**Package ID**: `0xbf8720ea69fed5f6b31eb70b4395554041b457cd14e61a053715949b2cd13786`

### Contract Structure

```move
module counter::counter {

    public struct Counter has key {

        id: UID,

        owner: address,

        value: u64,

    }

    

    // Functions: create, increment, decrement, reset

}
```

### Deploy Your Own

```bash
cd contract
sui move build
sui client publish --gas-budget 100000000
```

**View on Sui Explorer**: [Link](https://suiscan.xyz/testnet/object/0xbf8720ea69fed5f6b31eb70b4395554041b457cd14e61a053715949b2cd13786)

