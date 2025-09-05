"use client";
import { useState } from "react";
import { EditReturnForm } from "../forms/ReturnForm";
import mockReturns from "@/lib/random/mockApiReturns";
import Image from "next/image";

export function ReturnsView({ onClose }) {
  const [returns, setReturns] = useState(mockReturns);
  const [editingReturn, setEditingReturn] = useState(null);

  // Función para formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Función para obtener color del estado
  const getStatusColor = (status) => {
    const colors = {
      Solicitada: "bg-yellow-100 text-yellow-700",
      Aprobada: "bg-green-100 text-green-700",
      Rechazada: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      {/* Header simplificado */}
      <div className="flex-shrink-0 px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Logo de Apple Hub */}
          <div className="flex items-center">
            <Image
              src="/applehub-logo.png"
              alt="Apple Hub"
              width={110}
              height={110}
              className="w-auto h-11"
              quality={85}
            />
          </div>

          {/* Botón de volver */}
          <button
            onClick={onClose}
            className="!px-4 !py-2 !bg-gray-600 hover:!bg-gray-700 !text-white !rounded-md !transition-colors !duration-200 !flex !items-center !gap-2 !w-auto !min-w-0 !border !border-gray-600 hover:!border-gray-700 !outline-none focus:!ring-2 focus:!ring-gray-600"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Volver
          </button>
        </div>
      </div>

      {/* Contenido principal - SCROLLEABLE */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {returns.map((returnItem) => (
            <div
              key={returnItem.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  {/* Info principal */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      🔄 Devolución #{returnItem.id}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        Pedido #{returnItem.order_id} - Item #
                        {returnItem.order_item_id}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          returnItem.return_status
                        )}`}
                      >
                        {returnItem.return_status}
                      </span>
                    </div>
                  </div>

                  {/* Solo Select para estado */}
                  <div className="flex items-center">
                    <select
                      defaultValue={returnItem.return_status}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Solicitada">Solicitada</option>
                      <option value="Aprobada">Aprobada</option>
                      <option value="Rechazada">Rechazada</option>
                    </select>
                  </div>
                </div>

                {/* Información del producto y cliente */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Producto
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Nombre:</span>{" "}
                        {returnItem.product_name}
                      </p>
                      <p>
                        <span className="font-medium">Referencia:</span>{" "}
                        {returnItem.product_reference}
                      </p>
                      <p>
                        <span className="font-medium">Cantidad:</span>{" "}
                        {returnItem.quantity}
                      </p>
                      <p>
                        <span className="font-medium">Valor:</span>{" "}
                        {formatPrice(returnItem.subtotal)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Cliente
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Nombre:</span>{" "}
                        {returnItem.customer_names}{" "}
                        {returnItem.customer_lastnames}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {returnItem.customer_email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Formulario de edición o vista de datos */}
                {editingReturn === returnItem.id ? (
                  <EditReturnForm
                    returnItem={returnItem}
                    onSave={() => setEditingReturn(null)} // Solo cierra el formulario
                    onCancel={() => setEditingReturn(null)}
                  />
                ) : (
                  <>
                    {/* Motivo de la devolución */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Motivo de la Devolución
                      </h4>
                      <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-md">
                        {returnItem.return_reason || "Sin especificar"}
                      </p>
                    </div>

                    {/* Notas */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Notas
                      </h4>
                      <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-md">
                        {returnItem.notes || "Sin notas"}
                      </p>
                    </div>
                  </>
                )}

                {/* Footer con fecha y botón editar */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Fecha de solicitud:</span>{" "}
                    {formatDate(returnItem.return_date)}
                  </div>

                  {/* Botón editar */}
                  {editingReturn !== returnItem.id && (
                    <button
                      onClick={() => setEditingReturn(returnItem.id)}
                      className="!px-3 !py-1 !text-white !text-base !rounded-md !transition-colors !w-auto !min-w-0 !flex !items-center !gap-1 !border !border-blue-600 hover:!border-blue-700 !outline-none focus:!ring-2 focus:!ring-blue-600"
                    >
                      ✏️ Editar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {returns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay devoluciones registradas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}