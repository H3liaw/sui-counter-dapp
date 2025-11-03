'use client';

import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useState, useEffect } from 'react';

const PACKAGE_ID = '0xbf8720ea69fed5f6b31eb70b4395554041b457cd14e61a053715949b2cd13786';
const COUNTER_OBJECT_ID = '0x18dba5c61a165501253c14b6e82c327ab28b21c322e79ddc942346bf9468f717';

export default function Home() {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [digest, setDigest] = useState('');

  const fetchValue = async () => {
    try {
      const obj = await suiClient.getObject({
        id: COUNTER_OBJECT_ID,
        options: { showContent: true },
      });
      if (obj.data?.content?.dataType === 'moveObject') {
        const fields = obj.data.content.fields as any;
        setValue(Number(fields.value));
      }
    } catch (e: any) {
      console.error('Error:', e);
    }
  };

  useEffect(() => {
    fetchValue();
    const interval = setInterval(fetchValue, 3000);
    return () => clearInterval(interval);
  }, []);

  const execute = (fn: string) => {
    if (!account) {
      setStatus('Connect wallet first');
      return;
    }
    setLoading(true);
    setStatus('Submitting...');

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::counter::${fn}`,
      arguments: [tx.object(COUNTER_OBJECT_ID)],
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          setStatus('Success!');
          setDigest(result.digest);
          setLoading(false);
          setTimeout(() => {
            fetchValue();
            setStatus('');
          }, 2000);
        },
        onError: (error) => {
          setStatus(`Error: ${error.message}`);
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Sui Counter dApp</h1>
              <p className="text-gray-600">Built by Helia Marami</p>
            </div>
            <ConnectButton />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 mb-4">
                <p className="text-white text-sm mb-2">Counter Value</p>
                <p className="text-white text-6xl font-bold">{value}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-gray-500">Package</p>
                  <p className="font-mono text-xs break-all">{PACKAGE_ID}</p>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-gray-500">Object</p>
                  <p className="font-mono text-xs break-all">{COUNTER_OBJECT_ID}</p>
                </div>
              </div>
            </div>

            <div>
              {!account ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">Connect wallet to interact</p>
                  <ConnectButton />
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => execute('increment')}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Processing...' : 'Increment'}
                  </button>

                  <button
                    onClick={() => execute('decrement')}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Processing...' : 'Decrement'}
                  </button>

                  <button
                    onClick={() => execute('reset')}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Processing...' : 'Reset'}
                  </button>

                  {status && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p>{status}</p>
                      {digest && (
                        <a
                          href={'https://suiscan.xyz/testnet/tx/' + digest}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 underline"
                        >
                          View on explorer
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold">Frontend</p>
              <p className="text-gray-600">Next.js 14 + TypeScript</p>
            </div>
            <div>
              <p className="font-semibold">Smart Contract</p>
              <p className="text-gray-600">Sui Move</p>
            </div>
            <div>
              <p className="font-semibold">Styling</p>
              <p className="text-gray-600">Tailwind CSS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
