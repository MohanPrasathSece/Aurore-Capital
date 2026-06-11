import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, DollarSign, Percent, Zap } from 'lucide-react';

export const Route = createFileRoute('/dashboard')({
  head: () => ({
    meta: [
      { title: 'Dashboard — Aurore Capital AI' },
      { name: 'description', content: 'Demo trading dashboard.' },
    ],
  }),
  component: Dashboard,
});

const mockChartData = [
  { time: '09:00', profit: 12000 },
  { time: '10:00', profit: 12400 },
  { time: '11:00', profit: 12200 },
  { time: '12:00', profit: 13100 },
  { time: '13:00', profit: 12800 },
  { time: '14:00', profit: 14500 },
  { time: '15:00', profit: 15200 },
];

const mockSignals = [
  { id: 1, pair: 'BTC/USD', type: 'BUY', price: '$64,200', confidence: '94%', time: '2 mins ago', profit: '+1.2%' },
  { id: 2, pair: 'ETH/USD', type: 'SELL', price: '$3,420', confidence: '88%', time: '15 mins ago', profit: '+0.8%' },
  { id: 3, pair: 'SOL/USD', type: 'BUY', price: '$145.20', confidence: '91%', time: '1 hour ago', profit: '+4.5%' },
];

const activePositions = [
  { id: 1, pair: 'BTC/USD', size: '0.5 BTC', entry: '$63,100', current: '$64,250', pnl: '+$575.00', pnlPercent: '+1.82%', status: 'Active' },
  { id: 2, pair: 'ETH/USD', size: '10 ETH', entry: '$3,450', current: '$3,410', pnl: '-$400.00', pnlPercent: '-1.15%', status: 'Active' },
];

