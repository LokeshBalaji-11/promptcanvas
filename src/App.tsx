import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';

const StudioPage = lazy(() => import('./pages/StudioPage').then(module => ({ default: module.StudioPage })));
const PreviewWall = lazy(() => import('./components/library/PreviewWall').then(module => ({ default: module.PreviewWall })));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="fixed inset-0 bg-[#07070A] text-white flex items-center justify-center font-mono text-xs">
          LOADING PROMPTCANVAS KERNEL...
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/studio/__preview-wall" element={<PreviewWall />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
