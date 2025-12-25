import React, { useState, useEffect } from 'react'; // 1. Importamos useEffect

const RESOLUTIONS = [
    { id: 'moto_edge_50', label: '📱 Moto Edge 50', baseW: 412, baseH: 945, isMobile: true },
    { id: 'samsung_a54', label: '📱 Samsung A54/A55', baseW: 360, baseH: 800, isMobile: true },
    { id: 's24_ultra', label: '📱 S24 Ultra', baseW: 412, baseH: 930, isMobile: true },
    { id: 'iphone_15', label: '🍎 iPhone 15/13', baseW: 390, baseH: 844, isMobile: true },
    { id: 'tablet', label: '📟 Tablet (iPad)', baseW: 768, baseH: 1024, isMobile: false },
    { id: 'laptop_pequena', label: '💻 Laptop (1366x768)', baseW: 1366, baseH: 768, isMobile: false },
    { id: 'full_hd', label: '🖥️ Monitor FHD', baseW: 1920, baseH: 1080, isMobile: false },
];

const ResolutionSelector = ({ selectedId, onSelect }) => {
    const [customW, setCustomW] = useState('');
    const [customH, setCustomH] = useState('');

    // 2. Efecto para resetear los inputs si se elige una opción de la lista
    useEffect(() => {
        // Si la opción seleccionada NO es la personalizada, limpiamos los inputs
        if (selectedId !== 'custom') {
            setCustomW('');
            setCustomH('');
        }
    }, [selectedId]); // Se ejecuta cada vez que cambia el ID seleccionado

    const handleApplyCustom = (e) => {
        e.preventDefault();
        if (!customW || !customH) return;

        const width = parseInt(customW);
        const height = parseInt(customH);

        onSelect({
            id: 'custom',
            label: `📏 ${width}x${height}`,
            baseW: width,
            baseH: height,
            isMobile: width < 600
        });
    };

    return (
        <div className="flex flex-col items-center gap-6 my-6 max-w-5xl mx-auto px-4">

            {/* BOTONES PREDEFINIDOS */}
            <div className="flex flex-wrap gap-3 justify-center">
                {RESOLUTIONS.map((res) => (
                    <button
                        key={res.id}
                        onClick={() => onSelect(res)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${selectedId === res.id
                                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 scale-105'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-400 hover:text-indigo-600'
                            }`}
                    >
                        {res.label}
                    </button>
                ))}
            </div>

            {/* FORMULARIO PERSONALIZADO */}
            <form
                onSubmit={handleApplyCustom}
                className="flex items-center gap-3 bg-gray-100 p-3 rounded-2xl border border-gray-200 shadow-inner"
            >
                <span className="text-[10px] font-bold text-gray-400 uppercase px-2 tracking-tighter italic">
                    Entrada Manual:
                </span>

                <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                    <input
                        type="number"
                        placeholder="W"
                        value={customW}
                        onChange={(e) => setCustomW(e.target.value)}
                        className="w-16 px-3 py-1.5 text-sm outline-none font-mono text-center appearance-none"
                    />
                    <span className="text-gray-300 font-bold">×</span>
                    <input
                        type="number"
                        placeholder="H"
                        value={customH}
                        onChange={(e) => setCustomH(e.target.value)}
                        className="w-16 px-3 py-1.5 text-sm outline-none font-mono text-center appearance-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!customW || !customH}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${!customW || !customH
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                >
                    OK
                </button>
            </form>

        </div>
    );
};

export default ResolutionSelector;