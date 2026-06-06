import { useState } from "react";
import { motion } from "motion/react";
import { 
  Info, 
  MapPin, 
  Activity, 
  ChevronRight, 
  Sparkles, 
  Flame, 
  Heart, 
  Maximize2,
  FileText
} from "lucide-react";
import { Breed } from "../types";

interface DatasetProps {
  breeds: Breed[];
  onSelectBreedForCompare: (breedId: string) => void;
}

export default function Dataset({ breeds, onSelectBreedForCompare }: DatasetProps) {
  const [activeBreed, setActiveBreed] = useState<Breed>(breeds[0]);
  const [filterType, setFilterType] = useState<"all" | "cow" | "buffalo">("all");

  const filteredBreeds = breeds.filter((b) => {
    if (filterType === "all") return true;
    return b.type === filterType;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header section with category filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-cyan tracking-tight">Indigenous India Breed Catalog</h1>
          <p className="text-on-surface-variant font-sans text-sm mt-1">
            Browse and inspect official profiles, genetic statuses, and agricultural benchmarks of native livestock.
          </p>
        </div>
        
        {/* Type Filter Buttons */}
        <div className="flex bg-brand-dark/85 p-0.5 rounded-lg border border-white/5 font-mono text-xs self-start md:self-auto">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-1.5 rounded-md font-semibold cursor-pointer transition-all ${
              filterType === "all" ? "bg-brand-cyan text-on-primary shadow-sm" : "text-on-surface-variant hover:text-white"
            }`}
          >
            All Varieties
          </button>
          <button
            onClick={() => setFilterType("cow")}
            className={`px-4 py-1.5 rounded-md font-semibold cursor-pointer transition-all ${
              filterType === "cow" ? "bg-brand-cyan text-on-primary shadow-sm" : "text-on-surface-variant hover:text-white"
            }`}
          >
            Dairy Cows
          </button>
          <button
            onClick={() => setFilterType("buffalo")}
            className={`px-4 py-1.5 rounded-md font-semibold cursor-pointer transition-all ${
              filterType === "buffalo" ? "bg-brand-cyan text-on-primary shadow-sm" : "text-on-surface-variant hover:text-white"
            }`}
          >
            Milking Buffaloes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Breed Grid Cards (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredBreeds.map((breed) => {
              const isActive = breed.id === activeBreed.id;
              return (
                <button
                  key={breed.id}
                  onClick={() => setActiveBreed(breed)}
                  className={`glass-panel p-4 rounded-xl flex flex-col justify-between text-left transition-all hover:scale-[1.02] duration-200 cursor-pointer ${
                    isActive 
                      ? "border-brand-cyan/60 scale-[1.01] bg-brand-cyan/5 shadow-[0_0_15px_rgba(0,219,233,0.1)]" 
                      : "hover:border-white/10"
                  }`}
                >
                  <div className="space-y-2">
                    {/* Cover image thumbnail */}
                    <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-brand-dark/80 relative">
                      <img 
                        src={breed.fullImage} 
                        alt={breed.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      />
                      <span className={`absolute top-2 right-2 px-2 py-0.5 text-[8px] font-bold font-mono tracking-widest uppercase rounded ${
                        breed.type === "cow" ? "bg-brand-cyan/20 text-brand-cyan" : "bg-brand-green/20 text-brand-green"
                      }`}>
                        {breed.type}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-base text-white tracking-tight">
                        {breed.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant font-mono">
                        <MapPin className="w-3 h-3 text-brand-cyan" />
                        <span className="truncate max-w-[190px]">{breed.origin.split("(")[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5">
                    <span className="text-[10px] font-bold font-mono text-brand-green uppercase tracking-wide">
                      {breed.standards.annualYield} L / Yr Average
                    </span>
                    <span className="text-[10px] text-brand-cyan flex items-center gap-0.5">
                      Inspect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredBreeds.length === 0 && (
            <div className="p-8 text-center text-on-surface-variant glass-panel rounded-2xl">
              No matching breed specimens available in state records.
            </div>
          )}
        </div>

        {/* Right Side: Detailed Inspect Viewport Card (Col 5) */}
        <div className="lg:col-span-5">
          <motion.div
            key={activeBreed.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl overflow-hidden shadow-2xl border-white/5 flex flex-col hover:border-brand-cyan/15 transition-all"
          >
            
            {/* Visual Header */}
            <div className="aspect-[4/3] w-full bg-brand-dark relative">
              <img 
                src={activeBreed.fullImage} 
                alt={activeBreed.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
              
              <div className="absolute bottom-5 inset-x-5 space-y-1">
                <span className="text-[10px] font-bold text-brand-cyan font-mono tracking-widest uppercase bg-brand-dark/80 px-2 py-0.5 rounded inline-block">
                  [ {activeBreed.type.toUpperCase()} VERIFIED PRESTIGE ]
                </span>
                <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                  {activeBreed.name}
                </h2>
                <p className="text-xs text-on-surface-variant flex items-center gap-1 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-brand-cyan" /> {activeBreed.origin}
                </p>
              </div>
            </div>

            {/* Catalog Info body */}
            <div className="p-6 space-y-6">
              
              {/* Core Description block */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-mono block">
                  MORPHOLOGICAL DESCRIPTION
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                  {activeBreed.description}
                </p>
              </div>

              {/* Quick stats list */}
              <div className="grid grid-cols-2 gap-4 bg-white/2 border border-white/5 p-4 rounded-xl">
                
                <div>
                  <span className="text-[9px] font-bold font-mono text-on-surface-variant uppercase block">MILK YIELD</span>
                  <span className="text-xs font-bold text-brand-cyan mt-1 block">{activeBreed.standards.annualYield} Liters / Year</span>
                </div>

                <div>
                  <span className="text-[9px] font-bold font-mono text-on-surface-variant uppercase block">BUTTERFAT INDEX</span>
                  <span className="text-xs font-bold text-brand-green mt-1 block">{activeBreed.standards.fatContent} Fat</span>
                </div>

                <div>
                  <span className="text-[9px] font-bold font-mono text-on-surface-variant uppercase block">ADULT WEIGHT</span>
                  <span className="text-xs font-semibold text-white mt-1 block">{activeBreed.standards.avgWeight} kg Average</span>
                </div>

                <div>
                  <span className="text-[9px] font-bold font-mono text-on-surface-variant uppercase block">HEAT TOLERANCE</span>
                  <span className="text-xs font-semibold text-brand-cyan mt-1 block">{activeBreed.standards.heatTolerance} Index</span>
                </div>

              </div>

              {/* Extra genetic status tags */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant font-mono">UTILITY CATEGORY</span>
                  <span className="font-semibold text-white uppercase">{activeBreed.utility}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant font-mono">GENETIC SPECIALIZATION</span>
                  <span className="font-semibold text-brand-cyan">{activeBreed.geneticStrength}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant font-mono">CONSERVATION TIER</span>
                  <span className="font-semibold text-brand-green">{activeBreed.conservationStatus}</span>
                </div>

              </div>

              {/* Catalog quick action triggers */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => onSelectBreedForCompare(activeBreed.id)}
                  className="flex-1 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-sans text-xs font-bold uppercase tracking-widest rounded-lg text-center cursor-pointer"
                >
                  Load in Compare Tool
                </button>
              </div>

            </div>

          </motion.div>
        </div>

      </div>

    </div>
  );
}
