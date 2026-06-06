var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
var BREEDS_DATABASE = [
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
      // kg
      annualYield: 2100,
      // liters
      heatTolerance: "Extreme",
      diseaseResistance: "High (Mastitis Resistant)",
      fatContent: "4.5% - 5.0%",
      maturityAge: 36
      // months
    },
    metricsList: {
      yield: 85,
      fertility: 75,
      weight: 70,
      longevity: 90,
      resistance: 92,
      fat: 65
    }
  },
  {
    id: "sahiwal",
    name: "Sahiwal Cattle",
    type: "cow",
    origin: "Montgomery district (now in Pakistan) & Punjab",
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
      maturityAge: 34
    },
    metricsList: {
      yield: 95,
      fertility: 80,
      weight: 60,
      longevity: 85,
      resistance: 88,
      fat: 75
    }
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
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1hRS066lAtjW0wzn7oCn25DHhImnq_79cIa7sR7W-k3XIUUzLlZxmKKZXh8jpC3DUjucMgSLGrDK-xO8MxLaseOvdt41DXijouo_DKLDVNWBn8il6Nj8pBzJmdtS6tzFtg0mPgYjS68Y82JE6JaTJdbj5Dodv6n5cxgSPW2MVm60P1e3rmuvXVOSMV0JD0-ENTRA4ptTh0FhKmRPwrln3bmtjL2R_cve8NZ4nWm9FG5SXrUBAQ_wZT4zAJX1EU1atu0TY1Efl01Vq",
    standards: {
      avgWeight: 650,
      annualYield: 2200,
      heatTolerance: "Moderate",
      diseaseResistance: "High (Mastitis Resistant)",
      fatContent: "7.0% - 8.5%",
      maturityAge: 38
    },
    metricsList: {
      yield: 90,
      fertility: 70,
      weight: 85,
      longevity: 80,
      resistance: 85,
      fat: 90
    }
  },
  {
    id: "jaffarabadi",
    name: "Jaffarabadi Buffalo",
    type: "buffalo",
    origin: "Saurashtra peninsula of Gujarat (Gir forest)",
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
      maturityAge: 45
    },
    metricsList: {
      yield: 65,
      fertility: 65,
      weight: 98,
      longevity: 90,
      resistance: 95,
      fat: 95
    }
  },
  {
    id: "red_sindhi",
    name: "Red Sindhi Cattle",
    type: "cow",
    origin: "Sindh region, now widely in central India",
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
      maturityAge: 38
    },
    metricsList: {
      yield: 70,
      fertility: 75,
      weight: 55,
      longevity: 88,
      resistance: 94,
      fat: 65
    }
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
      maturityAge: 40
    },
    metricsList: {
      yield: 78,
      fertility: 72,
      weight: 75,
      longevity: 82,
      resistance: 90,
      fat: 80
    }
  }
];
var geminiClient = null;
function getGeminiClient() {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      geminiClient = new import_genai.GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
  }
  return geminiClient;
}
app.use(import_express.default.json({ limit: "50mb" }));
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: /* @__PURE__ */ new Date() });
});
app.get("/api/breeds", (req, res) => {
  res.json(BREEDS_DATABASE);
});
app.post("/api/analyze-breed", async (req, res) => {
  const { imageData, additionalNotes } = req.body;
  if (!imageData) {
    return res.status(400).json({ error: "No image data provided" });
  }
  const ai = getGeminiClient();
  if (!ai) {
    console.log("Using smart mock analyzer because GEMINI_API_KEY is not configured.");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const noteLower = (additionalNotes || "").toLowerCase();
    let selectedBreed = BREEDS_DATABASE[0];
    if (noteLower.includes("sahiwal")) selectedBreed = BREEDS_DATABASE[1];
    else if (noteLower.includes("murrah")) selectedBreed = BREEDS_DATABASE[2];
    else if (noteLower.includes("jaffarabadi")) selectedBreed = BREEDS_DATABASE[3];
    else if (noteLower.includes("sindhi")) selectedBreed = BREEDS_DATABASE[4];
    else if (noteLower.includes("banni")) selectedBreed = BREEDS_DATABASE[5];
    else {
      const randIdx = Math.floor(Math.random() * BREEDS_DATABASE.length);
      selectedBreed = BREEDS_DATABASE[randIdx];
    }
    return res.json({
      success: true,
      fallbackMode: true,
      breedId: selectedBreed.id,
      breedName: selectedBreed.name,
      confidence: selectedBreed.confidence,
      origin: selectedBreed.origin,
      utility: selectedBreed.utility,
      conservationStatus: selectedBreed.conservationStatus,
      geneticStrength: selectedBreed.geneticStrength,
      bodyConditionScore: selectedBreed.bodyConditionScore,
      notes: `Note: Executed via local offline model fallback. Recommended: Configure process.env.GEMINI_API_KEY in Settings/Secrets to run live multi-spectral image scans! Specifically: ${selectedBreed.description}`
    });
  }
  try {
    const base64Data = imageData.split(",")[1] || imageData;
    const modelName = "gemini-3.5-flash";
    const prompt = `
      You are an expert veterinary officer and agricultural artificial intelligence specialized in indigneous Indian cattle and buffalo breeds.
      Analyze the provided image of a bovine specimen. Identify its breed. Refer especially to these breeds: "Gir Cattle", "Sahiwal Cattle", "Murrah Buffalo", "Jaffarabadi Buffalo", "Red Sindhi Cattle", "Banni Buffalo".
      
      Additional User Note/Context: "${additionalNotes || "None"}"

      Examine morphological traits (size, skull bulging, horn spiral curvature, dewlap, coat color) and estimate the parameters.
      Provide a highly precise structural and agricultural recommendation.
    `;
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data
          }
        },
        prompt
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            breedId: {
              type: import_genai.Type.STRING,
              description: "The matched breed identifier in lowercase, one of: 'gir', 'sahiwal', 'murrah', 'jaffarabadi', 'red_sindhi', 'banni'. Match as closely as possible."
            },
            breedName: {
              type: import_genai.Type.STRING,
              description: "Full format name of breed, e.g. 'Gir Cattle', 'Sahiwal Cattle', 'Murrah Buffalo'"
            },
            confidence: {
              type: import_genai.Type.NUMBER,
              description: "Percentage matching confidence from 80.0 to 99.9"
            },
            origin: {
              type: import_genai.Type.STRING,
              description: "Traditional geographic origin, e.g. 'Native to Gujarat'"
            },
            utility: {
              type: import_genai.Type.STRING,
              description: "Agricultural purpose, e.g. 'High Milk Yield'"
            },
            conservationStatus: {
              type: import_genai.Type.STRING,
              description: "Conservation status or breeding tier, e.g. 'Stable' or 'State Protected'"
            },
            geneticStrength: {
              type: import_genai.Type.STRING,
              description: "Genetic qualities, e.g. 'Superior (A2 Beta)', 'Robust Skeleton'"
            },
            bodyConditionScore: {
              type: import_genai.Type.STRING,
              description: "Estimated Body Condition Score (e.g. 'BCS 3.5' or 'BCS 3.8' based on standard cattle charts)"
            },
            notes: {
              type: import_genai.Type.STRING,
              description: "AI notes summarizing key morphological qualities observed, physical indicators, and potential disease awareness diagnostic flags (like ticks, mastitis, or dehydration markers)."
            }
          },
          required: ["breedId", "breedName", "confidence", "origin", "utility", "conservationStatus", "geneticStrength", "bodyConditionScore", "notes"]
        }
      }
    });
    const parsedOutput = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      ...parsedOutput
    });
  } catch (err) {
    console.error("Gemini image analysis error:", err);
    res.status(500).json({
      error: "Failed to process image through Gemini system",
      details: err.message
    });
  }
});
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array" });
  }
  const ai = getGeminiClient();
  if (!ai) {
    console.log("Using smart mock assistant because GEMINI_API_KEY is not configured.");
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const lowerUser = lastUserMessage.toLowerCase();
    let botResponse = "I can help with indigneous Indian cattle and buffalo questions. Ask me about Gir, Sahiwal, Murrah buffalo breeding, yield optimization, disease care, or high nutrition diets!";
    if (lowerUser.includes("milk") || lowerUser.includes("yield")) {
      botResponse = "To optimize the milk yield of indigenous breeds like Sahiwal or Gir, ensure a balanced total mixed ration (TMR). This includes 60% green fodder (lucerne, napier grass), 30% dry roughage (paddy straw, wheat straw), and 10% high-quality protein concentrate. Adding mineral mixtures (contains calcium, phosphorus, zinc) boosts yield by 10-15% and ensures stable lactation curves.";
    } else if (lowerUser.includes("breed") || lowerUser.includes("cross")) {
      botResponse = "Sahiwal and Gir cows have high genetic resistance. Crossing an indigenous Sahiwal with elite Holstein-Friesian strains creates a hardy cross-breed called 'Frieswal'. However, preserving 100% pure genetic stock using artificial insemination program is highly recommended to protect native vigor and A2 beta-casein production.";
    } else if (lowerUser.includes("disease") || lowerUser.includes("mastitis") || lowerUser.includes("fever")) {
      botResponse = "Early detection of mastitis is vital. Watch for swelling, warm udders, and curdled milk. Maintaining strict milking hygiene (teat-dipping with iodophor solution post-milking) prevents bacterial entry. If fever is detected alongside tick infestation, prepare a mild tick-wash treatment and consult a local veterinarian.";
    } else if (lowerUser.includes("buffalo") || lowerUser.includes("murrah") || lowerUser.includes("jaffarabadi")) {
      botResponse = "Murrah buffaloes require frequent wallowing (water cooling) for thermoregulation since their dark skin quickly absorbs heat. Ensure clean water tanks. Feeding them with cottonseed cake and mustard oilcake ensures high butterfat contents (exceeding 7.5% - 8.5%).";
    }
    return res.json({
      role: "model",
      content: botResponse,
      fallbackMode: true
    });
  }
  try {
    const formattedContents = messages.map((m) => ({
      role: m.role || "user",
      parts: [{ text: m.content || "" }]
    }));
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: "You are the BreedVision AI Intelligent Assistant, an expert veterinary officer, livestock geneticist, and advisor for Indian dairy farmers. Provide precise, actionable advice regarding feed formulation, livestock housing, artificial insemination, breed selection, disease awareness (such as Foot-and-Mouth disease, Mastitis, Tick-borne fevers), milk yield optimization, and general care of indigenous breeds like Sahiwal, Gir, Tharparkar, Murrah, and Jaffarabadi. Keep responses clear, professional, structured, and empathetic to farmers."
      }
    });
    res.json({
      role: "model",
      content: response.text || "I was unable to formulate a response. Please check back shortly."
    });
  } catch (err) {
    console.error("Gemini assistant chat error:", err);
    res.status(500).json({
      error: "Failed to process chat response from Gemini",
      details: err.message
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    console.log(`Using GEMINI_API_KEY from environment: ${process.env.GEMINI_API_KEY ? "Yes (Configured)" : "No (Placeholder)"}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
