import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { Navigation, Compass, Star, MapPin, Sparkles } from "lucide-react";
import { formatPrice } from "@/data/properties";
import type { Property } from "@/types";
import { cn } from "@/lib/utils";

// Dynamic leaflet stylesheet loader
function LeafletLoader() {
  useEffect(() => {
    const id = "leaflet-css-link";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }, []);
  return null;
}

// Center map controller component
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface PropertyMapProps {
  properties: Property[];
}

const CITY_COORDINATES: Record<string, [number, number]> = {
  mumbai: [19.0760, 72.8777],
  bangalore: [12.9716, 77.5946],
  gurgaon: [28.4595, 77.0266],
  delhi: [28.6139, 77.2090],
  hyderabad: [17.3850, 78.4867],
  chennai: [13.0827, 80.2707],
  pune: [18.5204, 73.8567],
  all: [20.5937, 78.9629] // India center
};

// Facility mock data generator
const generateFacilities = (lat: number, lng: number) => [
  { name: "City Public School", type: "school", lat: lat + 0.005, lng: lng + 0.003 },
  { name: "Greenwood College", type: "college", lat: lat - 0.007, lng: lng - 0.004 },
  { name: "Apex Care Hospital", type: "hospital", lat: lat + 0.003, lng: lng - 0.006 },
  { name: "Metro Central Station", type: "metro", lat: lat - 0.002, lng: lng + 0.007 },
  { name: "National Highway Bus Stop", type: "bus", lat: lat + 0.008, lng: lng - 0.001 },
  { name: "eStatery Plaza Mall", type: "mall", lat: lat - 0.006, lng: lng + 0.005 }
];

