## Manual técnico del proyecto

### Instalación

Para la instalación de la aplicación, es necesario configurar un servidor de la siguiente forma:
- Requisitos hardware mínimos: 
    + 500 MB de RAM.
    + 8 GB almacenamiento.
    + Conexión a  internet.
- Requisitos software:
    + Servidor con Raspbian 10 o en su defecto Debian 10.
    + Instalación de NPM.
    + Instalación y configuración de Nginx.
    + Instalación y configuración de MariaDB.
    + Instalación de PHPMyAdmin.
    + Instalación de Nodemon o Forever para arrancar el servidor.

Para instalar correctamente la aplicación, sigue estos sencillos pasos:
- Copiar el repositorio y pegarlo en tu carpeta web.
- Instalar las dependencias con `npm install`.
    + Si tu sistema no cuenta con npm de serie, puedes instalarlo con `sudo apt-get install npm`.
- Arrancar el servidor con `nodemon index.js`. Se debería mostrar por consola en qué puerto está escuchando el servidor.

### Administración del sistema

Algunas tareas que serán habituales y necesarias son las siguientes:
- Realizar copia de seguridad de la base de datos diariamente.
- Atender correos provenientes del sitio.
- Incidencias en el sitio sobre comentarios, proyectos o noticias no deseadas.

### Mantenimiento del sistema

Las principales tareas de mantenimiento a realizar en la aplicación son las siguientes:
- Refactorización del FrontEnd a VueJS.
- Corregir errores encontrados o reportados por usuarios del sitio.
- Mantener los certificados HTTPS activos cada 3 meses.
- Actualziaciones diarias de los módulos de la aplicación.
- Actualizaciones de las dependencias del proyecto.
- Actualziaciones del servidor.

## Gestión de incidencias

Algunas incidencias con las que se puede topar el proyecto y que habrá que resolver:
- Corregir fallos detectados y reportados por los propios clientes del sitio.
- Mantener y arreglar fallos que actualmente existen en el proyecto pero no influyen de manera significativa a la experiencia del usuario utilizando la aplicación.
- Atender correos de los usuarios reportando incidencias dentro del sitio.

## Política de privacidad

Protección de datos de carácter persoal:

- [Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDPGDD)](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673)
- [General Data Protection Regulation (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)

## Manual de usuario

Para cualquier duda, problema, consejo y pregunta que pueda surgir a los usuarios del sitio, Naevus posee su propio [FAQ](https://naevus.giize.com/info). 
Este es mantenido por los administradores del sitio, principalmente recibiendo correos de los clientes que preguntan dudas o consejos a la hora de utilizar la aplicación web. Más preguntas y respuestas se añaden periódicamente.