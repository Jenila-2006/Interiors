import { Product, InspirationRoom, Review, Coupon } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "sofa-1",
    name: "Aurelia Velvet Curve Sofa",
    price: 68500,
    discountPrice: 59900,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Living Room",
    style: "Luxury",
    material: "Fabric",
    colors: [
      { name: "Royal Emerald", hex: "#0F5257" },
      { name: "Champagne Velvet", hex: "#E9DDC7" },
      { name: "Charcoal Chenille", hex: "#353839" }
    ],
    rating: 4.8,
    reviewsCount: 124,
    dimensions: { width: 220, height: 85, depth: 95, unit: "cm" },
    description: "An elegant, low-profile curve sofa styled with premium high-density resilience foam and upholstered in exquisite woven Italian velvet. Designed for luxurious lounges and sophisticated living rooms.",
    story: "Created by Milanese designer Beatrice Rossi, the Aurelia series represents the fluidity of high fashion translated to architectural spaces. Each curve is hand-crafted with continuous tension springs to ensure decades of unchanging ergonomic support.",
    availability: "In Stock",
    isTrending: true,
    isNew: true
  },
  {
    id: "table-1",
    name: "Obsidian Nero Marble Dining Table",
    price: 125000,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Dining Room",
    style: "Luxury",
    material: "Wood",
    colors: [
      { name: "Marquina Black", hex: "#1A1A1A" },
      { name: "Calacatta Gold", hex: "#FAF5EF" }
    ],
    rating: 4.9,
    reviewsCount: 42,
    dimensions: { width: 200, height: 76, depth: 100, unit: "cm" },
    description: "A monumental dining item featuring a stunning Nero Marquina marble slab resting seamlessly on a sculptural, dark fluted solid oak base. Serves up to 8 guests in ultimate modern elegance.",
    story: "Every marble tabletop in the Obsidian collective is sourced directly from quarries in Basque County, Northern Spain. The natural white calcitic grain contrasts beautifully with the black crystalline limestone, creating a unique signature piece in every single production run.",
    availability: "Low Stock",
    isTrending: true
  },
  {
    id: "chair-1",
    name: "Nordic Bouclé Accent Chair",
    price: 24000,
    discountPrice: 19900,
    image: "https://images.unsplash.com/photo-1598191381897-005a966b9ae7?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1598191381897-005a966b9ae7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Living Room",
    style: "Minimal",
    material: "Fabric",
    colors: [
      { name: "Alabaster Bouclé", hex: "#F3EFE9" },
      { name: "Oat Oatmeal", hex: "#D9D0C1" },
      { name: "Sienna Terracotta", hex: "#B85D43" }
    ],
    rating: 4.7,
    reviewsCount: 89,
    dimensions: { width: 85, height: 78, depth: 80, unit: "cm" },
    description: "A tactile masterpiece. This organic-shaped cozy reading chair features iconic mid-century curves upholstered in thick, looped sheep-wool textured bouclé.",
    story: "Taking inspiration from Scandinavian winters, the chair encapsulates feelings of nesting (Hygge). The inner base is built with laminated Siberian Birch wood, known for extreme strength under bending forces.",
    availability: "In Stock",
    isTrending: true,
    isNew: true
  },
  {
    id: "bed-1",
    name: "Sovereign Tufted Velvet Bed",
    price: 85000,
    discountPrice: 79000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Bedroom",
    style: "Luxury",
    material: "Fabric",
    colors: [
      { name: "Royal Emerald", hex: "#0F5257" },
      { name: "Midnight Navy", hex: "#1A2530" },
      { name: "Warm Taupe", hex: "#B3A394" }
    ],
    rating: 4.9,
    reviewsCount: 68,
    dimensions: { width: 195, height: 135, depth: 215, unit: "cm" },
    description: "A majestic headboard featuring hand-tied deep diamond-tufted velvet upholstery that frames your master bedroom with aristocratic luxury.",
    story: "Nothing says sanctuary like the Sovereign. Built with double-welded joints and isolated internal pocket springs, this bed integrates style with a completely silent foundation for deep restorative slumber.",
    availability: "In Stock"
  },
  {
    id: "shelf-1",
    name: "Asymmetrical Floating Oak Bookshelf",
    price: 18000,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Workspace",
    style: "Minimal",
    material: "Wood",
    colors: [
      { name: "Natural Blonde Oak", hex: "#EEDBBA" },
      { name: "Smoked Espresso Walnut", hex: "#4A3B32" }
    ],
    rating: 4.6,
    reviewsCount: 37,
    dimensions: { width: 120, height: 180, depth: 28, unit: "cm" },
    description: "An elegant, geometric shelf unit that relies on negative space and clean modern lines. Perfect for presenting literature, ceramics, and personal memories.",
    story: "A study in balance. Designed by industrial craftsman Kai Arndt, it mimics Zen balance stones, using vertical structural planks positioned asymmetrically to disperse weight dynamically.",
    availability: "In Stock",
    isNew: true
  },
  {
    id: "lighting-1",
    name: "Eclipse Brass Pendant Arch",
    price: 14500,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Lighting",
    style: "Modern",
    material: "Metal",
    colors: [
      { name: "Antique Gilded Brass", hex: "#D4AF37" },
      { name: "Satin Matte Black", hex: "#1A1A1A" }
    ],
    rating: 4.8,
    reviewsCount: 95,
    dimensions: { width: 45, height: 120, depth: 45, unit: "cm" },
    description: "An atmospheric suspension lamp combining an opalescent glass sphere with a majestic hand-finished brushed titanium golden rim, bathing rooms in premium warmth.",
    story: "Inspired by solar eclipse alignments, this lamp can be adjusted in continuous heights. The light reflects off the golden concave shield, generating premium diffused lighting without aggressive glare.",
    availability: "In Stock"
  },
  {
    id: "decor-1",
    name: "Abstract Ceramic Bas-Relief Frame",
    price: 8500,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Wall Décor",
    style: "Minimal",
    material: "Fabric",
    colors: [
      { name: "Matte Alabaster", hex: "#FAF8F2" },
      { name: "Warm Terracotta", hex: "#B37D63" }
    ],
    rating: 4.5,
    reviewsCount: 23,
    dimensions: { width: 60, height: 80, depth: 4, unit: "cm" },
    description: "A tactile wall panel handmade with organic stoneware plaster compounds that capture sunlight through dynamic, smooth-edged geometric contours.",
    story: "Each panel is hand-molded in our Copenhagen studio, signed individually by the master plastering sculptor. It acts as an acoustic absorber as well, keeping rooms quiet and serene.",
    availability: "In Stock"
  },
  {
    id: "workspace-1",
    name: "Walnut Executive Cantilever Desk",
    price: 42000,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Workspace",
    style: "Modern",
    material: "Wood",
    colors: [
      { name: "Sienna Walnut", hex: "#4A3629" },
      { name: "Espresso Ash", hex: "#222222" }
    ],
    rating: 4.7,
    reviewsCount: 51,
    dimensions: { width: 140, height: 75, depth: 70, unit: "cm" },
    description: "A workspace power statement. High-grade American walnut veneer top with bevelled edges, balanced seamlessly over powder-coated raw steel structural legs.",
    story: "This desk includes magnetic discrete wire routing pathways hidden down the legs, maintaining an absolutely uncluttered top surface for productive, clear creative thinking.",
    availability: "In Stock",
    isTrending: false
  },
  {
    id: "outdoor-1",
    name: "Teak & Rope Lounger Chair",
    price: 32000,
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Outdoor",
    style: "Minimal",
    material: "Wood",
    colors: [
      { name: "Golden Honey Teak", hex: "#CB9C64" },
      { name: "Smoked Charcoal", hex: "#47494E" }
    ],
    rating: 4.8,
    reviewsCount: 29,
    dimensions: { width: 70, height: 82, depth: 90, unit: "cm" },
    description: "Crafted in beautiful premium Grade-A weather resistant teak wood, featuring double-braided water repellent poly-olefin fibers woven for a flexible seat.",
    story: "The natural abundance of protective oils inside the dense heartwood of sustainably farmed teak protects this lounger from rain, snow, UV, and salt pool water.",
    availability: "Low Stock",
    isTrending: false
  },
  {
    id: "sofa-2",
    name: "Classic Saddle Chesterfield Sofa",
    price: 145000,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Living Room",
    style: "Classic",
    material: "Leather",
    colors: [
      { name: "Aged Saddle Tan", hex: "#8B5A2B" },
      { name: "Vintage Oxblood", hex: "#5C1D24" },
      { name: "Classic Forest Green", hex: "#1C352D" }
    ],
    rating: 4.9,
    reviewsCount: 77,
    dimensions: { width: 235, height: 78, depth: 102, unit: "cm" },
    description: "The epitome of British luxury design. Custom aniline wax-treated top grain buffalo leather detailed with classic rolled arms and premium deep button tufts.",
    story: "Aniline leather is completely breathable and will acquire a magnificent rich golden-brown patina over the years, logging your story of family laughter and fireside conversations.",
    availability: "In Stock"
  },
  {
    id: "bed-2",
    name: "Zen Floating Platform Bed",
    price: 55000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Bedroom",
    style: "Minimal",
    material: "Wood",
    colors: [
      { name: "Bleached Maple", hex: "#EFDEC9" },
      { name: "Natural Red Oak", hex: "#D6B898" }
    ],
    rating: 4.7,
    reviewsCount: 54,
    dimensions: { width: 180, height: 35, depth: 210, unit: "cm" },
    description: "A super low-profile Japanese platform bed giving the optic illusion of floating above the ground. Built entirely with interlocking mortise joints without iron nails.",
    story: "Crafted following Japanese 'Sashimono' joinery methods, which allow wood to expand and contract naturally with local humidity, avoiding creaks and ensuring centuries of life.",
    availability: "In Stock",
    isNew: true
  },
  {
    id: "table-2",
    name: "Travertine Arch Coffee Table",
    price: 28000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Living Room",
    style: "Minimal",
    material: "Wood",
    colors: [
      { name: "Cream Travertine", hex: "#EAE3D4" }
    ],
    rating: 4.8,
    reviewsCount: 33,
    dimensions: { width: 90, height: 38, depth: 90, unit: "cm" },
    description: "A beautiful monolith composed of honed cream travertine stone with visible porous textures, supported over three sculptural semicircular leg arches.",
    story: "Each travertine stone plate is selected for its beautiful sedimentation lines. Honed without synthetic fillers, it retains the raw organic touch of ancient mineral crystals.",
    availability: "In Stock"
  }
];

