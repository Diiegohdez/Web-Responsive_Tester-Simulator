# 💻 Web Responsive Tester & Simulator

Una herramienta de desarrollo diseñada para visualizar y testear sitios web en múltiples resoluciones reales, simulando el entorno de sistemas operativos como Windows y iOS/Android.

A diferencia de las herramientas de inspección estándar, este simulador respeta el espacio real del Viewport, permitiendo ver cómo las barras de navegación y de tareas afectan el diseño final.


# 🚀 Características Principales

- Simulación de Dispositivos Reales: Incluye perfiles actualizados como iPhone 15, Samsung A54, Moto Edge 50 y Laptops de 1366px.

- Viewport Preciso 1:1: Opción para activar/desactivar la barra de scroll de 17px de Windows para asegurar un centrado perfecto del diseño.

- Interfaz Flotante: Barras de navegación y de tareas que no "empujan" el contenido, permitiendo una visualización fiel a la pantalla completa.

- Control de Zoom Dinámico: Escala la vista sin alterar las proporciones de los píxeles lógicos del proyecto testeado.

- Entrada de Resolución Manual: Capacidad para testear cualquier medida personalizada.


# 🛠️ Tecnologías Usadas

- React.js - Biblioteca principal.

- Tailwind CSS - Estilizado rápido y responsive.

- Vite - Herramienta de construcción (Build tool).

- Lucide React / Icons - Iconografía del selector.


## 🛠️ Instalación y Uso

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/TU_USUARIO/NOMBRE_REPOSITORIO.git](https://github.com/TU_USUARIO/NOMBRE_REPOSITORIO.git)
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el simulador:
    ```bash
    npm run dev
    ```
4.  **Uso:** En la barra de búsqueda superior, ingresa la URL de tu proyecto local o en vivo (ej. `http://localhost:5174` o `https://tu-portafolio.com`).