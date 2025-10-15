import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (Number.isNaN(h) || Number.isNaN(w)) {
      alert("Please enter numeric values for height and weight.");
      return;
    }
    if (h <= 0 || w <= 0) {
      alert("Height and weight must be positive numbers.");
      return;
    }

    const heightInMeters = h / 100;
    const rawBmi = w / (heightInMeters * heightInMeters);
    const bmiRounded = Number(rawBmi.toFixed(1));

    setBmi(bmiRounded);

    let bmiStatus = "";
    let bmiColor = "";

    if (bmiRounded < 18.5) {
      bmiStatus = "Underweight";
      bmiColor = "#2b6cb0";
    } else if (bmiRounded >= 18.5 && bmiRounded <= 24.9) {
      bmiStatus = "Normal weight";
      bmiColor = "#2f855a";
    } else if (bmiRounded >= 25 && bmiRounded <= 29.9) {
      bmiStatus = "Overweight";
      bmiColor = "#dd6b20";
    } else {
      bmiStatus = "Obese";
      bmiColor = "#c53030";
    }

    setStatus(bmiStatus);
    setColor(bmiColor);
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
    setColor("");
  };

  return (
    <>
      <h1>BMI Calculator</h1>

      <div
        style={{
          maxWidth: 420,
          margin: "40px auto",
          fontFamily: "Arial, sans-serif",
          padding: 20,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="height">Height (cm)</label>
          <br />
          <input
            id="height"
            type="number"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 170"
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="weight">Weight (kg)</label>
          <br />
          <input
            id="weight"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 65"
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={calculateBMI} style={{ flex: 1, padding: "10px 12px" }}>
            Calculate BMI
          </button>
          <button onClick={reset} style={{ padding: "10px 12px" }}>
            Reset
          </button>
        </div>

        {bmi !== null && (
          <div style={{ marginTop: 18, textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Your BMI: {bmi}</div>
            <div style={{ marginTop: 8, fontWeight: 600, color }}>
              <span style={{ color }}>{status}</span>
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: "#555" }}>
              <div>Underweight: BMI &lt; 18.5</div>
              <div>Normal weight: 18.5 ≤ BMI ≤ 24.9</div>
              <div>Overweight: 25 ≤ BMI ≤ 29.9</div>
              <div>Obese: BMI ≥ 30</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
