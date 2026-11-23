export type Category = 'Starters' | 'Main Course' | 'Fast Food' | 'Drinks' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: Category;
  veg?: boolean;
  popular?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface OrderInfo {
  customerName: string;
  tableNumber: string;
  notes?: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  description: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  instagram: strings;
  hours: { day: string; time: string }[];
  rating: number;
  reviewsCount: number;
  cuisines: string[];
  heroImage: string;
  logoText: string;
}

export const CATEGORIES: Category[] = [
  'Starters',
  'Main Course',
  'Fast Food',
  'Drinks',
  'Desserts',
];

export const restaurantInfo: RestaurantInfo = {
  name: 'Saffron & Sage',
  tagline: 'Modern Indian Kitchen',
  description:
    'A contemporary dining destination where traditional flavors meet modern craft. Our chefs source seasonal ingredients to create dishes that tell a story on every plate.',
  location: 'Bengaluru, India',
  address: '24 Lavelle Road, Bengaluru, KA 560001',
  phone: '+91 1234567890',
  email: 'hello@saffronandsage.in',
  instagram: 'https://www.instagram.com/buildwith_shaurya/',
  hours: [
    { day: 'Mon – Thu', time: '11:00 AM – 10:30 PM' },
    { day: 'Fri – Sat', time: '11:00 AM – 12:00 AM' },
    { day: 'Sunday', time: '10:00 AM – 11:00 PM' },
  ],
  rating: 4.8,
  reviewsCount: 2143,
  cuisines: ['Modern Indian', 'Continental', 'Asian Fusion'],
  heroImage:
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1600',
  logoText: 'S&S',
};

