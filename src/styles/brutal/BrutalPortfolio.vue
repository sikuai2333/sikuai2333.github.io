<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const projects = ref([
  { id: 1, title: '电商平台重构', category: 'Web 开发', desc: '使用 Vue 3 + TypeScript 重构的电商平台，性能提升 40%', tags: ['Vue', 'TypeScript', 'Pinia'], link: '#' },
  { id: 2, title: '设计系统搭建', category: 'UI/UX', desc: '为企业级应用搭建统一的设计系统和组件库', tags: ['Figma', 'Storybook', 'CSS'], link: '#' },
  { id: 3, title: '数据可视化面板', category: '数据', desc: '实时数据监控面板，支持多维度数据分析', tags: ['D3.js', 'WebSocket', 'Canvas'], link: '#' },
  { id: 4, title: '移动端 App', category: '移动开发', desc: '跨平台移动应用，支持 iOS 和 Android', tags: ['React Native', 'Expo'], link: '#' },
  { id: 5, title: 'CLI 工具开发', category: '工具', desc: '命令行工具，提升开发效率', tags: ['Node.js', 'Commander'], link: '#' },
  { id: 6, title: '开源贡献', category: '开源', desc: '参与多个开源项目的维护和功能开发', tags: ['GitHub', 'OSS'], link: '#' },
])

const categories = ['全部', 'Web 开发', 'UI/UX', '数据', '移动开发', '工具', '开源']
const activeCategory = ref('全部')

const filteredProjects = ref(projects.value)
function filterProjects(cat: string) {
  activeCategory.value = cat
  filteredProjects.value = cat === '全部' ? projects.value : projects.value.filter(p => p.category === cat)
}
</script>

<template>
<div class="portfolio-page">
  <header class="portfolio-header">
    <button class="back-btn" @click="router.push('/2')">← 返回</button>
    <div class="header-content">
      <h1>JOHN DOE</h1>
      <p class="title">全栈开发工程师 · 设计师</p>
      <p class="bio">热爱代码与设计，专注于创造优秀的用户体验</p>
    </div>
  </header>

  <div class="portfolio-layout">
    <aside class="portfolio-sidebar">
      <div class="profile-card">
        <div class="avatar">JD</div>
        <h3>John Doe</h3>
        <p>5 年经验</p>
        <p>12 个项目</p>
      </div>
      <div class="skills-card">
        <h3>技能</h3>
        <div class="skill-list">
          <span class="skill-tag">Vue</span>
          <span class="skill-tag">React</span>
          <span class="skill-tag">TypeScript</span>
          <span class="skill-tag">Node.js</span>
          <span class="skill-tag">Python</span>
          <span class="skill-tag">Figma</span>
        </div>
      </div>
    </aside>

    <main class="project-grid">
      <div class="category-filter">
        <button v-for="cat in categories" :key="cat" class="filter-btn" :class="{ active: activeCategory === cat }" @click="filterProjects(cat)">
          {{ cat }}
        </button>
      </div>
      <div class="projects">
        <div v-for="project in filteredProjects" :key="project.id" class="project-card">
          <div class="project-header">
            <span class="project-category">{{ project.category }}</span>
          </div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.desc }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <a :href="project.link" class="project-link">查看项目 →</a>
        </div>
      </div>
    </main>
  </div>

  <footer class="portfolio-footer">
    <p>© 2026 JOHN DOE · 示例作品集</p>
  </footer>
</div>
</template>

<style scoped>
.portfolio-page{background:#f5f0e8;color:#1a1a1a;min-height:100vh}
.portfolio-header{padding:60px 20px;text-align:center;border-bottom:3px solid #1a1a1a;background:#fff}
.back-btn{position:absolute;top:20px;left:20px;padding:8px 16px;border:3px solid #1a1a1a;background:#fff;font-weight:800;font-size:12px;text-transform:uppercase;cursor:pointer;transition:all 0.15s}
.back-btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #1a1a1a}
.header-content h1{font-size:clamp(32px,5vw,48px);font-weight:900;letter-spacing:0.05em;margin-bottom:8px}
.title{font-size:16px;font-weight:700;color:#ff6b35;margin-bottom:8px}
.bio{font-size:14px;color:#666}

.portfolio-layout{display:flex;max-width:1200px;margin:0 auto;padding:20px;gap:20px}
.portfolio-sidebar{width:250px;flex-shrink:0}
.profile-card{padding:24px;border:3px solid #1a1a1a;background:#fff;box-shadow:6px 6px 0 #1a1a1a;text-align:center;margin-bottom:16px}
.avatar{width:80px;height:80px;border:3px solid #1a1a1a;background:#ff6b35;color:#fff;font-size:24px;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.profile-card h3{font-size:18px;font-weight:800;margin-bottom:4px}
.profile-card p{font-size:13px;color:#666}
.skills-card{padding:20px;border:3px solid #1a1a1a;background:#fff}
.skills-card h3{font-size:14px;font-weight:800;text-transform:uppercase;margin-bottom:12px}
.skill-list{display:flex;flex-wrap:wrap;gap:8px}
.skill-tag{padding:6px 12px;border:2px solid #1a1a1a;font-size:12px;font-weight:700}

.portfolio-content{flex:1}
.category-filter{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
.filter-btn{padding:8px 16px;border:2px solid #1a1a1a;background:#fff;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.15s}
.filter-btn:hover,.filter-btn.active{background:#1a1a1a;color:#fff}
.projects{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.project-card{padding:24px;border:3px solid #1a1a1a;background:#fff;box-shadow:6px 6px 0 #1a1a1a;transition:all 0.15s}
.project-card:hover{transform:translate(3px,3px);box-shadow:3px 3px 0 #1a1a1a}
.project-header{margin-bottom:12px}
.project-category{font-size:11px;font-weight:800;color:#ff6b35;text-transform:uppercase}
.project-card h3{font-size:18px;font-weight:800;margin-bottom:8px}
.project-card p{font-size:14px;color:#444;margin-bottom:16px}
.project-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.tag{padding:4px 10px;border:2px solid #1a1a1a;font-size:11px;font-weight:800}
.project-link{display:inline-block;padding:10px 20px;border:3px solid #1a1a1a;background:#ff6b35;color:#fff;font-weight:800;font-size:12px;text-transform:uppercase;text-decoration:none;transition:all 0.15s}
.project-link:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #1a1a1a}

.portfolio-footer{text-align:center;padding:40px 20px;border-top:3px solid #1a1a1a;font-size:13px;color:#666;letter-spacing:0.05em}

@media(max-width:768px){.portfolio-layout{flex-direction:column}.portfolio-sidebar{width:100%}.projects{grid-template-columns:1fr}}
</style>
