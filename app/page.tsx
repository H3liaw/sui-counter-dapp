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
  const [isDark, setIsDark] = useState(true);

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
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100'
    }`}>
      {/* Animated background particles */}
      {isDark && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-200"
            >
              {isDark ? (
                <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
          <div className="relative inline-block animate-pulse-slow">
            {/* Animated Glow effect behind text */}
            <div className={`absolute inset-0 blur-3xl opacity-30 animate-pulse ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-white' 
                : 'bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600'
            }`} style={{ filter: 'blur(60px)', animationDuration: '3s' }}></div>
            <h1 className={`relative text-6xl md:text-7xl lg:text-8xl font-extrabold mb-3 whitespace-nowrap bg-gradient-to-r bg-clip-text text-transparent drop-shadow-2xl transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'from-blue-400 via-blue-300 to-white' 
                : 'from-blue-600 via-indigo-600 to-blue-800'
            } ${isDark ? 'drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_40px_rgba(59,130,246,0.7)]' : 'drop-shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:drop-shadow-[0_0_40px_rgba(37,99,235,0.6)]'}`}>
              Sui Counter dApp
            </h1>
          </div>
          <div className={`max-w-2xl mx-auto ${isDark ? 'text-blue-300/80' : 'text-blue-700/80'} italic text-sm md:text-base`}>
            &ldquo;Every interaction is a step forward in the blockchain revolution&rdquo;
          </div>
        </div>

        {/* Main Card */}
        <div className={`backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10 mb-8 transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-950/80 to-slate-800/80 border border-blue-500/20 hover:border-blue-500/40' 
            : 'bg-gradient-to-br from-blue-50/90 to-indigo-100/90 border border-blue-200 hover:border-blue-300'
        }`}>
          <div className="flex justify-end mb-6">
            <ConnectButton />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Counter Display */}
            <div className="space-y-6">
              <div className="relative group">
                <div className={`absolute inset-0 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-700' 
                    : 'bg-gradient-to-br from-blue-300 to-blue-500'
                }`}></div>
                <div className={`relative rounded-2xl p-8 md:p-10 transform transition-transform hover:scale-105 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
                    : 'bg-gradient-to-br from-blue-500 to-blue-700'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <p className={`text-sm font-bold uppercase tracking-wider ${
                      isDark ? 'text-blue-100' : 'text-white'
                    }`}>Wallet Balance</p>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <p className={`text-7xl md:text-8xl font-bold text-center ${
                    isDark 
                      ? 'text-white' 
                      : 'text-white'
                  }`}>
                    {value}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className={`rounded-xl p-4 transition-colors ${
                  isDark 
                    ? 'bg-slate-800/50 border border-blue-500/20 hover:border-blue-500/40' 
                    : 'bg-blue-50/80 border border-blue-300/50 hover:border-blue-400/70'
                }`}>
                  <p className={`text-xs font-semibold mb-2 uppercase ${
                    isDark ? 'text-blue-300' : 'text-blue-700'
                  }`}>Package ID</p>
                  <p className={`font-mono text-xs break-all ${
                    isDark ? 'text-blue-100' : 'text-blue-900'
                  }`}>{PACKAGE_ID}</p>
                </div>
                <div className={`rounded-xl p-4 transition-colors ${
                  isDark 
                    ? 'bg-slate-800/50 border border-blue-500/20 hover:border-blue-500/40' 
                    : 'bg-blue-50/80 border border-blue-300/50 hover:border-blue-400/70'
                }`}>
                  <p className={`text-xs font-semibold mb-2 uppercase ${
                    isDark ? 'text-blue-300' : 'text-blue-700'
                  }`}>Object ID</p>
                  <p className={`font-mono text-xs break-all ${
                    isDark ? 'text-blue-100' : 'text-blue-900'
                  }`}>{COUNTER_OBJECT_ID}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Controls */}
            <div>
              {!account ? (
                <div className="text-center py-16 md:py-20">
                  <div className="mb-6">
                    <svg className={`w-24 h-24 mx-auto ${isDark ? 'text-blue-400/50' : 'text-blue-500/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className={`mb-6 text-lg ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>Connect your wallet to interact</p>
                  <div className="flex justify-center">
                    <ConnectButton />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => execute('increment')}
                    disabled={loading}
                    className="w-full py-5 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 transform transition-all duration-300 hover:scale-105 disabled:scale-100 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/70 hover:shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] disabled:shadow-none"
                  >
                    {loading ? 'Processing...' : 'Deposit +'}
                  </button>

                  <button
                    onClick={() => execute('decrement')}
                    disabled={loading}
                    className="w-full py-5 rounded-2xl font-bold text-white bg-gradient-to-r from-slate-700 to-blue-900 hover:from-slate-800 hover:to-blue-950 disabled:from-gray-600 disabled:to-gray-700 transform transition-all duration-300 hover:scale-105 disabled:scale-100 shadow-lg shadow-blue-900/25 hover:shadow-blue-900/70 hover:shadow-2xl hover:shadow-[0_0_40px_rgba(30,58,138,0.6)] disabled:shadow-none"
                  >
                    {loading ? 'Processing...' : 'Withdraw −'}
                  </button>

                  {status && (
                    <div className={`mt-6 p-5 rounded-2xl backdrop-blur-sm ${
                      isDark 
                        ? 'bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-500/30' 
                        : 'bg-gradient-to-br from-blue-100/50 to-indigo-100/50 border border-blue-300/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        {status === 'Success!' ? (
                          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-blue-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        )}
                        <p className={`font-semibold ${isDark ? 'text-blue-100' : 'text-blue-900'}`}>{status}</p>
                      </div>
                      {digest && (
                        <a
                          href={'https://suiscan.xyz/testnet/tx/' + digest}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-3 inline-flex items-center gap-2 text-sm underline transition-colors ${
                            isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-800'
                          }`}
                        >
                          View on explorer
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-800/60 to-blue-950/60 border border-blue-500/20 hover:border-blue-500/40' 
            : 'bg-gradient-to-br from-blue-50/80 to-indigo-100/80 border border-blue-200 hover:border-blue-300'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
            isDark 
              ? 'from-blue-300 to-white' 
              : 'from-blue-700 to-blue-900'
          }`}>
            Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a 
              href={`https://suiscan.xyz/testnet/object/${PACKAGE_ID}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer block ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900/40 to-slate-800/40 border border-blue-500/20 hover:border-blue-500/40' 
                  : 'bg-blue-50/50 border border-blue-300/50 hover:border-blue-400/70'
              }`}
            >
              <p className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-blue-900'}`}>Smart Contract</p>
              <p className={isDark ? 'text-blue-200' : 'text-blue-700'}>Sui Move</p>
            </a>
            <a 
              href="https://github.com/H3liaw/sui-counter-dapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer block ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900/40 to-slate-800/40 border border-blue-500/20 hover:border-blue-500/40' 
                  : 'bg-blue-50/50 border border-blue-300/50 hover:border-blue-400/70'
              }`}
            >
              <p className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-blue-900'}`}>GitHub</p>
              <p className={isDark ? 'text-blue-200' : 'text-blue-700'}>View Repository</p>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-4">
          <p className={`text-lg font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Built by H3liaw</p>
        </div>
      </div>
    </div>
  );
}
