const pool = require('../models/db');
const bcrypt = require ('bcrypt');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
// Creación del nuevo transporte de nodemailer
const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

/**
* ALTA DE USUARIOS
* @param conn nueva conexión a la base de datos.
* @param user nombre de usuario que se insertará en la base de datos.
* @param email email del nuevo usuario.
* @param password contraseña del usuario encriptada
* @param errors valida los campos del formulario desde el middleware.
* 
* @returns 200 si el usuario es creado con éxito. 404 si ha surgido algún problema en el alta. 
*/
exports.user_signup = async function (req, res) 
{    
    // Nueva conexión a la base de datos
    let conn = await pool.getConnection();
    // Usuario que se va a dar de alta
    let user = req.body.user;
    // Email del usuario
    let email = req.body.email;
    // Contraseña del usuario
    let password = bcrypt.hashSync(req.body.password, 10);
    let errors = validationResult(req);
    
    // Comprueba que todos los campos del formulario son válidos, de lo
    // contrario devolverá un error.
    if (!errors.isEmpty()) { 
        res.type('json').status(403).send({ status: "error", data:"El email o la contraseña son incorrectos."});
        return;
    } 
    conn.query('SELECT email FROM users WHERE email = ?', [email])
    .then(function(result)
    {
        if(result[0])
        {
            res.type('json').status(401).send({ status: "error", data:"Ese email ya está registrado."});
        } else {
            return conn.query('INSERT INTO users(username, email, password) VALUES(?,?,?)', [user, email, password])
        }
    })
    .then(function(result)
    {
        res.type('json').status(200).send({ status: "ok", data:"Usuario dado de alta correctamente."});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"No se ha podido crear la cuenta de usuario."});
        throw err;
    });
    conn.end();
};

/**
* //////////////////// INICIO DE SESIÓN \\\\\\\\\\\\\\\\\\\\
* 
* El usuario deberá introducir su correo y contraseña con el que se registró en el sitio.
* Con el módulo de bcrypt se comprobará que la contraseña introducida y la contraseña
* añmacenada en la base de datos coinciden. En caso afirmativo, se crearán las variables 
* de sesión del usuario y se redirigirá a la raíz de la página, cargando un menú específico
* para el tipo de usuario que es.
* 
* @param conn se abre una nueva conexión con la base de datos.
* @param email correo electrónico del usuario.
* @param password contraseña del usuario.
* @param session variable de sesión global en la que se almacenan los datos del usuario. 
* @param errors comprueba desde le middleware que los campos introducidos son correctos.
*
* @returns 200 -> Todo ok. 403 -> Datos de acceso  incorrectos. 400 -> Error al iniciar sesión.
*/
exports.user_login_post = async function (req,res)
{
    let conn = await pool.getConnection();
    let email = req.body.email;
    let password = req.body.password; 
    let errors = validationResult(req);
    
    // Comprobamos que se han validado todos los campos del formulario. Si hay errores, se notificará al usuario
    // para que vuelva a reenviar el formulario con los datos actualizados.
    if (!errors.isEmpty()) { 
        res.type('json').status(403).send({ status: "error", data:"Datos de acceso incorrectos."});
        return;
    } 
    
    session= req.session;
    session.client={};
    session.client.id=req.body.id;
    session.client.username=req.body.username;
    session.client.type=req.body.type;
    
    conn.query('SELECT * FROM users WHERE email LIKE ?', [email])
    .then(function(result)
    {
        if(result[0]){
            if(bcrypt.compareSync(password, result[0].password))
            {
                // Las contraseñas coinciden
                session.client.id = result[0].id;
                session.client.username = result[0].username;
                session.client.email = result[0].email;
                session.client.type = result[0].type;
                
                // Se el usuario es desarrollador cargamos todos los proyectos que posee en una variable de sesión
                if(result[0].type === 'dev')
                {
                    return conn.query('SELECT id FROM projects INNER JOIN createdprojects ON projects.id= createdprojects.projectid WHERE userid= ?', [result[0].id]);
                }
            } else 
            {
                // Las contraseñas no coinciden
                res.type('json').status(403).send({ status: "error", data:"Datos de acceso incorrectos."});
            }
        } else 
        {
            res.type('json').status(403).send({ status: "error", data:"Usuario no registrado en el sitio."}); 
        }
    })
    .then(function(result)
    {
        session.client.projects = result;
        res.type('json').status(200).send({ status: "ok", data:"Se ha iniciado la sesión correctamente."});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Error al cargar los datos de usuario"});
        throw err;
    });
    conn.end();
};

