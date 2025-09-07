"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-xl rounded-2xl shadow-2xl flex flex-col items-center p-10 gap-6">
        <div className="text-7xl font-extrabold text-blue-600 mb-2">404</div>
        <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          Página no encontrada
        </div>
        <p className="text-gray-500 mb-6 text-center">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}