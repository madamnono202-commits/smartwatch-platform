import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, BookOpen } from 'lucide-react';

const glossaryTerms = [
  { term: 'Altcoin', definition: 'Any cryptocurrency other than Bitcoin. Examples include Ethereum, Solana, and Cardano.' },
  { term: 'APY', definition: 'Annual Percentage Yield — the real rate of return earned on a savings deposit or investment, including compound interest.' },
  { term: 'Bear Market', definition: 'A market condition where prices are falling or expected to fall, typically defined as a 20% decline from recent highs.' },
  { term: 'Blockchain', definition: 'A distributed, decentralized, public ledger that records transactions across many computers. The foundation of all cryptocurrencies.' },
  { term: 'Bull Market', definition: 'A market condition where prices are rising or expected to rise. Characterized by optimism and investor confidence.' },
  { term: 'CEX', definition: 'Centralized Exchange — a cryptocurrency trading platform operated by a company (e.g., Binance, Coinbase).' },
  { term: 'Cold Storage', definition: 'Storing cryptocurrency offline (e.g., hardware wallets) to protect against hacking. Considered the most secure method.' },
  { term: 'DApp', definition: 'Decentralized Application — an application that runs on a blockchain network rather than centralized servers.' },
  { term: 'DCA', definition: 'Dollar-Cost Averaging — an investment strategy of buying a fixed dollar amount at regular intervals regardless of price.' },
  { term: 'DeFi', definition: 'Decentralized Finance — financial services built on blockchain technology that operate without traditional intermediaries.' },
  { term: 'DEX', definition: 'Decentralized Exchange — a cryptocurrency exchange that operates without a central authority, using smart contracts.' },
  { term: 'FOMO', definition: 'Fear Of Missing Out — the anxiety that drives investors to buy an asset because others are profiting from it.' },
  { term: 'Gas Fee', definition: 'A fee paid to blockchain network validators for processing transactions. Most commonly associated with Ethereum.' },
  { term: 'HODL', definition: 'A term meaning to hold cryptocurrency long-term instead of selling. Originally a typo of "hold" that became crypto slang.' },
  { term: 'Hot Wallet', definition: 'A cryptocurrency wallet connected to the internet. More convenient for trading but less secure than cold storage.' },
  { term: 'ICO', definition: 'Initial Coin Offering — a fundraising method where new crypto projects sell tokens to early investors.' },
  { term: 'KYC', definition: 'Know Your Customer — identity verification required by regulated exchanges to prevent fraud and money laundering.' },
  { term: 'Layer 2', definition: 'A secondary framework built on top of a blockchain (Layer 1) to improve scalability and speed.' },
  { term: 'Liquidity', definition: 'How easily an asset can be bought or sold without affecting its price. Higher liquidity means better trading conditions.' },
  { term: 'Maker Fee', definition: 'A fee charged to traders who add liquidity to the order book by placing limit orders.' },
  { term: 'Market Cap', definition: 'Market Capitalization — the total value of a cryptocurrency, calculated by multiplying price by total supply.' },
  { term: 'Mining', definition: 'The process of validating transactions and creating new blocks on a proof-of-work blockchain.' },
  { term: 'NFT', definition: 'Non-Fungible Token — a unique digital asset on a blockchain, often representing art, collectibles, or in-game items.' },
  { term: 'Proof of Stake', definition: 'A consensus mechanism where validators are chosen based on how many coins they hold and "stake" as collateral.' },
  { term: 'Proof of Work', definition: 'A consensus mechanism that requires miners to solve complex mathematical problems to validate transactions.' },
  { term: 'Seed Phrase', definition: 'A series of 12-24 words that can be used to recover a cryptocurrency wallet. Must be kept absolutely secret.' },
  { term: 'Smart Contract', definition: 'Self-executing code on a blockchain that automatically enforces the terms of an agreement.' },
  { term: 'Staking', definition: 'Locking up cryptocurrency to support blockchain operations and earn rewards. Similar to earning interest.' },
  { term: 'Taker Fee', definition: 'A fee charged to traders who remove liquidity from the order book by placing market orders.' },
  { term: 'Token', definition: 'A digital asset created on an existing blockchain (e.g., ERC-20 tokens on Ethereum) as opposed to having its own chain.' },
  { term: 'TVL', definition: 'Total Value Locked — the total amount of assets deposited in a DeFi protocol. A key metric for measuring DeFi adoption.' },
  { term: 'Wallet', definition: 'A digital tool for storing, sending, and receiving cryptocurrency. Can be software (app) or hardware (device).' },
  { term: 'Whale', definition: 'An individual or entity that holds a very large amount of cryptocurrency, capable of influencing market prices.' },
  { term: 'Yield Farming', definition: 'Earning rewards by providing liquidity to DeFi protocols. Higher yields often come with higher risks.' },
];

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const letters = [...new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()))].sort();

  const filtered = glossaryTerms
    .filter((t) => t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => !selectedLetter || t.term[0].toUpperCase() === selectedLetter);

  const grouped = filtered.reduce<Record<string, typeof glossaryTerms>>((acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-blue-300/60 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Glossary</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={36} className="text-blue-300" />
            <h1 className="text-3xl lg:text-5xl font-bold text-white">Crypto Glossary</h1>
          </div>
          <p className="text-lg text-blue-200/70 max-w-2xl">
            {glossaryTerms.length} essential crypto terms explained in plain English. Your reference guide to cryptocurrency jargon.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSelectedLetter(null); }}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Letter Filter */}
        <div className="flex flex-wrap gap-1 mb-8">
          <button
            onClick={() => setSelectedLetter(null)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
              !selectedLetter ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                selectedLetter === letter ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Terms */}
        <div className="space-y-8">
          {Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, terms]) => (
              <div key={letter}>
                <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b border-gray-200 pb-2">{letter}</h2>
                <div className="space-y-3">
                  {terms.map((t) => (
                    <div key={t.term} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
                      <h3 className="font-bold text-gray-900 mb-1">{t.term}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{t.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <BookOpen size={48} className="mx-auto mb-3 opacity-50" />
            <p className="font-medium">No terms found matching &ldquo;{search}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}
