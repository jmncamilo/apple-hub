"use client";
import { useRouter } from "next/navigation"; // ← Correcto para App Router

export function LogoutConfirmation() {
  const router = useRouter();

  const handleConfirmLogout = () => {
    console.log('Cerrando sesión...');
    // Aquí se maneja la lógica de cerrar sesión
  };

  const handleCancel = () => {
    console.log('Cancelando...'); // para testing...
    router.push("/dashboard"); // redirige al home
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md min-w-[420px] w-full">
      {/* Ícono de advertencia */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9v4M12 17h.01M12 2L2 22h20L12 2z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Título */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Cerrar Sesión
      </h2>

      {/* Mensaje */}
      <p className="text-gray-600 text-center mb-8 leading-relaxed">
        ¿Estás seguro de que deseas cerrar tu sesión? 
        <br />
        Tendrás que volver a iniciar sesión para acceder al dashboard.
      </p>

      {/* Botones */}
      <div className="flex gap-4">
        <button
          onClick={handleCancel}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 !py-3 !px-4 !min-h-0 rounded-lg transition-colors duration-200 !text-base !font-medium !w-auto !min-w-0"
        >
          Cancelar
        </button>
        
        <button
          onClick={handleConfirmLogout}
          className="flex-1 !bg-red-400 !hover:bg-red-600 !border-0 text-white !py-3 !px-4 !min-h-0 rounded-lg transition-colors duration-200 !text-base !font-medium !w-auto !min-w-0"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Información adicional */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          No te preocupes, el proceso de inicio de sesión es rápido y seguro. Vuelve pronto.
        </p>
      </div>
    </div>
  );
}