/**
* //////////////////// DESCONEXIÓN DEL USUARIO \\\\\\\\\\\\\\\\\\\\
* 
* Cierra la sesión del usuario, borrando las variables de sesión creadas y redirigiéndolo a la página principal.
* 
* @param clientSession la sesión del cliente
*/
exports.user_disconnect = function(req,res)
{
    clientSession = req.session;
    clientSession.destroy(function(error)
    {
        if(error)
        {
            res.end('Error al destruir la sesión.')
        }
        else
        {
            res.writeHead(302, {Location: '/'});
            res.end();
        }
    });
};

/**
* //////////////////// CARGA DE USUARIOS \\\\\\\\\\\\\\\\\\\\
* 
* Selecciona todos los usuarios de la base de datos.
* 
* @param conn nueva conexión a la base de datos.
* @returns todos los usuarios registrados en el sitio (200) || Error al consultar la base de datos (404).
*/
exports.user_adminusers_post = async function(req,res)
{    
    let conn = await pool.getConnection();

    conn.query('SELECT id, username, email, type FROM users')
    .then(function(result)
    {
        res.type('json').status(200).send({ status: "ok", data:result});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:err});
        throw err;
    });
    conn.end();
};

/**
* //////////////////// ELIMINACIÓN DE USUARIOS \\\\\\\\\\\\\\\\\\\\
* 
* !!!!!!!!!!!!!!!!!!!! INCOMPLETO !!!!!!!!!!!!!!!!!!!!
* 
* Borra el usuario seleccionado de la base de datos.
* Es necesario eliminar todos los proyectos de un usuario antes de borrarlo.
* 
* @param conn nueva conexión a la base de datos. 
*
*/
exports.user_delete = async function(req,res)
{
    let conn = await pool.getConnection();
    let userId = req.body.userId;
    let userEmail = "";
    
    if(!userId)
    {
        userId = req.session.client.id;
    }
    
    conn.query('SELECT email FROM users WHERE id = ?', [userId])
    .then(function(result)
    {
        userEmail = result[0].email;
        return conn.query('DELETE FROM users WHERE id = ?', [userId])
    })
    .then(function(result)
    {
        const mailOpts = {
            from: process.env.EMAIL, // Esto es ignorado por Gmail
            to: userEmail,
            subject: "Cuenta eliminada",
            text: "Su cuenta no ha cumplido las normas de la comunidad y ha sido eliminada. Si cree que esto es un error pongase en contacto inmediatamente con nosotros. https://naevus.giize.com/contact"
        };
        
        // Enviar el email
        smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
                res.type('json').status(500).send({ status: "error", data:"El correo no ha podido ser enviado."});
                return;
            }
        }); 
        clientSession = req.session;
        clientSession.destroy(function(error)
        {
            if(error)
            {
                res.end('Error al destruir la sesión.')
            }
            else
            {
                conn.end();
                res.type('json').status(204).send({ status: "ok"});
            }
        });   
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Error al eliminar la cuenta de usuario."});
        throw err;
    });
};

