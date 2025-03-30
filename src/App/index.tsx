/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useRef, useState, useEffect } from "react";
import "./App.scss";
import { LiveAPIProvider } from "../contexts/LiveAPIContext";
import { CartProvider } from "../contexts/CartContext";
import { AppProvider } from "../contexts/AppContext";
import { SavedItemsProvider } from "../contexts/SavedItemsContext";
import { RecentlyViewedProvider } from "../contexts/RecentlyViewedContext";
import SidePanel from "../components/side-panel/SidePanel";
import { GenList } from "../components/genlist/GenList";
import ControlTray from "../components/ControlTray/ControlTray";
import cn from "classnames";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { NavAssistant } from '../components/NavAssistant/NavAssistant';
import { BabyBootJean } from '../pages/BabyBootJean';
import { Cart } from '../pages/Cart';
import { OrderPaymentConfirmation } from '../pages/OrderPaymentConfirmation';
import { Profile } from '../pages/Profile';
import All from '../pages/All';
import Clothing from '../pages/Clothing';
import Electronics from '../pages/Electronics';
import Deals from '../pages/Deals';
import Categories from '../pages/Categories';
import { Auth0ProviderWithNavigate } from '../auth/Auth0ProviderWithNavigate';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import PersonalizedPage from '../pages/PersonalizedPage';
import ProductDetail from "../pages/ProductDetail";
import InStore from "../pages/InStore";
import SearchResults from '../pages/SearchResults';
import CompareProducts from '../pages/CompareProducts';
import NotFoundPage from '../pages/NotFoundPage';
import Mens from '../pages/clothing/MensTemplate';
import Womens from '../pages/clothing/WomensTemplate';
import Accessories from '../pages/clothing/AccessoriesTemplate';
import Hats from '../pages/clothing/HatsTemplate';
import Shirts from '../pages/clothing/ShirtsTemplate';
import Jeans from '../pages/clothing/JeansTemplate';
import Dresses from '../pages/clothing/DressesTemplate';
import Smartphones from '../pages/electronics/SmartphonesTemplate';
import Laptops from '../pages/electronics/LaptopsTemplate';
import ElectronicsAccessories from '../pages/electronics/AccessoriesTemplate';
// Pet Pages Imports
import PetsPage from '../pages/pets/PetsPage';
import Dog from '../pages/pets/Dog';
import Cat from '../pages/pets/Cat';
import PetSupplies from '../pages/pets/PetSupplies';
import ImageLoadMonitor from '../components/Image/ImageLoadMonitor';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

// Navigation helper component to handle redirects
function NavigationHelper() {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if we need to redirect from sessionStorage
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath && redirectPath !== location.pathname) {
      sessionStorage.removeItem('redirectPath');
      navigate(redirectPath);
    }
  }, [navigate, location]);
  
  return null;
}

// Create a redirect component to handle old URL pattern
const ProductRedirect = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    // Determine category based on product ID
    let category = 'clothing';
    const productId = parseInt(id || '0', 10);
    
    if (productId >= 100 && productId < 200) {
      category = 'electronics';
    } else if (productId >= 200) {
      category = 'clothing';
    } else {
      category = 'pets';
    }
    
    // Redirect to the correct URL pattern
    navigate(`/${category}/${id}`, { replace: true });
  }, [id, navigate]);
  
  return <div>Redirecting...</div>;
};

function App() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [showMonitor, setShowMonitor] = useState(false);
  
  // Enable image monitor when pressing Ctrl+Shift+I
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        setShowMonitor(prev => !prev);
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <CartProvider>
          <SavedItemsProvider>
            <RecentlyViewedProvider>
              <AppProvider>
                <div className="App">
                  {/* Add floating bubbles for enhanced background effects */}
                  <div className="floating-bubble bubble-1"></div>
                  <div className="floating-bubble bubble-2"></div>
                  <div className="floating-bubble bubble-3"></div>
                  <div className="floating-bubble bubble-4"></div>
                  
                  <LiveAPIProvider url={uri} apiKey={API_KEY}>
                    <NavigationHelper />
                    <Header />
                    <NavAssistant />
                    <div className="main-content">
                      <Routes>
                        {/* Home and Search Routes */}
                        <Route path="/" element={<All />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/compare" element={<CompareProducts />} />
                        <Route path="/instore" element={<InStore />} />
                        <Route path="/deals" element={<Deals />} />
                        <Route path="/categories" element={<Categories />} />

                        {/* Product Detail Routes */}
                        <Route path="/:category/:id" element={<ProductDetail />} />
                        <Route path="/product/:id" element={<ProductRedirect />} />
                        <Route path="/clothing/jeans/baby-boot" element={<BabyBootJean />} />

                        {/* Cart and Order Routes */}
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order-payment-confirmation" element={<OrderPaymentConfirmation />} />

                        {/* Protected Routes */}
                        <Route path="/profile" element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } />
                        <Route path="/personalized" element={
                          <ProtectedRoute>
                            <PersonalizedPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/personalized/:id" element={
                          <ProtectedRoute>
                            <ProductDetail />
                          </ProtectedRoute>
                        } />

                        {/* Clothing Routes */}
                        <Route path="/clothing">
                          <Route index element={<Clothing />} />
                          <Route path="mens" element={<Mens />} />
                          <Route path="womens" element={<Womens />} />
                          <Route path="accessories" element={<Accessories />} />
                          <Route path="hats" element={<Hats />} />
                          <Route path="shirts" element={<Shirts />} />
                          <Route path="jeans" element={<Jeans />} />
                          <Route path="dresses" element={<Dresses />} />
                        </Route>

                        {/* Electronics Routes */}
                        <Route path="/electronics">
                          <Route index element={<Electronics />} />
                          <Route path="smartphones" element={<Smartphones />} />
                          <Route path="laptops" element={<Laptops />} />
                          <Route path="accessories" element={<ElectronicsAccessories />} />
                        </Route>

                        {/* Pets Routes */}
                        <Route path="/pets">
                          <Route index element={<PetsPage />} />
                          <Route path="dog" element={<Dog />} />
                          <Route path="cat" element={<Cat />} />
                          <Route path="supplies" element={<PetSupplies />} />
                        </Route>

                        {/* 404 Route */}
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </div>
                    {/* Video container for webcam or screen captures */}
                    <div className={`video-container ${videoStream ? 'active' : ''}`}>
                      {videoStream && <video ref={videoRef} autoPlay muted playsInline />}
                      <ControlTray
                        videoRef={videoRef}
                        onVideoStreamChange={setVideoStream}
                        supportsVideo={true}
                      >
                        {/* put your own buttons here */}
                      </ControlTray>
                    </div>
                    {showMonitor && <ImageLoadMonitor position="bottom-right" />}
                  </LiveAPIProvider>
                </div>
              </AppProvider>
            </RecentlyViewedProvider>
          </SavedItemsProvider>
        </CartProvider>
      </Auth0ProviderWithNavigate>
    </Router>
  );
}

export default App;