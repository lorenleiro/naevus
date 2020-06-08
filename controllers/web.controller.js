const pool = require('../models/db');

/**
 * //////////////////// RAÍZ DE LA PÁGINA \\\\\\\\\\\\\\\\\\\\
 */
exports.web_home = function (req, res) 
{
    res.render('index',{"title": "Naevus - Inicio"});
};

/**
 * //////////////////// REGISTRO DE USUARIOS \\\\\\\\\\\\\\\\\\\\
 */
exports.web_signup = function (req, res) 
{
    res.render('signup',{"title": "Naevus - Registro"});
};

/**
 * //////////////////// LOGIN DE USUARIOS \\\\\\\\\\\\\\\\\\\\
 */
exports.web_login = function (req, res) 
{
    res.render('login',{"title": "Naevus - Iniciar sesión"});
};

/**
 * //////////////////// ADMINISTRACIÓN DE USUARIOS \\\\\\\\\\\\\\\\\\\\
 */
exports.web_adminusers = function (req, res) 
{
    res.render('adminusers',{"title": "Naevus - Administración de usuarios"});
};

/**
 * //////////////////// CREACIÓN DE PROYECTOS \\\\\\\\\\\\\\\\\\\\
 */
exports.web_createproject = function(req,res)
{
    res.render('createproject', {"title": "Naevus - Crear nuevo proyecto"});
};

/**
 * //////////////////// EDICIÓN DE PROYECTOS \\\\\\\\\\\\\\\\\\\\
 */
exports.web_editproject = function(req,res)
{
    res.render('editproject', {"title": "Naevus - Editar"});
};

/**
 * //////////////////// PROYECTOS PERSONALES \\\\\\\\\\\\\\\\\\\\
 */
exports.web_myprojects = function(req,res)
{
    res.render('myprojects', {"title": "Naevus - Mis proyectos"});
};

/**
 * //////////////////// TODOS LOS PROYECTOS DE LA APLICACIÓN \\\\\\\\\\\\\\\\\\\\
 */
exports.web_showprojects = function(req,res)
{
    res.render('projects', {"title": "Naevus - Proyectos"});
};

/**
 * //////////////////// VISTA DEL PROYECTO \\\\\\\\\\\\\\\\\\\\
 */
exports.web_projectview = function(req,res)
{
    res.render('projectview', {'title': 'Naevus - Vista del proyecto'});
};

/**
 * //////////////////// VISTA DE TODAS LAS NOTICIAS Y EVENTOS DE UN PROYECTO \\\\\\\\\\\\\\\\\\\\
 */
exports.web_updates = function(req,res)
{
    res.render('updates', {'title': 'Naevus - Noticias'});
};

/**
 * //////////////////// CREACIÓN DE NOTICIAS Y EVENTOS \\\\\\\\\\\\\\\\\\\\
 */
exports.web_createupdate = function(req,res)
{
    res.render('createupdate', {'title': 'Naevus - Crear noticia'});
};

/**
 * //////////////////// VISTA DE NOTICIA O EVENTO CONCRETO \\\\\\\\\\\\\\\\\\\\
 */
exports.web_updateview = function(req,res)
{
    res.render('updateview', {'title': 'Naevus - Noticias'});
};

/**
 * //////////////////// VISTA DE TODOS LOS FEEDBACKS DE UN PROYECTO \\\\\\\\\\\\\\\\\\\\
 */
exports.web_feedbacks = function(req,res)
{
    res.render('feedbacks', {'title': 'Naevus - Comentarios'});
};

/**
 * //////////////////// VISTA DE UNA NOTICIA CONCRETA \\\\\\\\\\\\\\\\\\\\
 */
exports.web_feedbackview = function(req,res)
{
    res.render('feedbackview', {'title': 'Naevus - Comentarios'});
};

/**
 * //////////////////// CREACIÓN DE FEEDBACKS \\\\\\\\\\\\\\\\\\\\
 */
exports.web_createfeedback = function(req,res)
{
    res.render('createfeedback', {'title': 'Naevus - Crear comentario'});
};

/**
 * //////////////////// VISTA DE LOS ENLACES Y FUENTES EXTERNAS DE UN PROYECTO \\\\\\\\\\\\\\\\\\\\
 */
exports.web_outside = function(req,res)
{
    res.render('outside', {'title': 'Naevus - Más información'});
};

/**
 * //////////////////// VISTA DE INFORMACIÓN SOBRE LA PÁGINA \\\\\\\\\\\\\\\\\\\\
 */
exports.web_about = function(req,res)
{
    res.render('about', {'title': 'Naevus - Sobre la página'});
};

/**
 * //////////////////// VISTA DE INFORMACIÓN SOBRE LA PÁGINA \\\\\\\\\\\\\\\\\\\\
 */
exports.web_info = function(req,res)
{
    res.render('info', {'title': 'Naevus - ¿Cómo funciona?'});
};

/**
 * //////////////////// TODOS LOS PROYECTOS DEL SITIO VISTA DE ADMINISTRACIÓN \\\\\\\\\\\\\\\\\\\\
 */
exports.web_adminprojects = function(req,res)
{
    res.render('adminprojects', {'title': 'Naevus - Todos los proyectos'});
};

/**
 * //////////////////// TODAS LAS NOTICIAS FEEDBACKS Y ENLACES EXTERNOS DEL PROYECTO \\\\\\\\\\\\\\\\\\\\
 */
exports.web_projectstatus = function(req,res)
{
    res.render('projectstatus', {'title': 'Naevus - Administración del proyecto'});
};

/**
 * //////////////////// PERFIL DE LOS USUARIOS REGISTRADOS EN EL SITIO \\\\\\\\\\\\\\\\\\\\
 */
exports.web_account = function(req,res)
{
    res.render('account', {'title': 'Naevus - Mi cuenta'});
};

/**
 * //////////////////// VISTA DE ERROR GENERAL \\\\\\\\\\\\\\\\\\\\
 */
exports.web_error = function(req,res)
{
    res.render('error', {'title': 'Naevus - Error'});
};

/**
 * //////////////////// VISTA DE CONTACTO CON EL ADMINISTRADOR \\\\\\\\\\\\\\\\\\\\
 */
exports.web_contact = function(req,res)
{
    res.render('contact', {'title': 'Naevus - Contacto'});
};

/**
 * //////////////////// VISTA DE INFORMACIÓN LEGAL \\\\\\\\\\\\\\\\\\\\
 */
exports.web_legalinfo = function(req,res)
{
    res.render('legalinfo', {'title': 'Naevus - Información legal'});
};

/**
 * //////////////////// VISTA DE LICENCIA DEL SITIO \\\\\\\\\\\\\\\\\\\\
 */
exports.web_license = function(req,res)
{
    res.render('license', {'title': 'Naevus - Licencia'});
};