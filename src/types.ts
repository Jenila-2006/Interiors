export interface Dimensions {
  width: number;
  height: number;
  depth: number;
  unit: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  images: string[];
  category: string;
  style: "Modern" | "Classic" | "Luxury" | "Minimal";
  material: "Wood" | "Metal" | "Leather" | "Fabric";
  colors: { name: string; hex: string }[];
  rating: number;
  reviewsCount: number;
  dimensions: Dimensions;
  description: string;
  story?: string;
  availability: "In Stock" | "Low Stock" | "Out of Stock";
  isTrending?: boolean;
  isNew?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  suggestedProducts?: Product[];
}

export interface InspirationRoom {
  id: string;
  title: string;
  category: "Modern Apartments" | "Luxury Homes" | "Minimal Designs" | "Office Spaces";
  image: string;
  description: string;
  productsInRoom: string[]; // Product IDs
}

export interface CompareState {
  productIds: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: { name: string; hex: string };
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSpend?: number;
  description: string;
}
