import { useState } from "react";
import Controls from "../components/Controls";
import Svg from "../components/Svg";
import generateformPoints from "../utils/waveformpoints";
import "./App.css";

function App() {
  const [points, setpoints] = useState([]);
  const [inp, setinp] = useState({
    heartRate: 70,
    pixelsPerMv: 100,
    h_p: 0.15,
    b_p: 0.08,
    h_q: -0.1,
    b_q: 0.025,
    h_r: 1.2,
    b_r: 0.05,
    h_s: -0.25,
    b_s: 0.025,
    h_t: 0.2,
    b_t: 0.16,
    l_pq: 0.08,
    l_st: 0.12,
    l_tp: 0.3,
    n_p: 1,
  });

  function senddata() {
    const pts = generateformPoints(inp);
    setpoints(pts);
  }

  return (
    <div className="app">
      <header>
        <h1>ECG Simulator</h1>
        <button onClick={senddata}>Apply</button>
      </header>

      <main>
        <div className="controls-container">
          <Controls inp={inp} setinp={setinp} />
        </div>
        <div className="graph-container">
          <Svg points={points} />
        </div>
      </main>
    </div>
  );
}

export default App;
