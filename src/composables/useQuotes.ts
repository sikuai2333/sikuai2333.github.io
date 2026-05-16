import { ref } from 'vue'

const quotes = [
  '工资是精神损失费，加班是主动受害。',
  '996是福报，007是修仙。',
  '上班的心情比上坟还沉重。',
  '今天的我，也在为老板的梦想努力。',
  '我不是在上班，我是在渡劫。',
  '月薪三千的我，操着三千万的心。',
  '打工人，打工魂，打工都是人上人。',
  '只要干不死，就往死里干。',
  '今天的摸鱼，是为了明天更好的工作。',
  '上班就是用时间换钱，下班就是用钱换时间。',
  '我的工资里包含了委屈费。',
  '每天叫醒我的不是梦想，是穷。',
  '打工人的一天：早上不想起，中午不想动，下午不想干，晚上不想走。',
  '老板说年轻人要多吃苦，我信了，现在真的很苦。',
  '我的理想是不上班，但我的现实是不能不上班。',
  '工作使我快乐，工作使我进步，工作使我暴富——骗你的。',
  '别人朝九晚五，我朝九晚九。',
  '世界上最远的距离，是从周一到周五。',
  '我不是在摸鱼，我是在等待灵感。',
  '加班没有加班费，这叫「弹性工作制」。',
]

export function useQuotes() {
  const current = ref(quotes[Math.floor(Math.random() * quotes.length)])
  const usedIndex = ref(new Set<number>())

  const refresh = () => {
    let idx: number
    do {
      idx = Math.floor(Math.random() * quotes.length)
    } while (usedIndex.value.has(idx) && usedIndex.value.size < quotes.length)

    usedIndex.value.add(idx)
    if (usedIndex.value.size >= quotes.length) usedIndex.value.clear()
    current.value = quotes[idx]
  }

  return { current, refresh }
}
