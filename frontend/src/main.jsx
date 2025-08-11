import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import ErrorBoundary from './components/ErrorBoundary.jsx'
import routes from './routes/routes.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={routes} />
</ErrorBoundary>
  </StrictMode>
);
