import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// MOCK DATA & CONSTANTS
// ============================================================
const MOCK_USERS = [
  // Admin
  { id: 1, name: "Alex Rivera", email: "admin@market.com", password: "admin123", role: "admin", avatar: "AR" },
  // Vendors
  { id: 2, name: "Sophie Chen", email: "vendor@market.com", password: "vendor123", role: "vendor", avatar: "SC", approved: true, trustScore: 4.7, totalSales: 128450, rating: 4.8, joinDate: "2023-03-12", location: "San Francisco, CA" },
  { id: 3, name: "Marcus Webb", email: "vendor2@market.com", password: "vendor123", role: "vendor", avatar: "MW", approved: false, trustScore: 0, totalSales: 0, rating: 0, joinDate: "2024-01-19", location: "Austin, TX" },
  { id: 10, name: "Priya Sharma", email: "priya@market.com", password: "vendor123", role: "vendor", avatar: "PS", approved: true, trustScore: 4.5, totalSales: 94300, rating: 4.6, joinDate: "2023-06-08", location: "New York, NY" },
  { id: 11, name: "Luca Moretti", email: "luca@market.com", password: "vendor123", role: "vendor", avatar: "LM", approved: true, trustScore: 4.9, totalSales: 213700, rating: 4.9, joinDate: "2022-11-15", location: "Chicago, IL" },
  { id: 12, name: "Aisha Diallo", email: "aisha@market.com", password: "vendor123", role: "vendor", avatar: "AD", approved: true, trustScore: 4.2, totalSales: 47800, rating: 4.3, joinDate: "2023-09-01", location: "Miami, FL" },
  { id: 13, name: "James Okafor", email: "james@market.com", password: "vendor123", role: "vendor", avatar: "JO", approved: false, trustScore: 0, totalSales: 0, rating: 0, joinDate: "2024-01-25", location: "Seattle, WA" },
  { id: 14, name: "Arjun Mehta", email: "arjun@market.com", password: "vendor123", role: "vendor", avatar: "AM", approved: true, trustScore: 4.8, totalSales: 176200, rating: 4.8, joinDate: "2022-08-20", location: "Bengaluru, KA" },
  { id: 15, name: "Kavitha Nair", email: "kavitha@market.com", password: "vendor123", role: "vendor", avatar: "KN", approved: false, trustScore: 0, totalSales: 0, rating: 0, joinDate: "2024-01-28", location: "Kochi, KL" },
  // Customers
  { id: 4, name: "Emma Johnson", email: "customer@market.com", password: "cust123", role: "customer", avatar: "EJ", browsingHistory: [1,2,5], purchaseHistory: [3], joinDate: "2023-05-20", location: "Boston, MA", totalSpent: 289.97 },
  { id: 20, name: "Ryan Patel", email: "ryan@market.com", password: "cust123", role: "customer", avatar: "RP", browsingHistory: [7,8,12], purchaseHistory: [7,9], joinDate: "2023-07-14", location: "Denver, CO", totalSpent: 534.45 },
  { id: 21, name: "Olivia Kim", email: "olivia@market.com", password: "cust123", role: "customer", avatar: "OK", browsingHistory: [4,6,15], purchaseHistory: [4,15], joinDate: "2023-08-03", location: "Portland, OR", totalSpent: 178.90 },
  { id: 22, name: "David Nguyen", email: "david@market.com", password: "cust123", role: "customer", avatar: "DN", browsingHistory: [11,13,16], purchaseHistory: [11], joinDate: "2023-10-30", location: "Houston, TX", totalSpent: 412.00 },
  { id: 23, name: "Fatima Al-Hassan", email: "fatima@market.com", password: "cust123", role: "customer", avatar: "FA", browsingHistory: [2,3,20], purchaseHistory: [20,3], joinDate: "2023-12-05", location: "Phoenix, AZ", totalSpent: 319.85 },
  { id: 24, name: "Noah Williams", email: "noah@market.com", password: "cust123", role: "customer", avatar: "NW", browsingHistory: [5,14,18], purchaseHistory: [14], joinDate: "2024-01-02", location: "Atlanta, GA", totalSpent: 89.99 },
  { id: 25, name: "Zoe Martinez", email: "zoe@market.com", password: "cust123", role: "customer", avatar: "ZM", browsingHistory: [6,17,22], purchaseHistory: [6,22], joinDate: "2023-04-18", location: "Los Angeles, CA", totalSpent: 761.32 },
  { id: 26, name: "Rohan Iyer", email: "rohan@market.com", password: "cust123", role: "customer", avatar: "RI", browsingHistory: [26,27,28], purchaseHistory: [26], joinDate: "2023-06-11", location: "Mumbai, MH", totalSpent: 423.50 },
  { id: 27, name: "Ananya Krishnan", email: "ananya@market.com", password: "cust123", role: "customer", avatar: "AK", browsingHistory: [9,12,29], purchaseHistory: [9,12], joinDate: "2023-09-22", location: "Chennai, TN", totalSpent: 248.95 },
  { id: 28, name: "Vikram Desai", email: "vikram@market.com", password: "cust123", role: "customer", avatar: "VD", browsingHistory: [27,28,30], purchaseHistory: [28], joinDate: "2023-11-07", location: "Pune, MH", totalSpent: 189.99 },
  { id: 29, name: "Meera Pillai", email: "meera@market.com", password: "cust123", role: "customer", avatar: "MP", browsingHistory: [26,29,30], purchaseHistory: [29,30], joinDate: "2024-01-03", location: "Hyderabad, TS", totalSpent: 612.80 },
  // New Indian demo vendors
  { id: 30, name: "Varshitha Reddy", email: "varshitha@market.com", password: "vendor123", role: "vendor", avatar: "VR", approved: true, trustScore: 4.6, totalSales: 88700, rating: 4.7, joinDate: "2023-04-14", location: "Hyderabad, TS" },
  { id: 31, name: "Vennela Rao", email: "vennela@market.com", password: "vendor123", role: "vendor", avatar: "VN", approved: true, trustScore: 4.4, totalSales: 54200, rating: 4.5, joinDate: "2023-07-30", location: "Vijayawada, AP" },
  { id: 32, name: "Rahul Gupta", email: "rahul@market.com", password: "vendor123", role: "vendor", avatar: "RG", approved: false, trustScore: 0, totalSales: 0, rating: 0, joinDate: "2024-01-30", location: "Delhi, DL" },
  // New Indian demo customers
  { id: 33, name: "Keerthana Suresh", email: "keerthana@market.com", password: "cust123", role: "customer", avatar: "KS", browsingHistory: [9,11,24], purchaseHistory: [11], joinDate: "2023-08-17", location: "Bengaluru, KA", totalSpent: 156.45 },
  { id: 34, name: "Pravallika Chandra", email: "pravallika@market.com", password: "cust123", role: "customer", avatar: "PC", browsingHistory: [26,27,29], purchaseHistory: [27,29], joinDate: "2023-10-05", location: "Visakhapatnam, AP", totalSpent: 328.70 },
  { id: 35, name: "Anu Bhatia", email: "anu@market.com", password: "cust123", role: "customer", avatar: "AB", browsingHistory: [1,5,15], purchaseHistory: [5], joinDate: "2023-12-20", location: "Jaipur, RJ", totalSpent: 89.99 },
];

