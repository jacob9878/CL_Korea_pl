"use client";

import { useState } from "react";
import Nav from "@/component/shared/Nav";
import Footer from "@/component/shared/Footer";
import SimpleLoginModal from "@/component/shared/SimpleLoginModal";
import Hero from "./Hero";
import Problem from "./Problem";
import Stats from "./Stats";
import Values from "./Values";
import Team from "./Team";
import Timeline from "./Timeline";
import Cta from "./Cta";

export default function AboutPage() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <Nav active="회사 소개" onLoginClick={() => setLoginOpen(true)} />
      <Hero onLoginClick={() => setLoginOpen(true)} />
      <Problem />
      <Stats />
      <Values />
      <Team />
      <Timeline />
      <Cta onLoginClick={() => setLoginOpen(true)} />
      <Footer />
      <SimpleLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
