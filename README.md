# Lista de Usuarios con Filtro

Una aplicación web interactiva que muestra una lista de usuarios obtenida de una API pública, con filtrado en tiempo real y la posibilidad de ver los posts de cada usuario.

## Demo
https://jvier98.github.io/user-list-filter/

## Funcionalidades
- **Filtrado en tiempo real**: Busca usuarios por nombre, email o compañía con un input optimizado mediante debounce.
- **Tarjetas de usuario**: Muestra nombre, email y compañía con un diseño moderno y efectos hover.
- **Posts dinámicos**: Opción para mostrar/ocultar los últimos 3 posts de cada usuario con caché para mejor rendimiento.
- **Feedback visual**: Spinner de carga durante las peticiones a la API.
- **Diseño responsive**: Adaptado para dispositivos móviles y pantallas grandes.
- **Manejo de errores**: Mensajes claros si falla la carga de usuarios o posts.

## Tecnologías Utilizadas
- **HTML5**: Estructura semántica y accesible.
- **CSS3**: Estilos modernos con animaciones, sombras y diseño responsive (media queries).
- **JavaScript (ES6+)**:
  - Async/await para manejo de promesas.
  - Fetch API para consumir datos de JSONPlaceholder.
  - Manipulación del DOM para renderizado dinámico.
  - Debounce para optimizar el filtrado.
  - Objetos para caching de posts.
- **API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para datos de usuarios y posts.
