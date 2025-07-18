"use client";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <AlertTriangle className="h-16 w-16 text-primary mb-2" />
      <h1 className="text-2xl font-bold text-primary">Page Not Found</h1>
      <p className="text-muted-foreground">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
}
