import React from 'react';

const BoxRecommendation = ({ recommendation, requiredWattage }) => {
  const { systems, totalWattage, reasons } = recommendation;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Box-Empfehlung</h2>
      
      {systems.length > 0 ? (
        <div className="space-y-4">
          {systems.map((system, index) => (
            <div key={index} className="flex flex-col sm:flex-row p-4 border rounded-md hover:shadow-md transition-shadow">
              <div className="sm:w-24 flex justify-center mb-3 sm:mb-0">
                <img src={system.imageUrl} alt={system.name} className="w-20 h-20 object-contain" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">
                  {system.name} 
                  <span className="ml-2 text-blue-600 font-bold">× {system.useCount}</span>
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
                  <div className="text-gray-600">Leistung:</div>
                  <div>{system.wattage} W × {system.useCount} = <strong>{system.wattage * system.useCount} W</strong></div>
                  
                  <div className="text-gray-600">Lichtshow:</div>
                  <div>{system.hasLightshow ? '✅' : '❌'}</div>
                  
                  <div className="text-gray-600">Mobilität:</div>
                  <div>{system.mobility}</div>
                  
                  <div className="text-gray-600">Mikro/Instrument:</div>
                  <div>{system.microInput ? '✅' : '❌'} / {system.instrumentInput ? '✅' : '❌'}</div>
                  
                  <div className="text-gray-600">Besonderheiten:</div>
                  <div>{system.features}</div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
            <h4 className="font-bold mb-2">
              Gesamtleistung: <span className="text-blue-600">{totalWattage} Watt</span>
            </h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
              <div 
                className={`h-2.5 rounded-full ${
                  totalWattage < requiredWattage * 0.8 
                    ? 'bg-red-500' 
                    : totalWattage > requiredWattage * 1.5 
                      ? 'bg-green-500' 
                      : 'bg-blue-600'
                }`} 
                style={{ width: `${Math.min(totalWattage / requiredWattage * 100, 100)}%` }}>
              </div>
            </div>
            <div className="text-sm text-right">
              {Math.round(totalWattage / requiredWattage * 100)}% der empfohlenen Leistung
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <h4 className="font-bold mb-2">Empfehlungsbegründung:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 rounded-md border border-dashed border-gray-300">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-gray-500">Keine passenden Boxen gefunden.</p>
        </div>
      )}
    </div>
  );
};

export default BoxRecommendation;