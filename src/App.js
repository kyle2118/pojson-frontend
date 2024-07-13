import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [json, setJson] = useState('');
  const [packageName, setPackageName] = useState('');

  const handleJsonChange = (event) => {
    setJson(event.target.value);
  };

  const handlePackageNameChange = (event) => {
    setPackageName(event.target.value);
  };

  const handlePrettifyJson = () => {
    try {
      const prettyJson = JSON.stringify(JSON.parse(json), null, 2);
      setJson(prettyJson);
    } catch (error) {
      alert('Invalid JSON input');
    }
  };

  const handleSubmit = async () => {
    try {
      const jsonObject = JSON.parse(json); // Parse the JSON string to an object
      const response = await axios.post('/pojson/getFiles', { packageName, json: jsonObject }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'OutputClasses.zip');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert('Error generating files: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>JSON to POJO Converter</h1>
      <div>
        <label htmlFor="jsonInput">JSON Input:</label>
        <div style={{ display: 'flex' }}>
          <textarea
            id="jsonInput"
            value={json}
            onChange={handleJsonChange}
            placeholder="Enter your JSON here"
            rows="20"
            cols="60"
          />
          <button onClick={handlePrettifyJson}>Prettify JSON</button>
        </div>
      </div>
      <div>
        <label htmlFor="packageName">Package Name:</label>
        <input
          type="text"
          id="packageName"
          value={packageName}
          onChange={handlePackageNameChange}
          placeholder="Enter package name"
        />
      </div>
      <button onClick={handleSubmit}>Convert</button>
    </div>
  );
}

export default App;
