import { ref, onMounted } from 'vue'

interface Weather {
  city: string
  temp: string
  desc: string
  icon: string
}

export function useWeather() {
  const weather = ref<Weather | null>(null)
  const loading = ref(true)
  const error = ref(false)

  const fallback: Weather = {
    city: '淮北',
    temp: '--',
    desc: '晴',
    icon: '☀️',
  }

  const fetchWeather = async () => {
    try {
      // wttr.in 免费天气API
      const resp = await fetch('https://wttr.in/Huaibei?format=j1')
      const data = await resp.json()
      const current = data.current_condition?.[0]
      if (current) {
        const code = parseInt(current.weatherCode)
        let icon = '☀️'
        if (code >= 116 && code <= 122) icon = '☁️'
        else if (code >= 176 && code <= 299) icon = '🌧️'
        else if (code >= 300 && code <= 399) icon = '🌨️'
        else if (code >= 386) icon = '⛈️'

        weather.value = {
          city: '淮北',
          temp: current.temp_C,
          desc: current.lang_zh?.[0]?.value || current.weatherDesc?.[0]?.value || '晴',
          icon,
        }
      }
    } catch {
      error.value = true
      weather.value = fallback
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchWeather)
  return { weather, loading, error }
}
