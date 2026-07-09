import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, DollarSign, Percent, Zap } from 'lucide-react';

export const Route = createFileRoute('/dashboard')({
  head: () => ({
    meta: [
      { title: 'Tableau de bord — Aurore Capital AI' },
      { name: 'description', content: 'Tableau de bord de trading démo.' },
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
        <ArrowUpRight className="h-3 w-3" /> {change} depuis la dernière période
      </p>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    const phone = formData.get("phone") as string;

    if (phone !== null) {
      const cleanNum = phone.replace(/\s+/g, "");
      if (!cleanNum) {
        setErrorMsg("Veuillez entrer un numéro de téléphone");
        setLoading(false);
        return;
      } else if (!/^(\+41|0041|0)?[1-9]\d{8}$/.test(cleanNum)) {
        setErrorMsg("Veuillez entrer un numéro suisse valide (ex: 079 123 45 67)");
        setLoading(false);
        return;
      }
    }

    try {
      const API_URL = import.meta.env.PROD ? "" : "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/institutional`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string, countryCode: typeof formData !== 'undefined' ? formData.get('countryCode') : 'CH',
          message: formData.get("message") as string,
        })
      });
      if (!res.ok) throw new Error("Failed");
      
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi du message.");
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
            <h1 className="text-3xl font-display font-bold text-ink">Tableau de bord de trading</h1>
            <p className="text-ink-soft mt-1">Bon retour. Voici l'aperçu de votre portefeuille automatisé.</p>
          </div>
          <div className="flex gap-4">
            <div className="rounded-2xl border border-primary/10 bg-white px-5 py-3 shadow-sm flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Statut</p>
                <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Bot actif
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <StatCard title="Solde total" value="$15,200.00" change="+12.4%" icon={DollarSign} />
          <StatCard title="Profit du jour" value="+$450.00" change="+3.2%" icon={Percent} />
          <StatCard title="Taux de réussite" value="84.2%" change="+1.5%" icon={Zap} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Main Chart area */}
          <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-elevated">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-ink">Croissance du portefeuille</h2>
              <p className="text-sm text-ink-soft">Performance sur les dernières 24 heures</p>
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
                <h2 className="text-xl font-bold text-ink">Signaux en direct</h2>
                <p className="text-sm text-ink-soft">Transactions exécutées par l'IA</p>
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
                      <p className="text-xs text-ink-soft">Entrée</p>
                      <p className="font-medium text-ink">{signal.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-ink-soft">Confiance</p>
                      <p className="font-semibold text-primary">{signal.confidence}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Metrics & Market Intel */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Risk Metrics */}
          <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-elevated flex flex-col justify-center">
            <h2 className="text-xl font-bold text-ink mb-6">Gestion des risques</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-ink-soft font-medium">Utilisation de la marge du portefeuille</span>
                  <span className="text-ink font-bold">14.2%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[14.2%] rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-ink-soft font-medium">Drawdown actuel</span>
                  <span className="text-ink font-bold">1.8%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-amber-400 w-[1.8%] rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-ink-soft font-medium">Risque de liquidation automatique</span>
                  <span className="text-emerald-500 font-bold">Faible</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[5%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Market Intel */}
          <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-[#0F172A] to-[#1e1b4b] p-6 shadow-elevated text-white">
            <h2 className="text-xl font-bold mb-4">Intelligence de marché par l'IA</h2>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Bitcoin (BTC)</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-medium">Haussier</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">Forte accumulation institutionnelle détectée. Le retournement de résistance à 64k indique la formation d'un modèle de continuation.</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Solana (SOL)</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-rose-400/20 text-rose-300 font-medium">Baissier</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">Ralentissement de la vélocité on-chain. Le modèle prévoit une correction à court terme de 5 à 8 % avant de trouver un support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Positions */}
        <div className="mt-8 rounded-3xl border border-primary/10 bg-white p-6 shadow-elevated">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-ink">Positions actives</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 text-ink-soft">
                  <th className="pb-3 font-medium">Actif</th>
                  <th className="pb-3 font-medium">Taille</th>
                  <th className="pb-3 font-medium">Prix d'entrée</th>
                  <th className="pb-3 font-medium">Prix actuel</th>
                  <th className="pb-3 font-medium text-right">Profit/Perte</th>
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
        {/* Comment fonctionne Aurore IA */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-ink">Comment fonctionne Aurore IA</h2>
            <p className="text-base text-ink-soft">L'architecture derrière vos transactions automatisées.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-bold">1</div>
              <h3 className="font-semibold text-ink text-lg">Ingestion de données</h3>
              <p className="mt-2 text-base text-ink-soft">Traite plus de 5 To de données de carnet d'ordres et on-chain quotidiennement.</p>
            </div>
            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-bold">2</div>
              <h3 className="font-semibold text-ink text-lg">Analyse neuronale</h3>
              <p className="mt-2 text-base text-ink-soft">Les modèles Transformer prédisent l'action des prix et le momentum à court terme.</p>
            </div>
            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-bold">3</div>
              <h3 className="font-semibold text-ink text-lg">Exécution</h3>
              <p className="mt-2 text-base text-ink-soft">Exécution d'API en moins d'une milliseconde auprès des principaux fournisseurs de liquidité.</p>
            </div>
            <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-bold">4</div>
              <h3 className="font-semibold text-ink text-lg">Gestion des risques</h3>
              <p className="mt-2 text-base text-ink-soft">Les stop-loss dynamiques et la taille des positions protègent le capital.</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mx-auto max-w-4xl mt-12 rounded-3xl border border-primary/10 bg-white p-8 md:p-12 shadow-elevated relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 h-96 w-96 rounded-full bg-gradient-to-tr from-accent/30 to-transparent blur-3xl pointer-events-none" />
          
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-bold text-ink">Besoin d'aide ?</h2>
            <p className="mt-3 text-base text-ink-soft">
              Vous avez des questions ou besoin d'aide pour votre portefeuille ? Envoyez-nous un message et notre équipe d'assistance vous répondra sous peu.
            </p>

            {success ? (
              <div className="mt-8 text-center py-12 rounded-3xl border border-primary/20 bg-emerald-50/50">
                <h3 className="text-2xl font-bold text-emerald-600">Message envoyé !</h3>
                <p className="mt-2 text-ink-soft">Nous vous répondrons sous peu.</p>
              </div>
            ) : (
              <form className="mt-8 space-y-5 text-left" onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="rounded-xl bg-rose-50 p-4 text-center text-sm font-semibold text-rose-600 border border-rose-100">
                    {errorMsg}
                  </div>
                )}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Nom complet</label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Marcus Chen" 
                    className="w-full rounded-2xl border border-primary/20 bg-secondary/40 px-4 py-3.5 text-sm text-ink outline-none transition-shadow focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,92,255,0.15)]" 
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Adresse e-mail</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="hello@example.com" 
                    className="w-full rounded-2xl border border-primary/20 bg-secondary/40 px-4 py-3.5 text-sm text-ink outline-none transition-shadow focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,92,255,0.15)]" 
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Numéro de téléphone</label>
                
<div style={{ display: 'flex', gap: '8px', width: '100%' }}>
    <select name="countryCode" style={{ width: '110px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', padding: '0.8rem', fontFamily: 'inherit' }}>
        <option value="CH">🇨🇭 +41</option>
        <option value="GB">🇬🇧 +44</option>
        <option value="CA">🇨🇦 +1</option>
        <option value="AU">🇦🇺 +61</option>
    </select>
<input 
                  type="tel" 
                  name="phone"
                  placeholder="+1 (555) 000-0000" 
                  className="w-full rounded-2xl border border-primary/20 bg-secondary/40 px-4 py-3.5 text-sm text-ink outline-none transition-shadow focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,92,255,0.15)]" 
                 style={{ flex: 1 }} />
</div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Message</label>
                <textarea 
                  name="message"
                  placeholder="Comment pouvons-nous vous aider aujourd'hui ?" 
                  rows={4}
                  className="w-full rounded-2xl border border-primary/20 bg-secondary/40 px-4 py-3.5 text-sm text-ink outline-none transition-shadow focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,92,255,0.15)]" 
                />
              </div>
              <button type="submit" disabled={loading} className="w-full rounded-full bg-gradient-brand shadow-md px-6 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50">
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
            )}
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}


