import { useState, useEffect } from 'react';
import { X, ShieldCheck, Sparkles, Calendar, Users, DollarSign, Award, Clock, Star, Flame, Coffee, Compass } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PASSKEY = 'yugen2026';

const mockReservations = [
  { id: 'YG-901', guest: 'Dr. Kenji Takahashi', experience: '18-Course Sensory Omakase (2 seats)', date: 'Tonight 18:00', status: 'confirmed', sommelier: true, spend: 950 },
  { id: 'YG-902', guest: 'Elena Rostova', experience: 'Private Sanctuary Buyout (8 seats)', date: 'Tomorrow 20:30', status: 'mise-en-place', sommelier: true, spend: 3800 },
  { id: 'YG-903', guest: 'Julian & Marc Vance', experience: 'Bespoke Olfactory Tasting (4 seats)', date: 'Friday 18:00', status: 'confirmed', sommelier: false, spend: 1600 },
  { id: 'YG-904', guest: 'Aethel Wealth Partners', experience: 'Full Evening Exclusive Buyout (12 pax)', date: 'Saturday 19:30', status: 'in-review', sommelier: true, spend: 6200 },
];

const mockCourses = [
  { course: '01. Otoro & Smoked Shoyu', aroma: 'Cold-pressed yuzu, 25-year barrel char', status: 'Curated' },
  { course: '02. Hokkaido Uni & Gold Leaf', aroma: 'Brine, sea mist, toasted nori oil', status: 'Active' },
  { course: '03. A5 Wagyu & White Truffle', aroma: 'Binchotan embers, alpine truffle shavings', status: 'Active' },
  { course: '04. Nodoguro (Blackthroat Seaperch)', aroma: 'Flame-kissed skin, sudachi citrus', status: 'Active' },
  { course: '05. Ceremonial Matcha Gelée', aroma: 'Uji stone-ground matcha, toasted genmaicha', status: 'Curated' },
];

const metrics = [
  { label: 'Weekly Sensory GMV', value: '$38,400', icon: DollarSign, color: 'text-amber-400' },
  { label: 'Seats Occupancy', value: '100% (Cap: 8/Sitting)', icon: Users, color: 'text-amber-300' },
  { label: 'Sommelier Attach Rate', value: '91.4%', icon: Sparkles, color: 'text-rose-400' },
  { label: 'Sanctuary Standard', value: 'Zen 3-Star Omakase', icon: Award, color: 'text-yellow-400' },
];

