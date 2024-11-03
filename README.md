# Challenge XAcademy
<figure><img src="./mock/Santex.png" alt="logo" style="height: 200px;"></figure>

## Descripción

Este proyecto es una aplicación web para gestionar un listado de jugadores de FIFA, construida con Node.js en el backend y Angular en el frontend. La aplicación permite visualizar, modificar y crear información sobre jugadores de FIFA de ambos géneros, con datos que abarcan versiones desde FIFA 2015 hasta FIFA 2023. Cada jugador puede aparecer en múltiples versiones del juego, mostrando variaciones en sus habilidades y datos personales a lo largo de los años.

## Tecnologías Utilizadas

### Backend
- **Node.js**
- **Express.js**
- **Sequelize** (ORM para la base de datos).
- **MySQL** (Base de datos relacional).
- **JSON Web Token (JWT)** Para autenticación.
- **express-validator** Para validaciones de entrada.
- **Swagger** Para la documentación de la api.
- **Docker**

### Frontend
- **Angular**
- **Angular Material** (opcional para UI).
- **Reactive Forms** Para validaciones en el frontend.
- **Chart.js** Para visualización de habilidades de los jugadores.
- **SweetAlert 2** Un reemplazo personalizable y accesible para los cuadros emergentes.
- **Docker** 

## Funcionalidades

1. **Listado de Jugadores**:
   - Endpoint para obtener un listado de jugadores paginado y filtrado por nombre, club, posición, etc.
   - Descarga del listado limitando y filtrado en formato CSV. NO FUNCIONA EN DOCKER.
   - Descarga del listado limitando y filtrado en formato LXSX. NO FUNCIONA EN DOCKER.
   - Carga del listado limitando y filtrado en formato CSV.
   
2. **Información Detallada de un Jugador**:
   - Endpoint para obtener detalles de un jugador específico por su ID.
   - Visualización de habilidades en un gráfico de radar (utilizando Chart.js).

3. **Edición de Información de un Jugador**:
   - Endpoint para modificar la información de un jugador (nombre, posición, club, calificación, nacionalidad, y habilidades).
   - Validación de entrada de datos para evitar errores de formato.

4. **Creación de Jugador Personalizado**:
   - Endpoint para crear un nuevo jugador con datos personalizados.

5. **Eliminar un jugador**:  
   - Endpoint para eliminar un jugador de la base de datos.

6. **Search de jugador**:
   - Endpoint para buscar un jugador por nombre, club, posición, etc.

7. **Burger menu && menu personalizado && router**:
   - Menu de navegación personalizado para acceder a las diferentes funcionalidades de la aplicación. 
   - menu amburgesa para la aplicación móvil.

8. **Spotify-player**:
   - Integración con Spotify para reproducir música mientras se navega por la aplicación.

9. **Dark Mode**:
   - Cambio de tema entre modo claro y oscuro desktop web.
   - Cambio de tema entre modo claro y oscuro en la aplicación móvil.

10. **Autenticación**:
   - Sistema de login para proteger el acceso a la información.
   - Los endpoints del backend están protegidos y requieren autenticación.
   - JWT es utilizado para la autenticación.

11. **Registration**:
   - Endpoint para crear un nuevo usuario.
   - Los usuarios pueden registrarse y obtener un token JWT para autenticarse.


## Requisitos Previos

- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- Angular CLI
- Git (para clonar el repositorio)

## Instalación

### Backend && Frontend

1. **Clona el repositorio**:

-   git clone https://github.com/Aubar48/frontend_challenge
-   cd frontend_challenge
-   git clone https://github.com/Aubar48/backendXAcademy
-   cd backendXAcademy

1. A. Instalar base de datos.
- En la carpeta Mock tenes tres archivos: create_db_and_user_table, fifa_female_players,
fifa_male_players, para la base de datos, ejecutar los tres scripts.


2. **Instala dependencias**

- npm install

3.  **Configura la base de datos**:

- Crea una base de datos en MySQL "en la carpeta mock tenes los scripts necesarios" y configura el archivo .env en la raíz del proyecto con los siguientes parametros como .env.example

3. 1. **Docker Image Frontend**

- docker build -t frontend-challenge .
- docker run -p 4200:4200 frontend-challenge

3. 2. **Docker Image Backend**

- docker compose up --build

4. **Inicia el Servidor**: 

- npm start in NodeJs && ng serve in Angular

5. **EndPoints Get, Post, Put, Deleted**:
- IMPORTANTE CREAR USUARIO. USAR TOKEN AL LOGEARSE PARA USAR LAS DEMAS FUNCIONALIDADES 

- *Swagger:* http://localhost:3000/api-docs/#/

- *Post:* http://localhost:3000/auth/login
- *Post:* http://localhost:3000/auth/register
- *Post:* http://localhost:3000/auth/logout

- *Get:* http://localhost:3000/players
- *Get:* http://localhost:3000/players/search
- *Get:* http://localhost:3000/players/?page=11&limit=10
- *Get:* http://localhost:3000/players/download/csv
- *Get:* http://localhost:3000/players/convert/csv-to-excel
- *Post:* http://localhost:3000/players/create
- *Post:* http://localhost:3000/players/importar
- *Put:* http://localhost:3000/players/edit/:id
- *Delete:* http://localhost:3000/players/:id

- *Get:* http://localhost:3000/female
- *Get:* http://localhost:3000/female/search
- *Get:* http://localhost:3000/female/?page=11&limit=10
- *Get:* http://localhost:3000/female/download/csv
- *Get:* http://localhost:3000/female/convert/csv-to-excel
- *Post:* http://localhost:3000/female/create
- *Post:* http://localhost:3000/female/importar
- *Put:* http://localhost:3000/female/edit/:id
- *Delete:* http://localhost:3000/female/:id