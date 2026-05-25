export const BRAND = '橙食订'

export type FoodItem = {
  id: string
  storeId: string
  name: string
  desc: string
  price: number
  originalPrice?: number
  sales: string
  image: string
  tags?: string[]
  rating?: string
  spiceOptions?: string[]
  sugarOptions?: string[]
}

export type Restaurant = {
  id: string
  name: string
  image: string
  logo: string
  rating: number
  monthlySales: string
  deliveryTime: string
  minOrder: number
  deliveryFee: number
  distance: string
  tags: string[]
  notice: string
}

export type Banner = { id: string; title: string; sub: string; image: string; color: string }

export const categories = [
  { id: 'food', name: '美食', icon: 'utensils' },
  { id: 'drink', name: '饮品', icon: 'coffee' },
  { id: 'fast', name: '快餐', icon: 'pizza' },
  { id: 'bbq', name: '烧烤', icon: 'flame' },
  { id: 'dessert', name: '甜品', icon: 'cake' },
  { id: 'market', name: '超市', icon: 'cart' },
  { id: 'fruit', name: '水果', icon: 'fruit' },
  { id: 'medicine', name: '买药', icon: 'pill' },
] as const

export const banners: Banner[] = [
  {
    id: 'b1',
    title: '新客立减15元',
    sub: '首单满30可用',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=240&fit=crop',
    color: '#ff6600',
  },
  {
    id: 'b2',
    title: '下午茶5折起',
    sub: '14:00-17:00限时',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=240&fit=crop',
    color: '#ff8c42',
  },
  {
    id: 'b3',
    title: '周末免配送费',
    sub: '指定商家参与',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=240&fit=crop',
    color: '#e85d04',
  },
]

export const restaurants: Restaurant[] = [
  {
    id: 'shop-orange',
    name: '橙味小厨 (望京店)',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=160&fit=crop',
    logo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop',
    rating: 4.8,
    monthlySales: '月售3260',
    deliveryTime: '约30分钟',
    minOrder: 20,
    deliveryFee: 2.5,
    distance: '1.2km',
    tags: ['品牌商家', '准时宝', '满35减5'],
    notice: '本店招牌红烧肉饭限时8折，欢迎下单～',
  },
  {
    id: 'shop-noodle',
    name: '老张牛肉面',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=160&fit=crop',
    logo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=80&h=80&fit=crop',
    rating: 4.6,
    monthlySales: '月售2100',
    deliveryTime: '约25分钟',
    minOrder: 15,
    deliveryFee: 3,
    distance: '0.8km',
    tags: ['好评如潮', '极速达'],
    notice: '牛肉面加蛋仅需+3元',
  },
  {
    id: 'shop-burger',
    name: '咔滋汉堡工坊',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=160&fit=crop',
    logo: 'https://images.unsplash.com/photo-1568901346635-037c945dcff3?w=80&h=80&fit=crop',
    rating: 4.7,
    monthlySales: '月售1850',
    deliveryTime: '约35分钟',
    minOrder: 18,
    deliveryFee: 4,
    distance: '2.1km',
    tags: ['新客减10', '满50减8'],
    notice: '下单即赠薯条一份（满35）',
  },
]

export const specialDeals: FoodItem[] = [
  {
    id: 'deal-1',
    storeId: 'shop-orange',
    name: '红烧肉饭套餐',
    desc: '',
    price: 25.9,
    originalPrice: 32.5,
    sales: '已抢892',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=160&h=120&fit=crop',
  },
  {
    id: 'deal-2',
    storeId: 'shop-burger',
    name: '双人汉堡桶',
    desc: '',
    price: 39.9,
    originalPrice: 58,
    sales: '已抢456',
    image: 'https://images.unsplash.com/photo-1568901346635-037c945dcff3?w=160&h=120&fit=crop',
  },
  {
    id: 'crawfish',
    storeId: 'shop-orange',
    name: '麻辣小龙虾',
    desc: '',
    price: 168,
    originalPrice: 228,
    sales: '限时秒杀',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=160&h=120&fit=crop',
  },
]

export const homeFoods: FoodItem[] = [
  {
    id: '1',
    storeId: 'shop-noodle',
    name: '招牌红烧牛肉面',
    desc: '精选上等牛腩，慢火细炖8小时，肉质鲜嫩多汁。',
    price: 32,
    sales: '月售1200',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    storeId: 'shop-burger',
    name: '香辣脆皮鸡腿堡',
    desc: '现点现炸，外酥里嫩，搭配鲜生菜与独家沙拉',
    price: 18,
    sales: '月售850',
    image: 'https://images.unsplash.com/photo-1568901346635-037c945dcff3?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    storeId: 'shop-orange',
    name: '杨枝甘露 (大杯)',
    desc: '新鲜芒果混合西米、西柚果肉，口感层次丰富，冰凉清甜。',
    price: 22,
    sales: '月售2400',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
  },
]