export default function AdminPortalModal({ isOpen, onClose }: AdminPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'courses' | 'supabase'>('overview');
  const [passkey, setPasskey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAuthenticated(false);
      setPasskey('');
      setAuthError('');
      setActiveTab('overview');
    }
  }, [isOpen]);

  const handleAuth = () => {
    if (passkey === PASSKEY) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passkey. Click the auto-fill passkey button below.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#09090b] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0c0c0e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-sm font-bold">
              幽玄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">YŪGEN SENSORY OS</span>
                <span className="text-xs font-semibold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">v1.0.0 VIP</span>
              </div>
              <p className="text-base text-zinc-200 leading-relaxed">Sanctuary Command Center &amp; Counter Ledger</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {!authenticated ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-medium text-xl text-white">Sanctuary Gate Authentication</h3>
              <p className="text-base text-zinc-200 leading-relaxed leading-relaxed">
                Enter your administrative key to access the omakase seating docket, sommelier allocations, and Supabase telemetry.
              </p>
            </div>

            <div className="w-full space-y-3">
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                placeholder="Enter passkey (e.g. yugen2026)"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-center text-sm focus:outline-none focus:border-amber-400 placeholder-zinc-600"
              />
              {authError && <p className="text-xs text-rose-400 font-mono">{authError}</p>}
              <button
                onClick={handleAuth}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-all cursor-pointer"
              >
                Authenticate Counter Gate
              </button>
              <button
                type="button"
                onClick={() => {
                  setPasskey(PASSKEY);
                  setAuthenticated(true);
                  setAuthError('');
                }}
                className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-400 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                [ AUTO-FILL DEMO PASS: yugen2026 ]
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-zinc-800 bg-[#0c0c0e]/50 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-zinc-800/80 text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Telemetry Overview
              </button>
              <button
                onClick={() => setActiveTab('reservations')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'reservations'
                    ? 'bg-zinc-800/80 text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Seating Docket (4)
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'courses'
                    ? 'bg-zinc-800/80 text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Sensory Courses (5)
              </button>
              <button
                onClick={() => setActiveTab('supabase')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'supabase'
                    ? 'bg-zinc-800/80 text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Supabase Engine
              </button>
            </div>

            {/* Tab Panels */}
            <div className="p-6 overflow-y-auto space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold tracking-wider font-mono text-zinc-400 uppercase tracking-wider">{m.label}</span>
                          <m.icon className={`w-4 h-4 ${m.color}`} />
                        </div>
                        <p className="text-xl font-bold font-mono text-white">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Sanctuary Live Status Card */}
                  <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/20 via-zinc-900 to-zinc-900 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider">COUNTER PROTOCOL ACTIVE</span>
                      </div>
                      <p className="text-xs text-zinc-300">Sitting 1 begins at 18:00 (8 seats). All knife prep and shari thermal regulation verified.</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 font-mono text-xs text-zinc-300">
                      Shari Temp: 37.2°C (Optimal)
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reservations' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">Active Guest Dockets</h4>
                    <span className="text-xs text-amber-400 font-mono">4 Upcoming Sittings</span>
                  </div>
                  <div className="border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-900 text-zinc-400 font-mono uppercase text-xs font-semibold tracking-wider border-b border-zinc-800">
                        <tr>
                          <th className="p-3">Ref ID</th>
                          <th className="p-3">Guest Name</th>
                          <th className="p-3">Experience</th>
                          <th className="p-3">Time</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Estimated GMV</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800 font-mono text-zinc-300">
                        {mockReservations.map((r) => (
                          <tr key={r.id} className="hover:bg-zinc-900/40">
                            <td className="p-3 text-amber-400">{r.id}</td>
                            <td className="p-3 font-semibold text-white">{r.guest}</td>
                            <td className="p-3 text-zinc-400">{r.experience}</td>
                            <td className="p-3">{r.date}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold tracking-wider uppercase ${
                                r.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                                r.status === 'mise-en-place' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                                'bg-zinc-800 text-zinc-400'
                              }`}>
                                {r.status}
                              </span>
                            </td>
                            <td className="p-3 text-right font-bold text-white">${r.spend.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">Tonight's Sensory Sequence</h4>
                    <span className="text-xs text-amber-400 font-mono">5 Master Pieces</span>
                  </div>
                  <div className="space-y-2">
                    {mockCourses.map((c, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-sm text-white">{c.course}</p>
                          <p className="text-xs text-amber-400/90 font-mono flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            Aroma Note: {c.aroma}
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 font-mono text-xs font-semibold tracking-wider uppercase">
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'supabase' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                    <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Database Architecture</h4>
                    <p className="text-base text-zinc-200 leading-relaxed leading-relaxed">
                      Production PostgreSQL database wired with Row Level Security (RLS) policies. Includes tables for reservations, sensory course catalog, and private buyout consultations.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-xs font-semibold tracking-wider font-mono text-zinc-300">TABLE 1</p>
                        <p className="text-xs font-mono font-bold text-white">reservations</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-xs font-semibold tracking-wider font-mono text-zinc-300">TABLE 2</p>
                        <p className="text-xs font-mono font-bold text-white">sensory_courses</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-xs font-semibold tracking-wider font-mono text-zinc-300">TABLE 3</p>
                        <p className="text-xs font-mono font-bold text-white">buyout_inquiries</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
