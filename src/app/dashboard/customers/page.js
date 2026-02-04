"use client";
import { CustomerCard } from "@/components/cards/CustomerCard";
import { CustomerForm } from "@/components/forms/CustomerForm";
import Loader from "@/components/common/Loader";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";

export default function DashboardUsers() {
  // Usando estado para refrescar el fetch de los clientes
  const [refreshUrl, setRefreshUrl] = useState(0);
    // Función para setear valor y refrescar el fetch
  const onRefresh = () => {
    setRefreshUrl((prev) => prev + 1);
  };

  // Controlando el modal para editar el usuario
  const [isModalOpen, setIsModalOpen] = useState(false);
    // Función para cerrar el modal y pasar por prop a CustomerForm
  const closeModal = () => setIsModalOpen(false);

  // Desestructurando el custom hook useFetch
  const { data, error, isLoading } = useFetch(`/api/customers?upt=${refreshUrl}`);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Esto es el título del módulo */}
      <div className="flex-shrink-0 px-8 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
            <p className="text-gray-600 mt-1">Histórico de Clientes</p>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white !py-2 !px-4 !min-h-0 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 !text-sm !font-medium !w-auto">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Añadir Cliente
          </button>
        </div>
      </div>

      {/* Contenedor donde están las cards de los clientes */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.customers?.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} onRefresh={onRefresh} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal para registrar o añadir cliente */}
      {isModalOpen && (
        <CustomerForm
          onClose={closeModal}
          registerForm={true}
          onRefresh={onRefresh}
        />
      )}

      {/* Loader mostrándose o no... */}
      <Loader isVisible={isLoading} />
    </div>
  );
}