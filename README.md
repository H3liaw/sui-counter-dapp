# Sui Counter dApp

A simple counter dApp built on Sui blockchain. Connect your wallet and increment, decrement, or reset the counter!

🔗 **Try it live**: [https://sui-counter-dapp-heliiamarami-5742-helias-projects-d6ad3ad4.vercel.app](https://sui-counter-dapp-heliiamarami-5742-helias-projects-d6ad3ad4.vercel.app)

## What is this?

This is a full-stack decentralized application that lets you interact with a Move smart contract on Sui. The counter value is stored on-chain and updates in real-time when you interact with it.

## Features

- 🔗 Connect your Sui wallet
- ➕ Increment the counter
- ➖ Decrement the counter
- 🔄 Reset to zero
- 📊 View transactions on Sui Explorer

## Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd sui-counter-dapp

# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract

The Move contract is in the `contract/` directory. You can interact with the deployed version or deploy your own:

```bash
cd contract
sui move build
sui client publish --gas-budget 100000000
```

**Deployed Contract**: [View on Sui Explorer](https://suiscan.xyz/devnet/object/0xbf8720ea69fed5f6b31eb70b4395554041b457cd14e61a053715949b2cd13786)

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Blockchain**: Sui Move, @mysten/dapp-kit, @mysten/sui.js
- **Deployment**: Vercel, Sui Testnet

## License

MIT License
