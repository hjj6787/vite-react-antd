import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routercomponent';

function Routerpages() {
  const GetRoutes = () => useRoutes(routes);
  return (
    <React.Suspense fallback={<div>loading</div>}>
      <GetRoutes />
    </React.Suspense>
  );
}

export default Routerpages;
