import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useCountdown(targetHour = 18, targetMinute = 0) {
  const remaining = ref('')
  const isOvertime = ref(false)
  const percent = ref(0)

  const update = () => {
    const now = new Date()
    const target = new Date(now)
    target.setHours(targetHour, targetMinute, 0, 0)

    const diff = target.getTime() - now.getTime()

    if (diff <= 0) {
      isOvertime.value = true
      const absDiff = Math.abs(diff)
      const h = Math.floor(absDiff / 3600000)
      const m = Math.floor((absDiff % 3600000) / 60000)
      const s = Math.floor((absDiff % 60000) / 1000)
      remaining.value = `+ ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      percent.value = 100
    } else {
      isOvertime.value = false
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      remaining.value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`

      // 工作时间 9:00 ~ 18:00 = 9小时
      const workStart = new Date(now)
      workStart.setHours(9, 0, 0, 0)
      const totalWork = target.getTime() - workStart.getTime()
      const elapsed = now.getTime() - workStart.getTime()
      percent.value = Math.max(0, Math.min(100, (elapsed / totalWork) * 100))
    }
  }

  let timer: ReturnType<typeof setInterval>
  onMounted(() => {
    update()
    timer = setInterval(update, 1000)
  })
  onUnmounted(() => clearInterval(timer))

  return { remaining, isOvertime, percent }
}
