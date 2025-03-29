// Informationen zu den verfügbaren Soundsystemen
export const soundSystems = {
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
