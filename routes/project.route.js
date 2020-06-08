///////// CARGA DE MÓDULOS NECESARIOS /////////
const express = require('express');
const router = express.Router();
const project_controller = require('../controllers/project.controller');
const validate = require('../validation/validation.js');
const authenticate = require('../validation/authenticate.js');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,callback)
    {
        callback(null, 'public/images/');
    },
    filename: function(req,file,callback)
    {
        callback(null, new Date().toISOString() + file.originalname);
    }
});
const upload = multer({storage: storage}).single('file');

///////// FIN CARGA DE MÓDULOS NECESARIOS /////////

/** Controlador para edición de proyectos. Carga todos los datos del proyecto seleccionado. */
router.post('/editproject', project_controller.project_editproject_post);

/** Crea una variable de sesión con el ID del proyecto que se va a editar ahora mismo */
router.post('/currentProjectID', project_controller.project_currentProjectID);

/** Crea una variable de sesión con el ID de la noticia que se va a visitar en el momento */
router.post('/currentUpdateID', project_controller.project_currentUpdateID);

/** Crea una variable de sesión con el ID del feedback que se va a visitar en el momento */
router.post('/currentFeedbackID', project_controller.project_currentFeedbackID);

/** Elimina un proyecto concreto junto con todas sus noticias, actualizaciones, enlaces, imágenes... */
router.delete('/delete', project_controller.project_delete);

/** Controlador para mostrar los proyectos de un usuario desarrollador */
router.post('/myprojects', project_controller.project_myprojects);

/** Controlador para la creación de proyectos */
router.post('/createproject',[upload, validate.project], project_controller.project_createproject_post);

/** Controlador para subir imágenes al  servidor */
router.post('/uploadimage', upload, project_controller.project_uploadimage);

/** Controlador para mostrar todos los proyectos del sitio */
router.post('/projects', project_controller.project_showprojects);

/** Controlador para cargar los datos del proyecto que se está visualizando */
router.post('/projectview', project_controller.project_projectview);

/** Controlador para la creación de actualziaciones de un proyecto */
router.post('/createupdate', [upload, validate.update], project_controller.project_createupdate);

/** Controlador para la creación de feedbacks de un proyecto */
router.post('/createfeedback', [upload, validate.feedback], project_controller.project_createfeedback);

/** Controlador que carga los datos del feedback desde la base de datos */
router.post('/feedbackview', project_controller.project_feedbackview);

/** Controlador para cargar todas las noticias y eventos de un proyecto en concreto */
router.post('/updates', project_controller.project_updates);

/** Controlador que carga los datos de la noticia desde la base de datos */
router.post('/updateview', project_controller.project_updateview);

/** Carga todos los comentarios de la noticia que se está visitando */
router.post('/updatecomments', project_controller.project_updatecomments);

/** Crea un comentario escrito por un usuario registrado */
router.post('/createcomment', validate.comment, project_controller.project_createcomment);

/** Muestra todo el feedback de un proyecto */
router.post('/feedbacks', project_controller.project_feedbacks);

/** Carga todos los comentarios del feedback que se está visitando */
router.post('/feedbackcomments', project_controller.project_feedbackcomments);

/** Actualiza el titulo la descripcion y las descripciones detalladas de los proyectos */
router.post('/updateproject', project_controller.project_updateproject);

/** Actualiza las nuevas descripciones de los proyectos */
router.post('/projectstatus', project_controller.project_projectstatus);

/** Comprueba si el usuario que ha reportado el comentario es un administrador o no y realiza las acciones correspondientes */
router.post('/reportcomment', project_controller.project_reportcomment);

/** Recibe un nombre de proyecto o una etiqueta y busca en todos los proyectos devolviendo aquellas coincidencias */
router.post('/searchprojects',validate.searchproject, project_controller.project_searchprojects);

/** Elimina una imagen por su id */
router.post('/removeimage', project_controller.project_removeimage);

/** Carga en la vista de enlaces externos de un proyecto todas sus referencias a sitios externos */
router.post('/outside', project_controller.project_outside);

/** Crea un nuevo enlace externo y lo añade a un proyecto */
router.post('/createoutside', validate.outside, project_controller.project_createoutside);

/** Cambia el estado de un feedback */
router.post('/changuestate', project_controller.project_changuestate);

/** Elimina el feedback seleccionado */
router.post('/removefeedback', project_controller.project_removefeedback);

/** Elimina la noticia seleccionada */
router.post('/removeupdate', project_controller.project_removeupdate);

/** Elimina el enlace externo seleccionado */
router.delete('/removeoutside', project_controller.project_removeoutside);

/** Permite la edición de un feedback */
router.post('/editfeedback',validate.feedback, project_controller.project_editfeedback);

/** Permite la edición de una noticia */
router.post('/editupdate',[authenticate.isDev, authenticate.devIsPropietary, validate.update], project_controller.project_editupdate);


module.exports = router;