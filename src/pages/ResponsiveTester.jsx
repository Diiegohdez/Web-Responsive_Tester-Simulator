import React, { useState } from 'react';
import UrlInput from '../components/UrlInput';
import ResolutionSelector from '../components/ResolutionSelector';
import DeviceFrame from '../components/DeviceFrame'; 

const ResponsiveTester = () => {
    const [url, setUrl] = useState('');
    const [res, setRes] = useState({ id: 'laptop_pequena', baseW: 1366, baseH: 768 });

    return (
        <div className="p-6 bg-slate-50 min-h-screen flex flex-col items-center">
            {/* ... Títulos e inputs ... */}

            <UrlInput onUrlSubmit={setUrl} />
            <ResolutionSelector selectedId={res.id} onSelect={setRes} />

            {/* Solo pasamos los datos y DeviceFrame se encarga del resto */}
            <DeviceFrame url={url} res={res} />
        </div>
    );
};

export default ResponsiveTester;