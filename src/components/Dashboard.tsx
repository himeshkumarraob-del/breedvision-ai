import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Map, 
  Activity, 
  Cpu, 
  MapPin, 
  Grid3X3, 
  Sparkles,
  PieChart
} from "lucide-react";
import { Breed } from "../types";

interface DashboardProps {
  breeds: Breed[];
  onNavigateToScan: () => void;
}

const REGION_DATA = [
  { id: "north", name: "North India (Punjab/Haryana)", cattle: "142.6k", ruminants: "98.2k", coordinates: "top: 25%; left: 42%;" },
  { id: "west", name: "West India (Gujarat/Rajasthan)", cattle: "220.5k", ruminants: "115.4k", coordinates: "top: 42%; left: 33%;" },
  { id: "central", name: "Central India (Madhya Pradesh)", cattle: "158.4k", ruminants: "64.1k", coordinates: "top: 48%; left: 48%;" },
  { id: "south", name: "South India (Karnataka/Tamil Nadu)", cattle: "110.2k", ruminants: "78.9k", coordinates: "top: 72%; left: 45%;" },
  { id: "east", name: "East India (Bihar/West Bengal)", cattle: "185.3k", ruminants: "92.1k", coordinates: "top: 40%; left: 64%;" }
];

export default function Dashboard({ breeds, onNavigateToScan }: DashboardProps) {
  const [totalScans, setTotalScans] = useState(428913);
  const [selectedRegion, setSelectedRegion] = useState(REGION_DATA[1]); // Default West (Gujarat)
  const [trendTimeframe, setTrendTimeframe] = useState<"7D" | "30D" | "YTD">("7D");

  // Animate scans ticking upwards, demonstrating a "live" system
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalScans((prev) => prev + Math.floor(Math.random() * 3));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Safe data retrieval for standard SVG path
  const trendPaths = {
    "7D": "M 0 150 C 40 135, 80 165, 120 120 C 160 85, 200 110, 240 60 C 280 25, 320 50, 360 40 C 400 30, 440 60, 480 45 C 520 30, 560 50, 640 20 L 640 250 L 0 250 Z",
    "30D": "M 0 160 C 50 140, 100 130, 150 145 C 200 155, 250 125, 300 95 C 350 65, 400 55, 450 65 C 500 75, 550 40, 600 30 L 640 25 L 640 250 L 0 250 Z",
    "YTD": "M 0 190 C 70 170, 140 180, 210 130 C 280 80, 350 95, 420 50 C 490 25, 560 35, 640 15 L 640 250 L 0 250 Z"
  };

  const trendLines = {
    "7D": "M 0 150 C 40 135, 80 165, 120 120 C 160 85, 200 110, 240 60 C 280 25, 320 50, 360 40 C 400 30, 440 60, 480 45 C 520 30, 560 50, 640 20",
    "30D": "M 0 160 C 50 140, 100 130, 150 145 C 200 155, 250 125, 300 95 C 350 65, 400 55, 450 65 C 500 75, 550 40, 600 30 L 640 25",
    "YTD": "M 0 190 C 70 170, 140 180, 210 130 C 280 80, 350 95, 420 50 C 490 25, 560 35, 640 15"
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header section with telemetry action triggers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-cyan tracking-tight">BreedVision UI Dashboard</h1>
          <p className="text-on-surface-variant font-sans text-sm mt-1">
            Real-time telemetry feeds, active indigenous livestock counts, and multi-spectral computer vision diagnostics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-semibold rounded-full border border-brand-green/30">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            Live Cloud Feed
          </span>
          <button 
            onClick={onNavigateToScan}
            className="px-5 py-2.5 bg-brand-cyan text-on-primary font-display font-semibold text-sm rounded-lg shadow-[0_0_20px_rgba(0,219,233,0.3)] hover:scale-[1.03] transition-all"
          >
            Scan Specimen
          </button>
        </div>
      </div>

      {/* Top Telemetry Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-brand-cyan/40 transition-colors">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase">TOTAL SCANS</span>
            <div className="flex items-baseline gap-2">
              <h2 className="font-display text-3xl font-extrabold text-brand-cyan">
                {totalScans.toLocaleString()}
              </h2>
              <span className="text-brand-green text-xs font-mono font-medium flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +12.4%
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">Continuous real-time edge processing uploads</p>
          </div>
          <motion.div 
            className="absolute -right-6 -bottom-6 text-brand-cyan/5 group-hover:scale-110 group-hover:text-brand-cyan/10 transition-all pointer-events-none"
            initial={{ rotate: 10 }}
            animate={{ rotate: 0 }}
          >
            <Activity className="w-28 h-28" />
          </motion.div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-brand-green/40 transition-colors">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase">AI IDENTIFICATION ACCURACY</span>
            <div className="flex items-baseline gap-2">
              <h2 className="font-display text-3xl font-extrabold text-brand-green">98.4%</h2>
              <span className="text-xs bg-brand-green/10 text-brand-green px-1.5 py-0.5 rounded text-[10px]">VERIFIED</span>
            </div>
            <p className="text-xs text-on-surface-variant">Validated against purebred genomic registries</p>
          </div>
          <div className="absolute -right-6 -bottom-6 text-brand-green/5 group-hover:scale-110 group-hover:text-brand-green/10 transition-all pointer-events-none">
            <Cpu className="w-28 h-28" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-brand-cyan/40 transition-colors">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase">REGIONAL COVERAGE</span>
            <div className="flex items-baseline gap-2">
              <h2 className="font-display text-3xl font-extrabold text-on-surface">24 States</h2>
              <span className="text-xs text-brand-cyan font-mono text-[10px]">PAN-INDIA</span>
            </div>
            <p className="text-xs text-on-surface-variant">Active veterinary surveillance network</p>
          </div>
          <div className="absolute -right-6 -bottom-6 text-on-surface/5 group-hover:scale-110 group-hover:text-on-surface/10 transition-all pointer-events-none">
            <Map className="w-28 h-28" />
          </div>
        </div>

      </div>

      {/* Main India Interactive Map / Geographical Density Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive India Density Map Card (Col 8) */}
        <div className="col-span-12 lg:col-span-8 glass-panel rounded-2xl overflow-hidden flex flex-col hover:border-white/10 transition-colors">
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-semibold text-lg text-on-surface">Livestock Density Map</h3>
              <p className="text-xs text-on-surface-variant">Click active hot spots across India to retrieve localized breed density telemetry</p>
            </div>
            <span className="px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-[10px] font-bold uppercase rounded-full tracking-wider self-start sm:self-auto">
              Surveillance Grid Active
            </span>
          </div>

          <div className="flex-1 min-h-[420px] bg-[#0c101d] relative overflow-hidden flex items-center justify-center p-4">
            
            {/* Cyberpunk Map SVG representation */}
            <svg viewBox="0 0 400 450" className="w-full max-w-[420px] h-full opacity-65 mix-blend-screen filter drop-shadow-[0_0_15px_rgba(0,219,233,0.05)]">
              {/* Simplified India Outline representation for extreme tech aesthetic */}
              <path 
                d="M170,40 L195,30 L220,10 L225,35 L200,65 L220,80 L200,100 L210,120 L270,160 L320,165 
                   L350,185 L325,190 L300,225 L330,245 L320,250 L275,250 L250,290 L205,420 L200,430 L195,430 
                   L170,360 L140,310 L150,285 L120,265 L105,255 L115,220 L70,225 L50,195 L65,185 L90,190 
                   L110,150 L115,120 L150,90 Z" 
                fill="none" 
                stroke="#3b494b" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />
              <path 
                d="M170,40 L195,30 L220,10 L225,35 L200,65 L220,80 L200,100 L210,120 L270,160 L320,165 
                   L350,185 L325,190 L300,225 L330,245 L320,250 L275,250 L250,290 L205,420 L200,430 L195,430 
                   L170,360 L140,310 L150,285 L120,265 L105,255 L115,220 L70,225 L50,195 L65,185 L90,190 
                   L110,150 L115,120 L150,90 Z" 
                fill="url(#mapGrad)" 
                opacity="0.3" 
              />
              <defs>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00dbe9" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#4edea3" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#0e131f" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing active hotspots anchored geographically */}
            {REGION_DATA.map((region) => (
              <button
                key={region.id}
                style={{ 
                  position: "absolute",
                  top: region.coordinates.split(";")[0].split(":")[1].trim(),
                  left: region.coordinates.split(";")[1].split(":")[1].trim(),
                }}
                onClick={() => setSelectedRegion(region)}
                className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  selectedRegion.id === region.id 
                    ? "bg-brand-cyan ring-[6px] ring-brand-cyan/20 scale-125 z-20 shadow-[0_0_15px_#00dbe9]" 
                    : "bg-brand-cyan/40 hover:bg-brand-cyan hover:scale-110 z-10"
                }`}
                title={region.name}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </button>
            ))}

            {/* Sidebar Overlay showing active region status */}
            <div className="absolute top-4 left-4 max-w-[280px] w-full space-y-2 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRegion.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-brand-dark/80 backdrop-blur-md p-4 border-l-2 border-brand-cyan rounded-r-xl pointer-events-auto shadow-2xl space-y-1"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-cyan tracking-widest uppercase">
                    <MapPin className="w-3.5 h-3.5" /> {selectedRegion.name}
                  </div>
                  <div className="text-sm font-semibold text-white">Active Visual Records</div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 font-mono">
                    <div>
                      <div className="text-[10px] text-on-surface-variant">CATTLE CAPTURES</div>
                      <div className="text-sm font-bold text-on-surface">{selectedRegion.cattle}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-on-surface-variant">BUFFALO CAPTURES</div>
                      <div className="text-sm font-bold text-brand-green">{selectedRegion.ruminants}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scale legend */}
            <div className="absolute bottom-4 right-4 bg-brand-dark/60 backdrop-blur-md px-3 py-2 rounded-lg text-[10px] space-y-1 border border-white/5 uppercase tracking-widest font-mono text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan shadow-[0_0_10px_#00dbe9]" /> Live Node Active
              </div>
              <div>Hotspot Factor Match: &gt;0.84</div>
            </div>

          </div>
        </div>

        {/* Breed Mix Census Doughnut Chart (Col 4) */}
        <div className="col-span-12 lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-semibold text-lg text-on-surface">Regional Breed Mix</h3>
              <PieChart className="w-4 h-4 text-brand-cyan" />
            </div>
            <p className="text-xs text-on-surface-variant">Current visual census distributions cataloged nationwide</p>
            
            {/* SVG custom rendering for guaranteed visual output */}
            <div className="relative w-full aspect-square max-w-[200px] sm:max-w-[220px] mx-auto mt-8 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3.2" />
                
                {/* Indigenous Cattle - 45% (Cyan) */}
                <circle 
                  cx="18" cy="18" r="15.915" fill="none" 
                  stroke="var(--color-brand-cyan)" 
                  strokeWidth="3.5"
                  strokeDasharray="45 100" 
                  strokeDashoffset="0"
                  className="filter drop-shadow-[0_0_8px_rgba(0,219,233,0.3)] transition-all duration-1000"
                />
                
                {/* Buffalo Breeds - 30% (Green) */}
                <circle 
                  cx="18" cy="18" r="15.915" fill="none" 
                  stroke="var(--color-brand-green)" 
                  strokeWidth="3.5"
                  strokeDasharray="30 100" 
                  strokeDashoffset="-45"
                  className="transition-all duration-1000"
                />
                
                {/* Cross-breds / Other - 25% (Purple) */}
                <circle 
                  cx="18" cy="18" r="15.915" fill="none" 
                  stroke="var(--color-brand-purple)" 
                  strokeWidth="3.5"
                  strokeDasharray="25 100" 
                  strokeDashoffset="-75"
                  className="transition-all duration-1000"
                />
              </svg>

              <div className="absolute text-center space-y-0.5 pointer-events-none">
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-widest">VARIETIES</span>
                <div className="text-3xl font-display font-extrabold text-white">85+</div>
                <span className="text-[9px] px-1.5 py-0.5 bg-white/5 rounded text-brand-cyan tracking-wider font-mono">PAN-INDIA</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 pt-6 border-t border-white/5">
            <div className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-cyan shadow-[0_0_8px_#00dbe9]" />
                <span className="text-on-surface">Indigenous Cattle</span>
              </div>
              <span className="font-mono font-bold text-white">45%</span>
            </div>
            
            <div className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-green shadow-[0_0_8px_#4edea3]" />
                <span className="text-on-surface">Buffalo Breeds</span>
              </div>
              <span className="font-mono font-bold text-white">30%</span>
            </div>
            
            <div className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-purple shadow-[0_0_8px_#9d4edd]" />
                <span className="text-on-surface">Cross-bred Strains</span>
              </div>
              <span className="font-mono font-bold text-white">25%</span>
            </div>
          </div>

        </div>

      </div>

      {/* Historical Trend Analysis Line Area Chart & Extra Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* area line chart (Col 7) */}
        <div className="col-span-12 lg:col-span-7 glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-on-surface">System Trend Analysis</h3>
              <p className="text-xs text-on-surface-variant">Monitoring core daily visual telemetry scans vs. model confidence consistency</p>
            </div>
            
            {/* Toggle tabs */}
            <div className="flex bg-brand-dark/80 p-0.5 rounded-lg border border-white/5 self-start sm:self-auto font-mono text-xs">
              {(["7D", "30D", "YTD"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTrendTimeframe(t)}
                  className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer transition-all ${
                    trendTimeframe === t 
                      ? "bg-brand-cyan text-on-primary shadow-md" 
                      : "text-on-surface-variant hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Area spline simulation via SVG curves */}
          <div className="flex-1 mt-4 relative min-h-[220px] aspect-auto flex items-end">
            <svg className="w-full h-[220px]" preserveAspectRatio="none" viewBox="0 0 640 250">
              <defs>
                <linearGradient id="areaGlowCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00dbe9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00dbe9" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area spline fill element */}
              <motion.path 
                initial={false}
                animate={{ d: trendPaths[trendTimeframe] }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                fill="url(#areaGlowCyan)"
              />

              {/* Outstanding illuminated path line */}
              <motion.path 
                initial={false}
                animate={{ d: trendLines[trendTimeframe] }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                fill="none"
                stroke="#00dbe9"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 8px rgba(0,219,233,0.5))" }}
              />
            </svg>

            {/* Technical labeling */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] text-on-surface-variant font-mono font-medium border-t border-white/5 pt-2">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>
          </div>
        </div>

        {/* Inference Latency & Heatmap cards (Col 5) */}
        <div className="col-span-12 lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          {/* Latency card */}
          <div className="glass-panel p-6 rounded-2xl hover:border-brand-green/30 transition-colors">
            <span className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase block mb-3">INFERENCE CONFIG RATIO</span>
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                  <circle 
                    cx="32" cy="32" r="28" fill="none" 
                    stroke="var(--color-brand-green)" 
                    strokeWidth="4" 
                    strokeDasharray="145 176" 
                    strokeLinecap="round"
                    className="filter drop-shadow-[0_0_5px_#4edea3]"
                  />
                </svg>
                <span className="absolute text-brand-green font-display font-bold text-xs">42ms</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-white">Edge Processing Latency</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Decoded using direct microclimatic edge hardware. 92% faster computing response cycle rate than purely cloud server endpoints.
                </p>
              </div>
            </div>
          </div>

          {/* Regional Breed Prevalence matrix */}
          <div className="glass-panel p-6 rounded-2xl hover:border-white/10 transition-colors flex-1 flex flex-col justify-between min-h-[180px]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-display font-semibold text-sm text-white">Regional Breed Prevalence Matrix</h4>
                <Grid3X3 className="w-4 h-4 text-brand-green" />
              </div>
              <p className="text-[11px] text-on-surface-variant leading-tight">Visual density records representing distinct micro-regions</p>
            </div>

            {/* Matrix simulated columns */}
            <div className="grid grid-cols-7 gap-1.5 my-4">
              {/* Row 1 */}
              <div className="aspect-square bg-brand-cyan/10 rounded-sm" title="Sector 1: Stable" />
              <div className="aspect-square bg-brand-cyan/20 rounded-sm" />
              <div className="aspect-square bg-brand-cyan/40 rounded-sm" />
              <div className="aspect-square bg-brand-cyan/30 rounded-sm" />
              <div className="aspect-square bg-brand-cyan/60 rounded-sm" />
              <div className="aspect-square bg-brand-cyan/80 rounded-sm shadow-[0_0_6px_rgba(0,219,233,0.4)]" />
              <div className="aspect-square bg-brand-cyan/50 rounded-sm" />
              {/* Row 2 */}
              <div className="aspect-square bg-brand-green/10 rounded-sm" />
              <div className="aspect-square bg-brand-green/30 rounded-sm" />
              <div className="aspect-square bg-brand-green/60 rounded-sm" />
              <div className="aspect-square bg-brand-green/20 rounded-sm" />
              <div className="aspect-square bg-brand-green/40 rounded-sm" />
              <div className="aspect-square bg-brand-green/80 rounded-sm shadow-[0_0_6px_rgba(78,222,163,0.4)]" />
              <div className="aspect-square bg-brand-green/10 rounded-sm" />
              {/* Row 3 */}
              <div className="aspect-square bg-brand-purple/10 rounded-sm" />
              <div className="aspect-square bg-brand-purple/30 rounded-sm" />
              <div className="aspect-square bg-brand-purple/50 rounded-sm" />
              <div className="aspect-square bg-brand-purple/20 rounded-sm" />
              <div className="aspect-square bg-brand-purple/40 rounded-sm" />
              <div className="aspect-square bg-brand-purple/70 rounded-sm shadow-[0_0_6px_rgba(157,78,221,0.4)]" />
              <div className="aspect-square bg-brand-purple/15 rounded-sm" />
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono font-medium text-on-surface-variant uppercase tracking-wider">
              <span>LOW DENSITY SURVEILLANCE</span>
              <span>CRITICAL MASSED SECTOR</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
