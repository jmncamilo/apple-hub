"use client";
import { CustomerCard } from "@/components/cards/CustomerCard";
import { CustomerForm } from "@/components/forms/CustomerForm";
import { useState } from "react";

export default function DashboardUsers() {
  // Contrlando el modal para editar el usuario
  const [isModalOpen, setIsModalOpen] = useState(false);
    // Función para cerrar el modal y pasar por prop a CustomerForm
  const closeModal = () => setIsModalOpen(false);

  // Simulando el SELECT * FROM customers desde la API
  const customers = [
    {
      id: 1,
      nuip: "1234567890",
      names: "Ana María",
      lastnames: "Rodríguez Silva",
      email: "ana.rodriguez@email.com",
      age: 28,
      gender: "F",
      address: "Calle 123 #45-67, Bogotá",
      phone_number: "3001234567",
      created_at: "2025-08-15T14:30:25.123Z",
      updated_at: "2025-08-20T09:15:42.456Z",
    },
    {
      id: 2,
      nuip: "9876543210",
      names: "Carlos Andrés",
      lastnames: "Martínez López",
      email: "carlos.martinez@email.com",
      age: 35,
      gender: "M",
      address: "Carrera 15 #78-90, Medellín",
      phone_number: "3019876543",
      created_at: "2025-08-18T10:45:12.789Z",
      updated_at: "2025-08-18T10:45:12.789Z",
    },
    {
      id: 3,
      nuip: "1122334455",
      names: "Laura Sofía",
      lastnames: "García Hernández",
      email: "laura.garcia@email.com",
      age: 42,
      gender: "F",
      address: "Dirección de Testeo Av.",
      phone_number: "3102133511",
      created_at: "2025-08-25T16:22:33.012Z",
      updated_at: "2025-09-01T11:30:15.345Z",
    },
    {
      id: 4,
      nuip: "5566778899",
      names: "Miguel",
      lastnames: "Torres Vásquez",
      email: "miguel.torres@email.com",
      age: 31,
      gender: "M",
      address: "Avenida 80 #52-14, Cali",
      phone_number: "3145678901",
      created_at: "2025-08-20T08:15:30.456Z",
      updated_at: "2025-08-20T08:15:30.456Z",
    },
    {
      id: 5,
      nuip: "2233445566",
      names: "Isabella",
      lastnames: "Ramírez Castillo",
      email: "isabella.ramirez@email.com",
      age: 26,
      gender: "F",
      address: "Transversal 45 #12-78, Barranquilla",
      phone_number: "3157890123",
      created_at: "2025-08-22T13:45:18.789Z",
      updated_at: "2025-08-22T13:45:18.789Z",
    },
    {
      id: 6,
      nuip: "7788990011",
      names: "Diego",
      lastnames: "Morales Sánchez",
      email: "diego.morales@email.com",
      age: 39,
      gender: "M",
      address: "Calle 72 #11-25, Bucaramanga",
      phone_number: "3168901234",
      created_at: "2025-08-23T16:20:45.012Z",
      updated_at: "2025-08-23T16:20:45.012Z",
    },
    {
      id: 7,
      nuip: "3344556677",
      names: "Valentina",
      lastnames: "Cruz Peña",
      email: "valentina.cruz@email.com",
      age: 24,
      gender: "F",
      address: "Carrera 30 #85-42, Pereira",
      phone_number: "3179012345",
      created_at: "2025-08-24T11:30:22.345Z",
      updated_at: "2025-08-24T11:30:22.345Z",
    },
    {
      id: 8,
      nuip: "8899001122",
      names: "Sebastián",
      lastnames: "Ruiz Montoya",
      email: "sebastian.ruiz@email.com",
      age: 33,
      gender: "M",
      address: "Avenida Norte #67-89, Manizales",
      phone_number: "3180123456",
      created_at: "2025-08-25T09:45:33.678Z",
      updated_at: "2025-08-25T09:45:33.678Z",
    },
    {
      id: 9,
      nuip: "4455667788",
      names: "Camila",
      lastnames: "Vargas Duarte",
      email: "camila.vargas@email.com",
      age: 29,
      gender: "F",
      address: "Calle 50 #23-16, Ibagué",
      phone_number: "3191234567",
      created_at: "2025-08-26T14:15:44.901Z",
      updated_at: "2025-08-26T14:15:44.901Z",
    },
    {
      id: 10,
      nuip: "9900112233",
      names: "Andrés",
      lastnames: "Patiño Guerrero",
      email: "andres.patino@email.com",
      age: 37,
      gender: "M",
      address: "Diagonal 25 #48-73, Neiva",
      phone_number: "3202345678",
      created_at: "2025-08-27T12:30:55.234Z",
      updated_at: "2025-08-27T12:30:55.234Z",
    },
    {
      id: 11,
      nuip: "5566778800",
      names: "Daniela",
      lastnames: "Ospina Leal",
      email: "daniela.ospina@email.com",
      age: 25,
      gender: "F",
      address: "Carrera 18 #34-56, Popayán",
      phone_number: "3213456789",
      created_at: "2025-08-28T10:45:06.567Z",
      updated_at: "2025-08-28T10:45:06.567Z",
    },
    {
      id: 12,
      nuip: "1100223344",
      names: "Felipe",
      lastnames: "Agudelo Rivera",
      email: "felipe.agudelo@email.com",
      age: 30,
      gender: "M",
      address: "Calle 8 #15-92, Pasto",
      phone_number: "3224567890",
      created_at: "2025-08-29T15:20:17.890Z",
      updated_at: "2025-08-29T15:20:17.890Z",
    },
    {
      id: 13,
      nuip: "6677889900",
      names: "Sofía",
      lastnames: "Jiménez Álvarez",
      email: "sofia.jimenez@email.com",
      age: 27,
      gender: "F",
      address: "Avenida Central #60-31, Armenia",
      phone_number: "3235678901",
      created_at: "2025-08-30T08:35:28.123Z",
      updated_at: "2025-08-30T08:35:28.123Z",
    },
    {
      id: 14,
      nuip: "2200334455",
      names: "Alejandro",
      lastnames: "Herrera Molina",
      email: "alejandro.herrera@email.com",
      age: 34,
      gender: "M",
      address: "Transversal 12 #77-44, Villavicencio",
      phone_number: "3246789012",
      created_at: "2025-08-31T17:50:39.456Z",
      updated_at: "2025-08-31T17:50:39.456Z",
    },
  ];

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
            {customers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal para registrar o añadir cliente */}
      {isModalOpen && (
        <CustomerForm
          onClose={closeModal}
          registerForm={true}
        />
      )}
    </div>
  );
}