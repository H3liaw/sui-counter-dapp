# Sui Counter dApp

A full-stack decentralized application demonstrating Move smart contract development and integration with Next.js on the Sui blockchain.

🔗 **Live Demo**: https://sui-counter-dapp-heliiamarami-5742-helias-projects-d6ad3ad4.vercel.app

## 🎯 Overview

This project showcases production-ready blockchain development skills, including:
- Smart contract development in Move
- Full-stack dApp architecture
- Modern React/TypeScript patterns
- Sui blockchain integration

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- React Hooks

**Blockchain:**
- Sui Move (Smart Contracts)
- @mysten/sui.js (TypeScript SDK)
- @mysten/dapp-kit (Wallet integration)

**Infrastructure:**
- Deployed on Vercel
- Sui Testnet

## ✨ Features

- 🔗 **Wallet Integration**: Seamless Sui wallet connection
- 📝 **Smart Contract Calls**: Execute Move functions (increment, decrement, reset)
- 🔄 **Real-time Updates**: Automatic blockchain state synchronization
- ⚡ **Transaction Handling**: Loading states, error handling, success feedback
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- 🔍 **Explorer Integration**: Direct links to view transactions on Sui Explorer

## 📦 Smart Contract

**Package ID**: `0xbf8720ea69fed5f6b31eb70b4395554041b457cd14e61a053715949b2cd13786`

**Contract Features:**
- Shared object pattern for multi-user access
- Event emission for indexing
- Gas-optimized operations

**View on Explorer**: [Sui Explorer](https://suiscan.xyz/testnet/object/0xbf8720ea69fed5f6b31eb70b4395554041b457cd14e61a053715949b2cd13786)

## 🚀 Quick Start
```bash
# Clone repository (replace with your repo URL)
git clone <repository-url>
cd sui-counter-dapp

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📝 Smart Contract Development

The Move smart contract is deployed on Sui Testnet. To interact with the contract:

**Package ID**: `0xbf8720ea69fed5f6b31eb70b4395554041b457cd14e61a053715949b2cd13786`

**Counter Object ID**: `0x18dba5c61a165501253c14b6e82c327ab28b21c322e79ddc942346bf9468f717`

If you want to deploy your own counter contract:
```bash
# In your Move project directory
sui move build
sui client publish --gas-budget 100000000
```

## 🏗️ Architecture
```
Frontend (Next.js 16)
    ↓
Sui TypeScript SDK (@mysten/dapp-kit)
    ↓
Sui RPC Node (Testnet)
    ↓
Move Smart Contract (Testnet)
```

## 🎓 What This Demonstrates

**For Sui Foundation Solutions Engineer Role:**

1. **Full-Stack Development**: Production-quality Next.js + TypeScript application
2. **Move Smart Contracts**: Ability to write, deploy, and integrate Move contracts
3. **Developer Tools**: Creating reference applications and demos
4. **Best Practices**: Clean code, error handling, user experience focus

## 👤 Author

**Helia Marami**
- Blockchain Engineer with 4+ years in DeFi
- Experienced in cross-chain protocols, smart contract development, and full-stack dApps

## 📄 License

MIT License