"use client";
import { useState } from "react";

export function OrderCard({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
      "En Proceso": "bg-blue-100 text-blue-700",
      Entregado: "bg-green-100 text-green-700",
      Cancelado: "bg-red-100 text-red-700",
      Devuelto: "bg-yellow-100 text-yellow-700",
      Enviado: "bg-purple-100 text-purple-700",
      Garantía: "bg-orange-100 text-orange-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 mb-4">
      {/* Header del pedido - Siempre visible */}
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          {/* Info principal */}
          <div className="flex items-center gap-6">
            {/* Número de pedido */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                📦 Pedido #{order.id}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDate(order.created_at)}
              </p>
            </div>

            {/* Cliente */}
            <div>
              <p className="font-medium text-gray-800">
                {order.names} {order.lastnames}
              </p>
              <p className="text-sm text-gray-500">{order.email}</p>
            </div>
          </div>

          {/* Lado derecho: Total + Estado + Controles */}
          <div className="flex items-center gap-6">
            {/* Total del pedido */}
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-800">
                {formatPrice(order.total_amount)}
              </p>
              <p className="text-sm text-gray-500">
                {order.order_items.length} producto(s)
              </p>
            </div>

            {/* Estado y controles */}
            <div className="flex items-center gap-4">
              {/* Estado del pedido */}
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

                {/* Select para cambiar estado del pedido */}
                <select
                  defaultValue={order.status}
                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="En Proceso">En Proceso</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Devuelto">Devuelto</option>
                </select>
              </div>

              {/* Flecha expandir */}
              <div
                className={`transform transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido expandible */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-blue-50/60">
          {/* Info del cliente y dirección */}
          <div className="p-6 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Información del Cliente
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">NUIP:</span> {order.nuip}
                  </p>
                  <p>
                    <span className="font-medium">Teléfono:</span>{" "}
                    {order.phone_number}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Dirección de Entrega
                </h4>
                <p className="text-sm text-gray-600">
                  {order.delivery_address}
                </p>
              </div>
            </div>
          </div>

          {/* Items del pedido */}
          <div className="p-6">
            <h4 className="font-semibold text-gray-800 mb-4">
              Productos del Pedido
            </h4>
            <div className="space-y-3">
              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/95 p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    {/* Info del producto */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">
                            {item.product_name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            Ref: {item.product_reference}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-medium text-gray-800">
                            {item.quantity} x {formatPrice(item.unit_price)}
                          </p>
                          <p className="text-lg font-bold text-gray-800">
                            {formatPrice(item.subtotal)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Estado del item */}
                    <div className="flex flex-col items-end gap-2 ml-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>

                      {/* Select para cambiar estado del item */}
                      <select
                        defaultValue={item.status}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Devuelto">Devuelto</option>
                        <option value="Garantía">Garantía</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}