export default function PropertyMap({ properties }: PropertyMapProps) {
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.0760, 72.8777]);
  const [selectedFacilityTypes, setSelectedFacilityTypes] = useState<string[]>([]);
  const [radiusFilter, setRadiusFilter] = useState<number | null>(null);
  const [searchAreaRadius, setSearchAreaRadius] = useState(2000); // 2km in meters
  const [drawCenter, setDrawCenter] = useState<[number, number] | null>(null);

  // Sync map center when city changes in listings
  useEffect(() => {
    if (properties.length > 0) {
      const firstPropCity = properties[0].location.city.toLowerCase();
      if (CITY_COORDINATES[firstPropCity]) {
        setSelectedCity(firstPropCity);
        setMapCenter(CITY_COORDINATES[firstPropCity]);
      }
    }
  }, [properties]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setMapCenter(CITY_COORDINATES[city]);
    setDrawCenter(null);
  };

  const toggleFacility = (type: string) => {
    setSelectedFacilityTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Facilities list
  const facilities = drawCenter 
    ? generateFacilities(drawCenter[0], drawCenter[1])
    : properties.length > 0 
    ? generateFacilities(CITY_COORDINATES[selectedCity]?.[0] || 19.0760, CITY_COORDINATES[selectedCity]?.[1] || 72.8777)
    : [];

  const activeFacilities = facilities.filter(f => selectedFacilityTypes.includes(f.type));

  // Filter properties based on radius if active
  const filteredProperties = properties.filter(p => {
    if (!radiusFilter || !drawCenter) return true;
    
    // Calculate distance using simple Pythagorean/Haversine approximation for fast filter
    const lat1 = drawCenter[0];
    const lon1 = drawCenter[1];
    // We mock coordinates for each listing based on its city/area index
    const lat2 = CITY_COORDINATES[p.location.city.toLowerCase()]?.[0] || 19.0760;
    const lon2 = CITY_COORDINATES[p.location.city.toLowerCase()]?.[1] || 72.8777;

    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c * 1000; // in meters

    return distance <= radiusFilter;
  });

  return (
    <div className="w-full h-[550px] bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden flex flex-col relative shadow-brand-lg">
      <LeafletLoader />
      
      {/* Map Header Toolbar */}
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#1D4ED8]" />
          <span className="font-extrabold text-slate-800 text-sm">Interactive Map</span>
          <select 
            value={selectedCity} 
            onChange={(e) => handleCityChange(e.target.value)}
            className="text-xs font-semibold px-2 py-1 bg-white border border-slate-200 rounded-lg outline-none cursor-pointer"
          >
            {Object.keys(CITY_COORDINATES).filter(c => c !== "all").map(c => (
              <option key={c} value={c} className="capitalize">{c}</option>
            ))}
          </select>
        </div>

        {/* Draw search / radius controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => {
              if (radiusFilter) {
                setRadiusFilter(null);
                setDrawCenter(null);
              } else {
                const center = CITY_COORDINATES[selectedCity] || [19.0760, 72.8777];
                setDrawCenter(center);
                setRadiusFilter(searchAreaRadius);
              }
            }}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border",
              radiusFilter 
                ? "bg-red-50 text-red-600 border-red-200" 
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            )}
          >
            <Compass className="w-3.5 h-3.5" />
            {radiusFilter ? "Clear Radius" : "Radius Search"}
          </button>
          
          {radiusFilter && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-500">Radius:</span>
              <input 
                type="range" 
                min="500" 
                max="5000" 
                step="500"
                value={searchAreaRadius}
                onChange={(e) => {
                  setSearchAreaRadius(Number(e.target.value));
                  setRadiusFilter(Number(e.target.value));
                }}
                className="w-20 cursor-pointer accent-[#1D4ED8]"
              />
              <span className="text-[10px] font-bold text-slate-700">{(searchAreaRadius / 1000).toFixed(1)} km</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 w-full relative z-0">
        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          className="w-full h-full"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapController center={mapCenter} />

          {/* Draw Radius Filter Circle */}
          {radiusFilter && drawCenter && (
            <Circle 
              center={drawCenter} 
              radius={radiusFilter} 
              pathOptions={{ fillColor: "#1D4ED8", fillOpacity: 0.1, color: "#1D4ED8", weight: 1.5 }}
            />
          )}

          {/* Render Property Custom Price Tags */}
          {filteredProperties.map((p) => {
            const cityCoords = CITY_COORDINATES[p.location.city.toLowerCase()] || [19.0760, 72.8777];
            // Mock slight offsets per property id to avoid overlap in the same city center
            const indexOffset = parseInt(p.id.replace(/\D/g, "") || "0") * 0.003;
            const markerPos: [number, number] = [
              cityCoords[0] + (indexOffset * 0.4) - 0.005,
              cityCoords[1] + (indexOffset * 0.4) - 0.005
            ];

            // Render HTML div tag for Price Markers
            const priceText = formatPrice(p.price);
            const priceIcon = L.divIcon({
              className: "custom-price-marker",
              html: `<div class="bg-[#1D4ED8] hover:bg-blue-800 text-white font-extrabold text-xs px-2.5 py-1.5 rounded-lg shadow-md border border-white flex items-center justify-center whitespace-nowrap transition-all">${priceText}</div>`,
              iconSize: [60, 30],
              iconAnchor: [30, 15]
            });

            return (
              <Marker key={p.id} position={markerPos} icon={priceIcon}>
                <Popup className="property-popup">
                  <div className="w-56 p-1 overflow-hidden font-sans">
                    <img 
                      src={p.images[0]} 
                      alt={p.title} 
                      className="w-full h-32 rounded-xl object-cover" 
                    />
                    <div className="mt-2.5 space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-blue-50 text-blue-700">
                          {p.listingType === "buy" ? "Buy" : "Rent"}
                        </span>
                        {p.verified && (
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-emerald-50 text-emerald-700">
                            Verified
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-xs truncate">{p.title}</h4>
                      <p className="text-slate-400 text-[10px] flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-[#1D4ED8]" />
                        {p.location.area}, {p.location.city}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-extrabold text-slate-800 text-sm">{priceText}</span>
                        <Link 
                          to={`/properties/${p.id}`}
                          className="text-[10px] font-extrabold text-[#1D4ED8] hover:underline"
                        >
                          View Details &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Render Facility Pins */}
          {activeFacilities.map((f, i) => {
            const colorClasses: Record<string, string> = {
              school: "bg-emerald-500 border-emerald-100",
              college: "bg-teal-500 border-teal-100",
              hospital: "bg-red-500 border-red-100",
              metro: "bg-blue-500 border-blue-100",
              bus: "bg-sky-500 border-sky-100",
              mall: "bg-amber-500 border-amber-100"
            };
            const fIcon = L.divIcon({
              className: "facility-marker",
              html: `<div class="w-4 h-4 rounded-full ${colorClasses[f.type]} border-2 border-white shadow-md flex items-center justify-center"></div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            });

            return (
              <Marker key={i} position={[f.lat, f.lng]} icon={fIcon}>
                <Popup>
                  <div className="text-xs font-semibold p-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{f.type}</span>
                    <span className="text-slate-800 font-bold">{f.name}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Map Facilities Filters Panel */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-3.5 z-10">
        <span className="text-xs font-extrabold text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" /> Near Facility:
        </span>
        {[
          { type: "school", label: "Schools", color: "bg-emerald-500" },
          { type: "college", label: "Colleges", color: "bg-teal-500" },
          { type: "hospital", label: "Hospitals", color: "bg-red-500" },
          { type: "metro", label: "Metro", color: "bg-blue-500" },
          { type: "bus", label: "Bus Stops", color: "bg-sky-500" },
          { type: "mall", label: "Malls", color: "bg-amber-500" }
        ].map((f) => (
          <label 
            key={f.type} 
            className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700 select-none hover:text-slate-900"
          >
            <input 
              type="checkbox"
              checked={selectedFacilityTypes.includes(f.type)}
              onChange={() => toggleFacility(f.type)}
              className="rounded text-[#1D4ED8] focus:ring-[#1D4ED8]"
            />
            <span className={`w-2.5 h-2.5 rounded-full ${f.color} inline-block`} />
            {f.label}
          </label>
        ))}
      </div>
    </div>
  );
}
