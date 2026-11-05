import { REGION } from './region.js';
import { FARM, WORK_TYPES, SYMPTOMS, PESTS, PEST_LINKS, MACHINE_GUIDE, RENTAL_ASK, SEED_POSTS, SEED_COMMENTS, TOPICS, SAMPLES } from './data.js';

/* ---------- 픽토그램 (선 아이콘, 글자색을 따름) ---------- */
const ICONS = {
  snow: '<path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11"/><path d="M9.5 3.5 12 6l2.5-2.5M9.5 20.5 12 18l2.5 2.5M3.2 9.7l3.4.9-.9 3.4M20.8 14.3l-3.4-.9.9-3.4M3.2 14.3l3.4-.9-.9-3.4M20.8 9.7l-3.4.9.9 3.4"/>',
  drop: '<path d="M12 3c3.5 4.3 6 7.6 6 10.6A6 6 0 0 1 6 13.6C6 10.6 8.5 7.3 12 3z"/><path d="M9.2 14.2a2.9 2.9 0 0 0 2.6 2.7"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/><path d="M8 11.5c.5-2 2-3 4-3-.3 2-1.6 3.2-4 3z"/>',
  leaf: '<path d="M5 19c0-8 5-13 15-14-.5 9.5-6 14.5-14 14z"/><path d="M5 19c3-4 6-6.5 9.5-8.5"/>',
  flask: '<path d="M9 3h6M10 3v6l-5.2 8.6A2.3 2.3 0 0 0 6.8 21h10.4a2.3 2.3 0 0 0 2-3.4L14 9V3"/><path d="M7.5 15h9"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8 14h2M14 14h2M8 17h2"/>',
  tractor: '<circle cx="7" cy="16.5" r="3.5"/><circle cx="18" cy="17.5" r="2.5"/><path d="M10.5 16.5h5M7 13V7h6l2 6h3.5a2 2 0 0 1 2 2v2"/><path d="M13 7v6H7M16 13V9"/>',
  camera: '<path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.8l1.5-2h4.4l1.5 2h1.8A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z"/><circle cx="12" cy="12.5" r="3.5"/>',
  home: '<path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15V15h-6v5.5H5.5A1.5 1.5 0 0 1 4 19z"/>',
  book: '<path d="M5 4.5h11a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3z"/><path d="M5 16.5a3 3 0 0 1 3-3h11M9 8h6"/>',
  chat: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z"/><path d="M8.5 9h7M8.5 12h4"/>',
  thumb: '<path d="M7.5 10.5V20H5a1 1 0 0 1-1-1v-7.5a1 1 0 0 1 1-1z"/><path d="M7.5 10.5 11 4c1.7 0 2.7 1.3 2.3 3l-.6 2.5h5a2 2 0 0 1 2 2.4l-1.2 6.3a2.2 2.2 0 0 1-2.2 1.8H7.5"/>',
  pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/>',
  check: '<circle cx="12" cy="12" r="8.5"/><path d="m8.2 12.3 2.6 2.6 5-5.2"/>',
  question: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.4"/><path d="M12 16.6v.2"/>',
  dot: '<circle cx="12" cy="12" r="2.5"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4.2h-4.2"/>',
  sprout: '<path d="M12 21v-9"/><path d="M12 12c0-4-2.5-6.5-7-6.5 0 4.2 2.6 6.5 7 6.5zM12 14c0-3.6 2.3-6 6.5-6 0 3.8-2.4 6-6.5 6z"/>',
  list: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 12h8M8 15h5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  out: '<path d="M8 16 16 8M9.5 8H16v6.5"/>',
};
const I = (n, s = 20) => `<svg class="pi" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

/* ---------- 공통 ---------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const todayStr = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); // KST
const addDays = (d, n) => { const t = new Date(d + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };
const md = (d) => { const [, m, dd] = d.split('-'); return `${+m}/${+dd}`; };
const dow = (d) => '일월화수목금토'[new Date(d + 'T00:00:00Z').getUTCDay()];
const uid = () => Math.random().toString(36).slice(2, 10);
const fmtTime = (iso) => new Date(iso).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Seoul' });
const maskPersonal = (t) => String(t)
  .replace(/01[016789][-\s.]?\d{3,4}[-\s.]?\d{4}/g, '010-****-****')
  .replace(/\d{6}[-\s]?[1-4]\d{6}/g, '******-*******');

function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 2200);
}

async function getJSON(url, ms = 6000) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms);
  try { const r = await fetch(url, { signal: ctl.signal }); if (!r.ok) throw new Error(r.status); return await r.json(); }
  finally { clearTimeout(t); }
}

// 나중에 Copilot SDK 에이전트 API(/api/...)가 붙으면 그쪽을 먼저 쓰고, 없으면 앱 안 규칙으로 대신한다.
async function tryApi(path, body, ms = 8000) {
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms);
    const r = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctl.signal });
    clearTimeout(t);
    if (!r.ok || !(r.headers.get('content-type') || '').includes('json')) return null;
    return await r.json();
  } catch { return null; }
}

/* ---------- 저장소 (이 브라우저에만 저장) ---------- */
const KEY = 'baekkimchi.farm.v3'; // v3: 토마토 시연 농가, 청도 날씨
let S = null;
function load() { try { S = JSON.parse(localStorage.getItem(KEY)); } catch { S = null; } }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { toast('저장 공간이 부족해요. 사진 저장을 줄여 주세요.'); } }

async function initState() {
  load();
  if (S && S.v === 2) return;
  let profile = null, logs = [], programs = [];
  try { profile = await getJSON('seed/demo-profile.json'); } catch {}
  try { logs = (await getJSON('seed/demo-logs.json')).logs || []; } catch {}
  try { programs = (await getJSON('seed/programs.json')).programs || []; } catch {}
  S = {
    v: 2,
    profile: profile || { nickname: '새내기 토마토 농부', birthYear: 1994, independentFarmingYears: 2, region: REGION.name, fields: [{ id: 'field-1', name: '1동 하우스', crop: '토마토', facility: '비닐하우스', areaHa: 0.2 }], totalAreaHa: 0.2 },
    programs,
    logs: logs.map((l) => ({ id: uid(), date: l.date, fieldId: l.fieldId, work: l.work, hours: l.hours, note: l.note, example: true })),
    tasks: [],
    posts: SEED_POSTS.map((p) => ({ ...p })),
    comments: SEED_COMMENTS.map((c) => ({ ...c })),
    liked: {},
    hidden: [],
  };
  save();
}
const hasTask = (title, date) => S.tasks.some((t) => !t.done && t.title === title && t.date === date);
function addTask(t) { if (hasTask(t.title, t.date)) return false; S.tasks.push({ id: uid(), done: false, ...t }); return true; }
const fieldName = (id) => (S.profile.fields.find((f) => f.id === id) || {}).name || id || '';
const fieldCrop = (id) => (S.profile.fields.find((f) => f.id === id) || {}).crop || '';

/* ---------- 날씨 (Open-Meteo 실시간, 기준 지역 한 곳) ---------- */
const WX = { 0: '맑음', 1: '대체로 맑음', 2: '구름 조금', 3: '흐림', 45: '안개', 48: '안개', 51: '이슬비', 53: '이슬비', 55: '이슬비', 56: '어는 비', 57: '어는 비', 61: '비', 63: '비', 65: '많은 비', 66: '어는 비', 67: '어는 비', 71: '눈', 73: '눈', 75: '많은 눈', 77: '눈', 80: '소나기', 81: '소나기', 82: '강한 소나기', 85: '눈', 86: '눈', 95: '뇌우', 96: '뇌우', 99: '뇌우' };
let weather = null;
let GUIDE = {}; // 작물 참고 기준 (seed/crop-guide.json, 서버 api/crop-guide.json과 같은 내용)

async function loadWeather() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${REGION.lat}&longitude=${REGION.lon}` +
    '&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,relative_humidity_2m_mean,wind_speed_10m_max' +
    '&past_days=3&forecast_days=7&timezone=Asia%2FSeoul&wind_speed_unit=ms';
  try { GUIDE = await getJSON('seed/crop-guide.json'); } catch { GUIDE = {}; }
  try {
    const j = await getJSON(url, 8000);
    const dd = j.daily; const at = (k, i) => (dd[k] ? dd[k][i] : null);
    const days = dd.time.map((d, i) => ({
      date: d, code: at('weather_code', i), sky: WX[at('weather_code', i)] || '-',
      min: at('temperature_2m_min', i), max: at('temperature_2m_max', i),
      rain: at('precipitation_sum', i) ?? 0, pop: at('precipitation_probability_max', i),
      hum: at('relative_humidity_2m_mean', i), wind: at('wind_speed_10m_max', i),
    }));
    const t = todayStr();
    weather = {
      source: 'live', fetchedAt: new Date().toISOString(),
      sourceName: `Open-Meteo 실시간 예보 (${REGION.name} 좌표)`, sourceUrl: 'https://open-meteo.com',
      current: { t: j.current.temperature_2m, h: j.current.relative_humidity_2m, sky: WX[j.current.weather_code] || '-', wind: j.current.wind_speed_10m },
      past: days.filter((d) => d.date < t), days: days.filter((d) => d.date >= t),
    };
  } catch { weather = null; } // 다른 지역 스냅샷으로 대신하지 않는다 (지역이 달라 오해를 부름)
}

