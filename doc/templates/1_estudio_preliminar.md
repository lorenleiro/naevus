# Estudio preliminar

## 1. Introducción

La documentación escrita a continuación explica paso a paso el desarrollo de una aplicación web destinada al sector del entretenimiento y la comunicación.

Este software ha sido diseñado para proporcionar a los desarrolladores individuales o pequeños grupos de desarrolladores independientes de videojuegos, una herramienta con la
que poder publicitar la creación de un videojuego desde sus etapas más tempranas y poder recibir comentarios y ayuda de la propia comunidad de jugadores.

La documentación comprende un estudio preliminar, el análisis y diseño de la aplicación, así como su codificación, ejecución y revisión.


## 2. Objetivo

El objetivo del proyecto es la creación de un prototipo capaz de ponerse en producción, así como toda su documentación, en la que se recoge las diferentes etapas
de su desarrollo.

El principal propósito de esta aplicación web es poder dar una nueva forma de comunicación a aquellos desarrolladores o grupos de desarrolladores independientes 
que no cuentan con el presupuesto, tiempo o conocimientos para mostrar su producto a su público objetivo en las etapas más tempranas y frágiles de su desarrollo y 
construcción.

Uno de los grandes problemas que los pequeños grupos de desarrolladores de videojuegos encuentran es cómo poder mostrar el trabajo que están realizando a su público objetivo.
Esta aplicación les permite enseñarlo incluso en los primeros meses de desarrollo, cuando el proyecto no es más que un prototipo, lo cuál puede llegar a ser conveniente,si el 
tipo de juego se lanza en Acceso Anticipado, pudiendo así recibir comentarios de errores, opiniones y cambios que podrían realizar, para así adaptarse más fácilmente a lo
que les pide la comunidad.

## 3. Definiciones 

- Términos propios del proyecto:
    + Naevus: el propio proyecto.
    + Usuario normal: usuario registrado en el sitio. Puede crear comentarios y feedbacks.
    + Usuario desarrollador: usuario registrado en el sitio, puede hacer todo lo que hace el usuario normal pero además puede crear proyectos y noticias y gestionar todo lo que sucede dentro del propio proyecto.
    + Usuario admin: usuario registrado en el sitio. Tiene control total, pudiendo eliminar usuarios y proyectos.
    + Feedbacks: se refiere de manera abreviada a la sección de los proyectos de "Comentarios y opiniones".

- Términos de ámbito técnico:
    + Early Access / Acceso Anticipado: juegos que son lanzados al mercado sin ser acabados, dando la oportunidad a los jugadores de poder jugarlo en sus distintas etapdas de desarrollo.
    + Juego Indie: videojuego creado por una persona o grupo de personas sin grandes apoyos financieros.

## 4. Audiencia
 
La audiencia de este producto está destinada a todos aquellos desarrolladores independientes que no tienen los medios o el dinero para publicar sus proyectos en internet.
A su vez, todas aquellas personas con especial intereés en juegos Indie, por lo que la franja de edades si sitúa en entre los 15 y 35 años. La nacionalidad puede ser 
cualquiera, aunque la aplicación limitará su zona de trabajo a España en los primeros meses de producción, y más adelante, a toda Europa.


## 5. Necesidades

Desde no hace mucho, los pequeños juegos empezaron a tener un peso importante en la industria del entretenimiento. Tanto es así que pequeños grupos de personas llegaron a 
crear juegos Best Seller y juegos del año, teniendo como competencia las grandes multinacionales con equipos y herramientas más que preparadas para desarrollar un gran título.
Es cierto que cada vez existen más posibilidades de dar a luz lo que los desarrolladores independientes están creando, aunque la gran mayoría siempre se llevan un porcentaje 
alto de las ganacias de estes, por poner a la venta su videojuego en su página.

Dentro de este contexto podemos detectar distintas deficiencias que se intentarán resolver o disminuir con este prototipo:
- Suficientes páginas para publicar los videojuegos, pero pocas que permitan el trato directo con los usuarios finales como lo hace este proyecto.
- La mayoría de ellas quitan un porcentaje de las ventas de los juegos. En esta aplicación eso no ocurre, hay otros métodos de pago más eficiente y opcionales.
- Necesidad de un canal directo con el usuario final.
- Complejidad a la hora de utilizar todas las herramientas de una web. Desde Naevus, todas las operaciones que un usuario puede realizar están centralizadas un su "Menú personal".

Por otro lado, es cierto que existen aplicaciones semejantes, todas ellas cumplen su cometido de una manera muy efectiva, ya que llevan muchos años funcionando y su comunidad es cada vez más grande. Aún así, no existe algo en el mercado con este nivel de cercanía entre ambas partes, desarrolladores y usuarios finales.