/**
* //////////////////// CONSULTA DE USUARIO \\\\\\\\\\\\\\\\\\\\
* 
* Busca en la base de datos por el id de usuario proporcionado y lo devuelve si existe.
* 
* @param conn nueva conexión a la base de datos.
* @param userId ID del usuario del que se van recibir los datos.
* @returns el usuario encontrado (200) || Error, no existe el usuario (404).
*/
exports.user_getuser = async function(req,res)
{
    let conn = await pool.getConnection();
    let userId = req.body.userid;

    conn.query('SELECT id, username, email, type, photo FROM users WHERE id = ?', [userId])
    .then(function(result)
    {
        res.type('json').status(200).send({ status: "ok", data:result});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"No se ha podido cargar los datos del usuario."});
        throw err;
    });
    conn.end();
};

exports.user_account = async function(req,res)
{
    let conn = await pool.getConnection();
    
    conn.query('SELECT username, email, type, photo FROM users WHERE id = ?', [req.session.client.id])
    .then(function(result)
    {
        res.type('json').status(200).send({ status: "ok", data:result});  
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Error al cargar los datos del usuario."});
        throw err;
    });
    conn.end()  
};

/**
* Edita los parámetos básicos de la cuenta de usuario de un cliente del sitio. 
* 
* @param username el nuevo nomrbe de usuario.
* @param email el nuevo email del usuario.
* @param type el nuevo tipo de usuario. Esto puede ser cambiado entre
* user (usuario normal) o dev (usuario desarrollador).
* @param userID ID del cliente que va a modificar sus datos.
* @param errors validación de los campos del formulario mediante el middleware
*/
exports.user_editaccount = async function(req,res)
{
    
    let conn = await pool.getConnection();
    let username = req.body.username;
    let email = req.body.email;
    let type  =req.body.type;
    let userID = req.session.client.id;
    let errors = validationResult(req);
    
    // Si los campos no son válidos, la aplicación lanza un error al usuario.
    if (!errors.isEmpty()) { 
        res.type('json').status(400).send({ status: "error", data:"los datos introducidos son incorrectos."});
        return;
    } 
    
    conn.query('UPDATE users SET username = ?,  email = ?, type = ? WHERE id = ?', [username, email, type, userID])
    .then(function(result)
    {
        res.type('json').status(200).send({ status: "ok", data:"Datos actualizados correctamente."});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Error al actualizar los datos de usaurio."});
        throw err;
    });
};

/**
* ALTA DE USUARIO DESARROLLADOR EN UN PROYECTO
* @param conn nueva conexión a la base de datos.
* @param user nombre de usuario que se insertará en la base de datos.
* @param email email del nuevo usuario.
* @param password contraseña del usuario encriptada
* @param type el tipo de usuario que se va a añadir
* @param errors middleware que comprueba que todos los campos enviados desde el formulario
* son validados correctamente.
* @returns 200 si el usuario es creado con éxito. 404 si ha surgido algún problema en el alta. 
*/
exports.user_devadd = async function (req, res) 
{    
    // Nueva conexión a la base de datos
    let conn = await pool.getConnection();
    // Usuario que se va a dar de alta
    let user = req.body.user;
    // Email del usuario
    let email = req.body.email;
    // Tipo de usuario
    let type = req.body.type;
    // Contraseña del usuario
    let password = bcrypt.hashSync(req.body.password, 10);
    let errors = validationResult(req);
    
    // Si los campos no son válidos, la aplicación lanza un error al usuario.
    if (!errors.isEmpty()) { 
        res.type('json').status(400).send({ status: "error", data:"Los datos introducidos son incorrectos."});
        return;
    } 
    
    conn.query('INSERT INTO users(username, email, password,type) VALUES(?,?,?,?)', [user, email, password, type])
    .then(function(result)
    {
        return conn.query('INSERT INTO createdprojects (userid,projectid) VALUES (?,?)', [result.insertId, req.session.client.currentProject]);
    })
    .then(function(result)
    {
        res.type('json').status(200).send({ status: "ok", data:"Usuario dado de alta correctamente."});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Ha ocurrido un error al dar de alta el nuevo usuario."});
        throw err;
    });
    conn.end();
};

