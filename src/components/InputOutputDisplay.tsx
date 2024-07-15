import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface InputOutputDisplayProps {
    input: string;
    output: string;
    onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onOutputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onEncrypt: () => void;
}

const InputOutputDisplay: React.FC<InputOutputDisplayProps> = ({
    input,
    output,
    onInputChange,
    onOutputChange,
    onEncrypt
}) => {
    const [backspaceCount, setBackspaceCount] = useState(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Backspace') {
                setBackspaceCount(prevCount => prevCount + 1);
            } else {
                setBackspaceCount(0);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="flex flex-col space-y-4 grid">
            <label htmlFor="input" className="block text-green-500 text-sm font-bold mb-2">Input</label>
            <div className="flex grid">
                <textarea
                    id="input"
                    value={input}
                    onChange={onInputChange}
                    className="appearance-none border rounded-l w-full py-2 px-3 text-green-500 font-bold leading-tight focus:shadow-outline-none"
                    style={{ fontFamily: 'monospace', height: '150px' }} // Adjust height as needed
                />
                <button
                    onClick={onEncrypt}
                    className="bg-green-500 text-white font-bold py-2 px-3 rounded-r"
                >
                    Encrypt
                </button>
            </div>

            <label htmlFor="output" className="block text-green-500 text-sm font-bold mb-2">Output</label>
            <div className="flex grid">
                <textarea
                    id="output"
                    value={output}
                    onChange={onOutputChange}
                    className="appearance-none border rounded-l w-full py-2 px-3 text-green-500 font-bold leading-tight focus:shadow-outline-none"
                    style={{ fontFamily: 'monospace', height: '150px' }} // Adjust height as needed
                />
                <Link to="/history">
                    <button
                        className="bg-green-500 text-white font-bold py-2 px-3 rounded-r w-full"
                    >
                        Cypher Lore
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default InputOutputDisplay;

