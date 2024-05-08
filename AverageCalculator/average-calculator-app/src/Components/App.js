import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numberId, setNumberId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      const response = await axios.get(`/numbers/${numberId}`);
      setData(response.data);
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
          <h2>Before Numbers: {JSON.stringify(data.beforeNumbers)}</h2>
          <h2>After Numbers: {JSON.stringify(data.afterNumbers)}</h2>
          <h2>Average: {data.average}</h2>
        </div>
      )}
    </div>
  );
}

export default App;