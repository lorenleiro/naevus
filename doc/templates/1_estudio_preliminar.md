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
    + Usuario desarrollador: usuario registrado en el sitio, puede hacer todo lo que hace el usuario normal pero además puedecrear proyectos y noticias y gestionar todo lo
    + que sucede dentro del propio proyecto.
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

Desde no hace mucho, los pequeños juegos empezaron a tener un peso importante en la industria del entretenimiento. Tanto es así que peuqeños grupos de personas llegaron a 
crear juegos Best Seller y juegos del año, teniendo como competencia las grandes multinacionales con equipos y herramientas más que preparadas para desarrollar un gran título.
Es cierto que cada vez existen más posibilidades de dar a luz lo que los desarrolladores independientes están creando, aunque la gran mayoría siempre se llevan un porcentaje 
alto de las ganacias de estes, por poner a la venta su videojuego en su página.

Dentro de este contexto podemos detectar distintas deficiencias que se intentarán resolver o disminuir con este prototipo:
- Suficientes páginas para publicar los videojuegos, pero pocas que permitan el tacto directo con los usuarios finales como lo hace este proyecto.
- La mayoría de ellas quitan un porcentaje de las ventas de los juegos. En esta aplicaci´n eso no ocurre, hay otros métodos de pago más eficiente y opcionales.
- Necesidad de un canal directo con el usuario final.
- Complejidad a la hora de utilizar todas las herramientas de una web. Desde Naevus el sistemas de funcionalidades está totalmente centralizado.

- Existen na actualidade aplicacións que tenten dar resposta a esa(s) necesidade(s)? ¿En qué medida o conseguen?
    - Si que existen, todas ellas lo hacen de una manera muy efectiva, ya que llevan muchos años funcionando y su comunidad es cada vez más grande.
- Por que é necesaria a posta en marcha dun proxecto que aborde dita necesidade?
    - No existe algo en el mercado con ese nivel de cercanía entre ambas partes, desarrolladores y usuarios finales. 
- Cal é o obxectivo xeral que persegue o proxecto?
    - Ayudar a la comunidad de videojuegos a apoyar al mercado de videojuegos independientes.
- Responde a estas preguntas concretas:
	- Como se pode responder a esta necesidade? 
	    - Creando un canal directo entre el usuario final y los desarrolladores, que permita de una manera muy fácil la comunicación entre ambas partes.
	- Que pode facerse para cambiar este estado de cousas? 
	- Nuevas funcionalidades que otras ppáginas no tienen, como el sistema de estados de los feedbacks de los usuarios que posee Naevus.
	- Como podemos contribuír desde a nosa situación a que o problema se resolva? 
	- Facilitando a las personas que lo necesitan el acceso a la aplicación que se describe en esta documentación.
	- Que medios, actividades e recursos van poñer en xogo? 
	- Simplemente los usuarios necesitan un dispositivo con el que poder conectarse a internet. Desde un móvil o ordenador se puede utilizar la aplicación sin ninguna 
	  diferencia enorme.
	- Que actividades van realizar?
	- Publicación de sus proyectos, gestión dentro de la aplicación de ellos, contacto con los usuarios finales.
	- Con qué metodoloxía vai levar a cabo o traballo?  
	    - Metodología ágil. Ayudándose de herramientas como [ClickUp](https://clickup.com/2?utm_expid=.aV4GY1erSwu_p7FoBAj5Yg.1&utm_referrer=), para gestionar de manera eficaz
	      el tiempo empleado en cada una de las secciones del proyecto.
	- Que persoas serían precisas para realizar o proxecto con éxito? 
	    - Las personas más idóneas para crear un proyecto semejante son sobre todo aquellos con conocimientos de desarrollo web y bases de datos.
	- Con canto tempo se conta? 
	    - Para la creación del proyecto se cuenta con un tiempo de 2 meses más o menos.
	- Canto tempo se necesita?
	    - Para la creación de un prototipo que implemente la mayoría de las funcionalidades se necesitan sobre 2 meses. Para crear una aplicación web y ponerla en producción,
	      se estima que es necesario un tiempo total de 4 meses.

Recurso: [Guía para a elaboración de proyectos. Gobierno Vasco.](https://www.pluralismoyconvivencia.es/upload/19/71/guia_elaboracion_proyectos_c.pdf) (páxina 26 e seguintes)

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
- Gastos
    + Horas trabajadas + hogar: 1200€ / mensual
    + Gastos fijos: 150€ /mensual
    + Equipamiento: 800€ / único pago
    + Gestoría: 250€
    + Dominio: 50€/año
    + Servidor en la nube: 20€ / mes
    + Software y licencias: licencia Apache 2.0, Visual Studio Code.

Los beneficios serán graduales desde que se ponga en producción la aplicación. Hasta que esta no tenga un número decente de usuarios registrados en ella, no será posible empezar a comercializarla.
  
A largo plazo, el proyecto dejará de tener pérdidas. Aunque es posible que se necesite pedir un crédito para sufragar los gastos iniciales y el mantenimiento hasta que la aplicación empieze a tener un flujo de usuarios constante y comience a ser viable económicamente.

### 6.2. Competencia

La competencia directa se llama [Game Jolt](https://gamejolt.com/). Es una página web que permite publicitar y descargar los juegos indie desde el navegador. Ocupa actualmente el primer puesto en este tipo de mercado.

Además, existen otro tipo de plataformas com Steam, Epic Games, Humble Bundle, etc... que ofrecen características similares. Identificamos este tipo de plataformas como competencia indirecta, ya que nuestro principal objetivo no es ser una tienda de videojuegos, pero al tener características parecidas como que los usuairos pueden hacer "Reviews" o publicar su opinión, es probable que ocupen parcialmente nuestro mercado también.

Recurso: [Modelo de plan de negocios. Empresa de servicios informáticos. IGAPE](http://www.igape.es/images/crear-unha-empresa/Recursos/PlansdeNegocio/16ServiciosInformaticos12_5_cas.pdf) (páxina 45 e seguintes)

### 6.3. Promoción
- Técnicas eligidas:
	+ Redes sociales: muy fáciles de usar y mantener. La mayoría de ellas ya cuentas con opciones para publicitar tu pequeño negocio o empresa.
	+ Páginas web: desde otros sitios web, se podrá ver anunucios sobre nuestra página.
	+ Posicionamento web.
	+ Patrocinios: con el tiempo el proyecto crecerá e irá generendo más interes en grandes compañías.
    
### 6.4. Modelo de negocio
- Modelo eligido: 
	+ Freemium: la aplicación será de uso libre y gratuito para cualquiera. Las funcionalidades extra podrán ser adquiridas mediante un pago mensual por aquellos interesados.