export const ROOM_IDEAS: InspirationRoom[] = [
  {
    id: "idea-1",
    title: "The Warm Minimalist Haven",
    category: "Minimal Designs",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
    description: "A soothing arrangement emphasizing organic light, rich textures, and architectural furniture that leaves breathing room for your daily thoughts.",
    productsInRoom: ["sofa-1", "chair-1", "table-2"]
  },
  {
    id: "idea-2",
    title: "AR-Ready Modern Master Penthouse",
    category: "Luxury Homes",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
    description: "Deep charcoal wall backings frame a royal deep emerald tufted master bed with brass light fixtures to cultivate an intimate five-star boutique hotel feeling.",
    productsInRoom: ["bed-1", "lighting-1"]
  },
  {
    id: "idea-3",
    title: "Organic Dynamic Creative Corner",
    category: "Office Spaces",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
    description: "Combine massive dark walnut with dynamic asymmetrical floating shelves, providing visual freshness and maximizing analytical flow.",
    productsInRoom: ["workspace-1", "shelf-1"]
  },
  {
    id: "idea-4",
    title: "Warm Parisian Salon Lounge",
    category: "Modern Apartments",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
    description: "Classic high moldings and chevron floors paired with a vintage saddle brown chesterfield sofa and minimalist travertine arches.",
    productsInRoom: ["sofa-2", "table-2"]
  }
];

