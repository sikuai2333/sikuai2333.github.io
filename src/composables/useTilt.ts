import { ref, onMounted, type Ref } from 'vue'

export function useTilt(el: Ref<HTMLElement|null>, maxDeg = 8) {
  const transform = ref('')

  onMounted(() => {
    if (!el.value) return
    const node = el.value
    node.style.transition = 'transform 0.15s ease-out'
    node.style.transformStyle = 'preserve-3d'

    node.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      transform.value = `perspective(600px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) scale(1.02)`
      node.style.transform = transform.value
    })

    node.addEventListener('mouseleave', () => {
      node.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)'
    })
  })

  return { transform }
}