export const defaultMenu: MenuItem[] = [
  // Starters
  {
    id: 'st-1',
    name: 'Classic Bruschetta',
    description: 'Toasted artisan bread topped with diced tomatoes, fresh basil, and extra virgin olive oil.',
    price: 280,
    rating: 4.6,
    image:
      'https://images.pexels.com/photos/37326861/pexels-photo-37326861.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Starters',
    veg: true,
    popular: true,
  },
  {
    id: 'st-2',
    name: 'Crispy Spring Rolls',
    description: 'Golden fried rolls stuffed with seasoned vegetables, served with sweet chili dip.',
    price: 240,
    rating: 4.5,
    image:
      'https://images.pexels.com/photos/12103073/pexels-photo-12103073.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Starters',
    veg: true,
  },
  {
    id: 'st-3',
    name: 'Punjabi Samosa Chaat',
    description: 'Crushed samosas, chickpeas, tamarind chutney, yogurt, and crunchy sev.',
    price: 220,
    rating: 4.7,
    image:
      'https://images.pexels.com/photos/14883757/pexels-photo-14883757.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Starters',
    veg: true,
    popular: true,
  },
  {
    id: 'st-4',
    name: 'Caesar Salad',
    description: 'Crisp romaine, garlic croutons, shaved parmesan, and classic Caesar dressing.',
    price: 320,
    rating: 4.4,
    image:
      'https://images.pexels.com/photos/28618643/pexels-photo-28618643.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Starters',
    veg: true,
  },

  // Main Course
  {
    id: 'mc-1',
    name: 'Butter Chicken',
    description: 'Tandoor-grilled chicken in a velvety tomato and cashew gravy with a hint of fenugreek.',
    price: 480,
    rating: 4.9,
    image:
      'https://images.pexels.com/photos/12797590/pexels-photo-12797590.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Main Course',
    popular: true,
  },
  {
    id: 'mc-2',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon fillet with lemon butter, asparagus, and herb-roasted potatoes.',
    price: 720,
    rating: 4.8,
    image:
      'https://images.pexels.com/photos/8112893/pexels-photo-8112893.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Main Course',
  },
  {
    id: 'mc-3',
    name: 'Truffle Mushroom Pasta',
    description: 'Hand-rolled fettuccine, wild mushrooms, truffle oil, and aged parmesan.',
    price: 540,
    rating: 4.7,
    image:
      'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Main Course',
    veg: true,
  },
  {
    id: 'mc-4',
    name: 'Paneer Tikka Masala',
    description: 'Charred cottage cheese in a rich onion-tomato gravy with crushed kasuri methi.',
    price: 420,
    rating: 4.6,
    image:
      'https://images.pexels.com/photos/9608584/pexels-photo-9608584.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Main Course',
    veg: true,
    popular: true,
  },

  // Fast Food
  {
    id: 'ff-1',
    name: 'Classic Cheeseburger',
    description: 'Flame-grilled beef patty, melted cheddar, lettuce, tomato, and house sauce.',
    price: 320,
    rating: 4.5,
    image:
      'https://images.pexels.com/photos/1639772/pexels-photo-1639772.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Fast Food',
    popular: true,
  },
  {
    id: 'ff-2',
    name: 'Margherita Pizza',
    description: 'Wood-fired pizza with San Marzano tomato, fresh mozzarella, and basil.',
    price: 380,
    rating: 4.7,
    image:
      'https://images.pexels.com/photos/35555214/pexels-photo-35555214.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Fast Food',
    veg: true,
  },
  {
    id: 'ff-3',
    name: 'Loaded French Fries',
    description: 'Crispy fries with cheese sauce, jalapeños, sour cream, and chives.',
    price: 220,
    rating: 4.4,
    image:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Fast Food',
    veg: true,
  },
  {
    id: 'ff-4',
    name: 'Crispy Fried Chicken',
    description: 'Buttermilk-marinated chicken with a spiced golden crust and smoked dip.',
    price: 360,
    rating: 4.6,
    image:
      'https://images.pexels.com/photos/60616/pexels-photo-60616.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Fast Food',
  },

  // Drinks
  {
    id: 'dr-1',
    name: 'Fresh Lime Margarita',
    description: 'Tequila, fresh lime, agave, and a salted rim. Refreshing and zesty.',
    price: 340,
    rating: 4.7,
    image:
      'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Drinks',
    popular: true,
  },
  {
    id: 'dr-2',
    name: 'Mint Lemonade',
    description: 'Hand-pressed lemons, crushed mint, and a touch of black salt.',
    price: 160,
    rating: 4.5,
    image:
      'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Drinks',
    veg: true,
  },
  {
    id: 'dr-3',
    name: 'Iced Cappuccino',
    description: 'Double espresso over ice with chilled milk and a velvety foam crown.',
    price: 220,
    rating: 4.6,
    image:
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Drinks',
    veg: true,
  },
  {
    id: 'dr-4',
    name: 'Berry Mocktail',
    description: 'Muddled berries, orange, soda, and a sprig of rosemary.',
    price: 240,
    rating: 4.4,
    image:
      'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Drinks',
    veg: true,
  },

  // Desserts
  {
    id: 'ds-1',
    name: 'Molten Chocolate Cake',
    description: 'Warm dark chocolate cake with a gooey center and vanilla bean ice cream.',
    price: 280,
    rating: 4.9,
    image:
      'https://images.pexels.com/photos/45202/pexels-photo-45202.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Desserts',
    veg: true,
    popular: true,
  },
  {
    id: 'ds-2',
    name: 'Classic Tiramisu',
    description: 'Layers of espresso-soaked ladyfingers, mascarpone, and cocoa.',
    price: 300,
    rating: 4.8,
    image:
      'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Desserts',
    veg: true,
  },
  {
    id: 'ds-3',
    name: 'Berry Cheesecake',
    description: 'Creamy baked cheesecake with a mixed berry compote and graham crust.',
    price: 260,
    rating: 4.7,
    image:
      'https://images.pexels.com/photos/33486714/pexels-photo-33486714.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Desserts',
    veg: true,
  },
  {
    id: 'ds-4',
    name: 'Vanilla Ice Cream',
    description: 'Slow-churned Madagascar vanilla bean ice cream with caramel drizzle.',
    price: 180,
    rating: 4.5,
    image:
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Desserts',
    veg: true,
  },
];
