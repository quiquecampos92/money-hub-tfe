
<div style="text-align: center">
    <h1><span style="color: #EB8833">MONEYHUB</span></h1>
</div>

<div style="text-align: center;">
  <img src="public/moneyhub.png" alt="Imagen" style="width: 100px; height: 80px;">
</div>

<h2><span style="color: #EB8833">Descripción del proyecto</span></h2>

Este proyecto es una aplicación web diseñada para gestionar cuentas bancarias y movimientos financieros. Permite a los usuarios registrar sus cuentas bancarias, realizar seguimiento de sus saldos y realizar movimientos como transferencias y pagos.

<h2><span style="color: #EB8833">Características Principales</span></h2>

- Registro y gestión de cuentas bancarias.
- Visualización de movimientos financieros asociados a cada cuenta.
- Estadísticas y seguimiento de pagos realizados.

<h2><span style="color: #EB8833">Tecnologías Utilizadas</span></h2>

### Frontend y Backend

La app completa está realizada con Next JS. Este framework nos permite realizar tanto el frontend como el backend en el mismo proyecto sin tener nada separado. Se usa TypesScript para las acciones de la interfaz y React para manejar el DOM del frontend.

### Base de Datos

PostgreSQL se utiliza como base de datos para almacenar la información de usuarios, cuentas y movimientos financieros. Esta creada en vercel ya que permite gratis la creación de esta totalmente gratuita con algunos límites.

### Despliegue

Otra ventaja que me ayudó a la elección de Vercel, es que la aplicación se despliega gratuitamente en el propio Vercel, ya que internamente tiene sus funciones automatizadas para el despliegue. Se le puede añadir un hosting propio, aunque en caso de querer uno gratuito este mismo te otorga una URL única y libre de pago para el proyecto.

- WEB: https://money-hub-tfe.vercel.app/dashboard
- USER: Leo31@hotmail.com

<h2><span style="color: #EB8833">Configuración del Entorno Local</span></h2>

Para ejecutar la aplicación en el entorno local, siga los siguientes pasos:

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/quiquecampos92/money-hub-tfe.git
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Crear base de datos con vercel**
   Seguir los pasos descritos en la página web de aprendizaje de Next.
    https://nextjs.org/learn/dashboard-app/setting-up-your-database

4. **Asignar variables de entorno**
   Crear un archivo *.env* y copiar las variables de entorno de la base de datos que cada programador haya creado. Se puede usar el *.env.example* editando el nombre y eliminando *.example*

5. **Sembrar la base de datos**
   Esta todo preparado en el repositorio, a través de los archivos de las carpetas que existen dentro de *shared*.
   Simplemente ejecutar el siguiente comando:
   ```bash
   npm run seed
   ```
   Así crearemos, mediante la biblioteca *fake*, los datos totalmente aleatorios y falsos.

6. **Desplegar el localhost**
   ```bash
   npm run dev
   ```
   Entonces abriremos en nuestro navegador *http://localhost:3000/*


