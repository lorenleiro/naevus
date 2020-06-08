///////// CARGA DE MÓDULOS NECESARIOS /////////
const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const { check, validationResult } = require('express-validator');
const validate = require('../validation/validation.js');
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

/** Controlador para la administración de usuarios (editar, borrar, añadir) */
router.post('/adminusers', user_controller.user_adminusers_post);

/** Controlador para dar de alta un nuevo usuario */
router.post('/signup', [check('user').notEmpty().escape(), check('email').isEmail(), check('password').notEmpty().isLength({min: 8}).matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)], user_controller.user_signup);

/** Controlador para el logueo de los usuarios y la creación de sus variables de sesión */
router.post('/login', [check('email').isEmail(), check('password').notEmpty().isLength({min: 8}).matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)],user_controller.user_login_post);

/** Controlador para eliminar las variables de sesión y cerrar la sesión abierta de los usuarios*/
router.get('/disconnect', user_controller.user_disconnect);

/** Controlador para borrar la cuanta propia del usuario*/
router.delete('/accountdelete', user_controller.user_delete);

/** Busca un usuario por su id y devuelve todos sus datos menos la contraseña */
router.post('/getuser', user_controller.user_getuser);

/** Carga todos los datos del usuario en la vista de su perfil */
router.post('/account', user_controller.user_account);

/** Envia los nuevos datos sobre un usuario que ha modificado su perfil */
router.post('/editaccount',[check('username').notEmpty().escape(), check('email').isEmail(), check('type').matches(/user|dev/)], user_controller.user_editaccount);

/** Añade un nuevo desarrollador a un proyecto en concreto */
router.post('/devadd', [check('user').notEmpty().escape(), check('email').isEmail(), check('password').notEmpty().isLength({min: 8}).matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)],user_controller.user_devadd);

/** Cambia al contraseña de un usuario desde su cuenta. Esta debe tener 8 carácteres de longitud
 * una letra mínuscula, una letra mayúscula y un dígito como mínimo.
 */
router.post('/changuepassword', [check('newPassword').notEmpty().isLength({min: 8}).escape(), check('newPassword').notEmpty().isLength({min: 8}).matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/), check('newPasswordRepeated').notEmpty().isLength({min: 8}).matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)], user_controller.user_changuepassword);

/** Cambia la foto personal de un usuario. */
router.post('/changuephoto', upload, user_controller.user_changuephoto);

/** Envía un correo desde el sitio hasta el usuario administrador. */
router.post('/contact', validate.email, user_controller.user_contact);

module.exports = router;