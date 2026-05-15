import { useTime } from '@/composables/useTime'
import { useWeather } from '@/composables/useWeather'

export function useStyleData() {
  const { time, date } = useTime()
  const { temp, desc } = useWeather()

  const cards = [
    { title: '博客', desc: '记录想法与技术笔记', icon: '✎', href: '#' },
    { title: '作品集', desc: '个人项目与实验作品', icon: '◈', href: '#' },
    { title: '工具站', desc: '实用在线小工具合集', icon: '⚙', href: '#' },
    { title: '更多', desc: '更多有趣的东西正在路上', icon: '✦', href: '#' },
  ]

  return { time, date, temp, desc, cards }
}
