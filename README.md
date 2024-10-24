# Challenge XAcademy
<figure><img src="./mock/Santex.png" alt="logo" style="height: 200px;"></figure>

## Descripción

Este proyecto es una aplicación web para gestionar un listado de jugadores de FIFA, construida con Node.js en el backend y Angular en el frontend. La aplicación permite visualizar, modificar y crear información sobre jugadores de FIFA de ambos géneros, con datos que abarcan versiones desde FIFA 2015 hasta FIFA 2023. Cada jugador puede aparecer en múltiples versiones del juego, mostrando variaciones en sus habilidades y datos personales a lo largo de los años.

## Tecnologías Utilizadas

### Backend
- **Node.js**
- **Express.js**
- **Sequelize** (ORM para la base de datos)
- **MySQL** (Base de datos)
- **JSON Web Token (JWT)** para autenticación
- **express-validator** para validaciones de entrada

### Frontend
- **Angular**
- **Angular Material** (opcional para UI)
- **Reactive Forms** para validaciones en el frontend
- **Chart.js** para visualización de habilidades de los jugadores

## Funcionalidades

1. **Listado de Jugadores**:
   - Endpoint para obtener un listado de jugadores paginado y filtrado por nombre, club, posición, etc.
   - Descarga del listado filtrado en formato CSV.
   
2. **Información Detallada de un Jugador**:
   - Endpoint para obtener detalles de un jugador específico por su ID.
   - Visualización de habilidades en un gráfico de radar (utilizando Chart.js).

3. **Edición de Información de un Jugador**:
   - Endpoint para modificar la información de un jugador (nombre, posición, club, calificación, nacionalidad, y habilidades).

4. **Creación de Jugador Personalizado**:
   - Endpoint para crear un nuevo jugador con datos personalizados.

5. **Autenticación**:
   - Sistema de login para proteger el acceso a la información.
   - Los endpoints del backend están protegidos y requieren autenticación.

## Requisitos Previos

- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- Angular CLI
- Git (para clonar el repositorio)

## Instalación

### Backend

1. **Clona el repositorio**:

-   git clone 
-   git clone https://github.com/Aubar48/backendXAcademy
-   cd backendXAcademy

2. **Instala dependencias**

- npm install

3.  **Configura la base de datos**:

- Crea una base de datos en MySQL "en la carpeta mock tenes los scripts necesarios" y configura el archivo .env en la raíz del proyecto con los siguientes parametros como .env.example

4. **Inicia el Servidor**: 

- npm start

5. **EndPoints Get, Post, Put, Deleted**:
- IMPORTANTE CREAR USUARIO. USAR TOKEN AL LOGEARSE PARA USAR LAS DEMAS FUNCIONALIDADES 
- http://localhost:3000/auth/login
- http://localhost:3000/auth/register
- http://localhost:3000/players
- http://localhost:3000/players/:id
- http://localhost:3000/players/download/csv
- http://localhost:3000/players/convert/csv-to-excel
- http://localhost:3000/female
- http://localhost:3000/female/:id
- http://localhost:3000/female/download/csv
- http://localhost:3000/female/convert/csv-to-excel