/* ---------- 오늘 할 일 판단 (규칙, 근거 포함) — 에이전트가 없을 때도 쓰는 기본 안내 ---------- */
function buildAdvice() {
  const out = [];
  if (!weather || !weather.days.length) return out;
  const today = weather.days[0];
  const recentRain = weather.past.slice(-2).reduce((a, d) => a + (d.rain || 0), 0) + (today?.rain || 0);
  const crops = new Set(S.profile.fields.map((f) => f.crop));
  const tomato = crops.has('토마토');
  const th = (GUIDE['토마토'] || {}).thresholds || { coldInjuryC: 5, nightLowC: 10, humidPct: 85, windMs: 10, rainMm: 10 };
  const src = '농사로 일반 기준';
  const next5 = weather.days.slice(0, 5);

  // 저온·서리 → 하우스 보온
  const cold = next5.reduce((a, d) => (d.min != null && (a == null || d.min < a.min) ? d : a), null);
  if (cold && cold.min <= th.coldInjuryC) {
    const prep = cold.date === today.date ? cold.date : addDays(cold.date, -1);
    out.push({ level: 'warn', icon: 'snow', title: `${md(cold.date)}(${dow(cold.date)}) 최저 ${cold.min}℃ 예보 — 하우스 보온 준비`,
      why: `예보 최저기온 ${cold.min}℃. 토마토는 5℃ 아래에서 저온 피해 위험이 있어요(${src}). 전날 저녁 보온 커튼·덮개와 측창 닫힘을 확인하세요.`,
      task: { title: '하우스 보온 커튼·덮개 점검', date: prep } });
  } else if (tomato && cold && cold.min <= th.nightLowC) {
    out.push({ level: 'info', icon: 'snow', title: `밤 기온 ${cold.min}℃ — 저녁에 측창 닫기`,
      why: `${md(cold.date)} 최저 ${cold.min}℃. 밤 10℃ 아래에서는 생육이 늦어질 수 있어요(${src}).`,
      task: { title: '해 지기 전 측창·출입문 닫기', date: today.date } });
  }
  // 관수
  const lastWater = S.logs.filter((l) => /관수|물/.test(l.work)).map((l) => l.date).sort().pop();
  if (recentRain >= 5 || (today?.pop ?? 0) >= 60) {
    out.push({ level: 'ok', icon: 'drop', title: '관수 보류 · 양 줄이기',
      why: `최근 강수 ${recentRain.toFixed(1)}mm${today?.pop != null ? `, 오늘 강수확률 ${today.pop}%` : ''}. 흐리고 비 오는 날은 물을 덜 써요. 흙 수분을 보고 판단하세요.` });
  } else if (tomato) {
    out.push({ level: 'info', icon: 'drop', title: '흙 수분 보고 관수 판단',
      why: `최근 강수 ${recentRain.toFixed(1)}mm.${lastWater ? ` 마지막 관수 기록: ${md(lastWater)}.` : ''} 수분이 갑자기 바뀌면 열매가 터지기 쉬워요(${src}).`,
      task: { title: '하우스 흙 수분 확인', date: today.date } });
  }
  // 습한 날씨 → 곰팡이병 예찰
  const humid = next5.find((d) => (d.hum ?? 0) >= th.humidPct || (d.pop ?? 0) >= 70);
  if (tomato && (recentRain >= th.rainMm || humid)) {
    out.push({ level: 'warn', icon: 'search', title: '습한 날씨 — 잿빛곰팡이병·잎곰팡이병 예찰',
      why: `${humid ? `${md(humid.date)} ${humid.hum != null ? `평균 습도 ${humid.hum}%` : `강수확률 ${humid.pop}%`}` : `최근 비 ${recentRain.toFixed(1)}mm`}. 습한 날이 이어지면 곰팡이병이 늘기 쉬워요(${src}). 오전에 환기하고 의심 잎은 사진 진단으로 확인하세요.`,
      task: { title: '잎 뒷면·열매 곰팡이 예찰', date: addDays(today.date, 1) }, link: '#diagnose' });
  }
  // 강풍 → 시설 점검
  const windy = next5.find((d) => (d.wind ?? 0) >= th.windMs);
  if (windy) {
    out.push({ level: 'warn', icon: 'info', title: `${md(windy.date)} 강한 바람 ${windy.wind}m/s 예보 — 하우스 점검`,
      why: '강한 바람이 예보되면 비닐·끈·출입문을 미리 점검해요.',
      task: { title: '하우스 비닐·끈 점검', date: windy.date === today.date ? today.date : addDays(windy.date, -1) } });
  }
  return out;
}

/* ---------- AI 작업 계획 (날씨 에이전트 ∥ 밭 에이전트 → 계획 에이전트 → 서버 근거 검증) ---------- */
const pl = { running: false, result: null, picked: new Set(), t0: 0, timer: null };
const PL_STEPS = [['weather', '날씨 에이전트 — 실시간 예보에서 작업 위험 찾기'], ['field', '밭 에이전트 — 기록·작물 기준 확인'],
  ['planner', '계획 에이전트 — 7일 할 일 정리'], ['server', '근거 확인 — 실제 자료에 없는 근거는 제외']];
const PRI = { 높음: 'danger', 보통: 'warn', 낮음: '' };

function localPlan() { // 에이전트를 쓸 수 없을 때: 같은 형식으로 규칙 안내를 보여 준다
  const f = S.profile.fields[0];
  return {
    source: 'rules',
    tasks: buildAdvice().filter((a) => a.task).map((a) => ({ title: a.task.title, date: a.task.date, fieldId: f?.id, category: '기타', priority: a.level === 'warn' ? '높음' : '보통', reason: a.why, evidence: [] })),
    dropped: [], risks: [], trace: [],
  };
}

async function runPlan(root) {
  pl.running = true; pl.result = null; pl.t0 = Date.now(); render();
  const tick = () => { const el = $('#plTime'); if (el) el.textContent = `${Math.round((Date.now() - pl.t0) / 1000)}초`; };
  pl.timer = setInterval(tick, 1000);
  const body = {
    fields: S.profile.fields,
    logs: S.logs.slice(-30).map(({ id, date, fieldId, work, note }) => ({ id, date, fieldId, work, note })),
    tasks: S.tasks.filter((t) => !t.done).map(({ title, date }) => ({ title, date })),
  };
  const api = await tryApi('/api/plan', body, 45000);
  clearInterval(pl.timer);
  pl.result = api && Array.isArray(api.tasks) ? api : localPlan();
  pl.picked = new Set();
  pl.running = false; render();
}

function viewPlan() {
  const r = pl.result;
  const head = `
    <div class="card-head"><div class="grow"><p class="kicker">02 · AI 작업 계획 <span class="tag ai">AI 제안</span></p>
      <div class="card-title" style="font-size:clamp(20px,2.2vw,28px)">이번 주 할 일을 계획해 볼까요?</div>
      <p class="muted" style="margin:0">${esc(REGION.name)} 실시간 예보와 내 영농 기록을 함께 보고, 근거가 있는 일만 제안해요.</p></div>
      <div class="badge-ic g" aria-hidden="true">${I('list', 26)}</div></div>`;
  if (pl.running) {
    return `<div class="card big" id="plan" style="margin-top:18px">${head}
      <div class="steps" aria-live="polite">${PL_STEPS.map(([, s], i) => `<div class="step ${i < 2 ? 'run' : ''}"><span class="dot"></span>${s}${i < 2 ? ' (동시 실행)' : ''}</div>`).join('')}</div>
      <p class="small muted">진행 중 · <span id="plTime">0초</span> · 보통 20~40초 걸려요</p></div>`;
  }
  if (!r) {
    return `<div class="card big" id="plan" style="margin-top:18px">${head}
      <button class="btn primary lg block" id="plRun">이번 주 할 일 계획 세우기 ${I('arrow', 20)}</button>
      <div class="dotline">제안만 해요 · 일정 추가는 직접 고른 것만</div></div>`;
  }
  const t = todayStr();
  const tasks = r.tasks || [];
  const banner = r.source === 'agent'
    ? `<span class="tag ai">에이전트 ${(r.agents || []).length}개 · ${esc(Object.values(r.models || {}).filter((v, i, a) => a.indexOf(v) === i).join(', '))}</span> <span class="small muted">${Math.round((r.ms || 0) / 100) / 10}초 · 날씨 ${esc(r.weather?.region || REGION.name)} ${esc(r.weather?.fetchedAt ? fmtTime(r.weather.fetchedAt) : '')} 기준</span>`
    : '<span class="tag warn">에이전트 연결 전</span> <span class="small muted">앱 안 규칙으로 만든 계획이에요</span>';
  return `<div class="card big" id="plan" style="margin-top:18px">${head}
    <div class="row wrap-it" style="margin-bottom:8px">${banner}</div>
    ${tasks.length ? `<ul class="list">${tasks.map((x, i) => {
      const added = hasTask(x.title, x.date);
      return `<li class="row" style="align-items:flex-start">
        <input type="checkbox" data-pick="${i}" ${added ? 'disabled checked' : pl.picked.has(i) ? 'checked' : ''} aria-label="${esc(x.title)} 선택">
        <div class="grow"><b>${esc(x.title)}</b> ${x.priority ? `<span class="tag ${PRI[x.priority] || ''}">${esc(x.priority)}</span>` : ''} ${added ? `<span class="tag ok">${I('check', 14)} 일정에 있음</span>` : ''}
          <div class="small muted">${x.date === t ? '오늘' : `${md(x.date)}(${dow(x.date)})`} · ${esc(fieldName(x.fieldId))} · ${esc(x.category || '')}</div>
          ${x.reason ? `<div class="why">이유: ${esc(x.reason)}</div>` : ''}
          ${(x.evidence || []).length ? `<div class="small" style="margin-top:4px">${x.evidence.map((e) => `<span class="tag">${I(e.kind === 'weather' ? 'drop' : e.kind === 'record' ? 'book' : 'leaf', 14)} ${esc(e.label)}</span>`).join(' ')}</div>` : ''}
        </div></li>`;
    }).join('')}</ul>` : '<div class="empty">이번 주에는 따로 챙길 일이 없어요.</div>'}
    <div class="row wrap-it" style="margin-top:10px">
      ${tasks.length ? '<button class="btn primary" id="plAdd">고른 할 일 일정에 추가</button>' : ''}
      <button class="btn ghost" id="plRun">다시 계획하기</button>
    </div>
    ${(r.dropped || []).length ? `<details style="margin-top:10px"><summary class="small">검증에서 뺀 제안 ${r.dropped.length}개</summary><ul class="small">${r.dropped.map((d) => `<li>${esc(d.title)} — ${esc(d.reason)}</li>`).join('')}</ul></details>` : ''}
    ${(r.trace || []).length ? `<details style="margin-top:6px"><summary class="small">에이전트 실행 기록</summary><ol class="small">${r.trace.map((e) => `<li>${(e.ms / 1000).toFixed(1)}초 · ${esc(e.agent)} · ${e.type === 'tool' ? `도구 <code>${esc(e.name)}</code> → ${esc(e.result)}` : esc(e.type === 'start' ? '시작' : e.type === 'done' ? '완료' : '') + ' ' + esc(e.name)}</li>`).join('')}</ol></details>` : ''}
    <p class="notice">AI가 만든 제안이에요. 약제·사용량은 정하지 않아요. 근거 값은 서버가 가진 예보·기록에서 그대로 가져와요.</p>
  </div>`;
}