## 6. Modelo de negocio 
No existen muchas páginas web en internet que den un acceso tan directo a los desarrolladores con su comunidad. Es por eso que se creó Nevus, abriendo  numerosas posibilidades
a la hora de la comunicación con el usuario final del producto.

Naevus es una aplicación gratuita y de uso libre, de esta forma se pretende que todas aquellas personas que necesitan de las funcionalidades que ofrece la aplicación estén disponibles de manera inmediata y fácil. Aún así, existen diferentes posibilidades a la hora de comercializar la aplicación, sobre todo para aquellas pequeñas empresas que se lo puedan permitir o necesiten un impulso a la hora de publicitar su videojuego. Algunas de estas son las siguientes:
- Ofrecer un mejor sistema de administración del proyecto. (Como el que cuenta por defecto la cuenta de administrador).
- Publicar el proyecto en la página principal del sitio, para tener una mayor visiblidad.
- Ofrecer mejores herramientas o vistas para gestionar el proyecto.
- Permitir la "subscripción" de los usuarios del sitio a un proyecto concreto para que le lleguen noticias a su correo cada vez que los desarrolladores publican algo nuevo.

### 6.1. Viabilidad

#### 6.1.1. Viabilidad técnica
El usuario desarrollador solo ha de disponer de una conexión a internet estable, y un ordenador desde el que programar y probar la aplicación. A la hora de puesta a producción, será
necesario contratar un servicio en la nube para alojar el servidor.

No existe ningún impedimento grave como para dificultar el proceso de creación de la aplicación.

#### 6.1.2. Viabilidad económica

Los beneficios serán graduales desde que se ponga en producción la aplicación. Hasta que esta no tenga un número decente de usuarios registrados en ella, no será posible empezar a comercializarla.
  
A largo plazo, el proyecto dejará de tener pérdidas. Aunque es posible que se necesite pedir un crédito para sufragar los gastos iniciales y el mantenimiento hasta que la aplicación empieze a tener un flujo de usuarios constante y comience a ser viable económicamente.

Para más información sobre gastos e inversiones del proyecto, véase el [presupuesto](doc/templates/a3_presupuesto.md) del proyecto.

### 6.2. Competencia

La competencia directa se llama [Game Jolt](https://gamejolt.com/). Es una página web que permite publicitar y descargar los juegos indie desde el navegador. Ocupa actualmente el primer puesto en este tipo de mercado.

Además, existen otro tipo de plataformas com [Steam](https://store.steampowered.com/), [Epic Games](https://www.epicgames.com/store/en-US/), [Humble Bundle](https://www.humblebundle.com/), etc... que ofrecen características similares. Identificamos este tipo de plataformas como competencia indirecta, ya que nuestro principal objetivo no es ser una tienda de videojuegos, pero al tener características parecidas como que los usuairos pueden hacer "Reviews" o publicar su opinión, es probable que ocupen parcialmente nuestro mercado también.

### 6.3. Promoción
- Técnicas eligidas:
	+ Redes sociales: muy fáciles de usar y mantener. La mayoría de ellas ya cuentas con opciones para publicitar tu pequeño negocio o empresa.
	+ Páginas web: desde otros sitios web, se podrá ver anunucios sobre nuestra página.
	+ Posicionamento web.
	+ Patrocinios: con el tiempo el proyecto crecerá e irá generando más interes en grandes compañías.
    
### 6.4. Modelo de negocio

El modelo de negocio elegido para esta aplicación es el **Freemium**. Este tipo de modelo cuenta con sus ventajas y desventajas respecto a otras opciones, sin embargo, el beneficio económico que se intenta obtener con este proyecto no es el único parámetro a tener en cuenta, ya que un modelo de uso donde únicamente puedan publicar sus juegos los desarrolladores que paguen una cuota, por ejemplo, puede ser motivo suficiente para que nuestro público objetivo no se interese por nuestra aplicación.

Es por eso que con el modelo de negocio Freemium intentamos cumplir dos objetivos esenciales:
- Obtener beneficios a largo plazo: cuanto más tiempo tenga la aplicación, más conocida sea y más la usen, los usuarios que soliciten pasarse al modelo de pago serán cada vez más y proporcionalmente lo serán los ingresos obtenidos.
- Aplicación atractiva al público: adquirir las funcionalidades extra no es algo obligatorio, por lo que los usuarios podrán seguir utilizando la aplicación gratuitamente, y pasarse al modelo de pago una vez la hayan probado y les convenga.

En resumen, los usuarios podrán optar por pagar o no una cuota mensual, que les ofrecerá distintas ventajas a la hora de usar la aplicación, además se podrán dar de baja en cualquier momento. Los precios serán personalizados, pero rondarán entre los 2.99€ y los 29.99€, dependiendo del tipo de usuario o empresa. algunas de las funcionalidades extra con las que contarían son:
- Herramientas de gestión de proyectos.
- Publicidad de sus proyectos en las páginas principales de la aplicación.
- Servicio técnico.