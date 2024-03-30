// LazyLoad.tsx
import { Suspense } from 'react'
import loadable from '@loadable/component'
const modules = import.meta.glob('@/views/main/*/*.tsx')
const loadables = loadable

function LazyLoad(url) {
  const ComponentNode = loadables(async () => {
    return modules[`/src/pages/main${url}.tsx`]()
  })
  return (
    <Suspense>
      <ComponentNode />
    </Suspense>
  )
}
export default LazyLoad


