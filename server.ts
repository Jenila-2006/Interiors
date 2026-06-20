import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Standard lazy initialization of Gemini AI
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is missing. Activating high-fidelity designer fallbacks.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Import catalog data directly for server processing
import { PRODUCTS } from "./src/data.js";

// High-fidelity designer fallback for conversational replies
function fallbackChat(userMessage: string): { text: string; suggestedProductIds: string[] } {
  const query = userMessage.toLowerCase();
  
  if (query.includes("sofa") || query.includes("couch") || query.includes("lounge") || query.includes("seat")) {
    return {
      text: "To elevate your lounge area with fluid lines and grand seating comfort, I highly recommend our signature **Aurelia Velvet Curve Sofa** (ID: `sofa-1`), which is meticulously hand-upholstered in Italian woven velvet. For a more traditional, rich leather aesthetic, our **Classic Saddle Chesterfield Sofa** (ID: `sofa-2`) provides a stately premium patina over time.\n\nWould you like me to check their detailed physical bounds or suggest matching tables for these setups?",
      suggestedProductIds: ["sofa-1", "sofa-2"]
    };
  }
  
  if (query.includes("bed") || query.includes("bedroom") || query.includes("sleep") || query.includes("night")) {
    return {
      text: "For a master bedroom workspace or cozy sanctuary, I suggest anchoring the room with our beautiful **Sovereign Tufted Velvet Bed** (ID: `bed-1`) in Royal Emerald or Navy velvet. If you prefer low-profile Japanese simplicity, the **Zen Floating Platform Bed** (ID: `bed-2`) is built without iron nails using authentic interlocking joinery. Pair either with the **Eclipse Brass Pendant Arch** (ID: `lighting-1`) to evoke premium, warm evening shadows.",
      suggestedProductIds: ["bed-1", "bed-2", "lighting-1"]
    };
  }
  
  if (query.includes("table") || query.includes("dining") || query.includes("coffee") || query.includes("desk")) {
    return {
      text: "Tables organize the fluid boundaries of a shared room. For dining, our **Obsidian Nero Marble Dining Table** (ID: `table-1`) features natural Spanish Marquina stone and seats 8 guests. For living room centerpieces, the **Travertine Arch Coffee Table** (ID: `table-2`) brings tactile, porous travertine geology in a modern arch shape. For workspace, our executive **Walnut Cantilever Desk** (ID: `workspace-1`) is highly recommended.",
      suggestedProductIds: ["table-1", "table-2", "workspace-1"]
    };
  }

  if (query.includes("50,000") || query.includes("50k") || query.includes("fifty thousand") || query.includes("50000")) {
    return {
      text: "For a premium design composition strictly under **₹50,000**, I have curated a beautifully harmonized study and reading nook layout:\n\n1. **Nordic Bouclé Accent Chair** (₹19,900) - provides incredibly cozy organic sheep-wool textures.\n2. **Asymmetrical Floating Oak Bookshelf** (₹18,000) - acts as a structural art form for books and accessories.\n3. **Abstract Ceramic Bas-Relief Frame** (₹8,500) - absorbs flutter echoes and adds fine tactile wall layers.\n\n*Total Setup Budget: ₹46,400* — perfect for cozy corners. Shall we add this staging palette to your selection?",
      suggestedProductIds: ["chair-1", "shelf-1", "decor-1"]
    };
  }

  if (query.includes("1,00,000") || query.includes("100,000") || query.includes("100k") || query.includes("lakh") || query.includes("one lakh") || query.includes("100000")) {
    return {
      text: "To optimize a premium layout within **₹1,00,000**, we can curate a stunning living room lounge combination:\n\n1. **Aurelia Velvet Curve Sofa** (₹59,900 special price) - Italian velvet curved frame.\n2. **Travertine Arch Coffee Table** (₹28,000) - solid sediment travertine arches.\n3. **Eclipse Brass Pendant Arch** (₹14,500) - glass sphere suspension dome.\n\n*Total Combined Cost: ₹1,02,400 (Just over ₹1,00,000 list price, but with our current **WELCOME10** coupon code, it sits comfortably at **₹92,160**).* This is an iconic, balanced modern statement.",
      suggestedProductIds: ["sofa-1", "table-2", "lighting-1"]
    };
  }
  
  if (query.includes("minimal") || query.includes("simple") || query.includes("clean") || query.includes("nordic") || query.includes("scandi")) {
    return {
      text: "A warm minimalist layout relies on negative space and rich structural materials rather than unnecessary clutter. I highly suggest coupling our **Nordic Bouclé Accent Chair** (ID: `chair-1`) with the organic sediment of our **Travertine Arch Coffee Table** (ID: `table-2`). Finish the walls with the **Abstract Ceramic Bas-Relief Frame** (ID: `decor-1`) for acoustic softness and light shadowing.",
      suggestedProductIds: ["chair-1", "table-2", "decor-1"]
    };
  }

  if (query.includes("work") || query.includes("desk") || query.includes("office") || query.includes("study") || query.includes("write")) {
    return {
      text: "Creative analytics demand deep focal planes. I suggest our executive **Walnut Executive Cantilever Desk** (ID: `workspace-1`), featuring american walnut timber and integrated cable management, combined with the **Asymmetrical Floating Oak Bookshelf** (ID: `shelf-1`) for reference books and curated ceramics.",
      suggestedProductIds: ["workspace-1", "shelf-1"]
    };
  }

  return {
    text: "Welcome to our design studio! As an expert stager, I believe in balancing architectural mass and soft warmth. \n\nTell me: are you focusing on a welcoming living room lounge, a restorative bedroom sanctuary, or a highly focused home work studio? I will assemble a bespoke layout pairing colors, materials, and spacing dimensions beautifully.",
    suggestedProductIds: ["sofa-1", "chair-1", "table-2"]
  };
}