function bindPlan(root) {
  root.querySelectorAll('#plRun').forEach((b) => b.onclick = () => runPlan(root));
  root.querySelectorAll('[data-pick]').forEach((c) => c.onchange = () => { const i = +c.dataset.pick; c.checked ? pl.picked.add(i) : pl.picked.delete(i); });
  const add = $('#plAdd', root);
  if (add) add.onclick = () => {
    if (!pl.picked.size) { toast('추가할 할 일을 골라 주세요'); return; }
    let n = 0;
    for (const i of pl.picked) { const x = pl.result.tasks[i]; if (addTask({ title: x.title, date: x.date, from: pl.result.source === 'agent' ? 'AI 작업 계획' : '날씨 안내' })) n++; }
    save(); pl.picked.clear(); toast(n ? `일정 ${n}개를 추가했어요` : '이미 일정에 있어요'); render();
  };
}

/* ---------- 지원사업 ---------- */
function programMatch(p) {
  const age = 2026 - (S.profile.birthYear || 1994) - 1; // 만 나이 대략
  const out = [];
  for (const c of p.conditions || []) {
    const r = c.rule;
    if (!r) { out.push({ text: c.text, st: c.needsCheck ? 'check' : 'info' }); continue; }
    let ok = true;
    if (r.ageMin != null && age < r.ageMin) ok = false;
    if (r.ageMaxExclusive != null && age >= r.ageMaxExclusive) ok = false;
    if (r.independentFarmingYearsMax != null && (S.profile.independentFarmingYears ?? 99) > r.independentFarmingYearsMax) ok = false;
    out.push({ text: c.text, st: ok ? 'ok' : 'no' });
  }
  const st = out.some((o) => o.st === 'no') ? 'no' : out.some((o) => o.st === 'check') ? 'maybe' : 'maybe';
  return { st, out };
}

