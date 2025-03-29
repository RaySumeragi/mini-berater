// src/components/PartyBoxFinder.jsx
import React, { useState, useEffect } from 'react';
import BoxRecommendation from './BoxRecommendation';
import styles from './PartyBoxFinder.module.css'; // Importieren des CSS-Moduls

// Direkt in die Komponente eingebettete Daten
const soundSystems = {
  ultimate: {
    name: "JBL Partybox Ultimate",
    wattage: 1100,
    hasLightshow: true,
    mobility: "Rollen + Griff",
    microInput: true,
    instrumentInput: true,
    standMountable: false,
    features: "Beste Soundpower + Full Lightshow",
    count: 6,
    imageUrl: "https://placehold.co/200x200?text=Ultimate",
    recommendation: {
      minArea: 80, // m²
      minGuests: 50,
      maxGuests: 200,
      wattagePerM2: 6,
      wattagePerGuest: 20,
    }
  },
  stage320: {
    name: "JBL Partybox Stage 320",
    wattage: 240,
    hasLightshow: true,
    mobility: "Rollen + Griff",
    microInput: true,
    instrumentInput: true,
    standMountable: true,
    features: "Ideal für DJ & Sprache, Stativoption",
    count: 2,
    imageUrl: "https://placehold.co/200x200?text=Stage320",
    recommendation: {
      minArea: 20, // m²
      minGuests: 15,
      maxGuests: 80,
      wattagePerM2: 5,
      wattagePerGuest: 10,
    }
  },
  rocksterAir: {
    name: "Teufel Rockster Air",
    wattage: 240, // Angenommener Wert
    hasLightshow: false,
    mobility: "Akkubetrieb + Tragegriff",
    microInput: true,
    instrumentInput: true,
    standMountable: true,
    features: "Mobil & laut, kein Licht",
    count: 2,
    imageUrl: "https://placehold.co/200x200?text=Rockster",
    recommendation: {
      minArea: 30, // m²
      minGuests: 20,
      maxGuests: 100,
      wattagePerM2: 4.5,
      wattagePerGuest: 8,
    }
  },
  encore: {
    name: "JBL Partybox Encore",
    wattage: 100,
    hasLightshow: true,
    mobility: "Sehr mobil (klein)",
    microInput: true,
    instrumentInput: false,
    standMountable: false,
    features: "Klein, spontan, mit Mikrofon",
    count: 2,
    imageUrl: "https://placehold.co/200x200?text=Encore",
    recommendation: {
      minArea: 10, // m²
      minGuests: 5,
      maxGuests: 30,
      wattagePerM2: 4,
      wattagePerGuest: 6,
    }
  }
};

