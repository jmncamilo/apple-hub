"use client";
import { useState } from "react";
import { CustomerForm } from "../forms/CustomerForm";

export function CustomerCard({ customer, onRefresh }) {
  // Contrlando el modal para editar el usuario
  const [isModalOpen, setIsModalOpen] = useState(false);
    // Funcion para cerrar el modal y pasar por prop a CustomerForm
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 min-h-[280px] flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
              {customer.names} {customer.lastnames}
            </h3>
            <p className="text-sm text-gray-500">ID: {customer.id}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
            {customer.age} años
          </div>
        </div>

        <div className="space-y-3 mb-4 flex-grow">
          <div className="flex items-center">
            <span className="text-gray-600 font-medium w-20 flex-shrink-0">
              Nuip:
            </span>
            <span className="text-gray-800 truncate">{customer.nuip}</span>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 font-medium w-20 flex-shrink-0">
              Email:
            </span>
            <span className="text-blue-600 hover:underline truncate">
              <a href={`mailto:${customer.email}`}>{customer.email}</a>
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 font-medium w-20 flex-shrink-0">
              Teléfono:
            </span>
            <span className="text-gray-800 truncate">
              {customer.phone_number}
            </span>
          </div>

          <div className="flex items-start">
            <span className="text-gray-600 font-medium w-20 flex-shrink-0">
              Dirección:
            </span>
            <span className="text-gray-800 flex-1 line-clamp-2">
              {customer.address}
            </span>
          </div>
        </div>

        {/* Botón para editar usuarios - siempre al final */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 !py-2 !px-4 !min-h-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 !text-base !font-medium mt-auto"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Editar
        </button>
      </div>

      {/* Modal para editar cliente */}
      {isModalOpen && <CustomerForm customer={customer} onClose={closeModal} onRefresh={onRefresh} />}
    </>
  );
}