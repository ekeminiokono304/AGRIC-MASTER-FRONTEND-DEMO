/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HistoryProvider } from './components/HistoryContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { YieldPredictor } from './pages/YieldPredictor';
import { DiseaseAssessment } from './pages/DiseaseAssessment';
import { PriceForecast } from './pages/PriceForecast';
import { LivestockAnomaly } from './pages/LivestockAnomaly';
import { DroughtRisk } from './pages/DroughtRisk';

export default function App() {
  return (
    <HistoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="yield" element={<YieldPredictor />} />
            <Route path="disease" element={<DiseaseAssessment />} />
            <Route path="price" element={<PriceForecast />} />
            <Route path="livestock" element={<LivestockAnomaly />} />
            <Route path="drought" element={<DroughtRisk />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HistoryProvider>
  );
}

