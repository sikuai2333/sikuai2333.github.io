import { ref, onMounted, onUnmounted } from 'vue'

export function useTime() {
  const time = ref('')
  const date = ref('')
  const weekday = ref('')
  const isWeekend = ref(false)

  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  const update = () => {
    const now = new Date()
    time.value = now.toLocaleTimeString('zh-CN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    })
    date.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
    weekday.value = weekdays[now.getDay()]
    isWeekend.value = now.getDay() === 0 || now.getDay() === 6
  }

  let timer: ReturnType<typeof setInterval>
  onMounted(() => {
    update()
    timer = setInterval(update, 1000)
  })
  onUnmounted(() => clearInterval(timer))

  return { time, date, weekday, isWeekend }
}
