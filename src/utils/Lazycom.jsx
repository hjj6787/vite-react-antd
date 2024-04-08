// LazyLoad.tsx
import { Suspense } from 'react'
import loadable from '@loadable/component'
const modules = import.meta.glob('@/pages/*/*.jsx')
const loadables = loadable

function LazyLoad(url) {
  console.log(url);
  const modulePath = `/src/pages/${url}.jsx`;

  // 检查确保模块路径在对象中存在并且是一个函数
  if (typeof modules[modulePath] !== 'function') {
    console.error(`Module not found or not a function: ${modulePath}`);
    return null;
  }

  const LoadableComponent = loadable(() => modules[modulePath]());
  return (
    <Suspense>
      <LoadableComponent />
    </Suspense>
    // <h1>11</h1>
  )
}
export default LazyLoad