export const TRANSFORMATION_REVIEWS: Review[] = [
  {
    id: "rev-1",
    userName: "Meera Deshmukh",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    date: "2026-04-12",
    productName: "Aurelia Velvet Curve Sofa & Travertine Arch Coffee Table",
    comment: "The AI interior assistant suggested exchanging my generic L-shaped couch for the curved Aurelia sofa and travertine marble table, and it completely altered the room vibe! The room feels three times wider and looks incredibly luxury. The velvet feels soft yet sturdy against cats too.",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400", // A messy plain room
    afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400"  // Elegant living room
  },
  {
    id: "rev-2",
    userName: "Arjun Khanna",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    date: "2026-05-24",
    productName: "Sovereign Tufted Velvet Bed",
    comment: "Excellent service. The premium gold delivery service assembled the bed frame in under 15 minutes. It feels heavy, sturdy and dead-silent. It matching perfectly with our minimal bedroom. My wife can finally read comfortably sitting up with that plush tufted backrest.",
    beforeImage: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400",
    afterImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=400"
  }
];

export const COUPONS: Coupon[] = [
  {
    code: "WELCOME10",
    discountPercent: 10,
    description: "Get 10% off your entire first purchase as our design club member."
  },
  {
    code: "INTERIORAI",
    discountPercent: 15,
    minSpend: 50000,
    description: "15% off orders above ₹50,000 completed with advice from the AI Assistant."
  },
  {
    code: "HOMESTET",
    discountPercent: 20,
    minSpend: 100000,
    description: "Unlock premium 20% off for bundle orders above ₹1,00,000."
  }
];
