#!/bin/bash

# Sui Counter Contract Deployment Script
# This script builds, deploys, and updates package/object IDs

set -e

echo "🚀 Starting Sui Counter Contract Deployment..."

# Change to contract directory
cd "$(dirname "$0")/../contract"

# Build the contract
echo "📦 Building contract..."
sui move build

# Publish the package
echo "📤 Publishing package to Sui devnet..."
OUTPUT=$(sui client publish --gas-budget 100000000 --json)

# Extract Package ID
PACKAGE_ID=$(echo $OUTPUT | jq -r '.objectChanges[] | select(.type == "published") | .packageId')
if [ -z "$PACKAGE_ID" ] || [ "$PACKAGE_ID" = "null" ]; then
    echo "❌ Error: Could not extract Package ID from deployment output"
    echo "Deployment output:"
    echo $OUTPUT | jq .
    exit 1
fi

echo "✅ Package published: $PACKAGE_ID"

# Create Counter object
echo "🎯 Creating Counter object..."
CREATE_OUTPUT=$(sui client call --package $PACKAGE_ID --module counter --function create --gas-budget 100000000 --json)

# Extract Counter Object ID
COUNTER_OBJECT_ID=$(echo $CREATE_OUTPUT | jq -r '.objectChanges[] | select(.type == "created") | .objectId' | head -n 1)
if [ -z "$COUNTER_OBJECT_ID" ] || [ "$COUNTER_OBJECT_ID" = "null" ]; then
    echo "❌ Error: Could not extract Counter Object ID"
    echo "Create output:"
    echo $CREATE_OUTPUT | jq .
    exit 1
fi

echo "✅ Counter object created: $COUNTER_OBJECT_ID"

# Update package_id file
echo "📝 Updating contract/package_id..."
cat > package_id << EOF
PACKAGE_ID=$PACKAGE_ID
COUNTER_OBJECT_ID=$COUNTER_OBJECT_ID
NETWORK=devnet
EOF

# Update app config.ts
echo "📝 Updating app/config.ts..."
cd ..
cat > app/config.ts << EOF
// Configuration for Sui Counter dApp
// Update these values after deploying your contract

export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '$PACKAGE_ID';
export const COUNTER_OBJECT_ID = process.env.NEXT_PUBLIC_COUNTER_OBJECT_ID || '$COUNTER_OBJECT_ID';
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'devnet';
EOF

echo ""
echo "✨ Deployment complete!"
echo ""
echo "📋 Summary:"
echo "   Package ID: $PACKAGE_ID"
echo "   Counter Object ID: $COUNTER_OBJECT_ID"
echo "   Network: devnet"
echo ""
echo "🌐 View on Sui Explorer:"
echo "   Package: https://suiscan.xyz/devnet/object/$PACKAGE_ID"
echo "   Counter: https://suiscan.xyz/devnet/object/$COUNTER_OBJECT_ID"
echo ""
echo "💡 Tip: You can also set these as environment variables:"
echo "   NEXT_PUBLIC_PACKAGE_ID=$PACKAGE_ID"
echo "   NEXT_PUBLIC_COUNTER_OBJECT_ID=$COUNTER_OBJECT_ID"
echo "   NEXT_PUBLIC_NETWORK=devnet"

