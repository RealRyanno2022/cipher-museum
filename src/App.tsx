import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AlgorithmSelection() {
    const [algorithm, setAlgorithm] = useState<string>('');
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (algorithm) {
            axios.get(`/algorithm/${algorithm}`)
                .then(response => {
                    console.log(response.data);  // Handle the JSON data
                })
                .catch(error => {
                    if (error.response && error.response.status === 503) {
                        setError('Service is currently unavailable due to high load. Please try again later.');
                    } else {
                        setError('An error occurred while fetching the algorithm data.');
                    }
                    console.error('Error fetching algorithm JSON:', error);
                });
        }
    }, [algorithm]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleProcessInput = () => {
        axios.post('/process', { algorithm, input })
            .then(response => {
                setOutput(response.data.output);  // Handle the encrypted output
                setError('');
            })
            .catch(error => {
                if (error.response && error.response.status === 503) {
                    setError('Service is currently unavailable due to high load. Please try again later.');
                } else {
                    setError('An error occurred while processing the input.');
                }
                console.error('Error processing input:', error);
            });
    };

    return (
        <div>
            {error && <div className="error">{error}</div>}
            <select onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="">Select Algorithm</option>
                <option value="aes">AES</option>
                <option value="blowfish">Blowfish</option>
                <option value="caesar_cipher">Caesar Cipher</option>
                {/* Add other algorithms here */}
            </select>

            <input type="text" value={input} onChange={handleInputChange} />
            <button onClick={handleProcessInput}>Encrypt</button>

            <div>Output: {output}</div>
        </div>
    );
}

export default AlgorithmSelection;

