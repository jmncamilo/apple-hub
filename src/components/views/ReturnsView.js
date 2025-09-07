"use client";
import { useEffect, useState } from "react";
import { EditReturnForm } from "../forms/ReturnForm";
import Image from "next/image";
import Loader from "../common/Loader";

export function ReturnsView({ onClose, onRefresh, refreshUrl }) {
  const [returns, setReturns] = useState([]);
  const [editingReturn, setEditingReturn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch de devoluciones al montar el componente
  useEffect(() => {
    async function fetchReturns() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/returns");
        const data = await res.json();
        setReturns(data.returns || []);
      } catch (error) {
        setReturns([]);
      }
      setIsLoading(false);
    }
    fetchReturns();
  }, [refreshUrl]);

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

  // Manejador para cambiar el estado de la devolución
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch("/api/returns/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, return_status: newStatus }),
      });
      const result = await response.json();
      if (result.success) {
        // // Opcional: refresca la lista o muestra mensaje
        // if (typeof onRefresh === "function") onRefresh();
      } else {
        alert(result.error || "No se pudo actualizar el estado");
      }
    } catch (error) {
      alert("Error de red al actualizar el estado");
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      <Loader isVisible={isLoading} />
      {/* Header simplificado */}
      <div className="flex-shrink-0 px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
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
          {isLoading ? null : returns.map((returnItem) => (
            <div
              key={returnItem.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      🔄 Devolución #{returnItem.id}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        Pedido #{returnItem.order_id} - Item #{returnItem.order_item_id}
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
                  <div className="flex items-center">
                    <select
                      defaultValue={returnItem.return_status}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={e => handleStatusChange(returnItem.id, e.target.value)}
                    >
                      <option value="Solicitada">Solicitada</option>
                      <option value="Aprobada">Aprobada</option>
                      <option value="Rechazada">Rechazada</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Producto</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Nombre:</span> {returnItem.product_name}
                      </p>
                      <p>
                        <span className="font-medium">Referencia:</span> {returnItem.product_reference}
                      </p>
                      <p>
                        <span className="font-medium">Cantidad:</span> {returnItem.quantity}
                      </p>
                      <p>
                        <span className="font-medium">Valor:</span> {formatPrice(returnItem.subtotal)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Cliente</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Nombre:</span> {returnItem.customer_names} {returnItem.customer_lastnames}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {returnItem.customer_email}
                      </p>
                    </div>
                  </div>
                </div>
                {editingReturn === returnItem.id ? (
                  <EditReturnForm
                    returnItem={returnItem}
                    onSave={() => setEditingReturn(null)}
                    onCancel={() => setEditingReturn(null)}
                    onRefresh={onRefresh}
                  />
                ) : (
                  <>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Motivo de la Devolución</h4>
                      <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-md">
                        {returnItem.return_reason || "Sin especificar"}
                      </p>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Notas</h4>
                      <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-md">
                        {returnItem.notes || "Sin notas"}
                      </p>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Fecha de solicitud:</span> {formatDate(returnItem.return_date)}
                  </div>
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
          {!isLoading && returns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay devoluciones registradas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}