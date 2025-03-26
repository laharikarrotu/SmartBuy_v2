import { useRef, useState } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import { CartProvider } from "./contexts/CartContext";
import SidePanel from "./components/side-panel/SidePanel";
import { GenList } from "./components/genlist/GenList";
import ControlTray from "./components/control-tray/ControlTray";
import cn from "classnames";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { NavAssistant } from './components/nav-assistant/NavAssistant';
import { BabyBootJean } from './pages/BabyBootJean';
import { Cart } from './pages/Cart';
import { OrderPaymentConfirmation } from './pages/OrderPaymentConfirmation';
import { Profile } from './pages/Profile';
import All from './pages/All';
import Dog from './pages/Dog';
import Clothing from "./pages/Clothing";
import Electronics from "./pages/Electronics";
import { Auth0ProviderWithNavigate } from './auth/Auth0ProviderWithNavigate';
import { ProtectedRoute } from './auth/ProtectedRoute';
import PersonalizedPage from './pages/PersonalizedPage';
import ModernRibPullover from './pages/ModernRibPullover';
import StrawPanamaHat from './pages/StrawPanamaHat';
import GapLogoTote from './pages/GapLogoTote';
import ProductDetail from "./pages/ProductDetail";
import PersonalizedProductDetail from './pages/PersonalizedProductDetail';
import InStore from "./pages/InStore";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

function App() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <CartProvider>
          <div className="App">
            <LiveAPIProvider url={uri} apiKey={API_KEY}>
              <Header />
              <NavAssistant />
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<All />} />
                  <Route path="/all" element={<All />} />
                  <Route path="/dog" element={<Dog />} />
                  <Route path="/clothing" element={<Clothing />} />
                  <Route path="/electronics" element={<Electronics />} />
              
                  <Route path="/instore" element={<InStore />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/baby-boot-jean" element={<BabyBootJean />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order-payment-confirmation" element={<OrderPaymentConfirmation />} />
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
                  <Route path="/personalized-items/:id" element={<PersonalizedPage />} />
                  <Route path="/modern-rib-pullover" element={<ModernRibPullover />} />
                  <Route path="/straw-panama-hat" element={<StrawPanamaHat />} />
                  <Route path="/gap-logo-tote" element={<GapLogoTote />} />
                  <Route path="/personalized/:id" element={<PersonalizedProductDetail />} />
                </Routes>
              </div>
              <div className="video-container active">
                <video ref={videoRef} autoPlay muted playsInline />
                <ControlTray
                  videoRef={videoRef}
                  onVideoStreamChange={setVideoStream}
                  supportsVideo={true}
                >
                  {/* put your own buttons here */}
                </ControlTray>
              </div>
            </LiveAPIProvider>
          </div>
        </CartProvider>
      </Auth0ProviderWithNavigate>
    </Router>
  );
}

export default App;