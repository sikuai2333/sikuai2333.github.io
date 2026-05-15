import { ref, onMounted } from 'vue'

// WMO 天气码 → 中文描述
const weatherMap: Record<number, string> = {
  0: '晴', 1: '大部晴', 2: '局部多云', 3: '多云',
  45: '雾', 48: '雾凇', 51: '小毛毛雨', 53: '毛毛雨',
  55: '大毛毛雨', 56: '冻毛毛雨', 57: '冻毛毛雨',
  61: '小雨', 63: '中雨', 65: '大雨',
  66: '冻雨', 67: '冻雨',
  71: '小雪', 73: '中雪', 75: '大雪',
  77: '米雪', 80: '阵雨', 81: '阵雨', 82: '暴雨',
  85: '小阵雪', 86: '大阵雪',
  95: '雷暴', 96: '雷暴+冰雹', 99: '雷暴+冰雹'
}

export function useWeather() {
  const temp = ref('')
  const desc = ref('')
  const loading = ref(true)

  async function fetchWeather() {
    try {
      const res = await fetch(
        'https://wttr.in/Huaibei?format=j1'
      )
      const data = await res.json()
      const current = data.current_condition?.[0]
      if (current) {
        temp.value = `${current.temp_C}°C`
        const code = parseInt(current.weatherCode)
        desc.value = weatherMap[code] || current.lang_zh?.[0]?.value || '未知'
      }
    } catch {
      desc.value = '--'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchWeather)

  return { temp, desc, loading }
}
