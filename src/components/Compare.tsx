import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Scale, 
  Dna, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  TrendingUp, 
  ArrowRightLeft 
} from "lucide-react";
import { Breed } from "../types";

interface CompareProps {
  breeds: Breed[];
  onConsultAI: (prompt: string) => void;
}

export default function Compare({ breeds, onConsultAI }: CompareProps) {
  const [breedAId, setBreedAId] = useState("gir");
  const [breedBId, setBreedBId] = useState("murrah");
  const [breedA, setBreedA] = useState<Breed>(breeds[0]);
  const [breedB, setBreedB] = useState<Breed>(breeds[2]);

  // Sync selected breed objects when IDs change
  useEffect(() => {
    const a = breeds.find((b) => b.id === breedAId);
    if (a) setBreedA(a);
  }, [breedAId, breeds]);

  useEffect(() => {
    const b = breeds.find((b) => b.id === breedBId);
    if (b) setBreedB(b);
  }, [breedBId, breeds]);

  // Swap breeds trigger
  const handleSwap = () => {
    setBreedAId(breedBId);
    setBreedBId(breedAId);
  };

  // Safe helper to construct Cartesian coordinates for SVG Radar Chart
  // Radius: 90, Center: 120, 120. Axes: 6
  // Axes index order: 0: Yield, 1: Fertility, 2: Weight, 3: Longevity, 4: Resistance, 5: Fat
  const getRadarCoordinates = (metricsList: any) => {
    const axesCount = 6;
    const centerX = 120;
    const centerY = 120;
    const radius = 80;
    
    const points = [];
    const keys = ["yield", "fertility", "weight", "longevity", "resistance", "fat"];
    
    for (let i = 0; i < axesCount; i++) {
      const angle = (i * 2 * Math.PI) / axesCount - Math.PI / 2; // Subtracting 90 deg so first axis points up
      const metricValue = metricsList[keys[i]] || 50;
      const r = (metricValue / 100) * radius;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  const keys = ["yield", "fertility", "weight", "longevity", "resistance", "fat"];
  const axisLabels = ["Milk Yield", "Fertility Rate", "Skeletal Weight", "Longevity Index", "Disease Resistance", "Fat Percentage"];

  // Precomputed grid rings for radar background
  const gridRings = [0.25, 0.5, 0.75, 1.0];

  // AI Generated comparative paragraph based on local choices
  const getComparativeInsights = () => {
    if (breedA.type !== breedB.type) {
      return `Comparing a ${breedA.name} (${breedA.type}) with a ${breedB.name} (${breedB.type}) highlights distinct physiological differences. While ${breedA.name} serves ${breedA.utility.toLowerCase()} in standard climates, the ${breedB.name} is specialized for ${breedB.utility.toLowerCase()}. The fat content comparison emphasizes the buffalo's milk (fat percentages peaking at ${breedB.standards.fatContent}) relative to the cattle feed standards (${breedA.standards.fatContent}). Cross-breeding is biologically impossible, but they are ideal companion herds for diverse farming.`;
    }
    return `Comparing the two elite ${breedA.type} varieties reveals synergistic performance. The ${breedA.name} offers standard ${breedA.utility.toLowerCase()} metrics with an annual milk potential exceeding ${breedA.standards.annualYield} liters. By comparison, the ${breedB.name} stands out for ${breedB.utility.toLowerCase()} alongside high resilience indices (${breedB.standards.diseaseResistance} resistance parameters). From a cross-breeding perspective, introducing genetic traits of both could yield an extremely hardy F1 generation optimizing butterfat quotients and climatic heat tolerances.`;
  };

  const handleConsultAIAction = () => {
    const promptText = `Can you provide a comprehensive genetic comparison and husbandry advice for managing a mixed herd containing both ${breedA.name} and ${breedB.name}? Specifically details average feed schedules, breeding intervals, and how to optimize fat yield across both breeds.`;
    onConsultAI(promptText);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header section with swapping trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-cyan tracking-tight">Breed Comparison Tool</h1>
          <p className="text-on-surface-variant font-sans text-sm mt-1">
            Contrast genetic indicators, performance standards, fat yields, and environmental scores side-by-side.
          </p>
        </div>
      </div>

      {/* Select Box Selectors Row with swap button */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row items-center gap-4 justify-between bg-brand-dark/40 border-white/5">
        
        {/* Selection A */}
        <div className="w-full md:w-5/12 space-y-1.5 text-left">
          <label htmlFor="breedA" className="block text-[10px] font-bold text-brand-cyan font-mono tracking-wider uppercase">
            Primary Specimen (A)
          </label>
          <select 
            id="breedA"
            value={breedAId} 
            onChange={(e) => setBreedAId(e.target.value)}
            className="w-full p-3 bg-brand-dark rounded-xl border border-white/10 hover:border-brand-cyan/40 text-on-surface hover:text-white font-sans text-sm font-semibold focus:outline-none focus:border-brand-cyan uppercase tracking-wide cursor-pointer"
          >
            {breeds.map((b) => (
              <option key={b.id} value={b.id}>{b.name} ({b.type})</option>
            ))}
          </select>
        </div>

        {/* Swap button */}
        <button
          onClick={handleSwap}
          className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-brand-cyan/25 hover:border-brand-cyan hover:text-brand-cyan transition-all text-on-surface-variant cursor-pointer"
          title="Swap Breed slots"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </button>

        {/* Selection B */}
        <div className="w-full md:w-5/12 space-y-1.5 text-left">
          <label htmlFor="breedB" className="block text-[10px] font-bold text-brand-green font-mono tracking-wider uppercase">
            Comparison Specimen (B)
          </label>
          <select 
            id="breedB"
            value={breedBId} 
            onChange={(e) => setBreedBId(e.target.value)}
            className="w-full p-3 bg-brand-dark rounded-xl border border-white/10 hover:border-brand-green/40 text-on-surface hover:text-white font-sans text-sm font-semibold focus:outline-none focus:border-brand-green uppercase tracking-wide cursor-pointer"
          >
            {breeds.map((b) => (
              <option key={b.id} value={b.id}>{b.name} ({b.type})</option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Grid comparing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Multitrait Radar Chart (Col 5) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-semibold text-lg text-white">Multitrait Radar Comparison</h3>
              <Scale className="w-4 h-4 text-brand-cyan" />
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Overlaying genetic vectors plotted on normalized percentile benchmarks.
            </p>
          </div>

          {/* Svg Radar Chart Rendering */}
          <div className="relative aspect-square w-full max-w-[250px] mx-auto my-8 flex items-center justify-center">
            <svg viewBox="0 0 240 240" className="w-full h-full">
              {/* Draw concentric circular grids represented by rings */}
              {gridRings.map((scale, sIdx) => (
                <circle
                  key={sIdx}
                  cx="120"
                  cy="120"
                  r={80 * scale}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              ))}

              {/* Draw grid spokes (axes lines) */}
              {[0, 1, 2, 3, 4, 5].map((idx) => {
                const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2;
                const endX = 120 + 80 * Math.cos(angle);
                const endY = 120 + 80 * Math.sin(angle);
                return (
                  <line
                    key={idx}
                    x1="120"
                    y1="120"
                    x2={endX}
                    y2={endY}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* DRAW RADAR POLYGONS */}
              {/* Polygon A - Translucent Cyan */}
              <polygon
                points={getRadarCoordinates(breedA.metricsList)}
                fill="rgba(0, 219, 233, 0.2)"
                stroke="var(--color-brand-cyan)"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 5px rgba(0,219,233,0.3))" }}
              />

              {/* Polygon B - Translucent Green */}
              <polygon
                points={getRadarCoordinates(breedB.metricsList)}
                fill="rgba(78, 222, 163, 0.2)"
                stroke="var(--color-brand-green)"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 5px rgba(78,222,163,0.3))" }}
              />

              {/* Polar labeling text elements */}
              {[0, 1, 2, 3, 4, 5].map((idx) => {
                const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2;
                // Offset labels outwards slightly from radius
                const labelX = 120 + 94 * Math.cos(angle);
                const labelY = 120 + 94 * Math.sin(angle);
                
                // Adjust text anchors based on alignment characteristics
                let textAnchor = "middle";
                if (Math.cos(angle) > 0.1) textAnchor = "start";
                if (Math.cos(angle) < -0.1) textAnchor = "end";

                return (
                  <text
                    key={idx}
                    x={labelX}
                    y={labelY + 3}
                    fill="#a2abbd"
                    fontSize="8"
                    fontWeight="600"
                    fontFamily="var(--font-mono)"
                    textAnchor={textAnchor}
                  >
                    {axisLabels[idx]}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Quick interactive Legend labels */}
          <div className="flex justify-center gap-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-cyan" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">{breedA.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-green" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">{breedB.name}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Performance Standards Comparative Table (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Comparative Table container */}
          <div className="glass-panel rounded-2xl overflow-hidden bg-brand-dark/20 shadow-xl border-white/5">
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-white/90 uppercase tracking-widest">
                Agricultural Performance Standards
              </span>
              <span className="text-[10px] bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan rounded uppercase px-2 py-0.5 font-mono">
                SI Metric Units
              </span>
            </div>

            <div className="divide-y divide-white/5">
              
              {/* Row: Weight */}
              <div className="grid grid-cols-12 p-4 items-center hover:bg-white/3 transition-colors">
                <div className="col-span-4 text-xs font-semibold text-on-surface-variant font-mono">
                  AVERAGE ADULT WEIGHT
                </div>
                <div className="col-span-4 text-sm font-bold text-brand-cyan font-mono pl-4">
                  {breedA.standards.avgWeight} kg
                </div>
                <div className="col-span-4 text-sm font-bold text-brand-green font-mono pl-4 border-l border-white/5">
                  {breedB.standards.avgWeight} kg
                </div>
              </div>

              {/* Row: Yield */}
              <div className="grid grid-cols-12 p-4 items-center hover:bg-white/3 transition-colors">
                <div className="col-span-4 text-xs font-semibold text-on-surface-variant font-mono">
                  ANNUAL MILK YIELD
                </div>
                <div className="col-span-4 text-sm font-bold text-brand-cyan font-mono pl-4">
                  {breedA.standards.annualYield} L
                </div>
                <div className="col-span-4 text-sm font-bold text-brand-green font-mono pl-4 border-l border-white/5">
                  {breedB.standards.annualYield} L
                </div>
              </div>

              {/* Row: Fat Content */}
              <div className="grid grid-cols-12 p-4 items-center hover:bg-white/3 transition-colors">
                <div className="col-span-4 text-xs font-semibold text-on-surface-variant font-mono">
                  BUTTERFAT POTENTIAL
                </div>
                <div className="col-span-4 text-sm font-bold text-brand-cyan font-mono pl-4">
                  {breedA.standards.fatContent}
                </div>
                <div className="col-span-4 text-sm font-bold text-brand-green font-mono pl-4 border-l border-white/5">
                  {breedB.standards.fatContent}
                </div>
              </div>

              {/* Row: Heat Tolerance */}
              <div className="grid grid-cols-12 p-4 items-center hover:bg-white/3 transition-colors">
                <div className="col-span-4 text-xs font-semibold text-on-surface-variant font-mono">
                  CLIMATIC RESILIENCE
                </div>
                <div className="col-span-4 text-xs font-bold text-white pl-4">
                  {breedA.standards.heatTolerance} Index
                </div>
                <div className="col-span-4 text-xs font-bold text-white pl-4 border-l border-white/5">
                  {breedB.standards.heatTolerance} Index
                </div>
              </div>

              {/* Row: Disease resistance */}
              <div className="grid grid-cols-12 p-4 items-center hover:bg-white/3 transition-colors">
                <div className="col-span-4 text-xs font-semibold text-on-surface-variant font-mono">
                  DISEASE RESISTANCE STATUS
                </div>
                <div className="col-span-4 text-xs font-semibold text-on-surface pl-4">
                  {breedA.standards.diseaseResistance}
                </div>
                <div className="col-span-4 text-xs font-semibold text-on-surface pl-4 border-l border-white/5">
                  {breedB.standards.diseaseResistance}
                </div>
              </div>

              {/* Row: Maturity */}
              <div className="grid grid-cols-12 p-4 items-center hover:bg-white/3 transition-colors">
                <div className="col-span-4 text-xs font-semibold text-on-surface-variant font-mono">
                  GESTATION/MATURITY AGE
                </div>
                <div className="col-span-4 text-sm font-semibold text-white font-mono pl-4">
                  {breedA.standards.maturityAge} months
                </div>
                <div className="col-span-4 text-sm font-semibold text-white font-mono pl-4 border-l border-white/5">
                  {breedB.standards.maturityAge} months
                </div>
              </div>

            </div>
          </div>

          {/* AI insights synthesis box */}
          <div className="glass-panel p-5 rounded-2xl relative space-y-4 hover:border-brand-cyan/20 transition-all">
            <span className="text-xs font-bold font-mono text-brand-cyan uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-cyan" /> BreedVision AI Comparative Intelligence
            </span>
            <div className="p-4 bg-[#0a0e17] rounded-xl border border-white/5 text-xs text-on-surface-variant leading-relaxed font-sans">
              {getComparativeInsights()}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-[10px] text-on-surface-variant leading-tight max-w-[280px]">
                Ask the Gemini Livestock assistant to synthesize custom nutritional feed budgets and breeding regimes for these selected cows/buffaloes.
              </span>
              <button
                onClick={handleConsultAIAction}
                className="px-4 py-2 bg-brand-cyan text-on-primary font-display font-semibold text-xs rounded-lg shadow-[0_0_12px_rgba(0,219,233,0.2)] hover:scale-[1.02] active:scale-95 transition-all text-center cursor-pointer"
              >
                Consult GenAI Advisor
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
