import { ref, onMounted, onUnmounted } from 'vue'

export function useTime() {
  const time = ref('')
  const date = ref('')
  let timer: ReturnType<typeof setInterval> | null = null

  const weekdays = ['日', '一', '二', '三', '四', '五', '六']

  function update() {
    const now = new Date()
    const h = String(now.getHours()).padStart(2, '0')
    const m = String(now.getMinutes()).padStart(2, '0')
    const s = String(now.getSeconds()).padStart(2, '0')
    time.value = `${h}:${m}:${s}`

    const month = now.getMonth() + 1
    const day = now.getDate()
    const weekday = weekdays[now.getDay()]
    date.value = `${month}月${day}日 周${weekday}`
  }

  onMounted(() => {
    update()
    timer = setInterval(update, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { time, date }
}