/* ---------- 화면: 오늘 ---------- */
function viewToday() {
  const adv = buildAdvice();
  const t = todayStr();
  const pending = S.tasks.filter((x) => !x.done).sort((a, b) => a.date.localeCompare(b.date));
  const w = weather;
  const coldest = w ? w.days.slice(0, 5).reduce((a, d) => (d.min < a.min ? d : a), w.days[0]) : null;
  const frosty = coldest && coldest.min <= 1;
  const wxHtml = w ? `
    <div class="card dark big">
      <div class="card-head"><div class="grow"><p class="kicker">${esc(REGION.name)} · 실시간 예보</p>
        <div class="card-title">${frosty ? '서리 대비를<br>미리 챙겨요' : '이번 주 날씨를<br>살펴봐요'}</div></div>
        <svg width="80" height="46" viewBox="0 0 80 46" aria-hidden="true"><g fill="#f2d79b"><circle cx="22" cy="28" r="14"/><circle cx="40" cy="18" r="16"/><circle cx="58" cy="28" r="14"/><rect x="18" y="26" width="44" height="16" rx="8"/></g></svg></div>
      <div class="temp"><div class="big">${Math.round(coldest.min)}°</div>
        <div><b>${md(coldest.date)}(${dow(coldest.date)}) 최저기온</b><div class="small" style="opacity:.9">${frosty ? '덮개·관수 판단 전 최신 예보를 확인하세요.' : `지금 ${Math.round(w.current.t)}° · ${esc(w.current.sky)} · 습도 ${esc(w.current.h)}%`}</div></div></div>
      <div class="days">${w.days.slice(0, 6).map((d) => `
        <div class="day ${d.min <= 1 ? 'frost' : ''}"><b>${d.date === t ? '오늘' : md(d.date)}</b>${esc(d.sky)}<br>${Math.round(d.min)}°/${Math.round(d.max)}°</div>`).join('')}</div>
      <div class="src">실시간 · <a href="${esc(w.sourceUrl)}" target="_blank" rel="noopener">Open-Meteo ${I('out', 14)}</a> · ${esc(fmtTime(w.fetchedAt))} 기준 · 기준 지역: ${esc(REGION.name)}(${esc(REGION.why)})</div>
    </div>` : '<div class="card">날씨를 불러오지 못했어요. 잠시 뒤 다시 열어 주세요.</div>';

  const progs = (S.programs || []).map((p) => ({ p, m: programMatch(p) })).filter((x) => x.m.st !== 'no');
  const D = new Date(t + 'T00:00:00Z');

  return `
  <section class="hero">
    <div class="grow">
      <div class="eyebrow">${D.getUTCMonth() + 1}월 ${D.getUTCDate()}일 ${dow(t)}요일 <span class="tag demo">시연 데이터</span></div>
      <h1>오늘 밭에서 다음 할 일을 찾아볼까요?</h1>
      <p class="sub">사진 한 장으로 살펴보고, 기록과 일정까지 한 번에 정리해요.</p>
    </div>
    <svg class="ill" viewBox="0 0 300 230" aria-hidden="true">
      <defs><clipPath id="oval"><ellipse cx="150" cy="115" rx="148" ry="114"/></clipPath></defs>
      <g clip-path="url(#oval)"><rect width="300" height="230" fill="#dfe3d4"/>
        <circle cx="128" cy="128" r="38" fill="#e8894a"/><circle cx="172" cy="104" r="36" fill="#e6a77a" opacity=".9"/><circle cx="206" cy="146" r="38" fill="#e6c1a2" opacity=".85"/>
        <g stroke="#e8a35a" stroke-width="3" stroke-linecap="round"><circle cx="218" cy="66" r="9" fill="#e8a35a"/><path d="M218 46v-8M218 94v-8M198 66h-8M246 66h-8M204 52l-5-5M232 80l5 5M232 52l5-5M204 80l-5 5"/></g>
        <path d="M0 176h300v60H0z" fill="#4a3d3b"/></g>
      <text x="150" y="206" text-anchor="middle" fill="#fff" font-size="17" font-weight="800" font-family="Noto Sans KR,sans-serif">${esc(REGION.short)} · 토마토 농가</text>
    </svg>
  </section>

  <div class="grid">
    <div class="col">
      <div class="card big">
        <div class="card-head"><div class="grow"><p class="kicker">01 · 사진으로 살펴보기</p>
          <div class="card-title">잎이나 열매 사진을 올려주세요</div>
          <p class="muted" style="margin:0">무엇이 달라 보이는지 함께 정리하고, 확인할 근거를 찾아볼게요.</p></div>
          <div class="badge-ic" aria-hidden="true">${I('camera', 26)}</div></div>
        <a class="drop" href="#diagnose" style="text-decoration:none;color:inherit"><span class="plus" aria-hidden="true">${I('plus', 30)}</span><b>사진 선택하기</b><span class="small muted">JPG, PNG · 사진은 이 화면에서만 사용해요</span></a>
        <a class="btn primary lg block" href="#diagnose">사진 상태 살펴보기 ${I('arrow', 20)}</a>
        <div class="dotline">단계별 진행 · 저장은 직접 승인한 뒤에만</div>
      </div>
    </div>
    <div class="col">
      ${wxHtml}
      <div class="card big">
        <div class="card-head"><div class="grow"><p class="kicker">다음에 할 일</p><div class="card-title" style="font-size:clamp(20px,2.2vw,28px)">기록이 작업 계획으로</div></div><div class="badge-ic g" aria-hidden="true">${I('calendar', 26)}</div></div>
        <ol class="tl">${pending.length ? pending.slice(0, 3).map((x, i) => `
          <li><span class="n">${i + 1}</span><div><b>${esc(x.title)}</b><span>${x.date === t ? '오늘' : md(x.date) + '(' + dow(x.date) + ')'}${x.from ? ' · ' + esc(x.from) : ''}</span></div></li>`).join('') : `
          <li><span class="n">1</span><div><b>사진으로 상태 확인</b><span>지금 · 확인할 점 정리</span></div></li>
          <li><span class="n">2</span><div><b>영농 기록 저장</b><span>사용자가 저장을 승인</span></div></li>
          <li><span class="n">3</span><div><b>밭 점검 일정 추가</b><span>필요한 작업만 선택</span></div></li>`}
        </ol>
        <a href="#log">내 영농 기록 보기 ${I('arrow', 16)}</a>
      </div>
      <div class="note-box"><span class="i">${I('info', 20)}</span><div><b>근거를 함께 보여드려요</b><div class="small muted">정보 출처와 기준 시각을 확인하고, 확실하지 않은 내용은 단정하지 않아요.</div></div></div>
    </div>
  </div>

  ${viewPlan()}

  <h2>날씨로 본 관리 안내 <span class="tag">규칙 기반</span></h2>
  ${adv.length ? adv.map((a, i) => `
    <div class="card tight adv ${a.level}">
      <div class="ic" aria-hidden="true">${I(a.icon, 22)}</div>
      <div class="grow"><b>${esc(a.title)}</b><div class="why">근거: ${esc(a.why)}</div>
        <div class="row wrap-it" style="margin-top:8px">
          ${a.task ? (hasTask(a.task.title, a.task.date) ? `<span class="tag ok">${I('check', 14)} 일정에 추가됨 (${md(a.task.date)})</span>` : `<button class="btn sm" data-addtask="${i}">일정에 추가 (${md(a.task.date)})</button>`) : ''}
          ${a.link ? `<a class="btn sm ghost" href="${a.link}">사진 진단</a>` : ''}
        </div></div>
    </div>`).join('') : '<div class="empty">지금은 특별히 챙길 일이 없어요.</div>'}

  <h2>다가오는 일정</h2>
  <div class="card">${pending.length ? `<ul class="list">${pending.slice(0, 6).map((x) => `
    <li class="row"><input type="checkbox" data-done="${x.id}" aria-label="완료"><div class="grow"><b>${esc(x.title)}</b>
      <div class="small muted">${md(x.date)}(${dow(x.date)})${x.date < t ? ' · <span class="tag danger">지남</span>' : x.date === t ? ' · <span class="tag warn">오늘</span>' : ''} ${x.from ? '· ' + esc(x.from) : ''}</div></div></li>`).join('')}</ul>`
    : '<div class="empty">승인한 일정이 없어요. 위 안내에서 "일정에 추가"를 눌러 보세요.</div>'}</div>

  <h2>해당될 수 있는 지원사업</h2>
  ${progs.length ? progs.map(({ p, m }) => `
    <div class="card tight"><b>${esc(p.name)}</b> <span class="tag warn">해당될 수 있음 · 확인 필요</span>
      <div class="small muted">${esc(p.operator || '')} · ${esc(p.benefit || '')}</div>
      <ul class="small" style="margin:6px 0 0;padding-left:18px">${m.out.map((o) => `<li>${o.st === 'ok' ? I('check', 16) : o.st === 'check' ? I('question', 16) : I('dot', 16)} ${esc(o.text)}</li>`).join('')}</ul>
      ${p.deadline ? `<div class="small muted" style="margin-top:6px">일정: ${esc(p.deadline.text || p.deadline)}</div>` : ''}
      <div class="small">${(p.sources || []).map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>`).join(' · ')}</div>
    </div>`).join('') : '<div class="empty">조건에 맞는 사업을 찾지 못했어요.</div>'}
  <p class="notice">자격은 앱이 판정하지 않아요. 신청 전 공고 원문을 확인하세요.</p>`;
}
function bindToday(root) {
  bindPlan(root);
  const adv = buildAdvice();
  root.querySelectorAll('[data-addtask]').forEach((b) => b.onclick = () => {
    const a = adv[+b.dataset.addtask];
    const added = addTask({ title: a.task.title, date: a.task.date, from: '날씨 안내' }); save();
    toast(added ? '일정에 추가했어요' : '이미 일정에 있어요'); render();
  });
  root.querySelectorAll('[data-done]').forEach((c) => c.onchange = () => {
    const x = S.tasks.find((t) => t.id === c.dataset.done); x.done = true; save(); toast('완료했어요'); render();
  });
}

/* ---------- 화면: 사진 진단 ---------- */
const dx = { crop: '토마토', picked: new Set(), photo: null, stats: null, result: null, running: false, keepPhoto: false, sample: null };
const LABEL_KO = Object.fromEntries(PESTS.filter((p) => p.label).map((p) => [p.label, p.name]));
const koLabel = (l) => LABEL_KO[l] || l;

function analyzePhoto(img) {
  const W = 160, H = Math.max(1, Math.round(img.height * (160 / img.width)));
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d'); g.drawImage(img, 0, 0, W, H);
  const d = g.getImageData(0, 0, W, H).data;
  let green = 0, brown = 0, dark = 0, white = 0, yellow = 0, lum = [], n = W * H;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i] / 255, gg = d[i + 1] / 255, b = d[i + 2] / 255;
    const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), v = mx, s = mx ? (mx - mn) / mx : 0;
    let h = 0; if (mx !== mn) { h = mx === r ? ((gg - b) / (mx - mn)) % 6 : mx === gg ? (b - r) / (mx - mn) + 2 : (r - gg) / (mx - mn) + 4; h *= 60; if (h < 0) h += 360; }
    lum.push(0.299 * r + 0.587 * gg + 0.114 * b);
    if (v < 0.18) dark++;
    else if (s < 0.12 && v > 0.85) white++;
    else if (h >= 70 && h <= 170 && s > 0.2) green++;
    else if (h >= 45 && h < 70 && s > 0.35 && v > 0.5) yellow++;
    else if (h >= 10 && h < 45 && s > 0.25 && v < 0.7) brown++;
  }
  let lap = 0; // 흐림 정도 (라플라시안 분산)
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const i = y * W + x; const L = 4 * lum[i] - lum[i - 1] - lum[i + 1] - lum[i - W] - lum[i + W]; lap += L * L;
  }
  lap /= (W - 2) * (H - 2);
  const meanL = lum.reduce((a, b) => a + b, 0) / n;
  const pct = (x) => Math.round((x / n) * 100);
  return { green: pct(green), brown: pct(brown), dark: pct(dark), white: pct(white), yellow: pct(yellow), blurry: lap < 0.0015, tooDark: meanL < 0.22 };
}

function photoToJpeg(img, max = 640) { // 다시 그려 저장하면 위치 정보(EXIF)가 빠진다
  const k = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg', 0.72);
}

function localDiagnose() {
  const picked = [...dx.picked];
  const wet = weather ? (weather.past.slice(-2).reduce((a, d) => a + (d.rain || 0), 0) + (weather.days[0]?.rain || 0)) >= 10 : false;
  const cands = PESTS.filter((p) => p.crop === dx.crop).map((p) => {
    const hit = p.keys.filter((k) => dx.picked.has(k));
    let score = hit.length / p.keys.length;
    const ev = hit.map((k) => '체크한 특징: ' + SYMPTOMS[dx.crop].find((s) => s.id === k).label);
    if (hit.length && p.wetBoost && wet) { score += 0.15; ev.push('최근 비가 많이 와 습한 조건 (날씨 데이터)'); }
    if (hit.length && dx.stats && (dx.stats.brown + dx.stats.dark) >= 8 && /반점|검/.test(p.feature)) ev.push(`사진 색 분석: 갈색·검은 영역 ${dx.stats.brown + dx.stats.dark}%`);
    if (hit.length && dx.stats && dx.stats.white >= 5 && /흰/.test(p.feature)) ev.push(`사진 색 분석: 흰 영역 ${dx.stats.white}%`);
    return { p, hit, score, ev };
  }).filter((c) => c.hit.length).sort((a, b) => b.score - a.score);

  // 검증: 체크한 특징 중 극히 일부만 설명하는 후보는 뺀다
  const kept = [], dropped = [];
  for (const c of cands) {
    const share = picked.length ? c.hit.length / picked.length : 0;
    if (c.hit.length === 1 && share < 0.34 && kept.concat(cands).some((o) => o.hit.length >= 2)) dropped.push(c); else kept.push(c);
  }
  const top = kept.slice(0, 3).map((c) => ({ ...c, conf: c.score >= 0.66 && c.hit.length >= 2 ? '높음' : c.score >= 0.34 ? '중간' : '낮음' }));
  const hard = !top.length || (dx.stats && (dx.stats.blurry || dx.stats.tooDark) && top.every((c) => c.conf !== '높음'));
  return { top, dropped, hard, source: 'local' };
}

function viewDiagnose() {
  const syms = SYMPTOMS[dx.crop];
  const r = dx.result;
  const st = dx.stats;
  return `
  <h1>사진으로 증상 확인</h1>
  <p class="sub">작물을 고르고 사진을 올린 뒤, 보이는 특징을 골라 주세요.</p>
  <div class="card">
    <div class="chips" role="group" aria-label="작물">${Object.keys(SYMPTOMS).map((c) => `<button class="chip" data-crop="${esc(c)}" aria-pressed="${c === dx.crop}">${esc(c)}</button>`).join('')}</div>
    <label class="f" for="photo">사진 (잎 앞·뒤, 열매, 줄기)</label>
    <label class="drop" for="photo">${dx.photo ? `<img src="${dx.photo}" alt="올린 작물 사진">` : `<span class="plus">${I('camera', 30)}</span><b>사진 찍기 또는 고르기</b><span class="small muted">JPG, PNG · 위치 정보는 지우고 분석해요</span>`}</label>
    <input id="photo" type="file" accept="image/*" capture="environment" hidden>
    ${dx.crop === '토마토' ? `<div class="small" style="margin-top:10px"><b>사진이 없으면 검증된 샘플로 해 보세요</b> <span class="muted">(정답 라벨이 있는 공개 데이터셋 사진)</span></div>
    <div class="chips" role="group" aria-label="샘플 사진">${SAMPLES.map((x) => `<button class="chip" data-sample="${x.id}" aria-pressed="${dx.sample?.id === x.id}">${esc(koLabel(x.answer))}</button>`).join('')}</div>
    ${dx.sample ? `<div class="small muted">샘플 정답 라벨: <b>${esc(koLabel(dx.sample.answer))}</b> · 출처: <a href="${dx.sample.url}" target="_blank" rel="noopener">${esc(dx.sample.set)}</a> (${esc(dx.sample.license)})</div>` : ''}` : ''}
    ${st ? `<div class="small" style="margin-top:8px">사진 색 분석(간이): 초록 ${st.green}% · 노랑 ${st.yellow}% · 갈색 ${st.brown}% · 검은 영역 ${st.dark}% · 흰 영역 ${st.white}%
      ${st.blurry ? '<br><span class="tag warn">사진이 흐릿해요</span>' : ''}${st.tooDark ? '<br><span class="tag warn">사진이 어두워요</span>' : ''}</div>` : ''}
    <label class="f">보이는 특징 (여러 개 선택${dx.crop === '토마토' ? ', 사진이 있으면 선택하지 않아도 돼요' : ''})</label>
    <div class="chips">${syms.map((s) => `<button class="chip" data-sym="${s.id}" aria-pressed="${dx.picked.has(s.id)}">${esc(s.label)}</button>`).join('')}</div>
    <div style="margin-top:14px"><button class="btn primary block" id="runDx" ${dx.running ? 'disabled' : ''}>증상 확인하기</button></div>
  </div>
  <div id="dxSteps"></div>
  ${r ? renderDxResult(r) : ''}
  <p class="notice">결과는 참고용이에요. 약제명·희석 배수는 알려 드리지 않아요. 등록 약제는 <a href="${PEST_LINKS.pesticide}" target="_blank" rel="noopener">농약안전정보시스템</a>에서 확인하고 라벨대로 쓰세요.</p>`;
}

function classifierPanel(c) {
  if (!c) return '';
  return `<div class="card tight small" aria-label="분류 모델 결과">
    <b>사진 분류 모델 결과 (참고값)</b>
    ${c.top.map((t) => `<div class="row" style="gap:8px;margin-top:6px"><span style="min-width:9.5em">${esc(koLabel(t.label))}</span>
      <span class="grow" style="background:var(--line,#ddd);border-radius:6px;height:10px;overflow:hidden" role="img" aria-label="확률 ${Math.round(t.prob * 100)}%"><span style="display:block;height:100%;width:${Math.round(t.prob * 100)}%;background:var(--green)"></span></span>
      <span style="min-width:3em;text-align:right">${Math.round(t.prob * 100)}%</span></div>`).join('')}
    <p class="muted" style="margin:6px 0 0">${esc(c.note)} 실측: ${esc(c.fieldAccuracy.dataset)}에서 1순위 ${Math.round(c.fieldAccuracy.top1 * 100)}%, 상위 3개 ${Math.round(c.fieldAccuracy.top3 * 100)}%.
    모델: ${esc(c.model)}${c.ms != null ? ` · ${c.ms}ms` : ''}</p></div>`;
}

function sampleCheck(r) {
  if (!dx.sample || r.hard || !r.top.length) return '';
  const ok = r.top[0].p.label === dx.sample.answer;
  return `<div class="card tight small"><b>샘플 정답과 비교</b>: 정답 라벨은 <b>${esc(koLabel(dx.sample.answer))}</b>이고, 1순위 후보는 <b>${esc(r.top[0].p.name)}</b>이에요.
    <span class="tag ${ok ? '' : 'warn'}">${ok ? '일치' : '불일치'}</span></div>`;
}

function renderDxResult(r) {
  const fromAgent = r.source === 'agent';
  const fromModel = r.source === 'model';
  const sourceTag = `<span class="tag ${fromAgent ? 'ai' : 'warn'}">${fromAgent ? 'AI 에이전트' : fromModel ? '사진 분류 모델' : '앱 규칙 기반'}</span>`;
  const sourceText = fromAgent
    ? `Copilot 에이전트: 진단(사진 + 분류 모델 도구) → 검증 (${esc((r.models || []).join(', '))})`
    : fromModel ? 'AI 에이전트에 연결하지 못해 사진 분류 모델 결과만 보여 드려요. 에이전트의 사진 판단·검증은 빠졌어요.'
    : 'AI 에이전트 응답이 없어 앱 안의 규칙으로 정리했어요.';
  if (r.hard) return `
    <div class="card"><h3>판단하기 어려워요 ${sourceTag}</h3>
      <p class="small muted">${sourceText}</p>
      <p class="small">특징이 부족하거나 사진이 흐려 후보를 정하기 어려워요.</p>
      <ul class="small"><li>가까이, 밝은 곳에서 다시 찍어 주세요.</li><li>잎은 앞면과 뒷면을 모두 찍어 주세요.</li><li>계속 모르겠으면 청도군 농업기술센터에 사진을 보여 주세요.</li></ul>
      <a href="${PEST_LINKS.ncpms}" target="_blank" rel="noopener">국가농작물병해충관리시스템 도감 보기</a></div>`;
  return `
  <h2>의심 후보 ${sourceTag}</h2>
  <p class="small muted" style="margin-top:-6px">${sourceText}</p>
  ${r.warning ? `<p class="tag warn">${esc(r.warning)}</p>` : ''}
  ${r.observed ? `<div class="card tight small"><b>에이전트가 사진에서 본 특징</b><p style="margin:4px 0">${esc(r.observed)}</p></div>` : ''}
  ${sampleCheck(r)}
  ${classifierPanel(r.classifier)}
  ${r.top.map((c) => `
    <div class="card cand ${c.conf === '높음' ? 'high' : c.conf === '중간' ? 'mid' : 'low'}">
      <div class="row"><h3 class="grow">${esc(c.p.name)} <span class="muted small">(${esc(c.p.kind)})</span></h3><span class="tag ${c.conf === '높음' ? 'danger' : c.conf === '중간' ? 'warn' : ''}">확신 ${c.conf}</span></div>
      <p class="small">${esc(c.p.feature)}</p>
      <div class="small"><b>근거</b><ul style="margin:4px 0;padding-left:18px">${c.ev.map((e) => `<li>${esc(e)}</li>`).join('')}</ul></div>
      <div class="small"><b>지금 할 관리</b><ul style="margin:4px 0;padding-left:18px">${c.p.care.map((e) => `<li>${esc(e)}</li>`).join('')}</ul></div>
      ${c.p.sources ? `<div class="small"><b>관리법 출처</b><ul style="margin:4px 0;padding-left:18px">${c.p.sources.map((x) => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title)}</a></li>`).join('')}</ul></div>` : ''}
      <div class="small"><a href="${PEST_LINKS.ncpms}" target="_blank" rel="noopener">도감에서 증상 비교</a> · <a href="${PEST_LINKS.pesticide}" target="_blank" rel="noopener">등록 약제 확인</a>${c.p.label === 'Healthy Tomato Plant' ? '' : ' · <a href="#machine" data-mgo="방제">방제 장비 빌리기</a>'}</div>
    </div>`).join('')}
  ${r.dropped.length ? `<div class="card tight small"><b>검증에서 뺀 후보</b>: ${r.dropped.map((c) => esc(c.p.name) + (c.reason ? ` (${esc(c.reason)})` : '')).join(', ')}${r.source === 'agent' ? '' : ' — 고른 특징 중 일부만 설명해서 근거가 부족해요.'}</div>` : ''}
  <div class="card tight">
    <label class="row small"><input type="checkbox" id="keepPhoto" ${dx.keepPhoto ? 'checked' : ''}> 사진도 기록에 저장 (위치 정보는 지우고 저장)</label>
    <button class="btn primary block" id="saveDx" style="margin-top:10px">확인했어요 — 영농 기록에 남기기</button>
  </div>`;
}