/**
* Cambia la contraseña del usuario desde la vista de su perfil.
* Esta debe tener como mínimo:
* - 8 carácteres de longitud.
* - 1 letra mayúscula.
* - 1 letra minúscula.
* 
* @param conn conexión a la base de datos.
* @param currentPassword la contraseña actual del usuario.
* @param newPassword la nueva contraseña del usuario.
* @param newPasswordRepeated la nueva contraseña repetida del usuario.
* @param userId el ID del usuario que ha solicitado el cambio de contraseña.
*/
exports.user_changuepassword = async function(req,res)
{
    let conn = await pool.getConnection();
    let currentPassword = req.body.currentPassword;
    let newPassword = req.body.newPassword;
    let newPasswordRepeated = req.body.newPasswordRepeated;
    let userId = req.session.client.id;
    let errors = validationResult(req);
    
    // Si los campos no son válidos, la aplicación lanza un error al usuario.
    if (!errors.isEmpty()) { 
        res.type('json').status(400).send({ status: "error", data:"Los datos introducidos son incorrectos."});
        return;
    } 
    
    conn.query('SELECT password FROM users WHERE id = ?', [userId])
    .then(function(result)
    {
        // Comprobamos que las dos contraseñas actuales coincidan
        if(bcrypt.compareSync(currentPassword, result[0].password))
        {
            // Encriptamos la nueva contraseña
            newPassword = bcrypt.hashSync(newPassword, 10);
            return conn.query('UPDATE users SET password = ? WHERE id = ?',[newPassword, userId]);
        } else 
        {
            // Las contraseñas no coinciden
            res.type('json').status(401).send({ status: "error", data:"La contraseña actual no coincide."});
        }
        
    })
    .then(function(result)
    {
        res.type('json').status(200).send({ status: "ok", data:"Contraseña actualizada correctamente."});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Error al intentar cambiar la contraseña."});
        throw err;
    });
    conn.end();
};

/**
* Cambia la foto personal de un usuario.
* 
* @param  conn conexión a la base de datos.
* @param filename nombre de la nueva foto que se ha subido al servidor.
* @param userId ID del usuario al que se le va a cambiar la foto.
*/
exports.user_changuephoto = async function(req,res)
{
    let conn = await pool.getConnection();
    let filename = req.file.filename;
    let userId = req.session.client.id;
    
    conn.query('UPDATE users SET photo = ? WHERE id = ?', [filename, userId])
    .then(function(result)
    {
        res.type('json').status(200).send({ status: "ok", data:"La foto se ha actualizado correctamente."});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Error al intentar cambiar la foto personal."});
        throw err;
    });
    conn.end();
}

/**
 * Formulario de contacto del sitio. Comprueba que los datos introducidos son correctos, y se envía el correo.
 * 
 * @param name nombre del emisor.
 * @param email correo electrónico del emisor.
 * @param subject asunto del correo.
 * @param message mensage del emisor.
 * @errors middleware para la validación del formulario.
 */
exports.user_contact = async function(req,res)
{
    let name = req.body.name;
    let email = req.body.email;
    let subject = req.body.subject;
    let message = req.body.message;
    let errors = validationResult(req);
    
    if(!errors.isEmpty())
    {
        res.type('json').status(400).send({ status: "error", data:"Los elementos introducidos no son válidos."});
        return;
    }
    
    // Construcción del email
    const mailOpts = {
        from: email, // Esto es ignorado por Gmail
        to: process.env.EMAIL,
        subject: subject,
        text: name + " ha enviado un email desde " + email + " que dice lo siguiente: " + message
    };
    
    // Enviar el email
    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            res.type('json').status(500).send({ status: "error", data:"El correo no ha podido ser enviado."});
        }
        else {
            res.type('json').status(200).send({ status: "ok", data:"El email se ha enviado correctamente."});
        }
    });
};