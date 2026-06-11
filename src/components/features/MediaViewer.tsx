import { useState, useRef, useEffect } from "react";
import { 
  Maximize2, ZoomIn, ZoomOut, Play, Pause, RotateCcw, 
  Video, Image as ImageIcon, Map, Layers, Compass 
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";

interface MediaViewerProps {
  property: Property;
  onBookVirtualTour?: () => void;
}

export default function MediaViewer({ property, onBookVirtualTour }: MediaViewerProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "gallery" | "virtual" | "videos" | "floorplan">("overview");
  
  // Gallery states
  const [imgIdx, setImgIdx] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  // 360 Tour States
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [is360Dragging, setIs360Dragging] = useState(false);
  const [tourAngle, setTourAngle] = useState(0);
  const [tourZoom, setTourZoom] = useState(1);
  const [is360Loading, setIs360Loading] = useState(true);

  // Video States
  const [videoType, setVideoType] = useState<"walkthrough" | "drone">("walkthrough");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Floor Plan States
  const [planZoom, setPlanZoom] = useState(1);
  const [planOffset, setPlanOffset] = useState({ x: 0, y: 0 });

  // 360° Canvas Render Loop
  useEffect(() => {
    if (activeTab !== "virtual" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const img = new Image();
    img.crossOrigin = "anonymous";
    // Premium wide panorama interior
    img.src = "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2400&q=80";

    img.onload = () => {
      setIs360Loading(false);
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate dimensions
        const imgWidth = img.width;
        const imgHeight = img.height;
        const scale = (canvas.height / imgHeight) * tourZoom;
        const drawWidth = imgWidth * scale;
        const drawHeight = canvas.height * tourZoom;
        
        // Horizontal offset based on tourAngle (in pixels)
        const xOffset = (tourAngle % drawWidth);
        const yOffset = (canvas.height - drawHeight) / 2;

        // Draw image looped
        ctx.drawImage(img, xOffset - drawWidth, yOffset, drawWidth, drawHeight);
        ctx.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);
        ctx.drawImage(img, xOffset + drawWidth, yOffset, drawWidth, drawHeight);

        // Add orientation indicator compass
        ctx.save();
        ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height - 40, 25, 0, Math.PI * 2);
        ctx.fill();

        ctx.translate(canvas.width / 2, canvas.height - 40);
        // Angle points north
        ctx.rotate((-tourAngle / drawWidth) * Math.PI * 2);
        
        // Draw compass needle
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(5, 5);
        ctx.lineTo(-5, 5);
        ctx.closePath();
        ctx.fillStyle = "#EF4444";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 18);
        ctx.lineTo(5, 0);
        ctx.lineTo(-5, 0);
        ctx.closePath();
        ctx.fillStyle = "#E2E8F0";
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();

        animationId = requestAnimationFrame(render);
      };
      render();
    };

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [activeTab, tourAngle, tourZoom]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // 360 drag handlers
  const handle360MouseDown = (e: React.MouseEvent) => {
    setIs360Dragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handle360MouseMove = (e: React.MouseEvent) => {
    if (!is360Dragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    setTourAngle(prev => prev + deltaX * 1.5);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handle360MouseUp = () => setIs360Dragging(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E2E8F0] shadow-brand-lg overflow-hidden">
      {/* Media Menu Bar */}
      <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-hide bg-slate-50/50">
        {[
          { id: "overview", label: "Overview", icon: Layers },
          { id: "gallery", label: "Gallery", icon: ImageIcon },
          { id: "virtual", label: "Virtual Tour (360°)", icon: Compass },
          { id: "videos", label: "Video Walkthrough", icon: Video },
          { id: "floorplan", label: "Floor Plan", icon: Map }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "overview" | "gallery" | "virtual" | "videos" | "floorplan")}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 whitespace-nowrap",
                activeTab === tab.id
                  ? "border-[#1D4ED8] text-[#1D4ED8] bg-white font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Icon className="w-4.5 h-4.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Media Content Display */}
      <div className="p-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 h-80 lg:h-[450px]">
              <img src={property.images[imgIdx]} alt={property.title} className="w-full h-full object-cover" />
              {property.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setImgIdx((imgIdx - 1 + property.images.length) % property.images.length)} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all"
                  >
                    <ZoomOut className="w-5 h-5 text-brand-text rotate-90" />
                  </button>
                  <button 
                    onClick={() => setImgIdx((imgIdx + 1) % property.images.length)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all"
                  >
                    <ZoomIn className="w-5 h-5 text-brand-text rotate-90" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {property.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setImgIdx(i)} 
                  className={cn(
                    "h-16 w-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all", 
                    i === imgIdx ? "border-[#1D4ED8]" : "border-transparent hover:border-slate-200"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY TAB WITH ZOOM & PAN */}
        {activeTab === "gallery" && (
          <div className="space-y-4">
            <div 
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative rounded-2xl overflow-hidden bg-slate-900 h-80 lg:h-[450px] cursor-grab active:cursor-grabbing flex items-center justify-center"
            >
              <img 
                src={property.images[imgIdx]} 
                alt={property.title} 
                className="transition-transform duration-75 select-none pointer-events-none" 
                style={{ 
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain"
                }} 
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 3))}
                  className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-sm"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => { setZoomScale(1); setPanOffset({ x: 0, y: 0 }); }}
                  className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-sm"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.75))}
                  className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-sm"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4.5 h-4.5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-sm px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold">
                Image {imgIdx + 1} of {property.images.length} (Drag to pan when zoomed)
              </div>
            </div>
            
            <div className="flex gap-2 justify-center">
              {property.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setImgIdx(i); setZoomScale(1); setPanOffset({ x: 0, y: 0 }); }}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    i === imgIdx ? "bg-[#1D4ED8] w-7" : "bg-slate-200 hover:bg-slate-300"
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {/* 360 VIRTUAL TOUR VIEW */}
        {activeTab === "virtual" && (
          <div className="space-y-4">
            <div 
              onMouseDown={handle360MouseDown}
              onMouseMove={handle360MouseMove}
              onMouseUp={handle360MouseUp}
              onMouseLeave={handle360MouseUp}
              className="relative rounded-2xl overflow-hidden bg-slate-900 h-80 lg:h-[450px] cursor-all-scroll"
            >
              {is360Loading && (
                <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center text-white gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-t-[#1D4ED8] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  <span className="text-xs text-slate-400">Loading 360° Panorama...</span>
                </div>
              )}
              <canvas 
                ref={canvasRef} 
                width={800} 
                height={450} 
                className="w-full h-full block" 
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => setTourZoom(prev => Math.min(prev + 0.2, 2))}
                  className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-sm"
                >
                  <ZoomIn className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => setTourZoom(1)}
                  className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-sm"
                >
                  <RotateCcw className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => setTourZoom(prev => Math.max(prev - 0.2, 0.6))}
                  className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-sm"
                >
                  <ZoomOut className="w-4.5 h-4.5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                Drag left/right to look around 360°
              </div>
            </div>
            {onBookVirtualTour && (
              <div className="flex items-center justify-between bg-blue-50/50 p-4 border border-blue-50 rounded-2xl">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Experience this home live with an Agent</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Schedule a guided virtual tour with spatial audio and real-time walk-in.</p>
                </div>
                <button 
                  onClick={onBookVirtualTour}
                  className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Book Live Tour
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIDEOS TAB */}
        {activeTab === "videos" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button 
                onClick={() => { setVideoType("walkthrough"); setIsPlaying(false); }}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                  videoType === "walkthrough" 
                    ? "bg-slate-800 text-white border-slate-800" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                Interior Walkthrough
              </button>
              <button 
                onClick={() => { setVideoType("drone"); setIsPlaying(false); }}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                  videoType === "drone" 
                    ? "bg-slate-800 text-white border-slate-800" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                Drone Aerial Footage
              </button>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-80 lg:h-[450px]">
              <video
                ref={videoRef}
                key={videoType}
                src={
                  videoType === "walkthrough"
                    ? "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-walkthrough-40439-large.mp4"
                    : "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-residential-neighborhood-43197-large.mp4"
                }
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-sm text-[#1D4ED8] flex items-center justify-center shadow-lg hover:scale-105 hover:bg-white transition-all"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>
              </div>
              <div className="absolute bottom-4 right-4 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-current" /> {videoType === "walkthrough" ? "Video Tour" : "Drone Footage"}
              </div>
            </div>
          </div>
        )}

        {/* FLOOR PLANS TAB */}
        {activeTab === "floorplan" && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 h-80 lg:h-[450px] flex items-center justify-center p-6">
              {/* Architectural floor plan vector SVG representation */}
              <div 
                className="transition-transform duration-200 flex items-center justify-center select-none"
                style={{ 
                  transform: `translate(${planOffset.x}px, ${planOffset.y}px) scale(${planZoom})` 
                }}
              >
                <svg width="400" height="300" viewBox="0 0 400 300" className="w-full max-w-sm text-slate-800">
                  {/* Outer Walls */}
                  <rect x="20" y="20" width="360" height="260" fill="none" stroke="currentColor" strokeWidth="4" />
                  
                  {/* Internal Rooms Partition */}
                  <line x1="180" y1="20" x2="180" y2="280" stroke="currentColor" strokeWidth="3" />
                  <line x1="180" y1="140" x2="380" y2="140" stroke="currentColor" strokeWidth="3" />
                  <line x1="20" y1="160" x2="180" y2="160" stroke="currentColor" strokeWidth="3" />
                  
                  {/* Doors (simulated arcs) */}
                  <path d="M180,90 A30,30 0 0,1 150,120" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="180" y1="120" x2="180" y2="90" stroke="currentColor" strokeWidth="2" />

                  <path d="M100,160 A30,30 0 0,1 130,190" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="130" y1="160" x2="100" y2="160" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Room Text Labels */}
                  <text x="70" y="80" textAnchor="middle" className="text-xs font-bold font-sans fill-slate-700">MASTER BEDROOM</text>
                  <text x="70" y="98" textAnchor="middle" className="text-[10px] fill-slate-400">14' x 12'</text>

                  <text x="70" y="220" textAnchor="middle" className="text-xs font-bold font-sans fill-slate-700">LIVING AREA</text>
                  <text x="70" y="238" textAnchor="middle" className="text-[10px] fill-slate-400">14' x 10'</text>
                  
                  <text x="280" y="70" textAnchor="middle" className="text-xs font-bold font-sans fill-slate-700">DINING / KITCHEN</text>
                  <text x="280" y="88" textAnchor="middle" className="text-[10px] fill-slate-400">15' x 11'</text>

                  <text x="280" y="210" textAnchor="middle" className="text-xs font-bold font-sans fill-slate-700">GUEST BEDROOM</text>
                  <text x="280" y="228" textAnchor="middle" className="text-[10px] fill-slate-400">15' x 10'</text>
                </svg>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => setPlanZoom(prev => Math.min(prev + 0.25, 3))}
                  className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-sm"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => { setPlanZoom(1); setPlanOffset({ x: 0, y: 0 }); }}
                  className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-sm"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => setPlanZoom(prev => Math.max(prev - 0.25, 0.75))}
                  className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-sm"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4.5 h-4.5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-sm px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" /> Interactive Architectural Blueprint (2D plan)
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
