import React, { useState } from 'react';

// 1. Definición de Medidas constantes
const UI_SIZES = {
    DESKTOP: {
        TABS_URL: 70,
        BOOKMARKS: 30,
        TASK_BAR: 40,
        SCROLL_BAR: 17
    },
    MOBILE: {
        STATUS_BAR: 44,
        NAV_URL: 60,
        HOME_INDICATOR: 20
    }
};

const DeviceFrame = ({ url, res }) => {
    // --- ESTADOS DEL SIMULADOR ---
    const [zoom, setZoom] = useState(0.65);
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [hasScroll, setHasScroll] = useState(true); // Control para la resta de los 17px

    // Determinar si es móvil
    const isMobile = res.isMobile === true;

    // --- CÁLCULOS DINÁMICOS ---
    let currentNavHeight, currentBottomHeight, currentScrollWidth;

    if (isMobile) {
        currentNavHeight = UI_SIZES.MOBILE.STATUS_BAR + UI_SIZES.MOBILE.NAV_URL;
        currentBottomHeight = UI_SIZES.MOBILE.HOME_INDICATOR;
        currentScrollWidth = 0;
    } else {
        currentNavHeight = UI_SIZES.DESKTOP.TABS_URL + (showBookmarks ? UI_SIZES.DESKTOP.BOOKMARKS : 0);
        currentBottomHeight = UI_SIZES.DESKTOP.TASK_BAR;
        // Aquí está el truco: si desactivas el scroll, el ancho es el 100% de la resolución (1366px)
        currentScrollWidth = hasScroll ? UI_SIZES.DESKTOP.SCROLL_BAR : 0;
    }

    const viewportW = res.baseW - currentScrollWidth;
    const viewportH = res.baseH - currentNavHeight - currentBottomHeight;

    return (
        <div className="mt-8 flex flex-col items-center w-full">

            {/* --- PANEL DE CONTROLES --- */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200 w-full max-w-5xl">

                {/* Control de Zoom */}
                <div className="flex items-center gap-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Zoom</label>
                    <input
                        type="range" min="0.1" max="1.5" step="0.05"
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-32 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <span className="text-xs font-mono font-bold text-indigo-600 w-10">{Math.round(zoom * 100)}%</span>
                </div>

                {!isMobile && (
                    <>
                        {/* Toggle Favoritos */}
                        <div className="flex items-center gap-3 border-l pl-6">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Favoritos</label>
                            <button
                                onClick={() => setShowBookmarks(!showBookmarks)}
                                className={`w-10 h-5 rounded-full transition-colors relative ${showBookmarks ? 'bg-indigo-500' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${showBookmarks ? 'left-6' : 'left-1'}`} />
                            </button>
                        </div>

                        {/* Toggle Scrollbar (Para corregir el ancho en Laptop) */}
                        <div className="flex items-center gap-3 border-l pl-6">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Barra Scroll</label>
                            <button
                                onClick={() => setHasScroll(!hasScroll)}
                                className={`w-10 h-5 rounded-full transition-colors relative ${hasScroll ? 'bg-indigo-500' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${hasScroll ? 'left-6' : 'left-1'}`} />
                            </button>
                        </div>
                    </>
                )}

                {/* Datos de Viewport en tiempo real */}
                <div className="flex gap-4 border-l pl-6">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 uppercase font-bold text-center">Base Pantalla</span>
                        <span className="text-xs font-mono text-gray-700 text-center">{res.baseW}x{res.baseH}px</span>
                    </div>
                    <div className="flex flex-col border-l border-gray-100 pl-4">
                        <span className="text-[9px] text-indigo-400 uppercase font-bold text-center italic underline">Viewport Real Web</span>
                        <span className="text-xs font-mono text-indigo-600 font-bold text-center">{viewportW}x{viewportH}px</span>
                    </div>
                </div>
            </div>

            {/* --- MARCO DE DISPOSITIVO --- */}
            <div
                className={`relative transition-all duration-500 ease-out origin-top shadow-2xl ${isMobile ? 'rounded-[3rem] border-[12px] border-black ring-4 ring-gray-800' : 'rounded-sm border border-gray-400'}`}
                style={{
                    width: res.baseW,
                    height: res.baseH,
                    transform: `scale(${zoom})`,
                    marginBottom: `-${res.baseH * (1 - zoom)}px`
                }}
            >
                <div className="absolute inset-0 bg-white overflow-hidden">

                    {/* IFRAME: Centrado perfecto con la técnica de 50% */}
                    {url ? (
                        <iframe
                            src={url}
                            title="Preview"
                            className="absolute z-0 transition-all duration-300 bg-white border-none"
                            style={{
                                top: currentNavHeight,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: viewportW,
                                height: viewportH
                            }}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-300 bg-gray-50 pt-20 font-sans italic">
                            Esperando conexión...
                        </div>
                    )}

                    {/* --- UI OVERLAY: MÓVIL --- */}
                    {isMobile ? (
                        <>
                            <div className="absolute top-0 w-full bg-white h-[44px] flex justify-between items-center px-10 z-10 text-[12px] font-bold">
                                <span>9:41</span>
                                <div className="flex gap-1.5 items-center">📶 🔋</div>
                            </div>
                            <div className="absolute top-[44px] w-full bg-[#f1f3f4] h-[60px] border-b border-gray-200 flex items-center px-6 z-10 shadow-sm">
                                <div className="w-full bg-white h-9 rounded-xl border border-gray-200 flex items-center px-4 text-xs text-gray-400 truncate">
                                    <span className="mr-2">🔒</span> {url || 'localhost'}
                                </div>
                            </div>
                            <div className="absolute bottom-0 w-full h-[20px] bg-white flex justify-center items-center z-10">
                                <div className="w-32 h-1.5 bg-gray-900 rounded-full" />
                            </div>
                        </>
                    ) : (
                        /* --- UI OVERLAY: DESKTOP --- */
                        <>
                            {/* Navegador */}
                            <div
                                className="absolute top-0 left-0 w-full z-10 flex flex-col shadow-sm transition-all duration-300"
                                style={{ height: currentNavHeight }}
                            >
                                <div className="h-10 bg-[#dee1e6] flex items-end px-3 gap-2">
                                    <div className="bg-[#f1f3f4] h-8 w-44 rounded-t-lg px-3 flex items-center justify-between border-t border-x border-gray-300">
                                        <span className="text-[11px] text-gray-600 font-sans">localhost:5173</span>
                                    </div>
                                </div>
                                <div className="h-10 bg-[#f1f3f4] flex items-center px-4 gap-4 border-b border-gray-300">
                                    <div className="flex gap-4 text-gray-400 text-sm italic font-bold">←  →  ↻</div>
                                    <div className="flex-1 bg-white h-7 rounded-full border border-gray-200 flex items-center px-4 text-[11px] text-gray-400 truncate shadow-inner font-sans">
                                        <span className="text-green-600 mr-2 text-[10px]">🔒</span> {url}
                                    </div>
                                </div>
                                {showBookmarks && (
                                    <div className="h-[30px] bg-[#f1f3f4] border-b border-gray-200 flex items-center px-4 gap-4">
                                        <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 bg-yellow-200 rounded-sm" /> <span className="text-[10px] text-gray-500 font-sans">Dashboard</span></div>
                                        <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 bg-blue-200 rounded-sm" /> <span className="text-[10px] text-gray-500 font-sans">Proyectos</span></div>
                                    </div>
                                )}
                            </div>

                            {/* Barra de Tareas Windows */}
                            <div
                                className="absolute bottom-0 left-0 w-full bg-[#f3f3f3] border-t border-gray-300 z-20 flex items-center justify-center px-4"
                                style={{ height: UI_SIZES.DESKTOP.TASK_BAR }}
                            >
                                <div className="flex gap-2">
                                    <div className="w-7 h-7 bg-blue-500 rounded-sm flex items-center justify-center text-[8px] text-white font-bold">田</div>
                                    <div className="w-7 h-7 bg-white rounded-sm border border-gray-300 shadow-sm"></div>
                                    <div className="w-7 h-7 bg-gray-700 rounded-sm"></div>
                                </div>
                                <div className="absolute right-4 text-[9px] text-gray-500 text-right leading-tight font-sans">
                                    <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    <div>{new Date().toLocaleDateString()}</div>
                                </div>
                            </div>

                            {/* Barra de Scroll Lateral (Solo si hasScroll es true) */}
                            {hasScroll && (
                                <div
                                    className="absolute right-0 bg-[#f1f1f1] border-l border-gray-200 z-10 flex flex-col justify-between py-1"
                                    style={{
                                        width: UI_SIZES.DESKTOP.SCROLL_BAR,
                                        top: currentNavHeight,
                                        bottom: UI_SIZES.DESKTOP.TASK_BAR
                                    }}
                                >
                                    <div className="w-full text-[7px] text-gray-400 text-center font-bold">▲</div>
                                    <div className="w-[10px] mx-auto h-24 bg-gray-400/40 rounded-full"></div>
                                    <div className="w-full text-[7px] text-gray-400 text-center font-bold">▼</div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeviceFrame;