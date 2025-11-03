# 📦 Smart Contract

Located in `contract/` directory.

**Package ID**: `0xbf8720ea69fed5f6b31eb70b4395554041b457cd14e61a053715949b2cd13786`

⚠️ **Note**: If you see an error that the package doesn't exist, you need to deploy a new package.

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

#### Option 1: Automated Deployment (Recommended)

The easiest way to deploy and automatically update all configuration:

```bash
# From project root
npm run deploy:contract
```

This script will:
1. Build the contract
2. Deploy to Sui devnet
3. Create a Counter object
4. Update `contract/package_id` and `app/config.ts` with the new IDs

#### Option 2: Manual Deployment

If you prefer to deploy manually:

```bash
cd contract
sui move build
sui client publish --gas-budget 100000000
```

After deployment:
1. Copy the Package ID from the output
2. Create a Counter object: `sui client call --package <PACKAGE_ID> --module counter --function create --gas-budget 100000000`
3. Copy the Counter Object ID
4. Update `app/config.ts` with both IDs
5. Update `contract/package_id` file

**View on Sui Explorer**: [Link](https://suiscan.xyz/devnet/object/0x899f75c59fd10d3ddb6dfd3d46c3eb1b5d236695c2d6472bf7c9a6a402687ea7)

