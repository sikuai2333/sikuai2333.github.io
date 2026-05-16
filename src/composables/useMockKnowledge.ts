import { ref, computed } from 'vue'

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  readTime: string
  tags: string[]
  emoji: string
}

const articles: Article[] = [
  {
    id: 'what-is-brutalism',
    title: '什么是新野蛮主义设计？',
    excerpt: '从建筑到界面——粗粝、直接、不加修饰的美学如何征服了数字世界。',
    content: `新野蛮主义（Neue Brutalism）源自建筑领域的粗野主义运动。在数字设计中，它表现为：

**核心原则：**

1. **不加修饰** — 原始的边框、硬阴影、零圆角
2. **高对比度** — 黑白为主，点缀一个强调色
3. **功能优先** — 每个元素的存在都有明确理由
4. **粗粝感** — 不追求精致，追求力量感

**为什么现在流行？**

在渐变、毛玻璃、圆角统治了十年之后，人们开始渴望"真实感"。新野蛮主义就像设计界的朋克摇滚——它拒绝修饰，拥抱原始。

**适用场景：**
- 个人作品集（展现个性）
- 独立品牌官网（差异化）
- 开发者工具站（程序员审美）
- 创意机构官网（大胆、自信）

**不适用场景：**
- 金融/银行类（太激进）
- 医疗健康类（需要温和感）
- 儿童教育类（太硬朗）

新野蛮主义不是"丑"，而是"诚实"。它告诉用户：这里没有包装，只有内容。`,
    category: '设计理论',
    author: '设计观察者',
    date: '2026-05-10',
    readTime: '5 分钟',
    tags: ['设计', '野蛮主义', 'UI'],
    emoji: '🏛️',
  },
  {
    id: 'brutal-color-system',
    title: '新野蛮风格的色彩系统',
    excerpt: '如何用最少的颜色创造最大的冲击力——黑白橙的三色法则。',
    content: `新野蛮风格的色彩系统极其克制，但每一笔都精准。

**基础三色：**
- **#1a1a1a**（近黑）— 文字、边框、阴影
- **#f5f0e8**（暖白）— 背景
- **#ff6b35**（橙色）— 强调色、CTA、交互反馈

**为什么是这三个？**

黑色提供结构，暖白提供呼吸感，橙色提供活力。三者形成稳定的三角关系。

**扩展用法：**
- 状态色：成功 #2d8a4e、错误 #d63031、警告 #f39c12
- 次要文字：#666（灰色）
- 卡片背景：#fff（纯白，比背景更亮）

**禁忌：**
- 不用渐变
- 不用半透明叠加
- 不用超过4种颜色
- 不用低对比度组合

**深色模式：**
反转黑白关系，保持橙色不变。深色模式下背景 #1a1a1a，文字 #f5f0e8，卡片 #222。`,
    category: '设计系统',
    author: '色彩研究室',
    date: '2026-05-08',
    readTime: '4 分钟',
    tags: ['色彩', '设计系统', '配色'],
    emoji: '🎨',
  },
  {
    id: 'brutal-typography',
    title: '新野蛮风格的字体选择',
    excerpt: '为什么 Inter 是新野蛮主义的御用字体？粗细对比的秘密。',
    content: `字体是新野蛮风格的灵魂。选对字体，风格就成功了一半。

**首选字体：Inter**
- 几何感强，与硬边框完美匹配
- x-height 高，小字也清晰
- 字重从 400 到 900，层次分明
- 免费开源，Web 性能优秀

**字重使用规则：**
- 标题：800-900（Extra Bold / Black）
- 正文：400-600（Regular / Semi Bold）
- 标签/按钮：800 + 全大写 + 字间距 0.05em

**替代字体：**
- IBM Plex Mono — 等宽场景
- Space Grotesk — 更几何感
- JetBrains Mono — 代码展示

**排版规则：**
- 标题全大写（text-transform: uppercase）
- 正文正常大小写
- 行高 1.4-1.6
- 标题字间距 0.05-0.1em
- 不用斜体（新野蛮风格不"柔"）

**反面教材：**
- 衬线字体（太古典）
- 手写体（太随意）
- 过细的字重（太脆弱）`,
    category: '设计系统',
    author: '字体工坊',
    date: '2026-05-05',
    readTime: '4 分钟',
    tags: ['字体', '排版', 'Typography'],
    emoji: '🔤',
  },
  {
    id: 'brutal-components',
    title: '新野蛮风格组件库设计指南',
    excerpt: '按钮、卡片、表单——每个组件都应该像一块混凝土砖。',
    content: `组件是风格的最小执行单元。新野蛮风格的组件设计遵循一个原则：**像建筑一样结构清晰**。

**按钮：**
- 3px 实线边框
- 4-6px 硬阴影（非模糊）
- hover 时缩小阴影（物理按下感）
- active 时阴影归零
- 全大写，800 字重

**卡片：**
- 3px 实线边框
- 6px 硬阴影
- hover 时位移 + 缩小阴影
- 零圆角
- 内容对齐左上

**表单输入框：**
- 3px 实线边框
- focus 时出现硬阴影
- 无圆角
- 无渐变
- placeholder 用灰色

**导航栏：**
- 固定顶部
- 背景色（不透明，不用毛玻璃）
- 等宽数字（时间、价格）
- 链接用全大写

**弹窗/模态框：**
- 硬边框 + 硬阴影
- 半透明黑色遮罩
- 关闭按钮用 × 符号
- 内容简洁直接

**所有组件的共同特征：**
- border-radius: 0
- border: 3px solid #1a1a1a
- box-shadow: 6px 6px 0 #1a1a1a
- transition: all 0.15s（快、干脆）`,
    category: '组件设计',
    author: '组件实验室',
    date: '2026-05-02',
    readTime: '6 分钟',
    tags: ['组件', 'UI', '设计指南'],
    emoji: '🧱',
  },
  {
    id: 'brutal-in-ecommerce',
    title: '新野蛮风格在电商中的应用',
    excerpt: '如何让商品在粗粝的界面中依然吸引眼球？反差美学的秘密。',
    content: `电商网站通常追求精致、圆润、柔和。新野蛮风格反其道而行——但效果出奇地好。

**为什么有效？**
- **注意力稀缺时代**，粗粝感反而让人停下来
- **差异化**：所有电商都长一样，你的站不一样
- **信任感**：不加修饰 = 不套路用户

**商品卡片设计：**
- 白色背景 + 硬边框
- 商品图占大面积
- 价格用大号加粗
- 标签用方角 badge
- hover 动画干脆利落

**购物车：**
- 表格化布局
- 数量用 +/- 按钮
- 总价突出显示
- 结算按钮用强调色

**商品详情：**
- 左图右文的经典布局
- 规格用表格展示
- 评价用星级 + 数字
- "加入购物车"按钮足够大

**案例：**
- Gumroad — 独立创作者卖数字产品
- Stripe 的文档 — 干净、结构化
- Linear — 极简但有力`,
    category: '实战案例',
    author: '电商设计师',
    date: '2026-04-28',
    readTime: '5 分钟',
    tags: ['电商', '实战', '案例'],
    emoji: '🛒',
  },
  {
    id: 'brutal-dark-mode',
    title: '新野蛮风格的深色模式',
    excerpt: '不是简单反转黑白——深色模式有自己的设计逻辑。',
    content: `深色模式不是把背景改成黑色就行。新野蛮风格的深色模式有独特规则。

**色彩映射：**
- 背景：#f5f0e8 → #1a1a1a
- 卡片：#fff → #222
- 边框：#1a1a1a → #555
- 阴影：#1a1a1a → #000
- 强调色：#ff6b35（不变）
- 文字：#1a1a1a → #f5f0e8

**关键区别：**
1. 边框颜色要变浅（深底上用深边框看不见）
2. 阴影要更深（#000 而非 #1a1a1a）
3. 卡片背景不能纯黑（需要层次感）
4. 强调色保持不变（锚定视觉焦点）

**实现方式：**
CSS 变量 + class 切换：
\`\`\`css
.dark {
  --brutal-bg: #1a1a1a;
  --brutal-fg: #f5f0e8;
  --brutal-card-bg: #222;
  --brutal-border: #555;
}
\`\`\`

**测试要点：**
- 对比度是否达标（WCAG AA）
- 阴影是否可见
- 强调色是否突出
- 长时间阅读是否舒适`,
    category: '设计系统',
    author: '暗黑模式研究所',
    date: '2026-04-25',
    readTime: '4 分钟',
    tags: ['深色模式', '暗黑', '可访问性'],
    emoji: '🌙',
  },
]

const searchQuery = ref('')

export function useMockKnowledge() {
  const categories = computed(() => {
    const cats = new Set(articles.map(a => a.category))
    return ['全部', ...cats]
  })

  const filteredArticles = computed(() => {
    let result = articles
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    return result
  })

  const getArticles = (category?: string) => {
    let result = filteredArticles.value
    if (category && category !== '全部') {
      result = result.filter(a => a.category === category)
    }
    return result
  }

  const getArticle = (id: string) => articles.find(a => a.id === id) || null

  const getRelated = (id: string) => {
    const current = getArticle(id)
    if (!current) return []
    return articles
      .filter(a => a.id !== id && a.tags.some(t => current.tags.includes(t)))
      .slice(0, 3)
  }

  return {
    articles,
    categories,
    searchQuery,
    filteredArticles,
    getArticles,
    getArticle,
    getRelated,
  }
}