function bindDiagnose(root) {
  root.querySelectorAll('[data-crop]').forEach((b) => b.onclick = () => { dx.crop = b.dataset.crop; dx.picked.clear(); dx.result = null; if (dx.crop !== '토마토') dx.sample = null; render(); });
  root.querySelectorAll('[data-sym]').forEach((b) => b.onclick = () => {
    const id = b.dataset.sym; dx.picked.has(id) ? dx.picked.delete(id) : dx.picked.add(id); b.setAttribute('aria-pressed', dx.picked.has(id));
  });
  root.querySelectorAll('[data-sample]').forEach((b) => b.onclick = () => {
    const x = SAMPLES.find((v) => v.id === b.dataset.sample); const img = new Image();
    img.onload = () => { dx.stats = analyzePhoto(img); dx.photo = photoToJpeg(img); dx.sample = x; dx.result = null; render(); };
    img.onerror = () => toast('샘플 사진을 불러오지 못했어요');
    img.src = x.file;
  });
  $('#photo', root).onchange = (e) => {
    const f = e.target.files[0]; if (!f) return;
    if (!f.type.startsWith('image/') || f.size > 15e6) { toast('15MB 이하 이미지만 올릴 수 있어요'); return; }
    const url = URL.createObjectURL(f); const img = new Image();
    img.onload = () => { dx.stats = analyzePhoto(img); dx.photo = photoToJpeg(img); dx.sample = null; URL.revokeObjectURL(url); dx.result = null; render(); };
    img.src = url;
  };
  $('#runDx', root).onclick = async () => {
    if (!dx.picked.size && !dx.photo) { toast('사진을 올리거나 특징을 하나 이상 골라 주세요'); return; }
    if (!dx.picked.size && dx.crop !== '토마토') { toast('이 작물은 사진 판별 모델이 없어요. 보이는 특징을 골라 주세요'); return; }
    dx.running = true; $('#runDx', root).disabled = true; $('#runDx', root).textContent = '확인하는 중…';
    const withPhoto = dx.crop === '토마토' && dx.photo;
    const steps = withPhoto
      ? ['사진 분류 모델 실행 (서버)', '진단 에이전트: 사진 특징 서술 + 도구 호출(분류 모델·도감·날씨)', '의심 후보 정리', '검증 에이전트: 사진·근거와 맞지 않는 후보 제외']
      : ['사진 특징 정리', '도감 비교 + 날씨·이번 달 발생정보 확인 (동시)', '의심 후보 정리', '검증 — 근거 부족 후보 제외'];
    const box = $('#dxSteps', root);
    const draw = (k) => box.innerHTML = `<div class="card tight"><div class="steps">${steps.map((s, i) => `<div class="step ${i < k ? 'done' : i === k ? 'run' : ''}"><span class="dot"></span>${s}</div>`).join('')}</div></div>`;
    const apiP = tryApi('/api/diagnose', { crop: dx.crop, symptoms: [...dx.picked], stats: dx.stats, image: withPhoto ? dx.photo : undefined }, 95000);
    for (let k = 0; k < steps.length - 1; k++) { draw(k); await new Promise((r) => setTimeout(r, 450)); }
    draw(steps.length - 1);
    const api = await apiP;
    dx.result = api && api.top ? api : localDiagnose();
    dx.running = false; render();
  };
  const kp = $('#keepPhoto', root); if (kp) kp.onchange = () => dx.keepPhoto = kp.checked;
  const sv = $('#saveDx', root); if (sv) sv.onclick = () => {
    const r = dx.result; const field = S.profile.fields.find((f) => f.crop === dx.crop);
    const sourceLabel = r.source === 'agent' ? 'AI 추정' : r.source === 'model' ? '사진 분류 모델' : '앱 규칙 기반';
    S.logs.push({ id: uid(), date: todayStr(), fieldId: field?.id, work: '증상 관찰', hours: 0.2,
      note: r.hard ? `사진 진단(${sourceLabel}): 판단 어려움` : `사진 진단(${sourceLabel}): ${r.top.map((c) => `${c.p.name}(${c.conf})`).join(', ')}`,
      photo: dx.keepPhoto ? dx.photo : null });
    const healthy = !r.hard && r.top[0].p.label === 'Healthy Tomato Plant';
    if (!r.hard) addTask(healthy ? { title: '같은 잎 다시 찍어 비교하기', date: addDays(todayStr(), 7), from: '사진 진단' }
      : { title: `${r.top[0].p.name} 확산 여부 다시 확인`, date: addDays(todayStr(), 3), from: '사진 진단' });
    save(); toast('영농 기록에 남겼어요'); dx.result = null; dx.photo = null; dx.stats = null; dx.sample = null; dx.picked.clear(); location.hash = '#log';
  };
}

