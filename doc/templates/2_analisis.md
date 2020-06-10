# Análisis: Requisitos del sistema

Este documento describe los requisitos para la aplicación web **Naevus** especificando qué funcionalidad ofrecerá y de que manera.

## 1. Descripción general

Naevus es una aplicación web desarrollada para todos aquellos desarrolladores independientes de videojuegos que necesitan de alguna manera no solo publicitar su proyecto a la comunidad de jugadores, si no que tambien les es necesario una herramienta capaz de mantener contacto directo con su público objetivo para recibir apoyo, opiniones y comentarios sobre el trabajo que están haciendo, y así poder adaptarlo mejor a lo que realmente el usuario final quiere y necesita.

## 2. Funcionalidades

A continuación, se describen todas las funcionalidades que la aplicación web posee:

- Usuarios:
    + Creación de usuarios (id, username,email,password,type,photo).
    + Edición de usuarios (id, username,email,password,type,photo).
    + Eliminar usuarios (id).
- Proyectos:
    + Creación de proyectos (id, projectmaster, title, description1, descrition2, description3, tags, date, image).
    + Modificación de proyectos (id, projectmaster, title, description1, descrition2, description3, tags, date, image).
    + Eliminar proyectos (id).
    + Añadir descripciones(id, descriptionX).
    + Añadir imágenes (id, image).
    + Editar / borrar descripciones (id, descriptionX).
    + Eliminar imágenes (id, image).
    + Añadir desarrolladores (*lo mismo que creación de usuarios*).
- Noticias y actualizaciones:
    + Creación de noticias (id, projectid, userid, title, text, image, date).
    + Edición de noticias (id, projectid, userid, title, text, image, date).
    + Eliminar noticias (id).
- Comentarios en actualizaciones y noticias:
    + Crear comentarios (id, userid, updateid, text, date).
    + Eliminación de comentarios (id).
- Comentarios y opiniones (feedbacks):
    + Creación de opiniones (id, projectid, userid, title, text, image, date, state).
    + Modificación de opiniones (id, projectid, userid, title, text, image, date, state).
    + Eliminación de opiniones (id).
    + Cambio de estado del comentario u opinión (id, state);
- Comentarios en feedbacks:
    + Crear comentarios (id, userid, feedbackid, text, date).
    + Eliminación de comentarios (id);
- Enlaces externos:
    + Creación de enlaces externos (id, projectid, name, link).
    + Eliminación de enlaces externos (id).

## 4. Tipos de usuarios

En este apartado se muestran todos los tipos de usuarios que existen en la aplicación, así como los permisos y tareas que puede realizar cada uno.

- Cliente: internauta que no se ha registrado en el sitio, pero puede navegar por las páginas públicas sin ningún tipo de problema.
- Usuario normal (user): usuario registrado en la aplicación. Puede hacer todo lo que hace un cliente, además, puede publicar opiniones en los proyectos, así como comentarios en noticias y opiniones. 
- Usuario desarrollador (dev): usuario registrado en el sitio que ha cambiado su tipo de cuenta a usuario desarrollador. Puede hacer todo lo que hace un usuario normal, aunque su posición le ofrece más funcionalidades:
    + Creación de proyectos.
    + Añadir nuevos usuarios desarrolladores a sus proyectos.
    + Creación de noticias para cada proyecto.
    + Edición de noticias.
    + Eliminación de sus proyectos.
    + Cambiar el estado de las opiniones de otros usuarios sobre su proyecto.
- Usuario administrador(admin): puede realizar todo lo que hace un usuario normal, aunque posee dos funcionalidades extra:
    + Eliminación de usuarios.
    + Eliminación de proyectos.

Por último, todos los usuarios registrados en el sitio podrán eliminar su cuenta si lo desean, eliminando consigo todo tipo de publicaciones, sean comentarios, noticias, proyectos, etc... y todo lo que estas contengan, del sitio.
 
## 5. Entorno operacional

### 5.1. Dominio

El dominio en el que está alojada la aplicación web se puede acceder de dos maneras actualmente: 
+ [https://naevus.giize.com](https://naevus.giize.com/).
+ [http://naevus.giize.com](http://naevus.giize.com/).

### 5.2. Hardware

Los elementos empleados para desarrollar este proyecto son los siguientes:
- Ordenador portátil MSI GL626QF: desarrollo de la aplicación y pruebas.
- Raspberry Pi Model 3B: servidor donde está alojada la aplicación y todos sus requisitos y componentes.
- Móvil Xiaomi Redmi Note 4: pruebas desde dispositivos móviles.

### 5.3. Software

El software utilizado para el desarrollo del proyecto es el siguiente:

- Visual Studio Code
- NodeJS
- ExpressJS
- EJS
- Nginx
- MariaDB
- PHPMyAdmin
- Bootstrap 4
- Jquery
- FontAwesome
- ClickUp
- Solar PuTTY

## 6. Interfaces externas

La aplicación web se comunica con el exterior mediante una interfaz de usuario. Todos los datos son mostrador por pantalla mediante la interfaz. El software empleado es JavaScript, Jquery y Bootstrap 4.

## 7. Mejoras futuras

En un futuro es indispensable refactorizar todo el código del FrontEnd de la aplicación, y pasarlo de JavaScript y Jquery a VueJS.