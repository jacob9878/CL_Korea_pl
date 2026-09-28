import { Suspense } from "react";
import LoginPage from "@/component/auth/LoginPage";

export default function Page() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
