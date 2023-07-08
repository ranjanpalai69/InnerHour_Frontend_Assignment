

import  { useState } from 'react';
import "../styles/ComputeDifference.css";

function ComputeDifference() {
  const [listA, setListA] = useState('');
  const [listB, setListB] = useState('');
  const [results, setResults] = useState({
    onlyInA: [],
    onlyInB: [],
    inBoth: [],
    combined: [],
  });

  const handleCompute = () => {
    const arrayA = listA.split('\n').map((item) => item.trim());
    const arrayB = listB.split('\n').map((item) => item.trim());

    const onlyInA = arrayA.filter((item) => !arrayB.includes(item));
    const onlyInB = arrayB.filter((item) => !arrayA.includes(item));
    const inBoth = arrayA.filter((item) => arrayB.includes(item));
    const combined = [...onlyInA, ...onlyInB];

    setResults({
      onlyInA,
      onlyInB,
      inBoth,
      combined,
    });
  };

  return (
    <div className="container">
      <h2 className="title">Compute Difference</h2>
      <div className="input-container">
        <div>
          <h3>List A</h3>
          <textarea
            value={listA}
            onChange={(e) => setListA(e.target.value)}
            className="list-input"
            placeholder="Enter items for list A..."
            rows={5}
          />
        </div>
        <div>
          <h3>List B</h3>
          <textarea
            value={listB}
            onChange={(e) => setListB(e.target.value)}
            className="list-input"
            placeholder="Enter items for list B..."
            rows={5}
          />
        </div>
      </div>

      <button onClick={handleCompute} className="compute-button">
        Compute
      </button>

      <div className="results-container">
        <div className="result-section">
          <h3>Items present only in A:</h3>
          <ul>
            {results.onlyInA.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-section">
          <h3>Items present only in B:</h3>
          <ul>
            {results.onlyInB.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-section">
          <h3>Items present in both A and B:</h3>
          <ul>
            {results.inBoth.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-section">
          <h3>Items combining both A and B (unique):</h3>
          <ul>
            {results.combined.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ComputeDifference;