/* ---------- 화면: 기록·일정 ---------- */
let logSuggest = null;
function nextSuggestion(log) {
  const w = log.work;
  if (/관수/.test(w)) return { title: '흙 수분 확인 (다음 관수 판단)', date: addDays(log.date, 3) };
  if (/방제/.test(w)) return { title: '방제 효과 확인', date: addDays(log.date, 7) };
  if (/수확/.test(w)) return { title: '수확 후 밑거름 계획 (토양검정 확인)', date: addDays(log.date, 7) };
  if (/시비/.test(w)) return { title: '시비 후 생육 상태 확인', date: addDays(log.date, 14) };
  if (/농기계/.test(w)) return { title: '임대 농기계 반납', date: addDays(log.date, 1) };
  if (/덮개/.test(w)) return { title: '덮개 걷기 (기온 오른 뒤)', date: addDays(log.date, 3) };
  return null;
}
function viewLog() {
  const t = todayStr();
  const logs = [...S.logs].sort((a, b) => b.date.localeCompare(a.date));
  const tasks = [...S.tasks].sort((a, b) => a.date.localeCompare(b.date));
  return `
  <h1>영농 기록·일정</h1>
  <p class="sub">기록을 남기면 다음 할 일을 제안해요. 승인한 것만 일정에 들어가요.</p>
  <div class="card">
    <div class="row"><div class="grow"><label class="f" for="lgDate">날짜</label><input type="date" id="lgDate" value="${t}"></div>
      <div class="grow"><label class="f" for="lgField">밭</label><select id="lgField">${S.profile.fields.map((f) => `<option value="${f.id}">${esc(f.name)} · ${esc(f.crop)}</option>`).join('')}</select></div></div>
    <label class="f">작업</label>
    <div class="chips" id="lgWork">${WORK_TYPES.map((w, i) => `<button class="chip" data-work="${esc(w)}" aria-pressed="${i === 0}">${esc(w)}</button>`).join('')}</div>
    <div class="row"><div style="width:120px"><label class="f" for="lgHours">시간</label><input type="number" id="lgHours" min="0" step="0.5" value="2"></div>
      <div class="grow"><label class="f" for="lgNote">메모</label><input type="text" id="lgNote" maxlength="200" placeholder="예: 1동 하우스 토마토 수확 12상자"></div></div>
    <button class="btn primary block" id="lgSave" style="margin-top:14px">기록 저장</button>
  </div>
  ${logSuggest ? `<div class="card tight adv info"><div class="ic">${I('calendar', 22)}</div><div class="grow"><b>다음 할 일 제안</b> <span class="tag ai">AI 제안</span>
    <div class="why">${esc(logSuggest.title)} · ${md(logSuggest.date)}(${dow(logSuggest.date)})</div>
    <div class="row" style="margin-top:8px"><button class="btn sm primary" id="sgYes">일정에 추가</button><button class="btn sm ghost" id="sgNo">괜찮아요</button></div></div></div>` : ''}

  <h2>일정</h2>
  <div class="card">${tasks.length ? `<ul class="list">${tasks.map((x) => `
    <li class="row"><input type="checkbox" data-done="${x.id}" ${x.done ? 'checked' : ''} aria-label="완료"><div class="grow" style="${x.done ? 'opacity:.55;text-decoration:line-through' : ''}"><b>${esc(x.title)}</b>
    <div class="small muted">${md(x.date)}(${dow(x.date)}) ${x.from ? '· ' + esc(x.from) : ''}</div></div>
    <button class="btn sm ghost" data-del="${x.id}" aria-label="삭제">${I('x', 18)}</button></li>`).join('')}</ul>` : '<div class="empty">아직 일정이 없어요.</div>'}
    <button class="btn sm" id="notify" style="margin-top:8px">${I('bell', 18)} 오늘 일정 브라우저 알림 받기</button></div>

  <h2>기록</h2>
  <div class="card">${logs.length ? `<ul class="list">${logs.map((l) => `
    <li><div class="row"><b class="grow">${esc(l.work)}</b><span class="small muted">${md(l.date)}(${dow(l.date)})</span></div>
      <div class="small muted">${esc(fieldName(l.fieldId))} ${l.hours ? '· ' + esc(l.hours) + '시간' : ''} ${l.example ? '· <span class="tag">예시</span>' : ''}</div>
      ${l.note ? `<div class="small">${esc(l.note)}</div>` : ''}
      ${l.photo ? `<img src="${l.photo}" alt="기록 사진" style="max-width:160px;border-radius:10px;margin-top:6px">` : ''}</li>`).join('')}</ul>` : '<div class="empty">기록이 없어요.</div>'}</div>`;
}
function bindLog(root) {
  let work = WORK_TYPES[0];
  root.querySelectorAll('[data-work]').forEach((b) => b.onclick = () => {
    work = b.dataset.work; root.querySelectorAll('[data-work]').forEach((x) => x.setAttribute('aria-pressed', x === b));
  });
  $('#lgSave', root).onclick = () => {
    const log = { id: uid(), date: $('#lgDate', root).value || todayStr(), fieldId: $('#lgField', root).value, work, hours: +$('#lgHours', root).value || 0, note: maskPersonal($('#lgNote', root).value.trim()) };
    S.logs.push(log); save(); logSuggest = nextSuggestion(log); toast('기록을 저장했어요'); render();
  };
  const y = $('#sgYes', root); if (y) y.onclick = () => { addTask({ ...logSuggest, from: '기록 제안' }); logSuggest = null; save(); toast('일정에 추가했어요'); render(); };
  const n = $('#sgNo', root); if (n) n.onclick = () => { logSuggest = null; render(); };
  root.querySelectorAll('[data-done]').forEach((c) => c.onchange = () => { S.tasks.find((t) => t.id === c.dataset.done).done = c.checked; save(); render(); });
  root.querySelectorAll('[data-del]').forEach((b) => b.onclick = () => { if (confirm('이 일정을 지울까요?')) { S.tasks = S.tasks.filter((t) => t.id !== b.dataset.del); save(); render(); } });
  $('#notify', root).onclick = async () => {
    if (!('Notification' in window)) { toast('이 브라우저는 알림을 지원하지 않아요'); return; }
    const p = await Notification.requestPermission();
    if (p !== 'granted') { toast('알림이 허용되지 않았어요'); return; }
    const due = S.tasks.filter((t) => !t.done && t.date <= todayStr());
    new Notification('오늘 할 일', { body: due.length ? due.map((t) => t.title).join(', ') : '오늘 남은 일정이 없어요.' });
  };
}

/* ---------- 화면: 농기계 (청도군 임대사업소 보유 현황 공공데이터) ---------- */
let RENT = null; // seed/machinery-cheongdo.json
async function loadRental() { try { RENT = await getJSON('seed/machinery-cheongdo.json'); } catch { RENT = null; } }
const mc = { work: null, area: null, fieldId: 'all', origin: null, q: '', pick: null, pickOffice: null };
const km = (a, b) => { // 두 좌표 사이 거리(km, 직선)
  const r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};
const mapUrl = (o) => `https://map.kakao.com/link/to/${encodeURIComponent(o.fullName)},${o.lat},${o.lon}`;
const myCrops = () => new Set(S.profile.fields.map((f) => f.crop));
// 내 작물에 맞는 작업을 앞에 둔다
const guideList = () => { const c = myCrops(); return [...MACHINE_GUIDE].sort((a, b) => (b.crops.some((x) => c.has(x)) - a.crops.some((x) => c.has(x)))); };
const officesByDistance = () => {
  const from = mc.origin || { lat: FARM.lat, lon: FARM.lon };
  return (RENT?.offices || []).map((o) => ({ ...o, d: km(from, o) })).sort((a, b) => a.d - b.d);
};
const fmtKm = (d) => (d < 1 ? `${Math.round(d * 1000)}m` : `${d.toFixed(1)}km`);
// 작업·면적 → 추천 기종 + 기종별 가까운 보유 사업소
function recommendMachines(work, area) {
  const g = MACHINE_GUIDE.find((x) => x.work === work); if (!g) return null;
  const tier = g.tiers.find((t) => area <= t.max) || g.tiers[g.tiers.length - 1];
  const offices = officesByDistance();
  const items = tier.use.map((name) => {
    const at = offices.filter((o) => o.machines[name] > 0).map((o) => ({ o, n: o.machines[name] }));
    return { name, at, total: at.reduce((s, x) => s + x.n, 0) };
  }).filter((it) => !RENT || it.total > 0); // 자료가 있으면 청도에 없는 기종은 빼고 보여 준다
  return { g, tier, items };
}

