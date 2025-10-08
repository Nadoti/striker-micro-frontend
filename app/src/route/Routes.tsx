import React, { Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App"

const [DashboardLazy, HomeLazy] = [
	'Dashboard',	
	'Home',
  ].map(app => React.lazy(() => import(`../components/${app}`)));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/home',
		element: (
			<Suspense fallback={<div>Carregando Home...</div>}>
				<HomeLazy />
			</Suspense>
		),
	},
	{
		path: '/dashboard',
		element: (
			<Suspense fallback={<div>Carregando Dashboard...</div>}>
				<DashboardLazy />
			</Suspense>
		),
	},
]);