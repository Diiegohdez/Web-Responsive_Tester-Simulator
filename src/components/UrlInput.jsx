import React, { useState } from 'react';

const UrlInput = ({ onUrlSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar que la URL empiece con http o https
        let finalUrl = inputValue;
        if (inputValue && !/^https?:\/\//i.test(inputValue)) {
            finalUrl = `https://${inputValue}`;
        }
        onUrlSubmit(finalUrl);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl">
            <input
                type="text"
                placeholder="Escribe la URL (ej: google.com)..."
                className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Cargar
            </button>
        </form>
    );
};

export default UrlInput;