function StatCard({ title, value, change, icon: Icon }: any) {
  return (
    <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-elevated">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-ink-soft">{title}</p>
          <h3 className="text-2xl font-bold text-ink mt-1">{value}</h3>
        </div>
        <div className="rounded-xl bg-primary/5 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="text-xs font-semibold text-emerald-600 mt-4 flex items-center gap-1">
        <ArrowUpRight className="h-3 w-3" /> {change} from last period
      </p>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isAuth = localStorage.getItem('auth');
    if (!isAuth) {
      navigate({ to: '/', search: { auth: 'login' } });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("http://localhost:5000/api/institutional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          company: formData.get("company") as string,
          message: formData.get("message") as string,
        })
      });
      if (!res.ok) throw new Error("Failed");
      alert("Message sent to institutional desk!");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-28 pb-20 container-page max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-ink">Trading Dashboard</h1>
            <p className="text-ink-soft mt-1">Welcome back. Here is your automated portfolio overview.</p>
          </div>
          <div className="flex gap-4">
            <div className="rounded-2xl border border-primary/10 bg-white px-5 py-3 shadow-sm flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Status</p>
                <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Bot Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <StatCard title="Total Balance" value="$15,200.00" change="+12.4%" icon={DollarSign} />
          <StatCard title="Today's Profit" value="+$450.00" change="+3.2%" icon={Percent} />
          <StatCard title="Win Rate" value="84.2%" change="+1.5%" icon={Zap} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Main Chart area */}
          <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-elevated">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-ink">Portfolio Growth</h2>
              <p className="text-sm text-ink-soft">Performance over the last 24 hours</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C5CFF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7C5CFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `$${val / 1000}k`} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: '1px solid rgba(124,92,255,0.1)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#7C5CFF', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="profit" stroke="#7C5CFF" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Signals */}
          <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-elevated flex flex-col">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-ink">Live Signals</h2>
                <p className="text-sm text-ink-soft">AI executed trades</p>
              </div>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {mockSignals.map((signal) => (
                <div key={signal.id} className="rounded-2xl border border-primary/5 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${signal.type === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {signal.type}
                      </span>
                      <span className="font-semibold text-ink">{signal.pair}</span>
                    </div>
                    <span className="text-xs text-ink-soft">{signal.time}</span>
                  </div>
                  <div className="flex justify-between items-end mt-3">
                    <div>
                      <p className="text-xs text-ink-soft">Entry</p>
                      <p className="font-medium text-ink">{signal.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-ink-soft">Confidence</p>
                      <p className="font-semibold text-primary">{signal.confidence}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Positions */}
        <div className="mt-8 rounded-3xl border border-primary/10 bg-white p-6 shadow-elevated">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-ink">Active Positions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 text-ink-soft">
                  <th className="pb-3 font-medium">Asset</th>
                  <th className="pb-3 font-medium">Size</th>
                  <th className="pb-3 font-medium">Entry Price</th>
                  <th className="pb-3 font-medium">Current Price</th>
                  <th className="pb-3 font-medium text-right">Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                {activePositions.map((pos) => {
                  const isProfit = pos.pnl.startsWith('+');
                  return (
                    <tr key={pos.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02]">
                      <td className="py-4 font-semibold text-ink">{pos.pair}</td>
                      <td className="py-4 text-ink">{pos.size}</td>
                      <td className="py-4 text-ink-soft">{pos.entry}</td>
                      <td className="py-4 text-ink-soft">{pos.current}</td>
                      <td className="py-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className={`font-semibold ${isProfit ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {pos.pnl}
                          </span>
                          <span className={`text-xs flex items-center gap-0.5 ${isProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {isProfit ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            {pos.pnlPercent}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* How Aurore AI Works */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-ink">How Aurore AI Works</h2>
            <p className="text-base text-ink-soft">The architecture behind your automated trades.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-bold">1</div>
              <h3 className="font-semibold text-ink text-lg">Data Ingestion</h3>
              <p className="mt-2 text-base text-ink-soft">Processes 5TB+ of order book and on-chain data daily.</p>
            </div>
            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-bold">2</div>
              <h3 className="font-semibold text-ink text-lg">Neural Analysis</h3>
              <p className="mt-2 text-base text-ink-soft">Transformer models predict short-term price action and momentum.</p>
            </div>
            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-bold">3</div>
              <h3 className="font-semibold text-ink text-lg">Execution</h3>
              <p className="mt-2 text-base text-ink-soft">Sub-millisecond API execution across major liquidity providers.</p>
            </div>
            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-bold">4</div>
              <h3 className="font-semibold text-ink text-lg">Risk Management</h3>
              <p className="mt-2 text-base text-ink-soft">Dynamic stop-losses and position sizing protect capital.</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 rounded-3xl border border-black/5 bg-white p-8 md:p-10 shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-gradient-to-bl from-primary/10 to-transparent blur-3xl pointer-events-none" />
          <div className="grid gap-8 md:grid-cols-2 items-center relative">
            <div>
              <h2 className="text-4xl font-display font-bold text-ink tracking-tight">Upgrade Your Limits</h2>
              <p className="mt-4 text-lg text-ink-soft max-w-sm leading-relaxed">
                Ready to deploy larger capital? Speak directly with our institutional trading desk to increase your API limits and get a dedicated account manager.
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name" 
                  className="w-full rounded-xl border border-black/5 bg-black/[0.02] px-4 py-3 text-base text-ink placeholder-ink-soft/60 outline-none transition-all focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10" 
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Institutional Email" 
                  className="w-full rounded-xl border border-black/5 bg-black/[0.02] px-4 py-3 text-base text-ink placeholder-ink-soft/60 outline-none transition-all focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10" 
                  required
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  className="w-full rounded-xl border border-black/5 bg-black/[0.02] px-4 py-3 text-base text-ink placeholder-ink-soft/60 outline-none transition-all focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10" 
                />
                <input 
                  type="text" 
                  name="company"
                  placeholder="Company Name" 
                  className="w-full rounded-xl border border-black/5 bg-black/[0.02] px-4 py-3 text-base text-ink placeholder-ink-soft/60 outline-none transition-all focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10" 
                />
              </div>
              <textarea 
                name="message"
                placeholder="Expected Monthly Volume / Additional Information" 
                rows={3}
                className="w-full rounded-xl border border-black/5 bg-black/[0.02] px-4 py-3 text-base text-ink placeholder-ink-soft/60 outline-none transition-all focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10" 
                required
              />
              <button type="submit" disabled={loading} className="w-full rounded-full bg-gradient-brand shadow-md px-6 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50">
                {loading ? "Sending..." : "Contact Desk"}
              </button>
            </form>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}


