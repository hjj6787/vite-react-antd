// LazyLoad.tsx
import { Suspense } from 'react'
import loadable from '@loadable/component'
const modules = import.meta.glob('@/src/pages/*/*.jsx')
const loadables = loadable

function LazyLoad(url) {
  const ComponentNode = loadables(async () => {
    return modules[`/src/pages/${url}.jsx`]()
  })
  return (
    <Suspense>
      <ComponentNode />
    </Suspense>
  )
}
export default LazyLoad