export const shopMenus: Record<string, { category: string; items: FoodItem[] }[]> = {
  'shop-orange': [
    {
      category: '热销',
      items: [
        {
          id: 'c1',
          storeId: 'shop-orange',
          name: '招牌红烧肉饭',
          desc: '肥而不腻，附赠例汤',
          price: 32.5,
          sales: '月售680',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&h=120&fit=crop',
          tags: ['招牌'],
        },
        {
          id: 'crawfish',
          storeId: 'shop-orange',
          name: '招牌麻辣小龙虾 (大份)',
          desc: '洪湖清水虾，秘制香料',
          price: 188,
          originalPrice: 228,
          sales: '月售1500+',
          image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=120&h=120&fit=crop',
          tags: ['TOP1'],
        },
      ],
    },
    {
      category: '饮品',
      items: [
        {
          id: 'c2',
          storeId: 'shop-orange',
          name: '清爽柠檬红茶',
          desc: '现泡红茶，清爽解腻',
          price: 12,
          sales: '月售420',
          image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=120&h=120&fit=crop',
          sugarOptions: ['不加糖', '微糖', '标准糖'],
        },
        {
          id: '3',
          storeId: 'shop-orange',
          name: '杨枝甘露 (大杯)',
          desc: '芒果西柚西米',
          price: 22,
          sales: '月售2400',
          image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=120&h=120&fit=crop',
        },
      ],
    },
    {
      category: '小吃',
      items: [
        {
          id: 'c3',
          storeId: 'shop-orange',
          name: '奥尔良烤翅 (4只)',
          desc: '蜜汁微辣',
          price: 18,
          sales: '月售310',
          image: 'https://images.unsplash.com/photo-1608039755401-6c9a44b0e45f?w=120&h=120&fit=crop',
          spiceOptions: ['微辣', '中辣'],
        },
      ],
    },
  ],
  'shop-noodle': [
    {
      category: '面食',
      items: [
        {
          id: '1',
          storeId: 'shop-noodle',
          name: '招牌红烧牛肉面',
          desc: '8小时慢炖牛腩',
          price: 32,
          sales: '月售1200',
          image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=120&h=120&fit=crop',
        },
      ],
    },
  ],
  'shop-burger': [
    {
      category: '汉堡',
      items: [
        {
          id: '2',
          storeId: 'shop-burger',
          name: '香辣脆皮鸡腿堡',
          desc: '外酥里嫩',
          price: 18,
          sales: '月售850',
          image: 'https://images.unsplash.com/photo-1568901346635-037c945dcff3?w=120&h=120&fit=crop',
          spiceOptions: ['不辣', '微辣', '中辣'],
        },
      ],
    },
  ],
}

export const productDetail: FoodItem = {
  id: 'crawfish',
  storeId: 'shop-orange',
  name: '招牌麻辣小龙虾 (大份)',
  desc: '选用洪湖清水小龙虾，经秘制香料爆炒，麻辣鲜香，回味无穷。配土豆、玉米、藕片。',
  price: 188,
  originalPrice: 228,
  sales: '月售 1500+',
  image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=500&fit=crop',
  tags: ['店长推荐', '麻辣鲜香', '分量足'],
  rating: '4.8 高分推荐',
  spiceOptions: ['微微辣', '中辣', '特辣', '变态辣'],
  sugarOptions: ['不加糖', '微糖', '标准糖'],
}

export const products: Record<string, FoodItem> = {
  ...Object.fromEntries(homeFoods.map((p) => [p.id, p])),
  ...Object.fromEntries(specialDeals.map((p) => [p.id, p])),
  crawfish: productDetail,
}

Object.values(shopMenus).forEach((menus) =>
  menus.forEach((g) =>
    g.items.forEach((item) => {
      products[item.id] = item
    }),
  ),
)

export const spiceOptions = ['微微辣', '中辣', '特辣', '变态辣']
export const sugarOptions = ['不加糖', '微糖', '标准糖']

export type CartItem = {
  id: string
  productId: string
  storeId: string
  storeName: string
  name: string
  spec: string
  price: number
  qty: number
  image: string
  checked: boolean
}

export const initialCartItems: CartItem[] = [
  {
    id: 'init-c1',
    productId: 'c1',
    storeId: 'shop-orange',
    storeName: '橙味小厨 (望京店)',
    name: '招牌红烧肉饭',
    spec: '正常辣 / 附赠例汤',
    price: 32.5,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&h=120&fit=crop',
    checked: true,
  },
  {
    id: 'init-c2',
    productId: 'c2',
    storeId: 'shop-orange',
    storeName: '橙味小厨 (望京店)',
    name: '清爽柠檬红茶',
    spec: '常温 / 标准糖',
    price: 12,
    qty: 2,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=120&h=120&fit=crop',
    checked: true,
  },
  {
    id: 'init-c3',
    productId: 'c3',
    storeId: 'shop-orange',
    storeName: '橙味小厨 (望京店)',
    name: '奥尔良烤翅 (4只)',
    spec: '微辣 / 蜜汁',
    price: 18,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1608039755401-6c9a44b0e45f?w=120&h=120&fit=crop',
    checked: true,
  },
]

export function getRestaurant(id: string) {
  return restaurants.find((r) => r.id === id)
}
