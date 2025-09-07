"use client";
import { useState } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import products from "@/lib/random/mockApiProducts";
import { ProductForm } from "../forms/ProductForm";
import { useFetch } from "@/hooks/useFetch";
import { getOptions } from "@/lib/utils/optionsFetch";
import Loader from "../common/Loader";

export function ProductsContainer() {
  // Usando estado para refrescar el fetch de los clientes
  const [refreshUrl, setRefreshUrl] = useState(0);
    // Función para setear valor y refrescar el fetch
    const onRefresh = () => {
      setRefreshUrl((prev) => prev + 1);
    };

  // Declaración y manejador para cierre del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Haciendo el fetch para traer los productos de la api
  const { data, isLoading, error } = useFetch(`/api/products?upt=${refreshUrl}`);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Header con botón */}
      <div className="flex-shrink-0 px-8 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Catálogo de Productos
            </h2>
            <p className="text-gray-600 mt-1">
              {data?.products?.length} productos disponibles
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium whitespace-nowrap"
            >
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
              Añadir Producto
            </button>
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.products?.map((product) => (
            <ProductCard key={product.id} product={product} onRefresh={onRefresh} role={data?.role} />
          ))}
        </div>
      </div>

      {/* Modal básico */}
      {isModalOpen && (
        <ProductForm
          isOpen={isModalOpen}
          product={undefined}
          onClose={closeModal}
          onRefresh={onRefresh}
        />
      )}

      {/* Loader mostrándose o no... */}
      <Loader isVisible={isLoading} />
    </div>
  );
}