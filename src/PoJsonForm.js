import React, { useState } from 'react';
import axios from 'axios';

const PoJsonForm = () => {
    const [packageName, setPackageName] = useState('');
    const [json, setJson] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!packageName || !json) {
            setError('Both fields are required');
            return;
        }

        try {
            const response = await axios.post('/pojson/getFiles', { packageName, json }, { responseType: 'blob' });

            // Create a URL for the blob and trigger a download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'GeneratedClasses.zip');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            setError('An error occurred while generating the files. Please check your input.');
        }
    };

    return (
        <div>
            <h1>Generate Java POJO Classes</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Package Name:</label>
                    <input
                        type="text"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                    />
                </div>
                <div>
                    <label>JSON:</label>
                    <textarea
                        value={json}
                        onChange={(e) => setJson(e.target.value)}
                    />
                </div>
                <button type="submit">Generate</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PoJsonForm;
