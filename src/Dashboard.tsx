import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Eye, Globe, TrendingUp, Calendar, LogOut, Lock } from 'lucide-react';

type VisitRow = {
  id: string;
  created_at: string;
  country: string | null;
  region: string | null;
  city: string | null;
  path: string | null;
};

type DailyCount = { date: string; count: number };
type LocationCount = { location: string; count: number };

const SESSION_KEY = 'smp_dash_authed';

export default function Dashboard({ onExit }: { onExit: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [visits, setVisits] = useState<VisitRow[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const [dailyCounts, setDailyCounts] = useState<DailyCount[]>([]);
  const [topLocations, setTopLocations] = useState<LocationCount[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') setAuthed(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    const { data, error } = await supabase
      .from('staff_login')
      .select('password_hash')
      .eq('username', username.trim())
      .single();

    if (error || !data) {
      setLoginError('Usuario o contraseña incorrectos');
      setLoading(false);
      return;
    }

    const { data: valid } = await supabase.rpc('verify_password', {
      plain: password,
      hashed: data.password_hash,
    }).then((r) => r).catch(() => ({ data: null }));

    if (valid) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
    } else {
      setLoginError('Usuario o contraseña incorrectos');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    if (!authed) return;
    setFetching(true);
    (async () => {
      const { data, error } = await supabase
        .from('website_visits')
        .select('id, created_at, country, region, city, path')
        .order('created_at', { ascending: false })
        .limit(500);

      if (error || !data) {
        setFetching(false);
        return;
      }

      setVisits(data);
      setTotalVisits(data.length);

      const today = new Date().toISOString().slice(0, 10);
      setTodayVisits(data.filter((v) => v.created_at.slice(0, 10) === today).length);

      const dayMap = new Map<string, number>();
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dayMap.set(d.toISOString().slice(0, 10), 0);
      }
      for (const v of data) {
        const day = v.created_at.slice(0, 10);
        if (dayMap.has(day)) dayMap.set(day, dayMap.get(day)! + 1);
      }
      setDailyCounts(Array.from(dayMap.entries()).map(([date, count]) => ({ date, count })));

      const locMap = new Map<string, number>();
      for (const v of data) {
        const loc = [v.city, v.region, v.country].filter(Boolean).join(', ') || 'Unknown';
        locMap.set(loc, (locMap.get(loc) || 0) + 1);
      }
      setTopLocations(
        Array.from(locMap.entries())
          .map(([location, count]) => ({ location, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
      );

      setFetching(false);
    })();
  }, [authed]);

  if (!authed) {
    return (
      <div className="dash-login-wrap">
        <div className="dash-login-card">
          <div className="dash-login-logo">
            <img src="/brand/SMP_Logo_final_Color.png" alt="SMP Manufacturing" />
          </div>
          <h2>Dashboard SMP</h2>
          <p className="dash-login-sub">Acceso exclusivo para personal</p>
          <form onSubmit={handleLogin} className="dash-login-form" autoComplete="off">
            <label>
              <span>Usuario</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=""
                required
                autoComplete="off"
                name="off-user"
                spellCheck={false}
              />
            </label>
            <label>
              <span>Contraseña</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                required
                autoComplete="new-password"
                name="off-pass"
              />
            </label>
            {loginError && <p className="dash-login-error">{loginError}</p>}
            <button type="submit" className="dash-login-btn" disabled={loading}>
              <Lock size={16} /> {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <button className="dash-back-btn" onClick={onExit}>
            <ArrowLeft size={15} /> Volver al sitio
          </button>
        </div>
      </div>
    );
  }

  const maxDaily = Math.max(...dailyCounts.map((d) => d.count), 1);

  return (
    <div className="dash-wrap">
      <header className="dash-header">
        <div className="dash-header-left">
          <img src="/brand/SMP_Logo_final_white.png" alt="SMP" />
          <h2>Dashboard de Visitas</h2>
        </div>
        <div className="dash-header-right">
          <button className="dash-logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Cerrar sesión
          </button>
          <button className="dash-back-btn" onClick={onExit}>
            <ArrowLeft size={15} /> Volver al sitio
          </button>
        </div>
      </header>

      <div className="dash-stats">
        <div className="dash-stat-card">
          <div className="dash-stat-icon"><Eye size={22} /></div>
          <div>
            <div className="dash-stat-value">{totalVisits}</div>
            <div className="dash-stat-label">Visitas totales</div>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon"><Calendar size={22} /></div>
          <div>
            <div className="dash-stat-value">{todayVisits}</div>
            <div className="dash-stat-label">Visitas hoy</div>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon"><Globe size={22} /></div>
          <div>
            <div className="dash-stat-value">{topLocations.length}</div>
            <div className="dash-stat-label">Ubicaciones únicas</div>
          </div>
        </div>
      </div>

      <div className="dash-body">
        <div className="dash-chart-card">
          <h3><TrendingUp size={18} /> Visitas últimos 14 días</h3>
          <div className="dash-chart">
            {dailyCounts.map((d) => (
              <div className="dash-chart-bar" key={d.date}>
                <div
                  className="dash-chart-fill"
                  style={{ height: `${(d.count / maxDaily) * 100}%` }}
                  title={`${d.date}: ${d.count} visitas`}
                />
                <span className="dash-chart-label">{d.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-loc-card">
          <h3><Globe size={18} /> Top ubicaciones</h3>
          {topLocations.length === 0 && !fetching ? (
            <p className="dash-empty">Sin datos aún</p>
          ) : (
            <div className="dash-loc-list">
              {topLocations.map((loc) => (
                <div className="dash-loc-row" key={loc.location}>
                  <span className="dash-loc-name">{loc.location}</span>
                  <span className="dash-loc-count">{loc.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="dash-table-card">
        <h3>Visitas recientes</h3>
        {fetching ? (
          <p className="dash-empty">Cargando...</p>
        ) : visits.length === 0 ? (
          <p className="dash-empty">Sin visitas registradas</p>
        ) : (
          <div className="dash-table-scroll">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>País</th>
                  <th>Región</th>
                  <th>Ciudad</th>
                </tr>
              </thead>
              <tbody>
                {visits.slice(0, 50).map((v) => (
                  <tr key={v.id}>
                    <td>{new Date(v.created_at).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</td>
                    <td>{v.country || '—'}</td>
                    <td>{v.region || '—'}</td>
                    <td>{v.city || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
