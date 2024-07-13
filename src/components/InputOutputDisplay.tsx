import React from 'react';

interface InputOutputDisplayProps {
    input: string;
    output: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onProcessInput: () => void;
}

const InputOutputDisplay: React.FC<InputOutputDisplayProps> = ({ input, output, onInputChange, onProcessInput }) => {
    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={onInputChange}
                placeholder="Enter text to encrypt"
                className="input"
            />
            <button onClick={onProcessInput} className="button">
                Encrypt
            </button>
            <div className="output">
                <p>Encrypted Output:</p>
                <p>{output}</p>
            </div>
        </div>
    );
};

export default InputOutputDisplay;

