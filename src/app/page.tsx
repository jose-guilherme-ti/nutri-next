import { Suspense } from "react";
import LandingPage from "@/components/LandingPage";

export default function HomePage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Carregando...</div>}>
      <LandingPage />
    </Suspense>
  );
}