// Local smart compatibility calculator based on styles, dimensions and materials
function fallbackCompatibility(productIds: string[]): { score: number; reasons: string[]; suggestions: string } {
  const items = PRODUCTS.filter((p) => productIds.includes(p.id));
  
  if (items.length === 0) {
    return {
      score: 75,
      reasons: ["Spatial dimensions conform to typical lounge guidelines."],
      suggestions: "Add a statement pendant light from our catalog to anchor the set."
    };
  }
  
  const categories = items.map(i => i.category);
  const styles = items.map(i => i.style);
  const materials = items.map(i => i.material as string);
  
  let score = 82; // Solid starting floor for curated items
  
  const uniqueStyles = Array.from(new Set(styles));
  if (uniqueStyles.length === 1) {
    score += 12; // High style consistency
  } else if (uniqueStyles.includes("Minimal") && uniqueStyles.includes("Modern")) {
    score += 8; // Good harmony
  } else if (uniqueStyles.includes("Luxury") && uniqueStyles.includes("Classic")) {
    score += 8; // Classic luxury harmony
  } else if (uniqueStyles.includes("Classic") && uniqueStyles.includes("Minimal")) {
    score -= 4; // Stylistic contrast
  }
  
  const uniqueCats = Array.from(new Set(categories));
  if (uniqueCats.includes("Living Room") && uniqueCats.includes("Lighting")) {
    score += 4;
  }
  
  score = Math.max(50, Math.min(99, score));
  
  const reasons: string[] = [];
  if (items.length >= 2) {
    reasons.push(`The physical elevations of the ${items[0].name} and the ${items[1].name} create fluid, balanced eye lines in the room.`);
  } else {
    reasons.push("The item establishes a grand architectural focal point in its physical quadrant.");
  }
  
  if (uniqueStyles.length === 1) {
    reasons.push(`Outstanding structural consistency: both pieces share the premium '${uniqueStyles[0]}' aesthetic language.`);
  } else {
    reasons.push(`The tactile material combination (${materials.join(" paired with ")}) introduces delightful textural contrast.`);
  }
  
  if (materials.includes("Wood") && materials.includes("Fabric")) {
    reasons.push("Warm solid timber timberlines anchor the cozy woven bed or sofa fabric weaves beautifully.");
  } else if (materials.includes("Leather") && materials.includes("Wood")) {
    reasons.push("Aristocratic Saddle-tan leather accents bring out the rich dark grains of premium walnut or oak.");
  } else if (materials.includes("Marble") && materials.includes("Fabric")) {
    reasons.push("High-contrast polished Nero Marquina marble complements modern texturized velvet or bouclé upholstery loops.");
  } else {
    reasons.push("The color spectrum profiles harmonize comfortably within a soft warm palette.");
  }
  
  reasons.push("Proportions are optimally spaced to leave adequate negative breathing room.");

  let suggestions = "To truly elevate this configuration, we recommend introducing our Eclipse Brass Pendant Arch (ID: lighting-1) to cast warm diffused highlights.";
  
  if (!productIds.includes("lighting-1")) {
    suggestions = "We highly recommend introducing our Eclipse Brass Pendant Arch (ID: lighting-1) to bathe these beautiful items in warm, luxurious light.";
  } else if (!productIds.includes("decor-1")) {
    suggestions = "Consider mounting our Abstract Ceramic Bas-Relief Plaster Panel (ID: decor-1) nearby. It will absorb room echo and complement the layout beautifully.";
  } else {
    suggestions = "Incorporate a soft organic wool rug and some lush indoor green monsteras to finalize this spectacular staging portrait.";
  }

  return {
    score,
    reasons: reasons.slice(0, 3),
    suggestions
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API 1: Chatbot assistant
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid messages array" });
        return;
      }

      const client = getGeminiClient();
      if (!client) {
        // Fallback directly
        const lastUserMsg = messages.filter(m => m.sender === "user").pop();
        const fallbackRes = fallbackChat(lastUserMsg ? lastUserMsg.text : "");
        res.json(fallbackRes);
        return;
      }

      // Format conversation history for Gemini context
      const formattedHistory = messages.map((m: any) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const systemInstruction = `You are 'Interior AI Assistant', the exclusive, professional, luxury interior decorator and designer assistant for the premium furniture brand 'Interiors'.
Here is the available high-end catalog of furniture items at our store:
${JSON.stringify(PRODUCTS, null, 2)}

Your goals:
1. Always maintain a warm, highly sophisticated, polite, and authoritative designer voice. Use descriptive interior design terms (e.g., "spatial balance", "textural play", "chromatic depth").
2. Answer the user's questions confidently. If they ask for recommendations ("Suggest a sofa", "What matches this chair", "卧室搭配" / "bedroom setup"), you MUST recommend REAL products from the catalog above by matching their attributes.
3. Suggest the actual products with their exact IDs.
4. If they specify a budget (such as under ₹50,000 or any budget), calculate a combination of items matching or sitting just under that budget.
5. Provide suggestions for colors or material mixtures when asked.
6. Return your output EXACTLY according to the JSON schema. The 'text' field should be a beautifully structured markdown response. The 'suggestedProductIds' must contain the string IDs of the recommended catalog items that are relevant to this message.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: "The direct markdown reply from the Interior designer to the user.",
              },
              suggestedProductIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "The list of product IDs from the catalog recommended to the user in this turn.",
              },
            },
            required: ["text", "suggestedProductIds"],
          },
        },
      });

      const responseText = response.text || "{}";
      const resultObj = JSON.parse(responseText.trim());
      res.json(resultObj);
    } catch (error: any) {
      console.error("Gemini Chat API Error:", error);
      // Fail back gracefully with local advisor
      const lastUserMsg = req.body.messages ? req.body.messages.filter((m: any) => m.sender === "user").pop() : null;
      const fallbackRes = fallbackChat(lastUserMsg ? lastUserMsg.text : "");
      res.json(fallbackRes);
    }
  });

  // API 2: Dynamic compatibility analyzer
  app.post("/api/compatibility-score", async (req: Request, res: Response) => {
    try {
      const { productIds } = req.body;
      if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        res.status(400).json({ error: "At least one product ID must be provided" });
        return;
      }

      // Filter and extract selected items details
      const selectedItems = PRODUCTS.filter((p) => productIds.includes(p.id));

      if (selectedItems.length === 0) {
        res.status(404).json({ error: "Selected products not found in the catalog" });
        return;
      }

      const client = getGeminiClient();
      if (!client) {
        const localScore = fallbackCompatibility(productIds);
        res.json(localScore);
        return;
      }

      const prompt = `Evaluate the interior design compatibility of the following selected items:
${JSON.stringify(selectedItems, null, 2)}

Full catalog is available to suggest additional items that would complete the look:
${JSON.stringify(PRODUCTS, null, 2)}

Calculate:
1. A styling compatibility score (0-100) based on how well these items complement each other in style (Minimal, Luxury, Modern, Classic), material consistency (Wood, Metal, Fabric, Leather), and dimension/volumetric balance.
2. The specific reasons why they match or mismatch (e.g. key structural similarities, color spectrum complement, spacing requirements).
3. Suggestions on accessories or supporting items (lamps, shelves, and décor) from the catalog to complete the room's aesthetic.

Return a JSON object conforming to the schema.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional luxury interior architect specialized in high-end staging and color theory.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.INTEGER,
                description: "Compatibility score of the room items combined, between 0 and 100.",
              },
              reasons: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of 3-4 professional, bulleted design reasons proving why they match (styles, proportions, color palette).",
              },
              suggestions: {
                type: Type.STRING,
                description: "A highly expert, elegant recommendation on what accessories, side lighting, or decor to add to elevate the look.",
              },
            },
            required: ["score", "reasons", "suggestions"],
          },
        },
      });

      const responseText = response.text || "{}";
      const resultObj = JSON.parse(responseText.trim());
      res.json(resultObj);
    } catch (error: any) {
      console.error("Gemini Compatibility API Error:", error);
      const localScore = fallbackCompatibility(req.body.productIds || []);
      res.json(localScore);
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in developer mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Interiors Server] Running harmoniously on http://localhost:${PORT}`);
  });
}

startServer();
