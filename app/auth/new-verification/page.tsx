import { NewVerificationForm } from "@/components/auth/new-verification";
import { Suspense } from "react";

export default function NewVerificationPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
}
