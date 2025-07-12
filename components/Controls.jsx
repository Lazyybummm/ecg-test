export default function Controls({ inp, setinp }) {
    const createInput = (label, key, step = 0.01) => (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
          type="number"
          value={inp[key]}
          step={step}
          onChange={(e) =>
            setinp((prev) => ({
              ...prev,
              [key]: parseFloat(e.target.value) || 0,
            }))
          }
          className="border rounded px-2 py-1 w-full"
        />
      </div>
    );
  
    return (
      <div className="grid grid-cols-2 gap-4">
        {createInput("Heart Rate (bpm)", "heartRate")}
        {createInput("Pixels per mV", "pixelsPerMv")}
        {createInput("P Height (h_p)", "h_p")}
        {createInput("P Width (b_p)", "b_p")}
        {createInput("Q Height (h_q)", "h_q")}
        {createInput("Q Width (b_q)", "b_q")}
        {createInput("R Height (h_r)", "h_r")}
        {createInput("R Width (b_r)", "b_r")}
        {createInput("S Height (h_s)", "h_s")}
        {createInput("S Width (b_s)", "b_s")}
        {createInput("T Height (h_t)", "h_t")}
        {createInput("T Width (b_t)", "b_t")}
        {createInput("PQ Interval (l_pq)", "l_pq")}
        {createInput("ST Interval (l_st)", "l_st")}
        {createInput("TP Interval (l_tp)", "l_tp")}
        {createInput("Number of P waves (n_p)", "n_p", 1)}
      </div>
    );
  }
  