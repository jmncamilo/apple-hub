# 🍏 Apple Hub - CRUD App

**Apple Hub** es una aplicación desarrollada en **Next.js** con base de datos **PostgreSQL**, diseñada para la gestión integral de una **tienda distribuidora oficial de productos Apple**.  
Su propósito es ofrecer un sistema moderno, seguro y escalable que facilite la administración de usuarios, productos, pedidos y ganancias.  

La aplicación implementa un **CRUD (Create, Read, Update, Delete)**, es decir, permite **crear, leer, actualizar y eliminar** datos de forma organizada y confiable en cada uno de sus módulos.

---

## 🚀 Características principales

La aplicación cuenta con **4 módulos principales**, cada uno orientado a cubrir una parte esencial del negocio:

### 1. 👤 Gestión de usuarios
- Crear nuevos usuarios.
- Actualizar información existente.

### 2. 📦 Gestión de productos
- Agregar productos oficiales Apple al catálogo.
- Editar información como precios, stock o descripción.
- Eliminar productos obsoletos o descatalogados (sólo con permisos de administrador).

### 3. 🛒 Gestión de pedidos
- Realizar pedidos de productos.
- Controlar el estado del pedido: *En proceso, Enviado, Entregado y Devuelto*.
- Registrar y visualizar devoluciones y garantías de los productos.

### 4. 💰 Módulo de ganancias
- Visualizar los ingresos diarios de la tienda.
- Consultar el histórico de ganancias para análisis y reportes.

---

## 🔐 Roles de usuario

La aplicación distingue entre dos tipos de usuarios:

- **Administrador (Admin)**  
  - Control total de la aplicación.  
  - Puede realizar todas las operaciones del CRUD.

- **Empleado**  
  - Acceso limitado a operaciones del CRUD.  
  - No puede eliminar datos.  

---

## 🛠️ Tecnologías utilizadas

- **Frontend:** [Next.js](https://nextjs.org/) (React + SSR/SSG)  
- **Backend:** API Routes de Next.js  
- **Base de datos:** [PostgreSQL](https://www.postgresql.org/)  
- **Autenticación:** JWT (JSON Web Tokens) + Bcrypt
- **Estilos:** Tailwind CSS v4 + CSS Modules  

---

## 📈 Visión a futuro

**Apple Hub** busca convertirse en el **sistema operativo interno de la distribuidora**, permitiendo que la operación de venta y control financiero sea más ágil, transparente y confiable.  
Con este proyecto, se construyen las bases para futuras integraciones como pasarelas de pago, reportes automáticos y dashboards interactivos.

---

## 💡 Inspiración

La inspiración de este proyecto nace del compromiso de **Apple** con la **excelencia, innovación y simplicidad**.  
Así como los productos Apple combinan diseño y funcionalidad, **Apple Hub** busca ofrecer la misma experiencia en la administración del negocio.