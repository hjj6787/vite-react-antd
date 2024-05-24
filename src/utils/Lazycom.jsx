// LazyLoad.tsx
// loadable路由组件懒加载，组件按需加载

import React, { Suspense } from 'react';
import loadable from '@loadable/component';

const modules = import.meta.glob('@/pages/*/*.jsx');

function LazyLoad(url) {
  // console.log(url);
  const modulePath = `/src/pages/${url}.jsx`;

  // 检查确保模块路径在对象中存在并且是一个函数
  if (typeof modules[modulePath] !== 'function') {
    console.error(`Module not found or not a function: ${modulePath}`);
    console.log(modulePath);
    return null;
  }
  const LoadableComponent = loadable(() => modules[modulePath]());
  return (
    <Suspense>
      <LoadableComponent />
    </Suspense>
  );
}

export default LazyLoad;
