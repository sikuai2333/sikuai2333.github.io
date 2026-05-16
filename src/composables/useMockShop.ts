import { ref, computed } from 'vue'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  tag?: string
  rating: number
  reviews: number
  stock: number
  desc: string
  specs: { label: string; value: string }[]
  emoji: string
}

export interface CartItem {
  product: Product
  qty: number
}

const products: Product[] = [
  {
    id: 'brutal-tshirt',
    name: 'NEUE BRUTAL 基础T恤',
    price: 199,
    originalPrice: 299,
    category: '服装',
    tag: '热卖',
    rating: 4.8,
    reviews: 326,
    stock: 58,
    desc: '100% 精梳棉，300g 重磅面料。胸前新野蛮风格印花，落肩宽松版型。黑/白/灰三色可选。',
    specs: [
      { label: '材质', value: '100% 精梳棉' },
      { label: '克重', value: '300g/m²' },
      { label: '版型', value: '落肩宽松' },
      { label: '尺码', value: 'S / M / L / XL / XXL' },
    ],
    emoji: '👕',
  },
  {
    id: 'brutal-hoodie',
    name: 'NEUE BRUTAL 连帽卫衣',
    price: 399,
    originalPrice: 599,
    category: '服装',
    tag: '新品',
    rating: 4.9,
    reviews: 128,
    stock: 23,
    desc: '420g 加厚卫衣面料，内里拉绒。背部大面积几何切割印花，前胸小 logo 刺绣。',
    specs: [
      { label: '材质', value: '80% 棉 / 20% 聚酯' },
      { label: '克重', value: '420g/m²' },
      { label: '工艺', value: '丝网印刷 + 刺绣' },
      { label: '尺码', value: 'S / M / L / XL' },
    ],
    emoji: '🧥',
  },
  {
    id: 'brutal-mug',
    name: 'NEUE BRUTAL 陶瓷杯',
    price: 89,
    category: '生活',
    rating: 4.7,
    reviews: 512,
    stock: 156,
    desc: '12oz 陶瓷马克杯，哑光釉面。极简几何图案，适合咖啡、茶、以及加班时的任何液体。',
    specs: [
      { label: '容量', value: '12oz (350ml)' },
      { label: '材质', value: '高温陶瓷' },
      { label: '工艺', value: '哑光釉面' },
      { label: '可选', value: '黑 / 白 / 橙' },
    ],
    emoji: '☕',
  },
  {
    id: 'brutal-poster',
    name: 'NEUE BRUTAL 海报 A2',
    price: 129,
    category: '装饰',
    tag: '限量',
    rating: 4.6,
    reviews: 89,
    stock: 12,
    desc: 'A2 尺寸 (420×594mm)，250g 铜版纸。新野蛮风格几何构图，编号限量 500 张。',
    specs: [
      { label: '尺寸', value: 'A2 (420×594mm)' },
      { label: '纸张', value: '250g 铜版纸' },
      { label: '限量', value: '500 张' },
      { label: '包装', value: '硬纸筒邮寄' },
    ],
    emoji: '🖼️',
  },
  {
    id: 'brutal-sticker',
    name: 'NEUE BRUTAL 贴纸包',
    price: 39,
    category: '配件',
    rating: 4.5,
    reviews: 1024,
    stock: 890,
    desc: '15 张不重复贴纸，防水 vinyl 材质。适合笔记本电脑、水杯、手机壳。',
    specs: [
      { label: '数量', value: '15 张' },
      { label: '材质', value: '防水 Vinyl' },
      { label: '尺寸', value: '5-8cm 不等' },
      { label: '特性', value: '防水防晒' },
    ],
    emoji: '🏷️',
  },
  {
    id: 'brutal-notebook',
    name: 'NEUE BRUTAL 笔记本',
    price: 69,
    category: '文具',
    rating: 4.8,
    reviews: 267,
    stock: 234,
    desc: 'A5 硬壳笔记本，160 页点阵内页。封面烫金工艺，书签丝带，弹性绑带。',
    specs: [
      { label: '尺寸', value: 'A5 (148×210mm)' },
      { label: '页数', value: '160 页' },
      { label: '内页', value: '5mm 点阵' },
      { label: '工艺', value: '封面烫金' },
    ],
    emoji: '📓',
  },
]

const cart = ref<CartItem[]>([])

export function useMockShop() {
  const categories = computed(() => {
    const cats = new Set(products.map(p => p.category))
    return ['全部', ...cats]
  })

  const getProducts = (category?: string) => {
    if (!category || category === '全部') return products
    return products.filter(p => p.category === category)
  }

  const getProduct = (id: string) => products.find(p => p.id === id) || null

  const addToCart = (product: Product, qty = 1) => {
    const existing = cart.value.find(c => c.product.id === product.id)
    if (existing) {
      existing.qty += qty
    } else {
      cart.value.push({ product, qty })
    }
  }

  const removeFromCart = (id: string) => {
    cart.value = cart.value.filter(c => c.product.id !== id)
  }

  const updateQty = (id: string, qty: number) => {
    const item = cart.value.find(c => c.product.id === id)
    if (item) {
      item.qty = Math.max(1, Math.min(qty, item.product.stock))
    }
  }

  const cartTotal = computed(() =>
    cart.value.reduce((sum, c) => sum + c.product.price * c.qty, 0)
  )

  const cartCount = computed(() =>
    cart.value.reduce((sum, c) => sum + c.qty, 0)
  )

  const clearCart = () => { cart.value = [] }

  return {
    products,
    cart,
    categories,
    getProducts,
    getProduct,
    addToCart,
    removeFromCart,
    updateQty,
    cartTotal,
    cartCount,
    clearCart,
  }
}
