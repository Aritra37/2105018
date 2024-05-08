import React, { useState } from 'react';
import api from '../services/api';

function App() {
  const [numberId, setNumberId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      const response = await api.fetchNumbers(numberId);
      setData(response);
      setError('');
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Error fetching data');
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <label htmlFor="numberId">Enter Number ID:</label>
      <input
        type="text"
        id="numberId"
        value={numberId}
        onChange={(e) => setNumberId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch</button>
      {error && <div>{error}</div>}
      {data && (
        <div>
          <h2>Before Numbers: {JSON.stringify(data.windowPrevState)}</h2>
          <h2>After Numbers: {JSON.stringify(data.windowCurrState)}</h2>
          <h2>Numbers: {JSON.stringify(data.numbers)}</h2>
          <h2>Average: {data.avg}</h2>
        </div>
      )}
    </div>
  );
}

export default App;