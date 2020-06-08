///////// CARGA DE MÓDULOS NECESARIOS /////////
const express = require('express');
const router = express.Router();
const web_controller = require('../controllers/web.controller');
const authenticate = require('../validation/authenticate.js');
///////// FIN CARGA DE MÓDULOS NECESARIOS /////////


/** Controlador para cargar la raíz de la página */
router.get('/', web_controller.web_home);

/** Controlador para cargar la vista del registro de usuarios */
router.get('/signup', web_controller.web_signup);

/** Controlador para cargar la vista del loguin de los usuarios */
router.get('/login', web_controller.web_login);

/** Controlador para cargar la vista de todos los proyectos de la página*/
router.get('/projects', web_controller.web_showprojects);

/** Controlador para cargar la vista de un proyecto concreto */
router.get('/projectview', web_controller.web_projectview);

/** Controlador para cargar la vista de las actualizaciones de un proyecto*/
router.get('/updates', web_controller.web_updates);

/** Controlador que carga la vista de una noticia de un proyecto en concreto */
router.get('/updateview', web_controller.web_updateview);

/** Carga la vista de todos los feedbacks aportados a un proyecto */
router.get('/feedbacks', web_controller.web_feedbacks);

/** Carga la vista de todos los feedbacks aportados a un proyecto */
router.get('/feedbackview', web_controller.web_feedbackview);

/** Carga la vista de los enlaces y fuentes externas de un proyecto */
router.get('/outside', web_controller.web_outside);

/** Carga la vista de información sobre la página */
router.get('/about', web_controller.web_about);

/** Carga la vista de información sobre cómo funciona la aplicación web */
router.get('/info', web_controller.web_info);

/** Controlador para cargar la vista de administración de usuarios*/
router.get('/adminusers', authenticate.isAdmin, web_controller.web_adminusers);

/** Controlador para cargar la vista de creación de llos proyectos*/
router.get('/createproject', authenticate.isDev, web_controller.web_createproject);

/** Controlador para cargar la vista de edición de un proyecto*/
router.get('/editproject', [authenticate.isDev, authenticate.devIsPropietary], web_controller.web_editproject);

/** Controlador para cargar la vista de los proyectos de un usuario desarrollador*/
router.get('/myprojects', authenticate.isDev, web_controller.web_myprojects);

/** Controlador para cargar la vista de creación de actualizaciones de un proyecto*/
router.get('/createupdate', [authenticate.isDev, authenticate.devIsPropietary], web_controller.web_createupdate);

/** Controlador para cargar la vista de creación de feedbacks de un proyecto*/
router.get('/createfeedback', authenticate.isAuthenticated, web_controller.web_createfeedback);

/** Carga la vista de admnistración de proyectos */
router.get('/adminprojects', authenticate.isAdmin, web_controller.web_adminprojects);

/** Carga la vista de todos los componentes que compone el proyecto (noticias, feedbacks...) */
router.get('/projectstatus', authenticate.isAdmin, web_controller.web_projectstatus);

/** Vista del perfil de los usuarios registrados en el sitio */
router.get('/account', web_controller.web_account);

/** Carga la vista de error indicando que algo ha salido mal (intento de acceso a una ruta autenticada) */
router.get('/error', web_controller.web_error);

/** Carga la vista de contacto con el administrador del sitio */
router.get('/contact', web_controller.web_contact);

/** Carga la vista de la información legal sobre el sitio */
router.get('/legalinfo', web_controller.web_legalinfo);

/** Carga la vista de la licencia del sitio */
router.get('/license', web_controller.web_license);

module.exports = router;