const PartyBoxFinder = () => {
  // Zustand für Benutzereingaben
  const [inputs, setInputs] = useState({
    roomWidth: 5, // Meter
    roomLength: 10, // Meter
    ceilingHeight: 2.5, // Meter
    guestCount: 30, // Anzahl Personen
  });

  // Berechnete Werte
  const [calculatedValues, setCalculatedValues] = useState({
    roomArea: 0,
    roomVolume: 0,
    requiredWattage: 0,
  });

  // Empfehlungsobjekt
  const [recommendation, setRecommendation] = useState({
    systems: [],
    totalWattage: 0,
    reasons: []
  });

  // Eingabeänderungen verarbeiten
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  // Berechnet Raumgröße, Volumen und benötigte Leistung
  useEffect(() => {
    const roomArea = inputs.roomLength * inputs.roomWidth;
    const roomVolume = roomArea * inputs.ceilingHeight;
    
    // Formel für die benötigte Wattage basierend auf Raumvolumen und Gästeanzahl
    // Diese Formel ist eine Annäherung und kann angepasst werden
    const areaWattage = roomArea * 5; // 5 Watt pro m²
    const guestWattage = inputs.guestCount * 10; // 10 Watt pro Gast
    
    // Wir nehmen den höheren Wert der beiden Berechnungen
    const requiredWattage = Math.max(areaWattage, guestWattage);
    
    setCalculatedValues({
      roomArea,
      roomVolume,
      requiredWattage
    });
  }, [inputs]);

  // Berechnet die Empfehlung basierend auf den kalkulierten Werten
  useEffect(() => {
    const { roomArea, requiredWattage } = calculatedValues;
    const { guestCount } = inputs;
    
    // Logik für die Boxen-Empfehlung basierend auf Raumgröße, Gästeanzahl und benötigter Leistung
    let recommendedSystems = [];
    let totalWattage = 0;
    let reasons = [];

    // Entscheidungslogik: Zuerst prüfen wir, welches System am besten für den Raum/Gäste geeignet ist
    const findBestSystemType = () => {
      // Kriterien sortieren: Raumgröße, Gästeanzahl und Leistungsbedarf
      const suitableSystems = Object.values(soundSystems).filter(system => {
        return roomArea >= system.recommendation.minArea && 
               guestCount >= system.recommendation.minGuests &&
               guestCount <= system.recommendation.maxGuests;
      });

      if (suitableSystems.length === 0) {
        // Notfall: Wenn keine Systeme passen, wählen wir das mit der höchsten Kapazität
        return Object.values(soundSystems).sort((a, b) => 
          b.recommendation.maxGuests - a.recommendation.maxGuests
        )[0];
      }

      // Wir sortieren nach Effizienz (Wattage pro m²) und Eignung
      return suitableSystems.sort((a, b) => {
        // Primär: Wie gut passt das System zu der Gästeanzahl?
        const aGuestFit = 1 - Math.abs(guestCount - (a.recommendation.maxGuests + a.recommendation.minGuests)/2) / 
                          ((a.recommendation.maxGuests - a.recommendation.minGuests)/2);
        const bGuestFit = 1 - Math.abs(guestCount - (b.recommendation.maxGuests + b.recommendation.minGuests)/2) / 
                          ((b.recommendation.maxGuests - b.recommendation.minGuests)/2);
        
        // Sekundär: Wie gut passt das System zur Raumgröße?
        const aRoomFit = roomArea / a.recommendation.minArea;
        const bRoomFit = roomArea / b.recommendation.minArea;
        
        // Gesamtwertung (höher ist besser)
        return (bGuestFit * 0.7 + bRoomFit * 0.3) - (aGuestFit * 0.7 + aRoomFit * 0.3);
      })[0];
    };

    // Beste Box-Art ermitteln
    const bestSystem = findBestSystemType();
    
    // Anzahl der benötigten Boxen berechnen (basierend auf Wattage-Bedarf)
    let neededCount = Math.ceil(requiredWattage / bestSystem.wattage);
    
    // Auf verfügbare Anzahl beschränken
    const availableCount = Math.min(neededCount, bestSystem.count);
    
    if (availableCount > 0) {
      recommendedSystems.push({
        ...bestSystem,
        useCount: availableCount
      });
      totalWattage += bestSystem.wattage * availableCount;
      
      reasons.push(`${bestSystem.name} ist gut geeignet für ${guestCount} Gäste und ${roomArea}m² Raumgröße.`);
      
      if (availableCount < neededCount) {
        reasons.push(`Wir empfehlen ${neededCount} Stück, haben aber nur ${availableCount} auf Lager.`);
      }
    }
    
    // Wenn wir noch nicht genug Leistung haben, ergänzen wir mit anderen Systemen
    if (totalWattage < requiredWattage) {
      // Alle Systeme nach Wattage sortieren (höchste zuerst)
      const otherSystems = Object.values(soundSystems)
        .filter(system => system.name !== bestSystem.name)
        .sort((a, b) => b.wattage - a.wattage);
        
      for (const system of otherSystems) {
        if (totalWattage >= requiredWattage) break;
        
        // Berechnen, wie viele weitere Boxen wir benötigen
        const additionalWattageNeeded = requiredWattage - totalWattage;
        const additionalCount = Math.min(
          Math.ceil(additionalWattageNeeded / system.wattage),
          system.count
        );
        
        if (additionalCount > 0) {
          recommendedSystems.push({
            ...system,
            useCount: additionalCount
          });
          totalWattage += system.wattage * additionalCount;
          reasons.push(`${system.name} (${additionalCount}×) als Ergänzung für mehr Leistung hinzugefügt.`);
        }
      }
    }
    
    // Überprüfen, ob wir ausreichend Leistung haben
    const wattageRatio = totalWattage / requiredWattage;
    if (wattageRatio < 0.8) {
      reasons.push(`Warnung: Die verfügbaren Systeme liefern nur ${Math.round(wattageRatio * 100)}% der empfohlenen Leistung.`);
    } else if (wattageRatio > 1.5) {
      reasons.push(`Hinweis: Die Systemleistung übertrifft die Empfehlung deutlich (${Math.round(wattageRatio * 100)}%).`);
    }
    
    setRecommendation({
      systems: recommendedSystems,
      totalWattage,
      reasons
    });
  }, [calculatedValues, inputs.guestCount]);

  return (
    <div className="card">
      <div className="card-content">
        <div className="grid grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Raum- und Veranstaltungsdaten</h2>
            
            <div className="grid grid-cols-2" style={{gap: '1rem'}}>
              <div>
                <label className="label font-medium">Raumlänge (m):</label>
                <input 
                  type="number" 
                  name="roomLength" 
                  value={inputs.roomLength} 
                  onChange={handleInputChange} 
                  min="1" 
                  step="0.5"
                  className="input"
                />
              </div>
              
              <div>
                <label className="label font-medium">Raumbreite (m):</label>
                <input 
                  type="number" 
                  name="roomWidth" 
                  value={inputs.roomWidth} 
                  onChange={handleInputChange} 
                  min="1" 
                  step="0.5"
                  className="input"
                />
              </div>
            </div>
            
            <div>
              <label className="label font-medium">Deckenhöhe (m):</label>
              <input 
                type="number" 
                name="ceilingHeight" 
                value={inputs.ceilingHeight} 
                onChange={handleInputChange} 
                min="1" 
                max="10" 
                step="0.1"
                className="input"
              />
            </div>
            
            <div>
              <label className="label font-medium">Anzahl der Gäste:</label>
              <input 
                type="range" 
                name="guestCount" 
                value={inputs.guestCount} 
                onChange={handleInputChange} 
                min="10" 
                max="200" 
                step="10"
                className="w-full"
                style={{height: '8px'}}
              />
              <div className="flex" style={{justifyContent: 'space-between', marginTop: '0.25rem'}}>
                <span className="text-gray-600"></span>
                <span className="font-bold text-blue-600">{inputs.guestCount}</span>
                <span className="text-gray-600"></span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-md border p-4">
              <h3 className="font-bold text-lg mb-3">Berechnete Werte:</h3>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem'}}>
                <div className="text-gray-600">Raumgröße:</div>
                <div className="text-right font-medium">{calculatedValues.roomArea.toFixed(1)} m²</div>
                
                <div className="text-gray-600">Raumvolumen:</div>
                <div className="text-right font-medium">{calculatedValues.roomVolume.toFixed(1)} m³</div>
                
                <div className="text-gray-600">Empfohlene Leistung:</div>
                <div className="text-right font-medium">{calculatedValues.requiredWattage.toFixed(0)} Watt RMS</div>
              </div>
            </div>
          </div>
          
          <BoxRecommendation 
            recommendation={recommendation} 
            requiredWattage={calculatedValues.requiredWattage} 
          />
        </div>
      </div>
    </div>
  );
};

export default PartyBoxFinder;