// 기종 찾기: 이름 일부로 사업소별 보유 대수
function machineFind(q) {
  q = String(q || '').trim(); if (!q || !RENT) return '';
  const offices = officesByDistance();
  const kinds = [...new Set(RENT.offices.flatMap((o) => Object.keys(o.machines)))].filter((k) => k.includes(q));
  if (!kinds.length) return '<p class="small muted">청도 임대사업소 자료에 없는 기종이에요. 다른 이름(예: 예초기 → 예취기)으로 찾아보세요.</p>';
  return `<ul class="list">${kinds.map((k) => `<li class="small"><b>${esc(k)}</b> — ${offices.filter((o) => o.machines[k]).map((o) => `${esc(o.name)} ${o.machines[k]}대`).join(', ')}</li>`).join('')}</ul>`;
}
function viewMachine() {
  const fields = S.profile.fields;
  if (!mc.work) mc.work = guideList()[0].work;
  if (mc.area == null) mc.area = S.profile.totalAreaHa || 0.5;
  const rec = recommendMachines(mc.work, mc.area);
  const crops = myCrops();
  const offices = officesByDistance();
  const rentals = S.tasks.filter((t) => t.from === '농기계 임대' && !t.done);
  const first = rec?.items[0];
  return `
  <h1>농기계 추천·임대</h1>
  <p class="sub">밭과 작업을 고르면 맞는 농기계와, 그 기계가 있는 가장 가까운 청도 임대사업소를 알려 드려요.</p>
  <div class="card">
    <label class="f">밭</label>
    <div class="chips">
      <button class="chip" data-mf="all" aria-pressed="${mc.fieldId === 'all'}">전체 ${esc(S.profile.totalAreaHa ?? '')}ha</button>
      ${fields.map((f) => `<button class="chip" data-mf="${esc(f.id)}" aria-pressed="${mc.fieldId === f.id}">${esc(f.name)} · ${esc(f.crop)} ${esc(f.areaHa)}ha</button>`).join('')}
    </div>
    <label class="f" for="mcArea">면적 (ha)</label><input type="number" id="mcArea" min="0.01" step="0.05" value="${mc.area}">
    <div class="small muted">1ha = 10,000㎡ ≈ 3,025평 · 0.1ha ≈ 300평</div>
    <label class="f">작업</label>
    <div class="chips">${guideList().map((g) => `<button class="chip" data-mw="${esc(g.work)}" aria-pressed="${g.work === mc.work}">${esc(g.work)}${g.crops.some((c) => crops.has(c)) ? ' ·내 작물' : ''}</button>`).join('')}</div>
  </div>

  ${rec ? `<div class="card adv"><div class="ic">${I('tractor', 22)}</div><div class="grow">
    <div class="row wrap-it"><b class="grow">${esc(mc.work)} · ${esc(mc.area)}ha</b><span class="tag">예시 기준</span></div>
    <div class="why">${esc(rec.tier.why)}</div>
    ${rec.items.length ? `<ul class="list" style="margin-top:6px">${rec.items.map((it, i) => `<li>
      <div class="row"><b class="grow">${i === 0 ? '추천 ' : ''}${esc(it.name)}</b>${RENT ? `<span class="tag ok">청도 ${it.total}대</span>` : ''}</div>
      ${it.at.length ? `<div class="small">가까운 곳: <b>${esc(it.at[0].o.name)}</b> ${fmtKm(it.at[0].o.d)} · ${it.at[0].n}대${it.at.length > 1 ? ` <span class="muted">(그 밖에 ${it.at.slice(1).map((x) => `${esc(x.o.name)} ${x.n}대`).join(', ')})</span>` : ''}</div>
        <div class="row wrap-it" style="margin-top:6px"><a class="btn sm" href="tel:${esc(it.at[0].o.tel)}">${esc(it.at[0].o.name)} 전화 ${esc(it.at[0].o.tel)}</a><button class="btn sm ghost" data-mpick="${esc(it.name)}" data-moff="${esc(it.at[0].o.id)}">이 기계로 예약 기록</button></div>` : ''}
    </li>`).join('')}</ul>` : '<p class="small">이 작업에 맞는 기종이 청도 임대사업소 자료에 없어요. 청도군청에 문의하세요.</p>'}
    ${rec.g.note ? `<div class="why">${esc(rec.g.note)}</div>` : ''}
    <div class="why">대수는 사업소가 가진 수량이에요. 지금 빌릴 수 있는지는 전화로 확인하세요.</div>
  </div></div>` : ''}

  <h2>청도 임대사업소</h2>
  ${RENT ? `<div class="card">
    <p class="small" style="margin:0">${RENT.totals.offices}곳 · ${RENT.totals.kinds}종 ${RENT.totals.units}대 (${esc(RENT.baseDate)} 기준) · 거리는 ${mc.origin ? '내 위치' : '청도군청'}에서 직선거리</p>
    <button class="btn sm ghost" id="mcGeo" style="margin-top:8px">내 위치 기준으로 다시 재기</button>
    <ul class="list">${offices.map((o) => `<li>
      <div class="row"><b class="grow">${esc(o.fullName)}</b><span class="tag">${fmtKm(o.d)}</span></div>
      <div class="small muted">${esc(o.road)}</div>
      <div class="row wrap-it" style="margin-top:6px"><a class="btn sm" href="tel:${esc(o.tel)}">전화 ${esc(o.tel)}</a><a class="btn sm ghost" href="${mapUrl(o)}" target="_blank" rel="noopener">길찾기</a></div>
      <details class="small" style="margin-top:6px"><summary>보유 농기계 ${Object.keys(o.machines).length}종 ${Object.values(o.machines).reduce((a, b) => a + b, 0)}대</summary>
        <p style="margin:6px 0">${Object.entries(o.machines).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${esc(k)} ${n}`).join(' · ')}</p></details>
    </li>`).join('')}</ul>
    <label class="f" for="mcQ">기종 찾기</label><input type="search" id="mcQ" placeholder="예: 예취기, 파쇄기, 운반" value="${esc(mc.q)}" maxlength="20">
    <div id="mcFound" aria-live="polite">${machineFind(mc.q)}</div>
    <div class="small" style="margin-top:10px">출처: <a href="${esc(RENT.source.url)}" target="_blank" rel="noopener">${esc(RENT.source.title)}</a> · 관리 ${esc(RENT.manager.name)} ${esc(RENT.manager.tel)}</div>
  </div>` : `<div class="card"><p class="small" style="margin:0">임대사업소 자료를 불러오지 못했어요. 청도군청(054-370-6277)에 문의하세요.</p></div>`}

  <h2>처음 빌릴 때 물어볼 것</h2>
  <div class="card"><ul style="margin:0;padding-left:18px" class="small">${RENTAL_ASK.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>

  <h2>예약을 일정에 기록</h2>
  <div class="card" id="rvCard">
    <p class="small muted" style="margin-top:0">실시간 예약은 연동되어 있지 않아요. 전화로 예약한 뒤 여기 적어 두면 대여·반납 일정을 만들어 드려요.</p>
    <div class="row"><div class="grow"><label class="f" for="rvOffice">사업소</label><select id="rvOffice">${(offices.length ? offices : [{ fullName: '청도군 농기계임대사업소' }]).map((o) => `<option ${o.id && o.id === (mc.pickOffice || first?.at[0]?.o.id) ? 'selected' : ''}>${esc(o.fullName)}</option>`).join('')}</select></div></div>
    <label class="f" for="rvMachine">기종</label><input type="text" id="rvMachine" value="${esc(mc.pick || first?.name || '')}" maxlength="40">
    <div class="row"><div class="grow"><label class="f" for="rvFrom">대여일</label><input type="date" id="rvFrom" value="${addDays(todayStr(), 1)}"></div>
      <div class="grow"><label class="f" for="rvTo">반납일</label><input type="date" id="rvTo" value="${addDays(todayStr(), 2)}"></div></div>
    <button class="btn primary block" id="rvSave" style="margin-top:14px">대여·반납 일정 추가</button>
    ${rentals.length ? `<ul class="list" style="margin-top:10px">${rentals.map((t) => `<li class="small">${md(t.date)} · ${esc(t.title)}</li>`).join('')}</ul>` : ''}
  </div>`;
}
function bindMachine(root) {
  const reset = () => { mc.pick = null; mc.pickOffice = null; };
  root.querySelectorAll('[data-mw]').forEach((b) => b.onclick = () => { mc.work = b.dataset.mw; reset(); render(); });
  root.querySelectorAll('[data-mf]').forEach((b) => b.onclick = () => {
    mc.fieldId = b.dataset.mf; const f = S.profile.fields.find((x) => x.id === mc.fieldId);
    mc.area = f ? f.areaHa : (S.profile.totalAreaHa || 0.5); reset(); render();
  });
  $('#mcArea', root).onchange = (e) => { mc.area = Math.max(0.01, +e.target.value || 0.5); mc.fieldId = null; reset(); render(); };
  root.querySelectorAll('[data-mpick]').forEach((b) => b.onclick = () => {
    mc.pick = b.dataset.mpick; mc.pickOffice = b.dataset.moff; render();
    $('#rvCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  const qi = $('#mcQ', root); if (qi) qi.oninput = () => { mc.q = qi.value; $('#mcFound', root).innerHTML = machineFind(mc.q); }; // 입력 중 전체를 다시 그리지 않는다(한글 조합 유지)
  const geo = $('#mcGeo', root); if (geo) geo.onclick = () => {
    if (!navigator.geolocation) { toast('이 기기에서는 위치를 쓸 수 없어요'); return; }
    navigator.geolocation.getCurrentPosition((p) => { mc.origin = { lat: p.coords.latitude, lon: p.coords.longitude }; toast('내 위치 기준으로 다시 정렬했어요'); render(); },
      () => toast('위치를 가져오지 못했어요. 청도군청 기준으로 보여 드려요'), { timeout: 8000, maximumAge: 600000 });
  };
  $('#rvSave', root).onclick = () => {
    const o = $('#rvOffice', root).value, m = $('#rvMachine', root).value.trim() || '농기계', f = $('#rvFrom', root).value, t = $('#rvTo', root).value;
    if (!f || !t || t < f) { toast('날짜를 확인해 주세요'); return; }
    const short = o.replace('청도군 농기계임대사업소 ', '');
    addTask({ title: `${m} 대여 (${short})`, date: f, from: '농기계 임대' });
    addTask({ title: `${m} 반납 (${short})`, date: t, from: '농기계 임대' });
    S.logs.push({ id: uid(), date: todayStr(), fieldId: mc.fieldId && mc.fieldId !== 'all' ? mc.fieldId : S.profile.fields[0]?.id, work: '농기계 사용', hours: 0, note: `${short} ${m} 예약 ${md(f)}~${md(t)}` });
    save(); toast('대여·반납 일정을 추가했어요'); render();
  };
}
// 다른 화면(진단 등)에서 작업을 정해 농기계 화면으로 보낸다: <a href="#machine" data-mgo="방제">
document.addEventListener('click', (e) => { const a = e.target.closest?.('[data-mgo]'); if (a) { mc.work = a.dataset.mgo; mc.pick = null; mc.pickOffice = null; } });

/* ---------- 화면: 커뮤니티 ---------- */
const cm = { tab: 'all', topic: '전체', q: '', open: null, ask: '', askResult: null };
// 질문의 낱말 앞 두 글자(어간)를 원글에서 찾는다. 흔한 말은 뺀다.
const STOP = new Set(['해야', '하나', '하는', '하면', '어떻', '언제', '어디', '무엇', '뭘', '전에', '있나', '없나', '좋을', '좋은', '이번', '올해', '처음', '그리', '너무', '정말', '같아', '같은', '주세', '알려', '궁금', '방법', '때는', '어느', '얼마']);
const stems = (s) => [...new Set(String(s).split(/[^0-9a-zA-Z가-힣]+/).filter((w) => w.length >= 2).map((w) => w.slice(0, 2)))].filter((t) => !STOP.has(t));
function related(text, excludeId) {
  const q = stems(text);
  if (!q.length) return [];
  return S.posts.filter((p) => p.type === 'tip' && p.id !== excludeId && !S.hidden.includes(p.id)).map((p) => {
    const head = p.title + ' ' + p.topic, all = head + ' ' + p.body;
    const hits = q.filter((t) => all.includes(t));
    const score = hits.reduce((a, t) => a + (head.includes(t) ? 2 : 1), 0) + (hits.length && p.senior ? 0.3 : 0);
    return { p, score };
  }).filter((x) => x.score >= 2).sort((a, b) => b.score - a.score).slice(0, 3);
}
const firstSentence = (b) => (String(b).match(/[^.!?。]+[.!?。]?/) || [b])[0].trim();

function viewCommunity() {
  const q = cm.q.trim();
  let posts = S.posts.filter((p) => !S.hidden.includes(p.id));
  if (cm.tab === 'tip') posts = posts.filter((p) => p.type === 'tip');
  if (cm.tab === 'question') posts = posts.filter((p) => p.type === 'question');
  if (cm.topic !== '전체') posts = posts.filter((p) => p.topic === cm.topic);
  if (q) posts = posts.filter((p) => (p.title + p.body + p.author).includes(q));
  posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const ar = cm.askResult;
  return `
  <h1>농부 커뮤니티</h1>
  <p class="sub">선배 농부의 노하우를 모으고, 새내기가 물으면 관련 노하우를 찾아 드려요.</p>
  <div class="card">
    <label class="f" for="askIn" style="margin-top:0">선배 노하우에게 물어보기</label>
    <div class="row"><input type="text" id="askIn" maxlength="120" value="${esc(cm.ask)}" placeholder="예: 서리 오기 전에 뭘 해야 하나요?"><button class="btn primary" id="askBtn">찾기</button></div>
    ${ar ? (ar.length ? `<div class="summary"><b>관련 노하우 ${ar.length}개</b> <span class="tag ai">AI 정리 · 원글 문장 그대로</span>
      <ol>${ar.map((x) => `<li>${esc(x.quote || firstSentence(x.p.body))} <a href="#community" data-openpost="${x.p.id}">— ${esc(x.p.author)}</a></li>`).join('')}</ol>
      <div class="small muted">원글에 없는 내용은 덧붙이지 않았어요. 농약·안전 관련 내용은 공식 자료로 다시 확인하세요.</div></div>`
      : `<div class="summary">관련 노하우를 찾지 못했어요. <button class="btn sm" id="askPost">질문 글로 올리기</button></div>`) : ''}
  </div>
  <div class="seg" role="group" aria-label="글 종류">${[['all', '전체'], ['tip', '노하우'], ['question', '질문']].map(([k, l]) => `<button data-tab="${k}" aria-pressed="${cm.tab === k}">${l}</button>`).join('')}</div>
  <div class="chips" style="margin-bottom:12px">${TOPICS.map((t) => `<button class="chip" data-topic="${esc(t)}" aria-pressed="${cm.topic === t}">${esc(t)}</button>`).join('')}</div>
  <div class="row" style="margin-bottom:12px"><input type="text" id="cmSearch" placeholder="글 검색" value="${esc(cm.q)}"><button class="btn primary" id="writeBtn">${I('pen', 18)} 글쓰기</button></div>
  ${posts.length ? posts.map(renderPost).join('') : '<div class="empty">글이 없어요. 첫 글을 남겨 보세요.</div>'}
  <p class="notice">지금은 글이 이 기기 브라우저에만 저장돼요. 전화번호·주민번호는 자동으로 가려요. "예시" 표시는 시연용 가상 글이에요.</p>
  <dialog id="writeDlg"><form method="dialog" class="in" id="writeForm">
    <h3>글쓰기</h3>
    <div class="seg" id="wType"><button type="button" data-wt="tip" aria-pressed="true">노하우 공유</button><button type="button" data-wt="question" aria-pressed="false">질문하기</button></div>
    <div class="row"><div class="grow"><label class="f" for="wCrop">작물</label><select id="wCrop"><option>토마토</option><option>공통</option></select></div>
      <div class="grow"><label class="f" for="wTopic">주제</label><select id="wTopic">${TOPICS.slice(1).map((t) => `<option>${esc(t)}</option>`).join('')}</select></div></div>
    <label class="f" for="wAuthor">닉네임</label><input type="text" id="wAuthor" maxlength="20" value="${esc(S.profile.nickname || '')}">
    <label class="row small" style="margin-top:8px"><input type="checkbox" id="wSenior"> 영농 5년 이상 선배 농부예요 (본인 표시)</label>
    <label class="f" for="wTitle">제목</label><input type="text" id="wTitle" maxlength="60" required>
    <label class="f" for="wBody">내용</label><textarea id="wBody" maxlength="1500" required></textarea>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn ghost" value="cancel" type="button" id="wCancel">취소</button><button class="btn primary" id="wSubmit" type="submit">올리기</button></div>
  </form></dialog>`;
}
function renderPost(p) {
  const cs = S.comments.filter((c) => c.postId === p.id);
  const open = cm.open === p.id;
  const rel = open && p.type === 'question' ? related(p.title + ' ' + p.body, p.id) : [];
  return `
  <article class="card post" id="post-${p.id}">
    <div class="row wrap-it" style="margin-bottom:4px">
      <span class="tag ${p.type === 'question' ? 'warn' : 'ok'}">${p.type === 'question' ? '질문' : '노하우'}</span>
      <span class="tag">${esc(p.crop)}</span><span class="tag">${esc(p.topic)}</span>${p.example ? '<span class="tag">예시</span>' : ''}
    </div>
    <h3><button class="btn ghost" style="padding:0;min-height:0;border:0;text-align:left;font-size:16px" data-openpost="${p.id}">${esc(p.title)}</button></h3>
    <div class="meta">${p.senior ? '<span class="tag badge-senior">선배</span>' : ''}${esc(p.author)} · ${esc(fmtTime(p.createdAt))} · 댓글 ${cs.length}</div>
    ${open ? `<p style="white-space:pre-wrap">${esc(p.body)}</p>
      ${rel.length ? `<div class="summary"><b>이 질문과 관련된 선배 노하우</b> <span class="tag ai">AI 정리</span><ol>${rel.map((x) => `<li>${esc(firstSentence(x.p.body))} — ${esc(x.p.author)}</li>`).join('')}</ol></div>` : ''}
      ${cs.map((c) => `<div class="comment">${c.senior ? '<span class="tag badge-senior">선배</span>' : ''}<b>${esc(c.author)}</b> <span class="small muted">${esc(fmtTime(c.createdAt))}</span><div style="white-space:pre-wrap">${esc(c.body)}</div></div>`).join('')}
      <div class="row" style="margin-top:10px"><input type="text" data-cin="${p.id}" maxlength="500" placeholder="${p.type === 'question' ? '답변 남기기' : '댓글 남기기'}"><button class="btn sm primary" data-csend="${p.id}">등록</button></div>` : `<p class="small muted" style="margin:6px 0 0">${esc(firstSentence(p.body))}</p>`}
    <div class="row" style="margin-top:10px">
      <button class="btn sm ${S.liked[p.id] ? 'primary' : ''}" data-like="${p.id}">${I('thumb', 18)} 도움돼요 ${p.likes + (S.liked[p.id] ? 1 : 0)}</button>
      <span class="grow"></span>
      <button class="btn sm ghost" data-report="${p.id}">신고·숨기기</button>
    </div>
  </article>`;
}
function bindCommunity(root) {
  root.querySelectorAll('[data-tab]').forEach((b) => b.onclick = () => { cm.tab = b.dataset.tab; render(); });
  root.querySelectorAll('[data-topic]').forEach((b) => b.onclick = () => { cm.topic = b.dataset.topic; render(); });
  $('#cmSearch', root).onchange = (e) => { cm.q = e.target.value; render(); };
  root.querySelectorAll('[data-openpost]').forEach((b) => b.onclick = (e) => {
    e.preventDefault(); const id = b.dataset.openpost; cm.open = cm.open === id ? null : id;
    if (cm.open) { cm.tab = 'all'; cm.topic = '전체'; cm.q = ''; }
    render(); if (cm.open) setTimeout(() => document.getElementById('post-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  });
  root.querySelectorAll('[data-like]').forEach((b) => b.onclick = () => { const id = b.dataset.like; S.liked[id] = !S.liked[id]; save(); render(); });
  root.querySelectorAll('[data-report]').forEach((b) => b.onclick = () => {
    if (confirm('이 글을 신고하고 내 화면에서 숨길까요?')) { S.hidden.push(b.dataset.report); save(); toast('숨겼어요'); render(); }
  });
  root.querySelectorAll('[data-csend]').forEach((b) => b.onclick = () => {
    const inp = root.querySelector(`[data-cin="${b.dataset.csend}"]`); const v = inp.value.trim(); if (!v) return;
    S.comments.push({ id: uid(), postId: b.dataset.csend, author: S.profile.nickname || '익명', senior: false, createdAt: new Date().toISOString(), body: maskPersonal(v) });
    save(); render();
  });
  const doAsk = async () => {
    cm.ask = $('#askIn', root).value.trim(); if (!cm.ask) return;
    const tips = S.posts.filter((p) => p.type === 'tip' && !S.hidden.includes(p.id));
    const api = await tryApi('/api/community/ask', { question: cm.ask, posts: tips.map(({ id, title, body }) => ({ id, title, body })) }, 60000);
    cm.askResult = api && Array.isArray(api.items)
      ? api.items.map((it) => ({ p: tips.find((p) => p.id === it.id), quote: it.quote, agent: true })).filter((x) => x.p)
      : related(cm.ask);
    render();
  };
  $('#askBtn', root).onclick = doAsk;
  $('#askIn', root).onkeydown = (e) => { if (e.key === 'Enter') doAsk(); };
  const ap = $('#askPost', root); if (ap) ap.onclick = () => openWrite(root, 'question', cm.ask);

  $('#writeBtn', root).onclick = () => openWrite(root, 'tip');
}
function openWrite(root, type, title = '') {
  const dlg = $('#writeDlg', root); let wt = type;
  const setType = (t) => { wt = t; dlg.querySelectorAll('[data-wt]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.wt === t)); };
  setType(type); $('#wTitle', dlg).value = title;
  dlg.querySelectorAll('[data-wt]').forEach((b) => b.onclick = () => setType(b.dataset.wt));
  $('#wCancel', dlg).onclick = () => dlg.close();
  $('#writeForm', dlg).onsubmit = (e) => {
    e.preventDefault();
    const t = $('#wTitle', dlg).value.trim(), body = $('#wBody', dlg).value.trim();
    if (!t || !body) { toast('제목과 내용을 적어 주세요'); return; }
    const p = { id: uid(), type: wt, author: $('#wAuthor', dlg).value.trim() || '익명', senior: $('#wSenior', dlg).checked,
      crop: $('#wCrop', dlg).value, topic: $('#wTopic', dlg).value, createdAt: new Date().toISOString(), likes: 0,
      title: maskPersonal(t), body: maskPersonal(body) };
    S.posts.push(p); save(); dlg.close(); cm.open = p.id; cm.tab = 'all'; cm.topic = '전체'; cm.askResult = null;
    toast(wt === 'question' ? '질문을 올렸어요. 관련 노하우를 함께 보여 드려요.' : '노하우를 공유했어요'); render();
  };
  dlg.showModal();
}

/* ---------- 라우터 ---------- */
const VIEWS = {
  today: [viewToday, bindToday, '오늘', 'home'],
  diagnose: [viewDiagnose, bindDiagnose, '진단', 'camera'],
  log: [viewLog, bindLog, '기록', 'book'],
  machine: [viewMachine, bindMachine, '농기계', 'tractor'],
  community: [viewCommunity, bindCommunity, '커뮤니티', 'chat'],
};
function current() { const h = location.hash.slice(1); return VIEWS[h] ? h : 'today'; }
function render() {
  const k = current(); const [v, b] = VIEWS[k]; const root = $('#view');
  root.innerHTML = v(); b(root);
  document.querySelectorAll('.tabs button').forEach((t) => t.toggleAttribute('aria-current', false));
  document.querySelector(`.tabs button[data-go="${k}"]`)?.setAttribute('aria-current', 'page');
}
function mountTabs() {
  $('#tabs').innerHTML = Object.entries(VIEWS).map(([k, [, , l, i]]) => `<button data-go="${k}">${I(i, 24)}${l}</button>`).join('');
  document.querySelectorAll('.tabs button').forEach((b) => b.onclick = () => { if (location.hash === '#' + b.dataset.go) render(); else location.hash = b.dataset.go; window.scrollTo(0, 0); });
}

window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });
$('#reset').onclick = () => { if (confirm('시연 데이터를 처음 상태로 되돌릴까요? 이 기기에 저장한 기록·글이 지워져요.')) { localStorage.removeItem(KEY); location.reload(); } };

(async () => {
  mountTabs();
  $('#view').innerHTML = '<div class="empty" style="padding:60px 0">불러오는 중…</div>';
  await initState();
  await Promise.all([loadWeather(), loadRental()]);
  render();
})();
