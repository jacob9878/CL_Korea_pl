"use client";

import { LoginModalProvider } from "./LoginModalContext";
import Nav from "./Nav";
import Hero from "./Hero";
import LogoStrip from "./LogoStrip";
import HowItWorks from "./HowItWorks";
import CaseStudy from "./CaseStudy";
import AlternatingRows from "./AlternatingRows";
import Testimonials from "./Testimonials";
import Leadership from "./Leadership";
import CtaSection from "./CtaSection";
import Footer from "./Footer";
import LoginModal from "./LoginModal";

export default function LandingPage() {
  return (
    <LoginModalProvider>
      <Nav />
      <Hero />
      <LogoStrip />
      <HowItWorks />
      <CaseStudy />
      <AlternatingRows />
      <Testimonials />
      <Leadership />
      <CtaSection />
      <Footer />
      <LoginModal />
    </LoginModalProvider>
  );
}