const MOCK_PRODUCTS = [
  // Sophie Chen (vendor 2) — Electronics & Lifestyle
  { id: 1, name: "AirFlow Pro Headphones", price: 149.99, originalPrice: 199.99, vendorId: 2, vendorName: "Sophie Chen", category: "Electronics", stock: 45, sold: 234, rating: 4.7, reviews: 89, image: "🎧", description: "Premium wireless headphones with 40hr battery life and active noise cancellation.", tags: ["wireless","audio","premium"] },
  { id: 2, name: "Minimal Desk Lamp", price: 79.99, originalPrice: 99.99, vendorId: 2, vendorName: "Sophie Chen", category: "Home", stock: 23, sold: 156, rating: 4.5, reviews: 62, image: "💡", description: "Sleek LED desk lamp with 3 color temperatures and USB-C charging port.", tags: ["lighting","minimalist","home"] },
  { id: 3, name: "UltraBook Stand", price: 49.99, originalPrice: 59.99, vendorId: 2, vendorName: "Sophie Chen", category: "Accessories", stock: 67, sold: 412, rating: 4.9, reviews: 143, image: "💻", description: "Ergonomic aluminum laptop stand, adjustable 6 angles.", tags: ["laptop","ergonomic","aluminum"] },
  { id: 4, name: "Ceramic Pour-Over Set", price: 34.99, originalPrice: 44.99, vendorId: 2, vendorName: "Sophie Chen", category: "Kitchen", stock: 12, sold: 98, rating: 4.6, reviews: 41, image: "☕", description: "Artisan ceramic pour-over coffee set. Includes dripper, server, and 2 cups.", tags: ["coffee","ceramic","artisan"] },
  { id: 5, name: "Smart Fitness Tracker", price: 89.99, originalPrice: 119.99, vendorId: 2, vendorName: "Sophie Chen", category: "Electronics", stock: 38, sold: 267, rating: 4.4, reviews: 115, image: "⌚", description: "Track heart rate, sleep, steps and workouts. 7-day battery.", tags: ["fitness","wearable","health"] },
  { id: 6, name: "Merino Wool Beanie", price: 28.99, originalPrice: 38.99, vendorId: 2, vendorName: "Sophie Chen", category: "Fashion", stock: 89, sold: 321, rating: 4.8, reviews: 78, image: "🧢", description: "100% pure merino wool beanie. Soft, warm, naturally moisture-wicking.", tags: ["wool","fashion","winter"] },
  { id: 7, name: "Mechanical Keyboard TKL", price: 129.99, originalPrice: 159.99, vendorId: 2, vendorName: "Sophie Chen", category: "Electronics", stock: 31, sold: 188, rating: 4.6, reviews: 74, image: "⌨️", description: "Tenkeyless mechanical keyboard with Cherry MX switches, RGB backlit.", tags: ["keyboard","mechanical","rgb"] },
  { id: 8, name: "Bamboo Cutting Board Set", price: 24.99, originalPrice: null, vendorId: 2, vendorName: "Sophie Chen", category: "Kitchen", stock: 54, sold: 203, rating: 4.3, reviews: 55, image: "🪵", description: "Set of 3 sustainable bamboo cutting boards in small, medium, large.", tags: ["bamboo","kitchen","sustainable"] },
  // Priya Sharma (vendor 10) — Beauty & Wellness
  { id: 9, name: "Rose Gold Skincare Kit", price: 64.99, originalPrice: 84.99, vendorId: 10, vendorName: "Priya Sharma", category: "Beauty", stock: 28, sold: 310, rating: 4.7, reviews: 122, image: "🌹", description: "Complete 5-step skincare routine. Cleanser, toner, serum, moisturizer & SPF.", tags: ["skincare","beauty","routine"] },
  { id: 10, name: "Aromatherapy Diffuser", price: 39.99, originalPrice: 54.99, vendorId: 10, vendorName: "Priya Sharma", category: "Home", stock: 44, sold: 176, rating: 4.5, reviews: 68, image: "🕯️", description: "Ultrasonic essential oil diffuser with 7-color LED. Covers 300sq ft.", tags: ["aromatherapy","wellness","home"] },
  { id: 11, name: "Jade Facial Roller", price: 19.99, originalPrice: 29.99, vendorId: 10, vendorName: "Priya Sharma", category: "Beauty", stock: 72, sold: 445, rating: 4.6, reviews: 198, image: "💎", description: "Authentic jade stone facial roller. Reduces puffiness and improves circulation.", tags: ["jade","facial","beauty"] },
  { id: 12, name: "Yoga Mat Pro", price: 54.99, originalPrice: 74.99, vendorId: 10, vendorName: "Priya Sharma", category: "Sports", stock: 35, sold: 142, rating: 4.8, reviews: 83, image: "🧘", description: "6mm thick non-slip TPE yoga mat. Alignment marks, carry strap included.", tags: ["yoga","fitness","mat"] },
  { id: 13, name: "Herbal Tea Collection", price: 22.99, originalPrice: null, vendorId: 10, vendorName: "Priya Sharma", category: "Kitchen", stock: 60, sold: 389, rating: 4.9, reviews: 231, image: "🍵", description: "Curated box of 12 premium loose-leaf herbal teas from around the world.", tags: ["tea","herbal","wellness"] },
  { id: 14, name: "Resistance Band Set", price: 18.99, originalPrice: 26.99, vendorId: 10, vendorName: "Priya Sharma", category: "Sports", stock: 95, sold: 512, rating: 4.5, reviews: 167, image: "💪", description: "5-piece fabric resistance band set. Light to X-Heavy. Includes carry bag.", tags: ["resistance","fitness","bands"] },
  // Luca Moretti (vendor 11) — Tech & Gaming
  { id: 15, name: "4K Webcam Ultra", price: 109.99, originalPrice: 139.99, vendorId: 11, vendorName: "Luca Moretti", category: "Electronics", stock: 22, sold: 198, rating: 4.7, reviews: 91, image: "📷", description: "4K 30fps webcam with built-in ring light and AI background removal.", tags: ["webcam","streaming","4k"] },
  { id: 16, name: "Gaming Chair Lumbar", price: 279.99, originalPrice: 349.99, vendorId: 11, vendorName: "Luca Moretti", category: "Furniture", stock: 14, sold: 87, rating: 4.6, reviews: 53, image: "🪑", description: "Ergonomic gaming chair with adjustable lumbar support, 4D armrests.", tags: ["gaming","chair","ergonomic"] },
  { id: 17, name: "USB-C Hub 12-in-1", price: 59.99, originalPrice: 79.99, vendorId: 11, vendorName: "Luca Moretti", category: "Accessories", stock: 48, sold: 334, rating: 4.8, reviews: 145, image: "🔌", description: "12-port USB-C hub: 4K HDMI, SD card, Ethernet, 3x USB-A, 3x USB-C PD.", tags: ["usb-c","hub","accessories"] },
  { id: 18, name: "Wireless Charging Pad", price: 29.99, originalPrice: 39.99, vendorId: 11, vendorName: "Luca Moretti", category: "Electronics", stock: 63, sold: 421, rating: 4.4, reviews: 176, image: "🔋", description: "15W fast wireless charging pad compatible with all Qi devices.", tags: ["wireless","charging","qi"] },
  { id: 19, name: "Noise Cancelling Earbuds", price: 119.99, originalPrice: 149.99, vendorId: 11, vendorName: "Luca Moretti", category: "Electronics", stock: 29, sold: 263, rating: 4.7, reviews: 112, image: "🎵", description: "True wireless earbuds with ANC, 30hr total battery, IPX5 waterproof.", tags: ["earbuds","anc","wireless"] },
  { id: 20, name: "Monitor Light Bar", price: 44.99, originalPrice: 59.99, vendorId: 11, vendorName: "Luca Moretti", category: "Home", stock: 37, sold: 189, rating: 4.9, reviews: 97, image: "🖥️", description: "USB-powered monitor light bar. Auto-dimming, no screen glare, touch control.", tags: ["monitor","lighting","desk"] },
  // Aisha Diallo (vendor 12) — Fashion & Art
  { id: 21, name: "Linen Tote Bag", price: 32.99, originalPrice: null, vendorId: 12, vendorName: "Aisha Diallo", category: "Fashion", stock: 78, sold: 254, rating: 4.5, reviews: 88, image: "👜", description: "Handmade natural linen tote, block-print design, reinforced handles.", tags: ["tote","linen","handmade"] },
  { id: 22, name: "Soy Wax Candle Set", price: 38.99, originalPrice: 48.99, vendorId: 12, vendorName: "Aisha Diallo", category: "Home", stock: 41, sold: 307, rating: 4.8, reviews: 134, image: "🕯️", description: "Set of 3 hand-poured soy wax candles. Scents: Vetiver, Neroli & Black Fig.", tags: ["candles","soy","handmade"] },
  { id: 23, name: "Macramé Wall Hanging", price: 55.99, originalPrice: 69.99, vendorId: 12, vendorName: "Aisha Diallo", category: "Home", stock: 18, sold: 112, rating: 4.7, reviews: 46, image: "🎨", description: "Boho-style hand-knotted macramé wall art. 60cm × 80cm. Natural cotton cord.", tags: ["macrame","boho","decor"] },
  { id: 24, name: "Silk Scrunchie Pack", price: 14.99, originalPrice: 19.99, vendorId: 12, vendorName: "Aisha Diallo", category: "Fashion", stock: 110, sold: 678, rating: 4.6, reviews: 243, image: "🎀", description: "Set of 6 pure mulberry silk scrunchies. Gentle on hair, no creasing.", tags: ["silk","scrunchie","haircare"] },
  { id: 25, name: "Pressed Flower Notebook", price: 17.99, originalPrice: null, vendorId: 12, vendorName: "Aisha Diallo", category: "Stationery", stock: 55, sold: 196, rating: 4.9, reviews: 79, image: "📓", description: "A5 hardcover journal with real pressed flower cover. 200 dotted pages.", tags: ["journal","stationery","flowers"] },
  // Arjun Mehta (vendor 14) — Indian Handicrafts & Spices
  { id: 26, name: "Handwoven Pashmina Shawl", price: 74.99, originalPrice: 99.99, vendorId: 14, vendorName: "Arjun Mehta", category: "Fashion", stock: 33, sold: 278, rating: 4.9, reviews: 134, image: "🧣", description: "Authentic Kashmir pashmina shawl, hand-woven with traditional motifs. Ultra-soft and warm.", tags: ["pashmina","kashmir","handwoven"] },
  { id: 27, name: "Spice Box Set (Masala Dabba)", price: 44.99, originalPrice: 59.99, vendorId: 14, vendorName: "Arjun Mehta", category: "Kitchen", stock: 51, sold: 362, rating: 4.8, reviews: 189, image: "🫙", description: "Stainless steel 7-compartment masala dabba with cumin, coriander, turmeric, garam masala & more.", tags: ["spices","masala","kitchen"] },
  { id: 28, name: "Brass Diya Oil Lamp Set", price: 28.99, originalPrice: 36.99, vendorId: 14, vendorName: "Arjun Mehta", category: "Home", stock: 67, sold: 445, rating: 4.7, reviews: 201, image: "🪔", description: "Set of 5 handcrafted brass diyas with intricate engravings. Perfect for Diwali and daily puja.", tags: ["diya","brass","diwali"] },
  { id: 29, name: "Sandalwood Incense Bundle", price: 16.99, originalPrice: null, vendorId: 14, vendorName: "Arjun Mehta", category: "Home", stock: 88, sold: 523, rating: 4.9, reviews: 267, image: "🪵", description: "100% natural Mysore sandalwood incense sticks. 3 packs of 20, long-lasting fragrance.", tags: ["incense","sandalwood","mysore"] },
  { id: 30, name: "Block Print Kurta Fabric", price: 19.99, originalPrice: 27.99, vendorId: 14, vendorName: "Arjun Mehta", category: "Fashion", stock: 42, sold: 198, rating: 4.6, reviews: 88, image: "👘", description: "2m hand block-printed cotton fabric from Jaipur. Geometric indigo pattern, 44in wide.", tags: ["blockprint","jaipur","fabric"] },
];

