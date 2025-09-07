"use client";
import { useState } from "react";
import { OrderCard } from "@/components/cards/OrderCard";
import { NewOrderView } from "@/components/views/NewOrderView";
import { WarrantiesView } from "@/components/views/WarrantiesView";
import { ReturnsView } from "@/components/views/ReturnsView";
import { useFetch } from "@/hooks/useFetch";
import Loader from "@/components/common/Loader";

export default function DashboardOrders() {
  // Usando estado para refrescar el fetch de los clientes
  const [refreshUrl, setRefreshUrl] = useState(0);
    // Función para setear valor y refrescar el fetch
  const onRefresh = () => {
    setRefreshUrl((prev) => prev + 1);
  };

  // Haciendo el fetching de datos para traernos las orders
  const { data, error, isLoading } = useFetch(`/api/orders?upt=${refreshUrl}`);
  const orders = data?.orders || [];

  const [activeModal, setActiveModal] = useState(null); // null, 'new', 'warranties', 'returns'

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Header del módulo */}
      <div className="flex-shrink-0 px-8 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Pedidos</h1>
            <p className="text-gray-600 mt-1">Gestión de Pedidos</p>
          </div>

          {/* Botones de acciones */}
          <div className="flex items-center gap-3">
            {/* Registrar Pedido */}
            <button
              onClick={() => setActiveModal("new")}
              className="!py-2 !px-3 !min-h-0 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 !text-xs !font-medium !w-auto"
            >
              <svg
                width="14"
                height="14"
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
              Registrar Pedido
            </button>

            {/* Garantías */}
            <button
              onClick={() => setActiveModal("warranties")}
              className="!py-2 !px-3 !min-h-0 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 !text-xs !font-medium !w-auto"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Garantías
            </button>

            {/* Devoluciones */}
            <button
              onClick={() => setActiveModal("returns")}
              className="!py-2 !px-3 !min-h-0 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 !text-xs !font-medium !w-auto"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Devoluciones
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal -> SIEMPRE se muestran los pedidos */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          {orders.map((item) => (
            <OrderCard key={item.id} order={item} onRefresh={onRefresh} />
          ))}
        </div>
      </div>

      {/* Overlays modales que ocupan todo el contenedor */}
      {activeModal === "new" && (
        <div className="absolute inset-0 bg-white z-50">
          <NewOrderView onClose={() => setActiveModal(null)} onRefresh={onRefresh} />
        </div>
      )}

      {activeModal === "warranties" && (
        <div className="absolute inset-0 bg-white z-50">
          <WarrantiesView onClose={() => setActiveModal(null)} />
        </div>
      )}

      {activeModal === "returns" && (
        <div className="absolute inset-0 bg-white z-50">
          <ReturnsView onClose={() => setActiveModal(null)} onRefresh={onRefresh} refreshUrl={refreshUrl} />
        </div>
      )}

      {/* Componente loading */}
      {<Loader isVisible={isLoading}/>}
    </div>
  );
}