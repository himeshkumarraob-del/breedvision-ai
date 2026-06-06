import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Tv, 
  Cpu, 
  MapPin, 
  Dna, 
  Sparkles, 
  Clock, 
  Database, 
  BrainCircuit, 
  Scale, 
  Menu, 
  X,
  Sun,
  Moon,
  TrendingUp,
  Activity,
  History
} from "lucide-react";

import { Breed, ScanResult } from "./types";
import Dashboard from "./components/Dashboard";
import Recognition from "./components/Recognition";
import Compare from "./components/Compare";
import Dataset from "./components/Dataset";
import Assistant from "./components/Assistant";

// Base cattle & buffalo specification list synchronized with the Express backend
const DEFAULT_BREEDS: Breed[] = [
  {
    id: "gir",
    name: "Gir Cattle",
    type: "cow",
    origin: "Gir Hills & Forests of Gujarat",
    utility: "High Milk Yield & Drafting",
    conservationStatus: "Stable (Global Favor)",
    geneticStrength: "Superior (A2 Beta-Casein)",
    confidence: 99.2,
    bodyConditionScore: "BCS 3.5",
    description: "Distinctive rounded hump, bulging forehead, and long pendulous ears. Renowned worldwide for superior heat tolerance, tick resistance, and high-quality A2 milk yield.",
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY06mtiSC6SGhBN9IcPmozzvWIbXar_ZQ_gDajJ1IyEqRUrop81G6RxaiQmUbQLQobHK-AdWU_Fg0JyCtQ_obAckB89LrIaVUMloB5MJF_D8AG4OuKBWR0bUb1DlSYPY_im4J0CHbnWQXQ5h_lOOWxawJ7EPeILQFQp8Hd9ORTrFB_2uHaFK4WTUp5Z610tbV-PpRLctLISxTbJ7UrQugA48jlvV5qB6vSBViixChhOwnziDILEAqg4atMb0O4-xdf9QuoBhAOnLJk",
    standards: {
      avgWeight: 550,
      annualYield: 2100,
      heatTolerance: "Extreme",
      diseaseResistance: "High (Mastitis Resistant)",
      fatContent: "4.5% - 5.0%",
      maturityAge: 36,
    },
    metricsList: { yield: 85, fertility: 75, weight: 70, longevity: 90, resistance: 92, fat: 65 }
  },
  {
    id: "sahiwal",
    name: "Sahiwal Cattle",
    type: "cow",
    origin: "Montgomery district & Punjab Region",
    utility: "Highest Milking Indigenous Cow",
    conservationStatus: "Stable / Highly Bred",
    geneticStrength: "Exceptional (A2 Quality)",
    confidence: 98.4,
    bodyConditionScore: "BCS 3.8",
    description: "Deep reddish-brown coat with occasional white patches, loose skin (dewlap), and low lethargy. Known as the best milker of all indigenous Zebu breeds.",
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSJNLu7JI6yekZEWw79Ez1-Ku0_4DzLFrB1jzNB574KeMGnauED2PRQAWhTxLnRv31XRUssbTLZzZkYV0ms0V1Qmef6VtbPNYwwXvRIT60jiaVSLJ0dUT5cXu43xqY28fITFPAoL3jPTgdz5PDNl4Mj20KsJwbdDjhD6p5e3kGEmdzjeFwZ6SqXE7CDk7Qan7B78LVi_R3HBUUAaLrbTtODkzfpkQnDIV0MKSJTo34tGoZSv2REAAtP7Umbs-CuTQBVICbAiPi1aHY",
    standards: {
      avgWeight: 480,
      annualYield: 2400,
      heatTolerance: "High",
      diseaseResistance: "Very High",
      fatContent: "4.8% - 5.2%",
      maturityAge: 34,
    },
    metricsList: { yield: 95, fertility: 80, weight: 60, longevity: 85, resistance: 88, fat: 75 }
  },
  {
    id: "murrah",
    name: "Murrah Buffalo",
    type: "buffalo",
    origin: "Rohtak, Hisar & Jind in Haryana",
    utility: "Premium Dairy Buffalo",
    conservationStatus: "Excellent (State-Protected)",
    geneticStrength: "Tier 1 High Yield DNA",
    confidence: 99.5,
    bodyConditionScore: "BCS 4.0",
    description: "Deep black body coloration, short tightly spiralled horns, and exceptionally high milk fat percentage. Truly the 'Black Gold' of Indian agriculture.",
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1hRS066lAtjW0wzn7oCn25DHhImnq_79cIa7sR7W-k3XIUUzLlZxmKKZXh8jpC3DUjucMgSLGrDK-xO8MxLaseOvdt41DXijouo_DKLDVNWBn8il6Nj8pBzJmdtS6tzFtg0mPgYjS68Y82JE6JaTJdbj5Dodv6n5cxgSPW2MVm60P1e3rmuvXVOSMV0JD0-ENTRA4ptTh0FhKmRPwrln3bmt;2R_cve8NZ4nWm9FG5SXrUBAQ_wZT4zAJX1EU1atu0TY1Efl01Vq",
    standards: {
      avgWeight: 650,
      annualYield: 2200,
      heatTolerance: "Moderate",
      diseaseResistance: "High (Mastitis Resistant)",
      fatContent: "7.0% - 8.5%",
      maturityAge: 38,
    },
    metricsList: { yield: 90, fertility: 70, weight: 85, longevity: 80, resistance: 85, fat: 90 }
  },
  {
    id: "jaffarabadi",
    name: "Jaffarabadi Buffalo",
    type: "buffalo",
    origin: "Saurashtra forest of Gujarat",
    utility: "Vast Muscular Frame & Milking",
    conservationStatus: "Stable (Robust)",
    geneticStrength: "Climate Champion Frame",
    confidence: 97.6,
    bodyConditionScore: "BCS 4.2",
    description: "The heaviest of all buffalo breeds. Characterized by a massive dropping skull, broad flat heavy horns drooping towards neck. Highly adapted to forest environments.",
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgs5Uw0iBZemc3o4DriKZ3XUplTATsOc_yFemgLfZVOlGnRflx2VtJjRxynYsg4uXolJngZq_09m0E6Z0mlY7vxwHcMQx2sJyKdwB6zvZkg5Ehn03O-kTXY6AT5jHrEj1H3FfuOBqv_0uwD58I_ViQTt5kztTstZX68URsrvjw3k9sakKORXmZ86rZ-agqgKdb5a_MKyu6zNKktGeCJJqWViYuTUc7YiH6TphRR6qCTAUl1rYoO2onIHDOi5NXo7T1PpH-he0nnW-p",
    standards: {
      avgWeight: 800,
      annualYield: 1500,
      heatTolerance: "Extreme",
      diseaseResistance: "Very High (Endemic Hardy)",
      fatContent: "7.5% - 9.0%",
      maturityAge: 45,
    },
    metricsList: { yield: 65, fertility: 65, weight: 98, longevity: 90, resistance: 95, fat: 95 }
  },
  {
    id: "red_sindhi",
    name: "Red Sindhi Cattle",
    type: "cow",
    origin: "Sindh region & widely in central India",
    utility: "Hardy Milker & Extreme Resilient",
    conservationStatus: "Protected / Highly Preferred",
    geneticStrength: "Elite Adaptive Chromatin",
    confidence: 95.8,
    bodyConditionScore: "BCS 3.6",
    description: "Deep rich uniform red colored coat. Extremely tolerant of harsh semi-arid tropical climates, requiring minimal veterinary maintenance while offering consistent milk production.",
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSJNLu7JI6yekZEWw79Ez1-Ku0_4DzLFrB1jzNB574KeMGnauED2PRQAWhTxLnRv31XRUssbTLZzZkYV0ms0V1Qmef6VtbPNYwwXvRIT60jiaVSLJ0dUT5cXu43xqY28fITFPAoL3jPTgdz5PDNl4Mj20KsJwbdDjhD6p5e3kGEmdzjeFwZ6SqXE7CDk7Qan7B78LVi_R3HBUUAaLrbTtODkzfpkQnDIV0MKSJTo34tGoZSv2REAAtP7Umbs-CuTQBVICbAiPi1aHY",
    standards: {
      avgWeight: 420,
      annualYield: 1800,
      heatTolerance: "Extreme",
      diseaseResistance: "Very High (Tick Proof)",
      fatContent: "4.5% - 5.0%",
      maturityAge: 38,
    },
    metricsList: { yield: 70, fertility: 75, weight: 55, longevity: 88, resistance: 94, fat: 65 }
  },
  {
    id: "banni",
    name: "Banni Buffalo",
    type: "buffalo",
    origin: "Kutch district of Gujarat",
    utility: "Night Grazing Hardy Stock",
    conservationStatus: "Stable / Resourced",
    geneticStrength: "Drought & Heat Resistant",
    confidence: 96.5,
    bodyConditionScore: "BCS 3.9",
    description: "Recognized for double-coiled horns, grazing in arid Banni grasslands at night to avoid sun heat. Extremely dual-purpose (draft & premium high fat milk yield).",
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgs5Uw0iBZemc3o4DriKZ3XUplTATsOc_yFemgLfZVOlGnRflx2VtJjRxynYsg4uXolJngZq_09m0E6Z0mlY7vxwHcMQx2sJyKdwB6zvZkg5Ehn03O-kTXY6AT5jHrEj1H3FfuOBqv_0uwD58I_ViQTt5kztTstZX68URsrvjw3k9sakKORXmZ86rZ-agqgKdb5a_MKyu6zNKktGeCJJqWViYuTUc7YiH6TphRR6qCTAUl1rYoO2onIHDOi5NXo7T1PpH-he0nnW-p",
    standards: {
      avgWeight: 580,
      annualYield: 1900,
      heatTolerance: "Extreme",
      diseaseResistance: "High",
      fatContent: "6.8% - 7.5%",
      maturityAge: 40,
    },
    metricsList: { yield: 78, fertility: 72, weight: 75, longevity: 82, resistance: 90, fat: 80 }
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "recognition" | "compare" | "dataset" | "assistant">("dashboard");
  const [historyList, setHistoryList] = useState<ScanResult[]>([]);
  const [geminiChatQuery, setGeminiChatQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize a demo history scan on startup to populate ledger gracefully
  useEffect(() => {
    const startupDemoScan: ScanResult = {
      id: "demo-init",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " (Demo)",
      breedId: "gir",
      breedName: "Gir Cattle",
      confidence: 99.2,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY06mtiSC6SGhBN9IcPmozzvWIbXar_ZQ_gDajJ1IyEqRUrop81G6RxaiQmUbQLQobHK-AdWU_Fg0JyCtQ_obAckB89LrIaVUMloB5MJF_D8AG4OuKBWR0bUb1DlSYPY_im4J0CHbnWQXQ5h_lOOWxawJ7EPeILQFQp8Hd9ORTrFB_2uHaFK4WTUp5Z610tbV-PpRLctLISxTbJ7UrQugA48jlvV5qB6vSBViixChhOwnziDILEAqg4atMb0O4-xdf9QuoBhAOnLJk",
      origin: "Gir Hills & Forests of Gujarat",
      utility: "High Milk Yield & Drafting",
      conservationStatus: "Stable (Global Favor)",
      geneticStrength: "Superior (A2 Beta-Casein)",
      bodyConditionScore: "BCS 3.5",
      notes: "Baseline diagnostic configuration."
    };
    setHistoryList([startupDemoScan]);
  }, []);

  const handleAddHistory = (result: ScanResult) => {
    setHistoryList((prev) => [result, ...prev]);
  };

  const handleConsultAIFromCompare = (prompt: string) => {
    setGeminiChatQuery(prompt);
    setActiveTab("assistant");
  };

  const handleLoadInCompareFromDataset = (breedId: string) => {
    // Navigate and set primary breed
    setActiveTab("compare");
  };

  // Switch dark/light CSS variables 
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Nav categories meta data
  const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: Tv },
    { id: "recognition", label: "Scanner Mode", icon: Cpu },
    { id: "compare", label: "Breed Compare", icon: Scale },
    { id: "dataset", label: "Breed Catalog", icon: Database },
    { id: "assistant", label: "Veterinary AI", icon: BrainCircuit }
  ];

  const appLayoutBgTheme = theme === "dark" 
    ? "bg-brand-dark text-[#dde2f3] min-h-screen font-sans antialiased flex flex-col transition-colors duration-300"
    : "bg-[#f8f9fc] text-[#1c2c3a] min-h-screen font-sans antialiased flex flex-col transition-colors duration-300";

  return (
    <div className={appLayoutBgTheme}>
      
      {/* Dynamic Header on mobile / Top control bar */}
      <header className={`py-4.5 px-6 border-b flex items-center justify-between z-40 ${
        theme === "dark" ? "bg-[#0b0e17]/90 border-white/5" : "bg-white/80 border-black/5"
      } sticky top-0 backdrop-blur-md`}>
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-green flex items-center justify-center text-brand-dark shadow-[0_0_15px_rgba(0,219,233,0.3)]">
            <Dna className="w-5 h-5 font-bold" />
          </div>
          <div>
            <span className="font-display font-black text-lg text-white tracking-tight flex items-center gap-1">
              BREEDVISION <span className="text-brand-cyan text-xs bg-brand-cyan/15 border border-brand-cyan/25 px-1.5 py-0.5 rounded uppercase font-mono tracking-widest">AI</span>
            </span>
          </div>
        </div>

        {/* Desktop Header auxiliary controls */}
        <div className="flex items-center gap-3">
          
          {/* Accessible Theme Toggle controls */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              theme === "dark" 
                ? "bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10" 
                : "bg-black/5 border-black/15 text-indigo-800 hover:bg-black/10"
            }`}
            title={theme === "dark" ? "Switch to Field Light Theme" : "Switch to Surveillance Dark Theme"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>

        </div>
      </header>

      {/* Main Grid container layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 max-w-7xl w-full mx-auto p-4 md:p-6 gap-6 xl:gap-8 pb-20 md:pb-6">
        
        {/* Desktop Sidebar Column Navigation (Col 3) */}
        <aside className="hidden md:col-span-3 lg:col-span-3 md:flex flex-col gap-6 self-start">
          
          <div className={`p-4 rounded-2xl border ${
            theme === "dark" ? "bg-white/2 border-white/5" : "bg-white border-black/5 shadow-sm"
          } space-y-2`}>
            <span className="text-[10px] font-bold text-on-surface-variant font-mono uppercase tracking-widest block px-2">
              Grid Surveillance Nodes
            </span>
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const IconComp = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border text-left cursor-pointer ${
                      isSelected 
                        ? "bg-brand-cyan text-on-primary border-brand-cyan shadow-[0_0_15px_rgba(0,219,233,0.2)] font-bold scale-[1.02]" 
                        : theme === "dark"
                        ? "bg-transparent border-transparent hover:border-white/10 text-on-surface-variant hover:text-white"
                        : "bg-transparent border-transparent hover:border-black/5 text-[#1c2c3a] hover:bg-black/2"
                    }`}
                  >
                    <IconComp className="w-4.5 h-4.5 flex-shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scan Record Ledger Panel */}
          <div className={`p-4 rounded-2xl border flex-1 flex flex-col justify-between ${
            theme === "dark" ? "bg-white/2 border-white/5" : "bg-white border-black/5 shadow-sm"
          } min-h-[300px]`}>
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-on-surface-variant font-mono uppercase tracking-widest block px-2 flex items-center gap-1.5 border-b border-white/5 pb-2.5">
                <History className="w-4 h-4 text-brand-cyan" /> Scan Record Ledger
              </span>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {historyList.map((hist) => (
                  <div 
                    key={hist.id}
                    className="p-3 bg-white/2 hover:bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white">{hist.breedName}</div>
                      <div className="text-[9px] text-[#4edea3] font-mono leading-none">{hist.bodyConditionScore} • {hist.confidence}% Confidence</div>
                    </div>
                    <span className="text-[8px] font-mono font-semibold text-on-surface-variant bg-white/5 px-1.5 py-0.5 rounded">
                      {hist.timestamp.split(" ")[0]}
                    </span>
                  </div>
                ))}

                {historyList.length === 0 && (
                  <div className="p-4 text-center text-xs text-on-surface-variant font-mono italic">
                    Waiting for speciman scans...
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 text-[10px] text-on-surface-variant font-mono uppercase text-center">
              Autonomous Hub Active
            </div>
          </div>

        </aside>

        {/* Central Display Viewport (Col 9) */}
        <main className="col-span-12 md:col-span-9 lg:col-span-9">
          
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dash"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Dashboard 
                  breeds={DEFAULT_BREEDS} 
                  onNavigateToScan={() => setActiveTab("recognition")} 
                />
              </motion.div>
            )}

            {activeTab === "recognition" && (
              <motion.div
                key="scan"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Recognition 
                  breeds={DEFAULT_BREEDS} 
                  onAddHistory={handleAddHistory} 
                />
              </motion.div>
            )}

            {activeTab === "compare" && (
              <motion.div
                key="comp"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Compare 
                  breeds={DEFAULT_BREEDS} 
                  onConsultAI={handleConsultAIFromCompare} 
                />
              </motion.div>
            )}

            {activeTab === "dataset" && (
              <motion.div
                key="data"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Dataset 
                  breeds={DEFAULT_BREEDS} 
                  onSelectBreedForCompare={handleLoadInCompareFromDataset} 
                />
              </motion.div>
            )}

            {activeTab === "assistant" && (
              <motion.div
                key="assist"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Assistant 
                  initialPrompt={geminiChatQuery} 
                  onClearInitialPrompt={() => setGeminiChatQuery("")} 
                />
              </motion.div>
            )}
          </AnimatePresence>

        </main>

      </div>

      {/* Accessible mobile drawer dropmenu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden fixed top-[68px] inset-x-0 p-4 border-b z-50 shadow-2xl ${
              theme === "dark" ? "bg-brand-dark/95 border-white/10" : "bg-white border-black/10"
            }`}
          >
            <div className="grid grid-cols-2 gap-2 font-mono text-xs uppercase">
              {NAV_ITEMS.map((item) => {
                const IconComp = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border text-left cursor-pointer ${
                      isSelected 
                        ? "bg-brand-cyan text-brand-dark border-brand-cyan font-bold" 
                        : "bg-white/3 border-white/5 text-on-surface-variant hover:text-white"
                    }`}
                  >
                    <IconComp className="w-4 h-4 flex-shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom touch-friendly Mobile Nav tab bar (visible only to mobile screens < md) */}
      <nav className={`md:hidden fixed bottom-0 inset-x-0 border-t py-2 px-4 shadow-[0_-5px_15px_rgba(0,0,0,0.4)] flex items-center justify-around z-40 backdrop-blur-md ${
        theme === "dark" ? "bg-[#0b0e17]/95 border-white/5" : "bg-white/95 border-black/5"
      }`}>
        {NAV_ITEMS.map((item) => {
          const IconComp = item.icon;
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 py-1 px-2 mb-1 min-h-[44px] min-w-[44px] transition-all cursor-pointer ${
                isSelected ? "text-brand-cyan scale-110" : "text-on-surface-variant hover:text-white"
              }`}
            >
              <IconComp className="w-5.5 h-5.5" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
