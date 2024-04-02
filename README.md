# MONEYHUB


<div style="text-align: center;">
  <img src="public/moneyhub.png" alt="Imagen" style="width: 100px; height: 80px;">
</div>
Descripción del Proyecto
Este proyecto es una aplicación web diseñada para gestionar cuentas bancarias y movimientos financieros. Permite a los usuarios registrar sus cuentas bancarias, realizar seguimiento de sus saldos y realizar movimientos como transferencias y pagos.

Características Principales
Registro y gestión de cuentas bancarias.
Visualización de movimientos financieros asociados a cada cuenta.
Realización de transferencias entre cuentas.
Registro y seguimiento de pagos realizados.
Tecnologías Utilizadas
Frontend: La interfaz de usuario está construida con React.js y utiliza Tailwind CSS para el diseño y estilos.
Backend: Se utiliza Node.js con Express para el servidor backend.
Base de Datos: PostgreSQL se utiliza como base de datos para almacenar la información de cuentas y movimientos financieros.
Autenticación: Se emplea JWT (JSON Web Tokens) para la autenticación de usuarios.
Despliegue: La aplicación se despliega en un servidor de alojamiento web mediante Docker y Docker Compose.
Configuración del Entorno Local
Para ejecutar la aplicación en el entorno local, siga los siguientes pasos:

Clonar el Repositorio:

bash
Copy code
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
Instalar Dependencias:

bash
Copy code
npm install
Configurar la Base de Datos:

Cree una base de datos PostgreSQL en su entorno local.
Configure las variables de entorno en un archivo .env para la conexión a la base de datos.
Arrancar la Aplicación:

bash
Copy code
npm run dev
Acceder a la Aplicación:
La aplicación estará disponible en http://localhost:3000.

Base de Datos
La base de datos PostgreSQL se encuentra en el archivo database.sql. Puede importar este archivo para crear las tablas necesarias y configurar la estructura de la base de datos.

Despliegue
Para desplegar la aplicación en un servidor web, siga estos pasos:

Preparación del Entorno de Producción:

Configure las variables de entorno para el entorno de producción.
Genere los archivos estáticos de la aplicación mediante npm run build.
Despliegue con Docker:

Cree un contenedor Docker con la imagen de la aplicación.
Utilice Docker Compose para administrar el despliegue y la configuración del contenedor.
Acceso a la Aplicación:
La aplicación estará disponible en la dirección IP o dominio del servidor en el puerto especificado.

Contribuciones
¡Las contribuciones son bienvenidas! Si desea mejorar este proyecto, no dude en enviar una solicitud de extracción o abrir un problema con sus sugerencias.

Licencia
Este proyecto está bajo la Licencia MIT. Consulte el archivo LICENSE para obtener más detalles.