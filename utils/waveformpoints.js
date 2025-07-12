export default function generateformPoints(inp) {
    const PIXELS_PER_SECOND = 100;
    const PIXELS_PER_MV = inp.pixelsPerMv || 100;
    const svgWidth = 1000;
    const svgHeight = 300;
    const totalTime = svgWidth / PIXELS_PER_SECOND;
    const y0 = svgHeight / 2;
    const dt = 1 / PIXELS_PER_SECOND;
    const pts = [];
  
    const base = inp.n_p * (inp.b_p + inp.l_pq) +
      (inp.b_q + inp.b_r + inp.b_s) +
      inp.l_st + inp.b_t + inp.l_tp;
  
    const heartPeriod = 60 / (inp.heartRate || 60);
    const sf = heartPeriod / base;
  
    const s = {
      b_p: inp.b_p * sf, l_pq: inp.l_pq * sf,
      b_q: inp.b_q * sf, b_r: inp.b_r * sf,
      b_s: inp.b_s * sf, l_st: inp.l_st * sf,
      b_t: inp.b_t * sf, l_tp: inp.l_tp * sf
    };
  
    let tElapsed = 0;
  
    while (tElapsed <= totalTime) {
      const cycleDuration = inp.n_p * (s.b_p + s.l_pq) +
        s.b_q + s.b_r + s.b_s + s.l_st + s.b_t + s.l_tp;
  
      const times = (() => {
        let off = tElapsed;
        const t = { P: [], Q: 0, R: 0, S: 0, T: 0 };
  
        for (let i = 0; i < inp.n_p; i++) {
          t.P.push(off + i * (s.b_p + s.l_pq));
        }
        off += inp.n_p * (s.b_p + s.l_pq);
  
        t.Q = off; off += s.b_q;
        t.R = off; off += s.b_r;
        t.S = off; off += s.b_s;
        off += s.l_st;
        t.T = off;
  
        return t;
      })();
  
      for (let t = tElapsed; t < tElapsed + cycleDuration; t += dt) {
        let v = 0;
        for (let pStart of times.P) {
          if (t >= pStart && t < pStart + s.b_p) {
            v = raisedCosinePulse(t, inp.h_p, s.b_p, pStart);
            break;
          }
        }
  
        if (!v && t >= times.Q && t < times.Q + s.b_q) {
          v = raisedCosinePulse(t, inp.h_q, s.b_q, times.Q);
        }
        if (!v && t >= times.R && t < times.R + s.b_r) {
          v = raisedCosinePulse(t, inp.h_r, s.b_r, times.R);
        }
        if (!v && t >= times.S && t < times.S + s.b_s) {
          v = raisedCosinePulse(t, inp.h_s, s.b_s, times.S);
        }
        if (!v && t >= times.T && t < times.T + s.b_t) {
          v = raisedCosinePulse(t, inp.h_t, s.b_t, times.T);
        }
  
        pts.push({
          x: t * PIXELS_PER_SECOND,
          y: y0 - v * PIXELS_PER_MV
        });
      }
  
      tElapsed += cycleDuration;
    }
  
    return pts;
  }
  
  function raisedCosinePulse(t, A, width, start) {
    const mid = start + width / 2;
    const arg = (Math.PI * (t - mid)) / width;
    return A * (1 + Math.cos(arg)) / 2;
  }
  