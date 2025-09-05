"use client";
import { useState } from "react";
import Image from "next/image";
import mockCustomers from "@/lib/random/mockApiCustomers.js";
import mockProducts from "@/lib/random/mockApiProducts";

export function NewOrderView({ onClose }) {
  // Estados para el formulario (solo para UI, sin lógica)
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderItems, setOrderItems] = useState([
    { product_id: "", quantity: 1, unit_price: 0 },
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const addNewItem = () => {
    setOrderItems([
      ...orderItems,
      { product_id: "", quantity: 1, unit_price: 0 },
    ]);
  };

  const removeItem = (index) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      return total + item.quantity * item.unit_price;
    }, 0);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-indigo-50 flex flex-col">
      {/* Header */}
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

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H2m5 10v6a1 1 0 001 1h10a1 1 0 001-1v-6m-9 3h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Nuevo Pedido
            </h1>
            <p className="text-gray-600">
              Registra un nuevo pedido para tus clientes
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <form className="p-8 space-y-8">
              {/* Sección Cliente */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <span className="bg-purple-300 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Información del Cliente
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Cliente *
                    </label>
                    <select
                      value={selectedCustomer}
                      onChange={(e) => setSelectedCustomer(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecciona un cliente</option>
                      {mockCustomers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.names} {customer.lastnames} -{" "}
                          {customer.email}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección de Entrega *
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ingresa la dirección completa de entrega"
                    />
                  </div>
                </div>
              </div>

              {/* Sección Productos */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="bg-green-300 text-green-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      2
                    </span>
                    Productos del Pedido
                  </h2>
                  <button
                    type="button"
                    onClick={addNewItem}
                    className="!text-white hover:!bg-indigo-50 hover:!text-indigo-700 !px-4 !py-2 !rounded-lg !flex !items-center !gap-2 !transition-colors !w-auto !min-w-0 !border"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5v14m-7-7h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Agregar Producto
                  </button>
                </div>

                <div className="space-y-6">
                  {orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-6 rounded-xl border border-gray-200"
                    >
                      {/* Fila 1: Producto */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Producto *
                        </label>
                        <select
                          value={item.product_id}
                          onChange={(e) => {
                            const selectedProduct = mockProducts.find(
                              (p) => p.id === parseInt(e.target.value)
                            );
                            const newItems = [...orderItems];
                            newItems[index] = {
                              ...newItems[index],
                              product_id: e.target.value,
                              unit_price: selectedProduct
                                ? selectedProduct.price
                                : 0,
                            };
                            setOrderItems(newItems);
                          }}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option hidden value="">Selecciona un producto</option>
                          {mockProducts.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.product_name} - {formatPrice(product.price)} (Stock: {product.stock_quantity})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Fila 2: Cantidad, Precio Unitario y Subtotal */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Cantidad */}
                        <div className="flex items-center h-full">
                          <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Cantidad *
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="999"
                              value={item.quantity}
                              onChange={(e) => {
                                const newItems = [...orderItems];
                                newItems[index].quantity =
                                  parseInt(e.target.value) || 1;
                                setOrderItems(newItems);
                              }}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-center"
                            />
                          </div>
                        </div>

                        {/* Precio Unitario */}
                        <div className="flex items-center h-full">
                          <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Precio Unitario
                            </label>
                            <div className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 text-center font-medium">
                              {formatPrice(item.unit_price)}
                            </div>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="flex items-center h-full">
                          <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Subtotal
                            </label>
                            <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg text-purple-700 font-bold text-center">
                              {formatPrice(item.quantity * item.unit_price)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fila 3: Solo Botón Eliminar */}
                      {orderItems.length > 1 && (
                        <div className="!flex !justify-end !pt-2">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="hover:!text-red-700 !px-3 !py-2 hover:!bg-red-50 !rounded-lg !transition-colors !flex !items-center !gap-2 !border hover:!border-red-300 !w-auto !min-w-0"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Eliminar producto
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen del Pedido */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <span className="bg-yellow-200 text-yellow-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Resumen del Pedido
                </h2>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        Total de productos: {orderItems.length}
                      </p>
                      <p className="text-sm text-gray-600">
                        Cantidad total:{" "}
                        {orderItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}{" "}
                        unidad(es)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total del pedido:</p>
                      <p className="text-2xl font-bold text-indigo-800">
                        {formatPrice(calculateTotal())}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors font-semibold"
                >
                  Crear Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}