const MOCK_ORDERS = [
  { id: "ORD-001", customerId: 4, customerName: "Emma Johnson", vendorId: 2, products: [{productId: 3, name: "UltraBook Stand", qty: 1, price: 49.99}], total: 49.99, status: "Delivered", date: "2024-01-10", stage: 4 },
  { id: "ORD-002", customerId: 4, customerName: "Emma Johnson", vendorId: 2, products: [{productId: 1, name: "AirFlow Pro Headphones", qty: 1, price: 149.99}], total: 149.99, status: "Shipped", date: "2024-01-18", stage: 2 },
  { id: "ORD-003", customerId: 4, customerName: "Emma Johnson", vendorId: 2, products: [{productId: 5, name: "Smart Fitness Tracker", qty: 1, price: 89.99}], total: 89.99, status: "Out for Delivery", date: "2024-01-20", stage: 3 },
  { id: "ORD-004", customerId: 20, customerName: "Ryan Patel", vendorId: 11, products: [{productId: 7, name: "Mechanical Keyboard TKL", qty: 1, price: 129.99}], total: 129.99, status: "Delivered", date: "2024-01-08", stage: 4 },
  { id: "ORD-005", customerId: 20, customerName: "Ryan Patel", vendorId: 11, products: [{productId: 19, name: "Noise Cancelling Earbuds", qty: 1, price: 119.99}], total: 119.99, status: "Delivered", date: "2024-01-05", stage: 4 },
  { id: "ORD-006", customerId: 21, customerName: "Olivia Kim", vendorId: 10, products: [{productId: 13, name: "Herbal Tea Collection", qty: 2, price: 22.99}], total: 45.98, status: "Packed", date: "2024-01-21", stage: 1 },
  { id: "ORD-007", customerId: 22, customerName: "David Nguyen", vendorId: 11, products: [{productId: 17, name: "USB-C Hub 12-in-1", qty: 1, price: 59.99}], total: 59.99, status: "Shipped", date: "2024-01-17", stage: 2 },
  { id: "ORD-008", customerId: 23, customerName: "Fatima Al-Hassan", vendorId: 12, products: [{productId: 22, name: "Soy Wax Candle Set", qty: 1, price: 38.99}], total: 38.99, status: "Out for Delivery", date: "2024-01-19", stage: 3 },
  { id: "ORD-009", customerId: 24, customerName: "Noah Williams", vendorId: 10, products: [{productId: 14, name: "Resistance Band Set", qty: 1, price: 18.99}], total: 18.99, status: "Order Placed", date: "2024-01-22", stage: 0 },
  { id: "ORD-010", customerId: 25, customerName: "Zoe Martinez", vendorId: 12, products: [{productId: 24, name: "Silk Scrunchie Pack", qty: 3, price: 14.99}], total: 44.97, status: "Delivered", date: "2024-01-12", stage: 4 },
  { id: "ORD-011", customerId: 25, customerName: "Zoe Martinez", vendorId: 11, products: [{productId: 20, name: "Monitor Light Bar", qty: 1, price: 44.99}], total: 44.99, status: "Delivered", date: "2024-01-09", stage: 4 },
  { id: "ORD-012", customerId: 26, customerName: "Rohan Iyer", vendorId: 14, products: [{productId: 26, name: "Handwoven Pashmina Shawl", qty: 1, price: 74.99}], total: 74.99, status: "Delivered", date: "2024-01-11", stage: 4 },
  { id: "ORD-013", customerId: 26, customerName: "Rohan Iyer", vendorId: 14, products: [{productId: 28, name: "Brass Diya Oil Lamp Set", qty: 2, price: 28.99}], total: 57.98, status: "Shipped", date: "2024-01-19", stage: 2 },
  { id: "ORD-014", customerId: 27, customerName: "Ananya Krishnan", vendorId: 10, products: [{productId: 9, name: "Rose Gold Skincare Kit", qty: 1, price: 64.99}], total: 64.99, status: "Delivered", date: "2024-01-06", stage: 4 },
  { id: "ORD-015", customerId: 27, customerName: "Ananya Krishnan", vendorId: 10, products: [{productId: 12, name: "Yoga Mat Pro", qty: 1, price: 54.99}], total: 54.99, status: "Out for Delivery", date: "2024-01-20", stage: 3 },
  { id: "ORD-016", customerId: 28, customerName: "Vikram Desai", vendorId: 14, products: [{productId: 27, name: "Spice Box Set (Masala Dabba)", qty: 1, price: 44.99}], total: 44.99, status: "Packed", date: "2024-01-21", stage: 1 },
  { id: "ORD-017", customerId: 29, customerName: "Meera Pillai", vendorId: 14, products: [{productId: 29, name: "Sandalwood Incense Bundle", qty: 3, price: 16.99}], total: 50.97, status: "Delivered", date: "2024-01-08", stage: 4 },
  { id: "ORD-018", customerId: 29, customerName: "Meera Pillai", vendorId: 14, products: [{productId: 30, name: "Block Print Kurta Fabric", qty: 2, price: 19.99}], total: 39.98, status: "Order Placed", date: "2024-01-22", stage: 0 },
];

const MOCK_MESSAGES = [
  { id: 1, from: 4, to: 2, fromName: "Emma Johnson", text: "Hi! Is the headphone still available in black?", time: "10:22 AM" },
  { id: 2, from: 2, to: 4, fromName: "Sophie Chen", text: "Yes, we have it in black and silver! Want me to reserve one?", time: "10:25 AM" },
  { id: 3, from: 4, to: 2, fromName: "Emma Johnson", text: "That'd be great! Black please 😊", time: "10:26 AM" },
];

const ORDER_STAGES = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const MONTHLY_DATA = [
  { month: "Aug", revenue: 8200, orders: 54 },
  { month: "Sep", revenue: 11400, orders: 73 },
  { month: "Oct", revenue: 9800, orders: 62 },
  { month: "Nov", revenue: 15600, orders: 98 },
  { month: "Dec", revenue: 21300, orders: 134 },
  { month: "Jan", revenue: 18900, orders: 112 },
];

