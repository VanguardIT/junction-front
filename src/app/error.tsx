"use client";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
      <p className="text-muted-foreground">
        Sorry, an unexpected error has occurred.
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
