import React, { Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import ErrorBoundary from '../components/ErrorBoundary';

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
			<ErrorBoundary>
				<Suspense fallback={<div>Carregando Home...</div>}>
					<HomeLazy />
				</Suspense>
			</ErrorBoundary>
		),
	},
	{
		path: '/dashboard',
		element: (
			<ErrorBoundary>
				<Suspense fallback={<div>Carregando Dashboard...</div>}>
					<DashboardLazy />
				</Suspense>
			</ErrorBoundary>
		),
	},
]);