// ============================================================
// STYLES
// ============================================================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0a0f;
    --ink-soft: #1a1a2e;
    --surface: #f4f2ee;
    --surface-alt: #ece9e3;
    --card: #ffffff;
    --accent: #e8571e;
    --accent-2: #2d6a4f;
    --accent-3: #7b2d8b;
    --gold: #c9a84c;
    --text: #1a1a2e;
    --text-soft: #6b6b7b;
    --border: #e0ddd6;
    --shadow: 0 4px 24px rgba(0,0,0,0.08);
    --shadow-lg: 0 12px 48px rgba(0,0,0,0.12);
    --radius: 14px;
    --radius-sm: 8px;
    --transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
  }

  body { font-family: 'Cabinet Grotesk', system-ui, sans-serif; background: var(--surface); color: var(--text); min-height: 100vh; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--surface-alt); }
  ::-webkit-scrollbar-thumb { background: #c5c2bc; border-radius: 3px; }

  /* TYPOGRAPHY */
  .font-display { font-family: 'Clash Display', system-ui, sans-serif; }

  /* LAYOUT */
  .app-shell { display: flex; min-height: 100vh; }
  .sidebar { width: 260px; min-width: 260px; background: var(--ink); color: white; display: flex; flex-direction: column; padding: 0; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
  .main-content { flex: 1; overflow-y: auto; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar-brand { padding: 28px 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .sidebar-brand .logo { font-family: 'Clash Display', sans-serif; font-size: 20px; font-weight: 700; color: white; letter-spacing: -0.5px; }
  .sidebar-brand .logo span { color: var(--accent); }
  .sidebar-brand .role-badge { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; background: rgba(232,87,30,0.2); color: var(--accent); padding: 3px 8px; border-radius: 20px; margin-top: 6px; }
  .sidebar-user { padding: 16px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .avatar { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
  .sidebar-user .user-name { font-size: 14px; font-weight: 600; color: white; }
  .sidebar-user .user-email { font-size: 11px; color: rgba(255,255,255,0.4); }
  .sidebar-nav { flex: 1; padding: 16px 12px; }
  .nav-section-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.25); padding: 8px 12px 6px; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition); font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.6); margin-bottom: 2px; }
  .nav-item:hover { background: rgba(255,255,255,0.06); color: white; }
  .nav-item.active { background: var(--accent); color: white; }
  .nav-item .icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-item .badge { margin-left: auto; background: rgba(255,255,255,0.15); font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; }
  .nav-item.active .badge { background: rgba(255,255,255,0.25); }
  .sidebar-footer { padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.08); }

  /* PAGE HEADER */
  .page-header { padding: 32px 36px 0; }
  .page-title { font-family: 'Clash Display', sans-serif; font-size: 28px; font-weight: 700; color: var(--ink); letter-spacing: -0.5px; }
  .page-subtitle { font-size: 14px; color: var(--text-soft); margin-top: 4px; }

  /* CONTENT AREA */
  .content-area { padding: 24px 36px 40px; }

  /* CARDS */
  .card { background: var(--card); border-radius: var(--radius); border: 1px solid var(--border); padding: 24px; }
  .card-sm { padding: 16px 20px; }
  .card-hover { transition: var(--transition); cursor: pointer; }
  .card-hover:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }

  /* STAT CARDS */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
  .stat-label { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--text-soft); margin-bottom: 8px; }
  .stat-value { font-family: 'Clash Display', sans-serif; font-size: 30px; font-weight: 700; color: var(--ink); letter-spacing: -1px; line-height: 1; }
  .stat-change { font-size: 12px; margin-top: 6px; display: flex; align-items: center; gap: 4px; }
  .stat-change.up { color: var(--accent-2); }
  .stat-change.down { color: #e85555; }
  .stat-icon { font-size: 28px; margin-bottom: 10px; }

  /* BUTTONS */
  .btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: var(--transition); font-family: inherit; }
  .btn-primary { background: var(--accent); color: white; }
  .btn-primary:hover { background: #d44a12; transform: translateY(-1px); }
  .btn-secondary { background: var(--ink); color: white; }
  .btn-secondary:hover { background: #2a2a3e; }
  .btn-ghost { background: transparent; color: var(--text); border: 1.5px solid var(--border); }
  .btn-ghost:hover { background: var(--surface-alt); }
  .btn-success { background: var(--accent-2); color: white; }
  .btn-danger { background: #e85555; color: white; }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-lg { padding: 13px 28px; font-size: 15px; border-radius: var(--radius); }

  /* INPUTS */
  .input { width: 100%; padding: 10px 14px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 14px; font-family: inherit; background: white; color: var(--text); transition: var(--transition); }
  .input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(232,87,30,0.1); }
  .input-group { margin-bottom: 16px; }
  .input-label { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 6px; display: block; }
  .search-bar { position: relative; }
  .search-bar input { padding-left: 38px; }
  .search-bar .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-soft); font-size: 14px; }

  /* TABLES */
  .table-wrapper { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-soft); padding: 12px 16px; text-align: left; border-bottom: 2px solid var(--border); white-space: nowrap; }
  td { padding: 14px 16px; border-bottom: 1px solid var(--surface-alt); font-size: 14px; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--surface); }

  /* BADGES */
  .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.3px; }
  .badge-green { background: #e8f5e9; color: #2e7d32; }
  .badge-red { background: #ffebee; color: #c62828; }
  .badge-yellow { background: #fff8e1; color: #f57f17; }
  .badge-blue { background: #e3f2fd; color: #1565c0; }
  .badge-purple { background: #f3e5f5; color: #6a1b9a; }
  .badge-orange { background: #fff3e0; color: #e65100; }
  .badge-gray { background: var(--surface-alt); color: var(--text-soft); }

  /* PRODUCT GRID */
  .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
  .product-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: var(--transition); cursor: pointer; }
  .product-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
  .product-image { height: 160px; display: flex; align-items: center; justify-content: center; font-size: 64px; background: var(--surface-alt); position: relative; }
  .product-badge { position: absolute; top: 10px; left: 10px; }
  .product-body { padding: 16px; }
  .product-category { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--text-soft); margin-bottom: 5px; }
  .product-name { font-family: 'Clash Display', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 6px; line-height: 1.3; }
  .product-price { display: flex; align-items: baseline; gap: 7px; margin-bottom: 10px; }
  .product-price .current { font-size: 18px; font-weight: 700; color: var(--ink); }
  .product-price .original { font-size: 13px; color: var(--text-soft); text-decoration: line-through; }
  .product-footer { display: flex; align-items: center; justify-content: space-between; }
  .product-rating { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--text-soft); }
  .star { color: var(--gold); font-size: 12px; }

  /* VENDOR TRUST SCORE */
  .trust-score { display: flex; align-items: center; gap: 8px; }
  .trust-bar { height: 6px; flex: 1; background: var(--surface-alt); border-radius: 3px; overflow: hidden; }
  .trust-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--accent-2), #52b788); }

  /* ORDER TRACKING */
  .order-track { position: relative; padding: 20px 0; }
  .track-line { position: absolute; top: 30px; left: 24px; right: 24px; height: 3px; background: var(--border); z-index: 0; }
  .track-fill { position: absolute; top: 30px; left: 24px; height: 3px; background: var(--accent-2); z-index: 1; transition: width 1s ease; }
  .track-steps { display: flex; justify-content: space-between; position: relative; z-index: 2; }
  .track-step { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; }
  .track-dot { width: 20px; height: 20px; border-radius: 50%; border: 3px solid var(--border); background: white; transition: var(--transition); }
  .track-dot.done { background: var(--accent-2); border-color: var(--accent-2); }
  .track-dot.current { background: var(--accent); border-color: var(--accent); box-shadow: 0 0 0 4px rgba(232,87,30,0.2); animation: pulse 1.5s ease infinite; }
  .track-label { font-size: 11px; font-weight: 600; color: var(--text-soft); text-align: center; }
  .track-label.done { color: var(--accent-2); }
  .track-label.current { color: var(--accent); }
  @keyframes pulse { 0%,100%{ box-shadow: 0 0 0 4px rgba(232,87,30,0.2); } 50%{ box-shadow: 0 0 0 7px rgba(232,87,30,0.1); } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  /* CHAT */
  .chat-container { display: flex; gap: 0; height: 540px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  .chat-list { width: 280px; border-right: 1px solid var(--border); background: var(--card); overflow-y: auto; }
  .chat-list-item { padding: 14px 16px; cursor: pointer; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--surface-alt); transition: var(--transition); }
  .chat-list-item:hover, .chat-list-item.active { background: var(--surface); }
  .chat-window { flex: 1; display: flex; flex-direction: column; background: var(--surface); }
  .chat-header { padding: 14px 18px; background: var(--card); border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
  .chat-message { max-width: 68%; }
  .chat-message.own { align-self: flex-end; }
  .chat-message .bubble { padding: 10px 14px; border-radius: 16px; font-size: 14px; line-height: 1.5; }
  .chat-message .bubble.own { background: var(--accent); color: white; border-bottom-right-radius: 4px; }
  .chat-message .bubble.other { background: white; color: var(--text); border: 1px solid var(--border); border-bottom-left-radius: 4px; }
  .chat-message .time { font-size: 10px; color: var(--text-soft); margin-top: 3px; }
  .chat-message.own .time { text-align: right; }
  .chat-input-area { padding: 12px 16px; background: var(--card); border-top: 1px solid var(--border); display: flex; gap: 10px; }
  .chat-input-area input { flex: 1; }

  /* CHARTS */
  .chart-bar-container { display: flex; align-items: flex-end; gap: 10px; height: 160px; padding: 0 4px; }
  .chart-bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .chart-bar { width: 100%; border-radius: 4px 4px 0 0; transition: height 1s cubic-bezier(0.4,0,0.2,1); cursor: pointer; min-width: 24px; }
  .chart-bar:hover { filter: brightness(1.1); }
  .chart-label { font-size: 10px; color: var(--text-soft); font-weight: 600; }

  /* RECOMMENDATION SECTION */
  .rec-section { margin-bottom: 32px; }
  .rec-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .rec-title { font-family: 'Clash Display', sans-serif; font-size: 18px; font-weight: 700; color: var(--ink); display: flex; align-items: center; gap: 8px; }
  .rec-scroll { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; }
  .rec-scroll::-webkit-scrollbar { height: 4px; }

  /* CART */
  .cart-item { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--surface-alt); }
  .cart-emoji { font-size: 36px; width: 60px; height: 60px; background: var(--surface-alt); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; }
  .qty-control { display: flex; align-items: center; gap: 8px; }
  .qty-btn { width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid var(--border); background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; transition: var(--transition); }
  .qty-btn:hover { background: var(--ink); color: white; border-color: var(--ink); }

  /* MODALS */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px); }
  .modal { background: var(--card); border-radius: var(--radius); padding: 28px; max-width: 520px; width: 100%; max-height: 80vh; overflow-y: auto; box-shadow: var(--shadow-lg); }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .modal-title { font-family: 'Clash Display', sans-serif; font-size: 20px; font-weight: 700; }
  .modal-close { width: 32px; height: 32px; border-radius: 50%; border: none; background: var(--surface-alt); cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: var(--transition); }
  .modal-close:hover { background: var(--border); }

  /* LOGIN */
  .login-page { min-height: 100vh; display: flex; }
  .login-art { flex: 1; background: var(--ink); display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 60px; position: relative; overflow: hidden; }
  .login-art::before { content: ''; position: absolute; top: -100px; right: -100px; width: 400px; height: 400px; border-radius: 50%; background: rgba(232,87,30,0.08); }
  .login-art::after { content: ''; position: absolute; bottom: -50px; left: 50px; width: 300px; height: 300px; border-radius: 50%; background: rgba(45,106,79,0.1); }
  .login-art-title { font-family: 'Clash Display', sans-serif; font-size: 52px; font-weight: 700; color: white; line-height: 1.1; letter-spacing: -2px; position: relative; z-index: 1; }
  .login-art-title span { color: var(--accent); }
  .login-art-subtitle { font-size: 18px; color: rgba(255,255,255,0.5); margin-top: 16px; line-height: 1.6; position: relative; z-index: 1; max-width: 380px; }
  .login-art-tags { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 32px; position: relative; z-index: 1; }
  .login-tag { padding: 6px 14px; border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; font-size: 12px; color: rgba(255,255,255,0.5); }
  .login-form-side { width: 480px; min-width: 360px; background: var(--surface); display: flex; flex-direction: column; justify-content: center; padding: 60px 48px; }
  .login-form-title { font-family: 'Clash Display', sans-serif; font-size: 28px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
  .login-form-subtitle { font-size: 14px; color: var(--text-soft); margin-bottom: 32px; }
  .role-selector { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }
  .role-btn { padding: 12px 8px; border: 2px solid var(--border); border-radius: var(--radius-sm); background: white; cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit; text-align: center; transition: var(--transition); }
  .role-btn:hover { border-color: var(--accent); }
  .role-btn.selected { border-color: var(--accent); background: rgba(232,87,30,0.05); color: var(--accent); }
  .role-btn .role-icon { font-size: 20px; display: block; margin-bottom: 4px; }
  .demo-hints { background: var(--surface-alt); border-radius: var(--radius-sm); padding: 12px 14px; margin-bottom: 20px; font-size: 12px; color: var(--text-soft); }
  .demo-hints strong { color: var(--text); }

  /* ANALYTICS */
  .analytics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .top-products { }
  .top-product-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--surface-alt); }
  .top-product-item:last-child { border-bottom: none; }
  .top-product-rank { width: 24px; height: 24px; border-radius: 50%; background: var(--surface-alt); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }

  /* COMPARISON */
  .compare-table th, .compare-table td { text-align: center; }
  .compare-table td:first-child, .compare-table th:first-child { text-align: left; }
  .compare-table .win { color: var(--accent-2); font-weight: 700; }

  /* TOAST */
  .toast { position: fixed; bottom: 24px; right: 24px; background: var(--ink); color: white; padding: 12px 20px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 500; z-index: 9999; animation: slideIn 0.3s ease; box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 8px; }
  @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  /* SECTION DIVIDER */
  .section-gap { margin-bottom: 28px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .flex-center { display: flex; align-items: center; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-3 { margin-bottom: 16px; }
  .mb-4 { margin-bottom: 24px; }
  .mt-3 { margin-top: 16px; }
  .text-soft { color: var(--text-soft); }
  .text-sm { font-size: 13px; }
  .font-bold { font-weight: 700; }
  .online-dot { width: 8px; height: 8px; border-radius: 50%; background: #4caf50; display: inline-block; }

  @media (max-width: 900px) {
    .login-art { display: none; }
    .login-form-side { width: 100%; padding: 40px 24px; }
    .sidebar { width: 220px; min-width: 220px; }
    .content-area { padding: 16px 18px 40px; }
    .analytics-grid { grid-template-columns: 1fr; }
    .grid-2 { grid-template-columns: 1fr; }
  }
`;

// ============================================================
// UTILITIES
// ============================================================
const formatCurrency = (v) => `$${Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const getStatusBadge = (s) => {
  const map = { "Delivered": "badge-green", "Shipped": "badge-blue", "Packed": "badge-yellow", "Order Placed": "badge-gray", "Out for Delivery": "badge-orange", "Approved": "badge-green", "Pending": "badge-yellow", "Rejected": "badge-red" };
  return map[s] || "badge-gray";
};

// ============================================================
// COMPONENTS
// ============================================================

function Toast({ msg, onHide }) {
  useEffect(() => { const t = setTimeout(onHide, 3000); return () => clearTimeout(t); }, []);
  return <div className="toast">✓ {msg}</div>;
}

function Avatar({ name, size = 38, bg = "#e8571e" }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  return <div className="avatar" style={{ width: size, height: size, background: bg, color: 'white', fontSize: size * 0.34 }}>{initials}</div>;
}

function Stars({ rating }) {
  return <span>{[1,2,3,4,5].map(i => <span key={i} className="star">{i <= Math.round(rating) ? '★' : '☆'}</span>)}</span>;
}

function MiniChart({ data, color = "#e8571e" }) {
  const max = Math.max(...data.map(d => d.revenue));
  return (
    <div className="chart-bar-container">
      {data.map((d, i) => (
        <div className="chart-bar-group" key={i}>
          <div className="chart-bar" style={{ height: `${(d.revenue / max) * 130}px`, background: `linear-gradient(180deg, ${color}, ${color}88)` }} title={`${d.month}: ${formatCurrency(d.revenue)}`} />
          <div className="chart-label">{d.month}</div>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ user, activePage, onNavigate, onLogout }) {
  const navItems = {
    admin: [
      { key: "overview", icon: "◈", label: "Overview" },
      { key: "vendors", icon: "⊙", label: "Vendors", badge: "1" },
      { key: "products", icon: "◻", label: "All Products" },
      { key: "orders", icon: "◑", label: "Orders" },
      { key: "customers", icon: "◉", label: "Customers" },
      { key: "analytics", icon: "◈", label: "Analytics" },
    ],
    vendor: [
      { key: "dashboard", icon: "◈", label: "Dashboard" },
      { key: "products", icon: "◻", label: "My Products" },
      { key: "orders", icon: "◑", label: "Orders" },
      { key: "analytics", icon: "▦", label: "Analytics" },
      { key: "chat", icon: "◯", label: "Messages", badge: "2" },
    ],
    customer: [
      { key: "shop", icon: "◈", label: "Browse" },
      { key: "cart", icon: "◻", label: "Cart" },
      { key: "orders", icon: "◑", label: "My Orders" },
      { key: "tracking", icon: "⊙", label: "Track Order" },
      { key: "chat", icon: "◯", label: "Chat Vendors" },
      { key: "compare", icon: "◉", label: "Compare" },
    ],
  };

  const avatarColors = { admin: "#7b2d8b", vendor: "#e8571e", customer: "#2d6a4f" };

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="logo">MARKET<span>X</span></div>
        <div className="role-badge">{user.role}</div>
      </div>
      <div className="sidebar-user">
        <Avatar name={user.name} size={38} bg={avatarColors[user.role]} />
        <div>
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {(navItems[user.role] || []).map(item => (
          <div key={item.key} className={`nav-item ${activePage === item.key ? 'active' : ''}`} onClick={() => onNavigate(item.key)}>
            <span className="icon">{item.icon}</span>
            {item.label}
            {item.badge && <span className="badge">{item.badge}</span>}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="nav-item" onClick={onLogout} style={{ color: '#ff6b6b' }}>
          <span className="icon">⊗</span> Sign Out
        </div>
      </div>
    </div>
  );
}

// ============================================================
// AUTH SERVICE  (mirrors POST /api/login)
// Production version:
//   const res = await fetch('/api/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password })
//   });
//   const { token, user } = await res.json();
//   localStorage.setItem('jwt_token', token);
// ============================================================
function authService(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(
        u => u.email === email.toLowerCase().trim() && u.password === password
      );
      if (!user) { reject(new Error("Invalid email or password.")); return; }
      // Generate mock JWT
      const token = btoa(JSON.stringify({ sub: user.id, role: user.role, email: user.email, iat: Date.now() }));
      // localStorage.setItem('jwt_token', token);
      resolve({ token, role: user.role, user });
    }, 600);
  });
}

// ============================================================
// LOGIN PAGE
// ============================================================
function LoginPage({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [touched, setTouched]   = useState({ email: false, password: false });

  const handleSubmit = async () => {
    setTouched({ email: true, password: true });
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { user } = await authService(email, password);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  // Hint: show role hint if email is recognised but wrong password not yet typed
  const matchedUser = MOCK_USERS.find(u => u.email === email.toLowerCase().trim());

  return (
    <div className="login-page">

      {/* ── Left panel ── */}
      <div className="login-art">
        <div className="login-art-title">
          Welcome to<br /><span>MarketX</span>
        </div>
        <div className="login-art-subtitle">
          A multi-vendor marketplace with AI recommendations, real-time order tracking, vendor analytics, and live chat.
        </div>
        <div className="login-art-tags">
          {["AI Powered", "Real-time Chat", "Live Tracking", "Analytics", "Multi-vendor"].map(t => (
            <span key={t} className="login-tag">{t}</span>
          ))}
        </div>

        {/* Credential reference card */}
        <div style={{ marginTop: 44, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 12 }}>
            Sample Credentials
          </div>
          {[
            { role: "Admin",    email: "admin@market.com",    pass: "admin123",  color: "#c084fc" },
            { role: "Vendor",   email: "arjun@market.com",    pass: "vendor123", color: "#f5905e" },
            { role: "Vendor",   email: "varshitha@market.com",pass: "vendor123", color: "#f5905e" },
            { role: "Customer", email: "meera@market.com",    pass: "cust123",   color: "#52b788" },
            { role: "Customer", email: "pravallika@market.com",pass: "cust123",  color: "#52b788" },
          ].map(c => (
            <div key={c.email}
              onClick={() => { setEmail(c.email); setPassword(c.pass); setError(""); setTouched({ email: false, password: false }); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", borderRadius: 8, marginBottom: 5, cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontSize: 10, fontWeight: 700, background: c.color + "22", color: c.color, padding: "2px 7px", borderRadius: 20, minWidth: 56, textAlign: "center" }}>{c.role}</span>
              <span style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.55)", flex: 1 }}>{c.email}</span>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{c.pass}</span>
            </div>
          ))}
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 8, paddingLeft: 12 }}>
            Click a row to auto-fill credentials
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="login-form-side">
        <div style={{ maxWidth: 380, width: "100%", margin: "0 auto" }}>

          {/* Logo mark */}
          <div style={{ fontFamily: "Clash Display, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 32, letterSpacing: -0.5 }}>
            MARKET<span style={{ color: "var(--accent)" }}>X</span>
          </div>

          <div className="login-form-title">Sign in</div>
          <div className="login-form-subtitle">Enter your credentials to access your dashboard</div>

          {/* Error banner */}
          {error && (
            <div style={{ background: "#fff0f0", border: "1.5px solid #ffc9c9", borderRadius: 8, padding: "11px 14px", color: "#c0392b", fontSize: 13, fontWeight: 500, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>⚠</span> {error}
            </div>
          )}

          {/* Role hint */}
          {matchedUser && !error && (
            <div style={{ background: "rgba(45,106,79,0.07)", border: "1.5px solid rgba(45,106,79,0.2)", borderRadius: 8, padding: "9px 14px", fontSize: 12, color: "var(--accent-2)", fontWeight: 600, marginBottom: 18, display: "flex", alignItems: "center", gap: 7 }}>
              <span>✓</span> Account found — signing in as <strong>{matchedUser.name}</strong> ({matchedUser.role})
            </div>
          )}

          {/* Email field */}
          <div className="input-group">
            <label className="input-label">Email address</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15, pointerEvents: "none" }}>✉</span>
              <input
                className="input"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                onKeyDown={handleKey}
                placeholder="you@example.com"
                style={{ paddingLeft: 36 }}
                autoComplete="email"
              />
            </div>
            {touched.email && !email.trim() && (
              <div style={{ fontSize: 11, color: "#e85555", marginTop: 4 }}>Email is required</div>
            )}
          </div>

          {/* Password field */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15, pointerEvents: "none" }}>🔒</span>
              <input
                className="input"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                onKeyDown={handleKey}
                placeholder="Enter your password"
                style={{ paddingLeft: 36, paddingRight: 40 }}
                autoComplete="current-password"
              />
              <button
                onClick={() => setShowPass(s => !s)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--text-soft)", padding: 2 }}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
            {touched.password && !password.trim() && (
              <div style={{ fontSize: 11, color: "#e85555", marginTop: 4 }}>Password is required</div>
            )}
          </div>

          {/* Submit */}
          <button
            className="btn btn-primary btn-lg"
            style={{ width: "100%", justifyContent: "center", marginTop: 8, position: "relative", overflow: "hidden" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ animation: "spin 0.8s linear infinite", display: "inline-block", fontSize: 16 }}>◌</span>
                Signing in…
              </span>
            ) : "Sign In →"}
          </button>

          {/* Role redirect info */}
          <div style={{ marginTop: 24, padding: "14px 16px", background: "var(--surface-alt)", borderRadius: 10, fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: 8, fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase" }}>Role-based Redirect</div>
            {[
              { icon: "🛡️", role: "Admin",    dest: "Admin Dashboard",   color: "#7b2d8b" },
              { icon: "🏪", role: "Vendor",   dest: "Vendor Dashboard",  color: "#e8571e" },
              { icon: "🛒", role: "Customer", dest: "Shopping Page",     color: "#2d6a4f" },
            ].map(r => (
              <div key={r.role} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span>{r.icon}</span>
                <span style={{ color: r.color, fontWeight: 700, minWidth: 60 }}>{r.role}</span>
                <span style={{ color: "var(--text-soft)" }}>→ {r.dest}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// ============================================================
// ADMIN PAGES
// ============================================================
function AdminOverview() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title font-display">Platform Overview</div>
        <div className="page-subtitle">Monitor your marketplace at a glance</div>
      </div>
      <div className="content-area">
        <div className="stats-grid">
          {[
            { label: "Total Revenue", value: "$861,250", change: "+18.3% this month", dir: "up", icon: "💰" },
            { label: "Active Vendors", value: "5", change: "+3 pending approval", dir: "up", icon: "🏪" },
            { label: "Total Products", value: "30", change: "+5 this month", dir: "up", icon: "📦" },
            { label: "Total Orders", value: "18", change: "+7 today", dir: "up", icon: "🛒" },
            { label: "Total Customers", value: "11", change: "+4 this week", dir: "up", icon: "👥" },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-change ${s.dir}`}>▲ {s.change}</div>
            </div>
          ))}
        </div>

        <div className="grid-2 section-gap">
          <div className="card">
            <div className="flex-between mb-3">
              <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 16 }}>Revenue Trend</div>
            </div>
            <MiniChart data={MONTHLY_DATA} color="#e8571e" />
          </div>
          <div className="card">
            <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Vendor Status</div>
            {MOCK_USERS.filter(u => u.role === 'vendor').map(v => (
              <div key={v.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--surface-alt)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={v.name} size={34} bg={v.approved ? '#2d6a4f' : '#aaa'} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{v.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>{v.email}</div>
                  </div>
                </div>
                <span className={`badge ${v.approved ? 'badge-green' : 'badge-yellow'}`}>{v.approved ? 'Approved' : 'Pending'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Recent Orders</div>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {MOCK_ORDERS.map(o => (
                  <tr key={o.id}>
                    <td><strong>{o.id}</strong></td>
                    <td>{o.customerName}</td>
                    <td>{o.products[0].name}</td>
                    <td><strong>{formatCurrency(o.total)}</strong></td>
                    <td><span className={`badge ${getStatusBadge(o.status)}`}>{o.status}</span></td>
                    <td className="text-soft">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminVendors({ onToast }) {
  const [vendors, setVendors] = useState(MOCK_USERS.filter(u => u.role === 'vendor'));

  const approve = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, approved: true } : v));
    onToast("Vendor approved successfully!");
  };
  const reject = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, approved: false, rejected: true } : v));
    onToast("Vendor registration rejected.");
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title font-display">Vendor Management</div>
        <div className="page-subtitle">Approve, reject and monitor vendor accounts</div>
      </div>
      <div className="content-area">
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Vendor</th><th>Email</th><th>Products</th><th>Total Sales</th><th>Trust Score</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {vendors.map(v => (
                  <tr key={v.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar name={v.name} size={32} bg={v.approved ? '#2d6a4f' : '#999'} />
                        <strong>{v.name}</strong>
                      </div>
                    </td>
                    <td className="text-soft">{v.email}</td>
                    <td>{MOCK_PRODUCTS.filter(p => p.vendorId === v.id).length}</td>
                    <td><strong>{formatCurrency(v.totalSales || 0)}</strong></td>
                    <td>
                      <div className="trust-score">
                        <span style={{ fontSize: 13, fontWeight: 700, minWidth: 28 }}>{v.trustScore || 0}</span>
                        <div className="trust-bar"><div className="trust-fill" style={{ width: `${((v.trustScore || 0) / 5) * 100}%` }} /></div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${v.approved ? 'badge-green' : v.rejected ? 'badge-red' : 'badge-yellow'}`}>
                        {v.approved ? 'Approved' : v.rejected ? 'Rejected' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      {!v.approved && !v.rejected && (
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-success btn-sm" onClick={() => approve(v.id)}>Approve</button>
                          <button className="btn btn-danger btn-sm" onClick={() => reject(v.id)}>Reject</button>
                        </div>
                      )}
                      {v.approved && <span style={{ fontSize: 12, color: 'var(--accent-2)' }}>✓ Active</span>}
                      {v.rejected && <span style={{ fontSize: 12, color: '#e85555' }}>✗ Rejected</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminProducts() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title font-display">All Products</div>
        <div className="page-subtitle">View and manage platform-wide product catalog</div>
      </div>
      <div className="content-area">
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Product</th><th>Vendor</th><th>Category</th><th>Price</th><th>Stock</th><th>Sold</th><th>Rating</th></tr></thead>
              <tbody>
                {MOCK_PRODUCTS.map(p => (
                  <tr key={p.id}>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontSize: 22 }}>{p.image}</span><strong>{p.name}</strong></div></td>
                    <td className="text-soft">{p.vendorName}</td>
                    <td><span className="badge badge-blue">{p.category}</span></td>
                    <td><strong>{formatCurrency(p.price)}</strong></td>
                    <td><span className={`badge ${p.stock < 20 ? 'badge-yellow' : 'badge-green'}`}>{p.stock} units</span></td>
                    <td>{p.sold}</td>
                    <td><Stars rating={p.rating} /> <span className="text-soft text-sm">{p.rating}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VENDOR PAGES
// ============================================================
function VendorDashboard({ user }) {
  const myProducts = MOCK_PRODUCTS.filter(p => p.vendorId === user.id);
  const myOrders = MOCK_ORDERS.filter(o => o.vendorId === user.id);
  const revenue = myOrders.filter(o => o.status === 'Delivered').reduce((s,o) => s + o.total, 0);
  const pending = myOrders.filter(o => !['Delivered','Cancelled'].includes(o.status)).length;
  return (
    <div>
      <div className="page-header">
        <div className="page-title font-display">Vendor Dashboard</div>
        <div className="page-subtitle">Welcome back, {user.name}!</div>
      </div>
      <div className="content-area">
        <div className="stats-grid">
          {[
            { label: "Total Revenue", value: formatCurrency(user.totalSales || revenue), change: "+8.2% this month", dir: "up", icon: "💵" },
            { label: "Products Listed", value: String(myProducts.length), change: `${myProducts.filter(p=>p.stock<20).length} low stock`, dir: "up", icon: "📦" },
            { label: "Pending Orders", value: String(pending), change: "Needs attention", dir: "up", icon: "⏳" },
            { label: "Trust Score", value: String(user.trustScore || "N/A"), change: user.trustScore >= 4.5 ? "Top 10%" : "Building up", dir: "up", icon: "⭐" },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-change ${s.dir}`}>▲ {s.change}</div>
            </div>
          ))}
        </div>
        <div className="grid-2">
          <div className="card">
            <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Monthly Revenue</div>
            <MiniChart data={MONTHLY_DATA} color="#2d6a4f" />
          </div>
          <div className="card">
            <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Top Products</div>
            {myProducts.sort((a,b)=>b.sold-a.sold).slice(0,4).map((p, i) => (
              <div key={p.id} className="top-product-item">
                <div className="top-product-rank" style={{ background: i === 0 ? 'var(--gold)' : 'var(--surface-alt)', color: i === 0 ? 'white' : 'var(--text)' }}>{i + 1}</div>
                <span style={{ fontSize: 20 }}>{p.image}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-soft)' }}>{p.sold} sold</div>
                </div>
                <strong style={{ fontSize: 13 }}>{formatCurrency(p.price * p.sold)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VendorProducts({ onToast, user }) {
  const [products, setProducts] = useState(MOCK_PRODUCTS.filter(p => p.vendorId === user.id));
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '', category: '', description: '', image: '📦' });

  const emojis = ['📦','🎧','💡','💻','☕','⌚','🧢','👟','📱','🎮','🖥️','⌨️'];

  const openNew = () => { setEditing(null); setForm({ name: '', price: '', stock: '', category: '', description: '', image: '📦' }); setShowModal(true); };
  const openEdit = (p) => { setEditing(p.id); setForm({ name: p.name, price: p.price, stock: p.stock, category: p.category, description: p.description, image: p.image }); setShowModal(true); };
  const save = () => {
    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p));
      onToast("Product updated!");
    } else {
      setProducts(prev => [...prev, { ...form, id: Date.now(), vendorId: 2, vendorName: 'Sophie Chen', price: Number(form.price), stock: Number(form.stock), sold: 0, rating: 0, reviews: 0, tags: [] }]);
      onToast("Product added!");
    }
    setShowModal(false);
  };
  const del = (id) => { setProducts(prev => prev.filter(p => p.id !== id)); onToast("Product deleted."); };

  return (
    <div>
      <div className="page-header">
        <div className="flex-between">
          <div>
            <div className="page-title font-display">My Products</div>
            <div className="page-subtitle">Manage your product listings</div>
          </div>
          <button className="btn btn-primary" onClick={openNew}>+ Add Product</button>
        </div>
      </div>
      <div className="content-area">
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Sold</th><th>Rating</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontSize: 22 }}>{p.image}</span><strong>{p.name}</strong></div></td>
                    <td><span className="badge badge-blue">{p.category}</span></td>
                    <td><strong>{formatCurrency(p.price)}</strong></td>
                    <td><span className={`badge ${p.stock < 20 ? 'badge-yellow' : 'badge-green'}`}>{p.stock}</span></td>
                    <td>{p.sold}</td>
                    <td><Stars rating={p.rating} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => del(p.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editing ? 'Edit Product' : 'Add New Product'}</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="input-label">Emoji Icon</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {emojis.map(e => <button key={e} onClick={() => setForm(f => ({...f, image: e}))} style={{ fontSize: 24, background: form.image === e ? 'var(--accent)' : 'var(--surface-alt)', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>{e}</button>)}
              </div>
            </div>
            {[['name','Product Name','text'],['price','Price','number'],['stock','Stock Quantity','number'],['category','Category','text']].map(([k,lbl,type]) => (
              <div key={k} className="input-group">
                <label className="input-label">{lbl}</label>
                <input className="input" type={type} value={form[k]} onChange={e => setForm(f => ({...f, [k]: e.target.value}))} />
              </div>
            ))}
            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea className="input" rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} style={{ resize: 'vertical' }} />
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={save}>
              {editing ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function VendorAnalytics({ user }) {
  const vendorId = user?.id || 2;
  const myProducts = MOCK_PRODUCTS.filter(p => p.vendorId === vendorId);
  const myOrders = MOCK_ORDERS.filter(o => o.vendorId === vendorId);
  const delivered = myOrders.filter(o => o.status === 'Delivered');
  const revenue = delivered.reduce((s,o) => s + o.total, 0);
  const avgOrder = myOrders.length ? (myOrders.reduce((s,o) => s+o.total,0) / myOrders.length) : 0;
  const maxRev = Math.max(...MONTHLY_DATA.map(d => d.revenue));
  return (
    <div>
      <div className="page-header">
        <div className="page-title font-display">Sales Analytics</div>
        <div className="page-subtitle">Deep insights into your store performance</div>
      </div>
      <div className="content-area">
        <div className="stats-grid">
          {[
            { label: "Revenue (Delivered)", value: formatCurrency(revenue || 18900), icon: "💵" },
            { label: "Total Orders", value: String(myOrders.length || 112), icon: "📦" },
            { label: "Avg Order Value", value: formatCurrency(avgOrder || 168.75), icon: "📊" },
            { label: "Customer Rating", value: `${user?.rating || 4.8} ★`, icon: "⭐" },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ fontSize: 24 }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div className="card section-gap">
          <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Monthly Revenue Chart</div>
          <div className="text-soft text-sm mb-3">August 2023 – January 2024</div>
          <div className="chart-bar-container" style={{ height: 200 }}>
            {MONTHLY_DATA.map((d, i) => (
              <div className="chart-bar-group" key={i}>
                <div style={{ fontSize: 11, color: 'var(--text-soft)', marginBottom: 4, fontWeight: 600 }}>${(d.revenue/1000).toFixed(1)}k</div>
                <div className="chart-bar" style={{ height: `${(d.revenue / maxRev) * 160}px`, background: 'linear-gradient(180deg, #e8571e, #f5905e)' }} />
                <div className="chart-label">{d.month}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid-2">
          <div className="card">
            <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Best Selling Products</div>
            {myProducts.sort((a,b) => b.sold - a.sold).slice(0,5).map((p, i) => (
              <div key={p.id} className="top-product-item">
                <div className="top-product-rank" style={{ background: ['#c9a84c','#9e9e9e','#cd7f32','var(--surface-alt)','var(--surface-alt)'][i] || 'var(--surface-alt)', color: i < 3 ? 'white' : 'var(--text)' }}>{i+1}</div>
                <span style={{ fontSize: 20 }}>{p.image}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div className="trust-bar" style={{ marginTop: 4 }}><div className="trust-fill" style={{ width: `${(p.sold / 420) * 100}%`, background: 'linear-gradient(90deg, #e8571e, #f5905e)' }} /></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{p.sold}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-soft)' }}>sold</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Order Statistics</div>
            {[
              { label: "Total Orders (All time)", value: String(myOrders.length || 580) },
              { label: "Delivered", value: String(delivered.length || 541), badge: "badge-green" },
              { label: "In Transit", value: String(myOrders.filter(o=>['Shipped','Out for Delivery','Packed'].includes(o.status)).length || 28), badge: "badge-blue" },
              { label: "Cancelled", value: "0", badge: "badge-red" },
              { label: "Return Requests", value: "0", badge: "badge-yellow" },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--surface-alt)' }}>
                <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>{r.label}</span>
                {r.badge ? <span className={`badge ${r.badge}`}>{r.value}</span> : <strong>{r.value}</strong>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CUSTOMER PAGES
// ============================================================
function CustomerShop({ onAddToCart, cart, onToast }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))];
  const filtered = MOCK_PRODUCTS.filter(p =>
    (category === 'All' || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const recommended = MOCK_PRODUCTS.filter(p => [1,2,5].includes(p.id));
  const alsoBought = MOCK_PRODUCTS.filter(p => [3,4,6].includes(p.id));

  return (
    <div>
      <div className="page-header">
        <div className="page-title font-display">Browse Products</div>
        <div className="page-subtitle">Discover top products from verified vendors</div>
      </div>
      <div className="content-area">
        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
            <span className="search-icon">🔍</span>
            <input className="input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c} className={`btn ${category === c ? 'btn-secondary' : 'btn-ghost'} btn-sm`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        {!search && category === 'All' && (
          <>
            <div className="rec-section">
              <div className="rec-header">
                <div className="rec-title">✨ Recommended for You</div>
                <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>AI Powered</span>
              </div>
              <div className="rec-scroll">
                {recommended.map(p => <MiniProductCard key={p.id} product={p} onAdd={() => { onAddToCart(p); onToast(`Added ${p.name} to cart!`); }} onClick={() => setSelectedProduct(p)} />)}
              </div>
            </div>
            <div className="rec-section">
              <div className="rec-header">
                <div className="rec-title">👥 Customers Also Bought</div>
              </div>
              <div className="rec-scroll">
                {alsoBought.map(p => <MiniProductCard key={p.id} product={p} onAdd={() => { onAddToCart(p); onToast(`Added ${p.name} to cart!`); }} onClick={() => setSelectedProduct(p)} />)}
              </div>
            </div>
          </>
        )}

        {/* All products */}
        <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
          {search ? `Results for "${search}"` : category === 'All' ? 'All Products' : category}
          <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-soft)', marginLeft: 8 }}>({filtered.length})</span>
        </div>
        <div className="product-grid">
          {filtered.map(p => (
            <div key={p.id} className="product-card" onClick={() => setSelectedProduct(p)}>
              <div className="product-image">
                <span style={{ fontSize: 64 }}>{p.image}</span>
                {p.originalPrice && (
                  <span className="product-badge badge badge-red">-{Math.round((1 - p.price/p.originalPrice)*100)}%</span>
                )}
              </div>
              <div className="product-body">
                <div className="product-category">{p.category}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-price">
                  <span className="current">{formatCurrency(p.price)}</span>
                  {p.originalPrice && <span className="original">{formatCurrency(p.originalPrice)}</span>}
                </div>
                <div className="product-footer">
                  <div className="product-rating"><Stars rating={p.rating} /> <span>{p.rating} ({p.reviews})</span></div>
                  <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); onAddToCart(p); onToast(`Added ${p.name} to cart!`); }}>+ Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={() => { onAddToCart(selectedProduct); onToast(`Added ${selectedProduct.name} to cart!`); setSelectedProduct(null); }} />}
    </div>
  );
}

function MiniProductCard({ product: p, onAdd, onClick }) {
  return (
    <div style={{ minWidth: 200, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', cursor: 'pointer', transition: 'var(--transition)' }} onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>
      <div style={{ height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, background: 'var(--surface-alt)' }}>{p.image}</div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ color: 'var(--accent)' }}>{formatCurrency(p.price)}</strong>
          <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); onAdd(); }}>+ Add</button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product: p, onClose, onAdd }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{p.name}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 80, background: 'var(--surface-alt)', borderRadius: 'var(--radius-sm)', padding: '20px 0', marginBottom: 20 }}>{p.image}</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          <span className="badge badge-blue">{p.category}</span>
          <span className="badge badge-green">{p.stock} in stock</span>
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{formatCurrency(p.price)} <span style={{ fontSize: 16, color: 'var(--text-soft)', textDecoration: 'line-through', fontWeight: 400 }}>{formatCurrency(p.originalPrice)}</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Stars rating={p.rating} />
          <span style={{ color: 'var(--text-soft)', fontSize: 13 }}>{p.rating} from {p.reviews} reviews</span>
        </div>
        <p style={{ color: 'var(--text-soft)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{p.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderTop: '1px solid var(--border)', marginBottom: 16 }}>
          <Avatar name={p.vendorName} size={32} bg="#e8571e" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{p.vendorName}</div>
            <div style={{ fontSize: 11, color: 'var(--accent-2)' }}>★ {MOCK_USERS.find(u => u.id === p.vendorId)?.rating || 4.8} trust score</div>
          </div>
        </div>
        <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={onAdd}>Add to Cart</button>
      </div>
    </div>
  );
}

function CustomerCart({ cart, setCart, onToast, onNavigate }) {
  const updateQty = (id, delta) => {
    setCart(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty: (i.qty || 1) + delta } : i).filter(i => (i.qty || 1) > 0);
      return updated;
    });
  };
  const remove = (id) => { setCart(prev => prev.filter(i => i.id !== id)); onToast("Item removed."); };
  const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  if (cart.length === 0) return (
    <div>
      <div className="page-header"><div className="page-title font-display">Your Cart</div></div>
      <div className="content-area">
        <div className="card" style={{ textAlign: 'center', padding: 60 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
          <div style={{ fontFamily: 'Clash Display, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Your cart is empty</div>
          <div style={{ color: 'var(--text-soft)', marginBottom: 20 }}>Browse products and add them to your cart!</div>
          <button className="btn btn-primary" onClick={() => onNavigate('shop')}>Browse Products</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header"><div className="page-title font-display">Your Cart</div><div className="page-subtitle">{cart.length} item{cart.length > 1 ? 's' : ''}</div></div>
      <div className="content-area">
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="card">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-emoji">{item.image}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-soft)' }}>{formatCurrency(item.price)} each</div>
                </div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                  <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{item.qty || 1}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
                <strong style={{ minWidth: 70, textAlign: 'right' }}>{formatCurrency(item.price * (item.qty || 1))}</strong>
                <button onClick={() => remove(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e85555', fontSize: 18 }}>✕</button>
              </div>
            ))}
          </div>
          <div className="card" style={{ position: 'sticky', top: 20 }}>
            <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Order Summary</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}><span className="text-soft">Subtotal</span><strong>{formatCurrency(total)}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}><span className="text-soft">Shipping</span><strong style={{ color: 'var(--accent-2)' }}>FREE</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '2px solid var(--border)', marginTop: 10 }}><strong style={{ fontSize: 17 }}>Total</strong><strong style={{ fontSize: 20, color: 'var(--accent)' }}>{formatCurrency(total)}</strong></div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => { setCart([]); onToast("Order placed! 🎉"); onNavigate('orders'); }}>
              Place Order →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerOrders() {
  return (
    <div>
      <div className="page-header"><div className="page-title font-display">My Orders</div><div className="page-subtitle">Track and manage your orders</div></div>
      <div className="content-area">
        {MOCK_ORDERS.map(order => (
          <div key={order.id} className="card section-gap">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <strong style={{ fontFamily: 'Clash Display, sans-serif', fontSize: 16 }}>{order.id}</strong>
                <span style={{ fontSize: 12, color: 'var(--text-soft)', marginLeft: 10 }}>{order.date}</span>
              </div>
              <span className={`badge ${getStatusBadge(order.status)}`}>{order.status}</span>
            </div>
            {order.products.map(p => (
              <div key={p.productId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="text-soft">{p.name} × {p.qty}</span>
                <strong>{formatCurrency(p.price)}</strong>
              </div>
            ))}
            <div className="order-track">
              <div className="track-line" />
              <div className="track-fill" style={{ width: `${(order.stage / 4) * (100 - (100/ORDER_STAGES.length))}%` }} />
              <div className="track-steps">
                {ORDER_STAGES.map((stage, i) => (
                  <div key={stage} className="track-step">
                    <div className={`track-dot ${i < order.stage ? 'done' : i === order.stage ? 'current' : ''}`} />
                    <div className={`track-label ${i < order.stage ? 'done' : i === order.stage ? 'current' : ''}`}>{stage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderTracking() {
  const [orderId, setOrderId] = useState('ORD-003');
  const [found, setFound] = useState(MOCK_ORDERS.find(o => o.id === 'ORD-003'));

  const search = () => {
    const o = MOCK_ORDERS.find(o => o.id.toUpperCase() === orderId.toUpperCase());
    setFound(o || null);
  };

  return (
    <div>
      <div className="page-header"><div className="page-title font-display">Real-Time Tracking</div><div className="page-subtitle">Live order status updates</div></div>
      <div className="content-area">
        <div className="card mb-4">
          <div style={{ display: 'flex', gap: 12 }}>
            <input className="input" value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Enter order ID (e.g. ORD-001)" style={{ flex: 1 }} />
            <button className="btn btn-primary" onClick={search}>Track →</button>
          </div>
        </div>

        {found && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 700, fontSize: 18 }}>{found.id}</div>
                <div style={{ color: 'var(--text-soft)', fontSize: 13 }}>{found.products[0].name} • Ordered {found.date}</div>
              </div>
              <div>
                <span className={`badge ${getStatusBadge(found.status)}`} style={{ fontSize: 13, padding: '6px 14px' }}>{found.status}</span>
                <div style={{ fontSize: 11, color: 'var(--text-soft)', marginTop: 4, textAlign: 'center' }}>Live Update</div>
              </div>
            </div>

            <div className="order-track" style={{ padding: '30px 10px' }}>
              <div className="track-line" />
              <div className="track-fill" style={{ width: `calc(${(found.stage / (ORDER_STAGES.length - 1)) * 100}% - 20px)` }} />
              <div className="track-steps">
                {ORDER_STAGES.map((stage, i) => (
                  <div key={stage} className="track-step">
                    <div className={`track-dot ${i < found.stage ? 'done' : i === found.stage ? 'current' : ''}`} />
                    <div className={`track-label ${i < found.stage ? 'done' : i === found.stage ? 'current' : ''}`} style={{ maxWidth: 70 }}>{stage}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--surface-alt)', borderRadius: 'var(--radius-sm)', padding: '14px 16px', marginTop: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Current Status</div>
              <div style={{ color: 'var(--text-soft)', fontSize: 13 }}>
                {found.stage === 3 ? "🚚 Your package is out for delivery and will arrive today!" :
                 found.stage === 2 ? "📦 Your package has been shipped and is on its way." :
                 found.stage === 4 ? "✅ Your package has been delivered. Enjoy!" :
                 "📋 Your order has been received and is being processed."}
              </div>
            </div>
          </div>
        )}
        {found === null && <div className="card" style={{ textAlign: 'center', color: 'var(--text-soft)', padding: 40 }}>Order not found. Try ORD-001, ORD-002, or ORD-003.</div>}
      </div>
    </div>
  );
}

function ChatInterface({ user }) {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMsg, setNewMsg] = useState('');
  const messagesEndRef = useRef(null);
  const isVendor = user.role === 'vendor';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!newMsg.trim()) return;
    const msg = {
      id: Date.now(),
      from: user.id,
      to: isVendor ? 4 : 2,
      fromName: user.name,
      text: newMsg,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, msg]);
    setNewMsg('');

    // Simulate reply
    setTimeout(() => {
      const replies = isVendor ? [
        "Thanks for the update!",
        "Got it, I'll check the status.",
        "That sounds great! 😊",
      ] : [
        "Of course! Let me check stock.",
        "Sure, we can arrange that!",
        "Thanks for reaching out!",
      ];
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: isVendor ? 4 : 2,
        to: user.id,
        fromName: isVendor ? 'Emma Johnson' : 'Sophie Chen',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000 + Math.random() * 1000);
  };

  const otherPerson = isVendor ? { name: 'Emma Johnson', role: 'Customer' } : { name: 'Sophie Chen', role: 'Vendor' };

  return (
    <div>
      <div className="page-header"><div className="page-title font-display">Messages</div><div className="page-subtitle">Real-time customer-vendor chat</div></div>
      <div className="content-area">
        <div className="chat-container">
          <div className="chat-list">
            <div style={{ padding: '16px 16px 10px', fontWeight: 700, fontSize: 13, color: 'var(--text-soft)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Conversations</div>
            <div className="chat-list-item active">
              <Avatar name={otherPerson.name} size={36} bg={isVendor ? '#2d6a4f' : '#e8571e'} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{otherPerson.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-soft)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="online-dot" /> Online
                </div>
              </div>
            </div>
          </div>
          <div className="chat-window">
            <div className="chat-header">
              <Avatar name={otherPerson.name} size={34} bg={isVendor ? '#2d6a4f' : '#e8571e'} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{otherPerson.name}</div>
                <div style={{ fontSize: 11, color: 'var(--accent-2)', display: 'flex', alignItems: 'center', gap: 4 }}><span className="online-dot" /> Active now</div>
              </div>
            </div>
            <div className="chat-messages">
              {messages.map(msg => {
                const isOwn = msg.from === user.id;
                return (
                  <div key={msg.id} className={`chat-message ${isOwn ? 'own' : ''}`}>
                    <div className={`bubble ${isOwn ? 'own' : 'other'}`}>{msg.text}</div>
                    <div className="time">{msg.time}</div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
              <input className="input" value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..." onKeyDown={e => e.key === 'Enter' && send()} />
              <button className="btn btn-primary" onClick={send}>Send →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCompare() {
  const [selected, setSelected] = useState([1, 3]);
  const products = MOCK_PRODUCTS.filter(p => selected.includes(p.id));

  const metrics = [
    { label: 'Price', key: 'price', format: formatCurrency, lower: true },
    { label: 'Rating', key: 'rating', format: v => `${v} ★` },
    { label: 'Reviews', key: 'reviews', format: v => `${v} reviews` },
    { label: 'Stock', key: 'stock', format: v => `${v} units` },
    { label: 'Units Sold', key: 'sold', format: v => `${v}` },
  ];

  return (
    <div>
      <div className="page-header"><div className="page-title font-display">Compare Products</div><div className="page-subtitle">Side-by-side product comparison</div></div>
      <div className="content-area">
        <div className="card mb-4">
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 14 }}>Select products to compare:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {MOCK_PRODUCTS.map(p => (
              <button key={p.id} className={`btn ${selected.includes(p.id) ? 'btn-secondary' : 'btn-ghost'} btn-sm`}
                onClick={() => setSelected(prev => prev.includes(p.id) ? prev.filter(id => id !== p.id) : prev.length < 3 ? [...prev, p.id] : prev)}>
                {p.image} {p.name}
              </button>
            ))}
          </div>
        </div>

        {products.length >= 2 && (
          <div className="card">
            <div className="table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th style={{ width: 140 }}>Feature</th>
                    {products.map(p => <th key={p.id}>{p.image} {p.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-soft)', fontSize: 12 }}>Category</td>
                    {products.map(p => <td key={p.id}><span className="badge badge-blue">{p.category}</span></td>)}
                  </tr>
                  {metrics.map(m => {
                    const vals = products.map(p => p[m.key]);
                    const best = m.lower ? Math.min(...vals) : Math.max(...vals);
                    return (
                      <tr key={m.label}>
                        <td style={{ fontWeight: 600, color: 'var(--text-soft)', fontSize: 12 }}>{m.label}</td>
                        {products.map(p => (
                          <td key={p.id} className={p[m.key] === best ? 'win' : ''}>
                            {m.format(p[m.key])}
                            {p[m.key] === best && <span style={{ marginLeft: 4, fontSize: 10 }}>✓ Best</span>}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-soft)', fontSize: 12 }}>Vendor</td>
                    {products.map(p => (
                      <td key={p.id}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                          <Avatar name={p.vendorName} size={22} bg="#e8571e" />
                          <span style={{ fontSize: 12 }}>{p.vendorName}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td />
                    {products.map(p => (
                      <td key={p.id}><button className="btn btn-primary btn-sm">Add to Cart</button></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('');
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState('');

  const showToast = useCallback((msg) => setToast(msg), []);

  const handleLogin = (u) => {
    setUser(u);
    const defaultPages = { admin: 'overview', vendor: u.approved ? 'dashboard' : 'dashboard', customer: 'shop' };
    setPage(defaultPages[u.role] || 'shop');
  };

  const handleLogout = () => { setUser(null); setPage(''); setCart([]); };

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: (i.qty || 1) + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  if (!user) return (
    <>
      <style>{styles}</style>
      <LoginPage onLogin={handleLogin} />
    </>
  );

  const renderPage = () => {
    if (user.role === 'admin') {
      if (page === 'overview') return <AdminOverview />;
      if (page === 'vendors') return <AdminVendors onToast={showToast} />;
      if (page === 'products') return <AdminProducts />;
      if (page === 'orders') return <div><div className="page-header"><div className="page-title font-display">All Orders</div></div><div className="content-area"><div className="card"><div className="table-wrapper"><table><thead><tr><th>ID</th><th>Customer</th><th>Product</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody>{MOCK_ORDERS.map(o=><tr key={o.id}><td><strong>{o.id}</strong></td><td>{o.customerName}</td><td>{o.products[0].name}</td><td><strong>{formatCurrency(o.total)}</strong></td><td><span className={`badge ${getStatusBadge(o.status)}`}>{o.status}</span></td><td className="text-soft">{o.date}</td></tr>)}</tbody></table></div></div></div></div>;
      if (page === 'customers') return <div><div className="page-header"><div className="page-title font-display">Customers</div><div className="page-subtitle">{MOCK_USERS.filter(u=>u.role==='customer').length} registered customers</div></div><div className="content-area"><div className="card"><div className="table-wrapper"><table><thead><tr><th>Customer</th><th>Email</th><th>Location</th><th>Joined</th><th>Orders</th><th>Total Spent</th></tr></thead><tbody>{MOCK_USERS.filter(u=>u.role==='customer').map(c=><tr key={c.id}><td><div style={{display:'flex',alignItems:'center',gap:10}}><Avatar name={c.name} size={32} bg="#2d6a4f"/><strong>{c.name}</strong></div></td><td className="text-soft">{c.email}</td><td className="text-soft">{c.location||'—'}</td><td className="text-soft">{c.joinDate||'—'}</td><td>{MOCK_ORDERS.filter(o=>o.customerId===c.id).length}</td><td><strong>{formatCurrency(c.totalSpent||0)}</strong></td></tr>)}</tbody></table></div></div></div></div>;
      if (page === 'analytics') return <VendorAnalytics user={user} />;
    }
    if (user.role === 'vendor') {
      if (page === 'dashboard') return <VendorDashboard user={user} />;
      if (page === 'products') return <VendorProducts onToast={showToast} user={user} />;
      if (page === 'orders') return <div><div className="page-header"><div className="page-title font-display">My Orders</div><div className="page-subtitle">{MOCK_ORDERS.filter(o=>o.vendorId===user.id).length} orders</div></div><div className="content-area"><div className="card"><div className="table-wrapper"><table><thead><tr><th>ID</th><th>Customer</th><th>Product</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody>{MOCK_ORDERS.filter(o=>o.vendorId===user.id).map(o=><tr key={o.id}><td><strong>{o.id}</strong></td><td>{o.customerName}</td><td>{o.products[0].name}</td><td><strong>{formatCurrency(o.total)}</strong></td><td><span className={`badge ${getStatusBadge(o.status)}`}>{o.status}</span></td><td className="text-soft">{o.date}</td></tr>)}</tbody></table></div></div></div></div>;
      if (page === 'analytics') return <VendorAnalytics user={user} />;
      if (page === 'chat') return <ChatInterface user={user} />;
    }
    if (user.role === 'customer') {
      if (page === 'shop') return <CustomerShop onAddToCart={addToCart} cart={cart} onToast={showToast} />;
      if (page === 'cart') return <CustomerCart cart={cart} setCart={setCart} onToast={showToast} onNavigate={setPage} />;
      if (page === 'orders') return <CustomerOrders />;
      if (page === 'tracking') return <OrderTracking />;
      if (page === 'chat') return <ChatInterface user={user} />;
      if (page === 'compare') return <ProductCompare />;
    }
    return <div style={{ padding: 40 }}>Page not found</div>;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-shell">
        <Sidebar user={user} activePage={page} onNavigate={setPage} onLogout={handleLogout} />
        <div className="main-content">
          {user.role === 'vendor' && !user.approved && (
            <div style={{ background: '#fff8e1', borderBottom: '1px solid #ffe082', padding: '10px 36px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
              ⚠️ <strong>Pending Approval:</strong> Your vendor account is awaiting admin approval. Limited features available.
            </div>
          )}
          {renderPage()}
        </div>
      </div>
      {toast && <Toast msg={toast} onHide={() => setToast('')} />}
    </>
  );
}
