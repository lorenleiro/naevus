Unha vez rematada a codificación e probas pertinentes do proxecto soamente quedará finalizar cos manuais necesarios para a instalación do proxecto, uso e mantemento do mesmo.

## Manual técnico do proxecto

### Instalación

Características de instalación. Por exemplo:

- Requirimentos de hardware, servidores na nube, etc.
- Software necesario (S.O. válidos, software externo co que interaciona a nosa aplicación, etc.).
- Configuración inicial seguridade: devasa, control usuarios, rede.
- Carga inicial de datos na base de datos. Migración de datos xa existentes noutros formatos.
- Usuarios do sistema. Usuarios da aplicación.
- Diagrama final de despregue (se hai variacións con respecto ao realizado na anterior fase).

Para la instalación de la aplicación, es necesario configurar un servidor de la siguiente forma:
- Requisitos hardware mínimos: 
    + Servidor con Debian 10 o en su defecto Raspbien 10.
    + 500 MB de RAM.
    + 8 GB almacenamiento.
    + Conexión a  internet de banda ancha.
- Requisitos software:
    + Instalación de NPM.
    + Instalación y configuración de Nginx.
    + Instalación y configuración de MariaDB.
    + Instalación de PHPMyAdmin.
    + Instalación de Nodemon o Forever para arrancar el servidor.

Copiar el repositorio a la carpeta raíz de tu directorio web. Arrancar el servidor con `nodemon index.js`. Se recomienda arrancar el servidor con Forever para que
se reinicie automáticamente si ocurre algún error `forever start index.js`.

Por último acceder a la web desde http://localhost:80

### Administración do sistema
Tarefas que se deberán realizar unha vez que o sistema estea funcionando, como por exemplo:

- Copias de seguridade do sistema.
- Copias de seguridade da base de datos.
- Xestión de usuarios.
- Xestión seguridade.
- Xestión de incidencias, que poden ser de dous tipos: de sistema (accesos non autorizados á BD, etc) ou de fallos no software.
- 
Realizar copia de seguridad de la base de datos diariamente.
Atender correos provenientes del sitio.
Incidencias en el sitio sobre comentarios, proyectos o noticias no deseadas.

### Mantemento do sistema
Tarefas que se deberán realizar para manter o sistema en funcionamento. Por exemplo:

- Corrixir erros.
- Engadir novas funcionalidades.
- Adaptación por actualizacións de software e/ou hardware.
- 
Refactorización del FrontEnd a VueJS.
Corregir errores encontrados.
Actualziaciones diarias de los módulos de la aplicación.

## Xestión de incidencias

Poden ser incidencias de dous tipos: 

- De sistema: accesos non autorizados á BD, configuración errónea, etc.
- Fallos no software.

Corregir fallos detectados y reportados por los propios clientes del sitio. Mantener y arreglar fallos que actualmente existen en el proyecto pero no influyen de manera 
sustancial a la experiencia del usuario utilizando la aplicación.

## Política de privacidade

Protección de datos de carácter persoal:

- [Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDPGDD)](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673)
- [General Data Protection Regulation (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)

## Manual de usuario

- Indicar se será necesario formar aos usuarios. En caso afirmativo, planificar.
- Manual de usuario, FAQ ou outro xeito que sexa o máis adecuado para que os usuarios saiban usar a nosa aplicación informática.

Para cualquier duda, problema, consejo y pregunta que pueda surgir a los usuarios del sitio, Naevus posee su propio [FAQ](https://naevus.giize.com/info). 
Este es mantenido por los administradores del sitio, principalmente recibiendo correos de los clientes que preguntando dudas o consejos a la hora de utilizar la 
aplicación web. Más preguntas y respuestas se añaden periódicamente.
