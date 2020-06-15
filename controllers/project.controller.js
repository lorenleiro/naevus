const pool = require('../models/db');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const validate = require('../validation/validation.js');
const nodemailer = require('nodemailer');
// Creación del nuevo transporte
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
 * Sube una imagen al servidor y la guarda en la tabla correspondiente en la base de datos.
 * 
 * @param filename nombre de la imagen.
 * @param projectid id del proyecto al que pertenecerá la imagen.
 * @param type el tipo de imagen que se subirá, esta puede ser de 5 tipos:
 *  - description1: imagen de la descripcion 1 del proyecto
 *  - description2: imagen de la descripcion 2 del proyecto
 *  - description3: imagen de la descripcion 3 del proyecto
 *  - carousel: imágenes del carousel del poryecto
 *  - logo: logo del proyecto
 * @param imageName
 */
exports.project_uploadimage = async function(req, res)
{
    let conn = await pool.getConnection();
    let filename = req.file.filename;
    let projectid = req.session.client.currentProject;
    let type = req.body.type;
    let imageName = "";
    
    if(type === 'description1' || type === 'description2' || type === 'description3')
    {
        conn.query('SELECT * FROM projectimages WHERE type = ? && projectid = ?', [type, projectid])
        .then(function(result)
        {
            if(result[0])
            {
                imageName = result[0].image;
                
                fs.unlink('./public/images/' + imageName, function(error)
                {
                    if(error)
                    {
                        res.type('json').status(400).send({ status: "error", data:"No se ha podido eliminar la imagen anterior."});
                    } else 
                    {
                        return conn.query('DELETE FROM projectimages WHERE id = ? && type = ? && projectid = ?', [result[0].id, type, projectid]);        
                    }
                });
            }
            else 
            {
                return;
            }
        })
        .then(function()
        {
            return conn.query('INSERT INTO projectimages (projectid, image, type) VALUES (?,?,?)', [projectid, filename, type]);
        })
        .then(function(result)
        {
            res.type('json').status(200).send({ status: "ok", data:"Imagen insertada correctamente."});
        })
        .catch(function(err)
        {
            res.type('json').status(500).send({ status: "error", data:"Error al subir imagen al servidor."});
            throw err;
        });
    }
    
    if(type == "carousel")
    {
        conn.query('INSERT INTO projectimages (projectid, image, type) VALUES (?,?,?)', [projectid, filename, type])
        .then(function(result)
        {
            res.type('json').status(200).send({ status: "ok", data:"Imagen insertada correctamente."});
        })
        .catch(function(err)
        {
            res.type('json').status(500).send({ status: "error", data:"Error al subir imagen al servidor."});
            throw err;
        })
    }
    
    if(type == 'logo')
    {
        conn.query('SELECT image FROM projects WHERE id = ?', [projectid])
        .then(function(result)
        {
            imageName = result[0].image;
            return conn.query('UPDATE projects SET image = ? WHERE id = ?', [filename, projectid])
        })
        .then(function()
        {
            fs.unlink('./public/images/' + imageName, function(error)
            {
                if(error)
                {
                    return error; 
                } else 
                {
                    res.type('json').status(200).send({ status: "ok", data:"Imagen insertada correctamente."}); 
                }
            });
        })
        .catch(function(err)
        {
            res.type('json').status(500).send({ status: "error", data:"Error al subir imagen al servidor."});
            throw err;
        }) 
    }
    conn.end();
};

/**
 * Elimina un proyecto. Desde la base de datos se encarga de eliminar todo lo que este contiene.
 */
exports.project_delete = async function(req,res)
{
    let conn = await pool.getConnection();
    let projectId = req.body.projectId;

    if(!projectId)
    {
        projectId = req.session.client.currentProject;
    }

    try 
    {
        let query = "DELETE FROM projects WHERE id = '"+ projectId +"'";
        let row = await conn.query(query);
        res.type('json').status(204).send({ status: "ok"});
    } catch (err) 
    {
        res.type('json').status(500).send({ status: "error", data:"Error al eliminar el proyecto."});
        throw err;
    }
    finally
    {
        if(conn) return conn.release();
    }
};

/**
* /**
* //////////////////// EDICIÓN DE PROYECTOS \\\\\\\\\\\\\\\\\\\\
* 
* Carga el proyecto por su id para mostrar sus datos en la vista y poder modificarlos.
* 
* @see editproyect.ejs
* @see project_controller.js
* @param conn nueva conexión a la base de datos.
* @returns los datos del proyecto (200) || Error, no existe el proyecto (404).
*/
exports.project_editproject_post = async function(req,res)
{ 
    let conn = await pool.getConnection();
    let projectID = req.session.client.currentProject;
    let projectinfo = {};
    let projectimages = {};
    
    conn.query('SELECT * FROM projects WHERE id = ?', [projectID])
    .then(function(result)
    {
        projectinfo = result;
        return conn.query('SELECT * FROM projectimages WHERE projectid = ?', [projectID]);
    })
    .then(function(result)
    {
        projectimages = result;
        let data = {projectinfo,projectimages};
        res.type('json').status(200).send({ status: "ok", data:data});
    })
    .catch(function(err)
    {
        res.type('json').status(404).send({ status: "error", data:err});
        throw err;
    });
    conn.end();
};

/**
 * Carga en la variable de sesión del usuario el ID de un proyecto, este será el próximo proyecto que se visualizará.
 */
exports.project_currentProjectID = function (req,res)
{
    session= req.session;
    session.client.currentProject = req.body.projectid;
    if(session.client.currentProject != "")
    res.type('json').status(200).send({ status: "ok"});
    else
    res.type('json').status(500).send({ status: "error", data:"No se puede cargar el currentFeedbackID en el servidor."});
};

exports.project_currentUpdateID = function (req,res)
{
    session= req.session;
    session.client.currentUpdate = req.body.updateid;
    if(session.client.currentUpdate != "")
    res.type('json').status(200).send({ status: session.client.currentUpdate});
    else
    res.type('json').status(500).send({ status: "error", data:"No se puede cargar el currentUpdateID en el servidor."});
};

exports.project_currentFeedbackID = function (req,res)
{
    session= req.session;
    session.client.currentFeedback = req.body.feedbackid;
    if(session.client.currentFeedback)
    res.type('json').status(200).send({ status: 'ok'});
    else
    res.type('json').status(500).send({ status: "error", data:"No se puede cargar el currentProject en el servidor."});
};

/**
 * Carga todos los proyectos de un usuario.
 * 
 * @param conn conexión a la base de datos.
 * @param userId ID del usuario.
 */
exports.project_myprojects = async function(req,res)
{
    let conn = await pool.getConnection();
    let userId = req.session.client.id;

    conn.query('SELECT * FROM projects INNER JOIN createdprojects ON projects.id = createdprojects.projectid WHERE userid = ?', [userId])
    .then(function(result)
    {
        let data = 
        {
            "projects": result,
            "userId": userId
        };

        res.type('json').status(200).send({ status: "ok", data:data});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Error al cargar los proyectos del usuario."});
        throw err;
    });
    conn.end();
};

/**
* 
*/
exports.project_createproject_post = async function(req,res)
{
    let conn = await pool.getConnection();
    let title = req.body.title;
    let description = req.body.description;
    let tags = req.body.tags;
    let filename = req.file.filename;
    let errors = validationResult(req);
    
    // Comprueba que todos los campos del formulario son válidos, de lo
    // contrario devolverá un error.
    if (!errors.isEmpty()) { 
        fs.unlink('./public/images/' + filename, function(error)
        {
            if(error)
            {
                res.type('json').status(500).send({ status: "error", data:"No se ha podido eliminar la imagen."});
            } else 
            {
                res.type('json').status(400).send({ status: "error", data:"Los campos no pueden estar vacíos."});
            }
        });
        return;
    } 
    
    await conn.query('INSERT INTO projects (projectmaster,title,description,tags,image) VALUES (?,?,?,?,?)', [req.session.client.id, title, description, tags, filename])
    .then(function(result)
    {
        let newId = {"id": result.insertId};
        session = req.session;
        session.client.currentProject = result.insertId;
        session.client.projects.push(newId);
        
        return conn.query('INSERT INTO createdprojects (userid,projectid) VALUES (?,?)', [session.client.id, session.client.currentProject])
    })
    .then(function()
    {
        res.type('json').status(200).send({ status: "ok", data:"Proyecto creado."});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Error al crear el nuevo proyecto."});
        throw err;
    });
    conn.end();
};

exports.project_showprojects = async function(req,res)
{
    let conn = await pool.getConnection();
    try {
        
        let query = "SELECT id, title, description, tags, image FROM projects ORDER BY date DESC";
        let row = await conn.query(query);
        res.type('json').status(200).send({ status: "ok", data:row});
        
    } catch (err) {
        res.type('json').status(500).send({ status: "error", data:"Error al cargar los proyectos desde la base de datos."});
        throw err;
    }finally{
        if(conn) return conn.release();
    }
};

/**
* Selecciona todas las noticias, feedbacks y enlaces externos de un proyecto y los devuelve para mostrarlos
* en su vista correspondiente.
* 
* @param conn conexión a la base de datos
* @param projectID id del proyecto del que se van a cargar todos los parámetros
* @param allUpdates todas las acualizaciones del proyecto
* @param allFeedbacks todos los feedbacks del proyecto
* @param allOutside todos los enlaces externos del proyecto
* @param data contiene los parámetros anteriores
*/
exports.project_projectstatus = async function(req,res)
{
    let conn = await pool.getConnection();
    let projectID = req.session.client.currentProject;
    let allUpdates = {};
    let allFeedbacks = {};
    let allOutside = {};
    let data = {};
    
    conn.query('SELECT * FROM updates WHERE projectid = ? ORDER BY date DESC', [projectID])
    .then(function(updates)
    {
        allUpdates = updates;
        return conn.query('SELECT * FROM feedbacks WHERE projectid = ? ORDER BY date DESC', [projectID])
    })
    .then(function(feedbacks)
    {
        allFeedbacks = feedbacks;
        return conn.query('SELECT * FROM outside WHERE projectid = ?', [projectID])
    })
    .then(function(outside)
    {
        allOutside = outside;
        
        data = 
        {
            "updates": allUpdates,
            "feedbacks": allFeedbacks,
            "outside": allOutside
        };
        
        res.type('json').status(200).send({status: 'ok', data:data});
    })
    .catch(function(err)
    {
        res.type('json').status(404).send({status: 'error', data:err});
        throw err;
    });
    conn.end();
};

exports.project_projectview = async function(req,res)
{
    let conn = await pool.getConnection();
    let projectID = req.session.client.currentProject;
    let allProjectInfo = {};
    let allProjectImages = {};
    let allProjectUpdates = {};
    let data = {};
    
    conn.query('SELECT title,description, resume1, resume2, resume3, tags from projects WHERE id = ?', [projectID])
    .then(function(projectinfo)
    {
        allProjectInfo = projectinfo;
        return conn.query('SELECT image, type FROM projectimages WHERE projectid = ?', [projectID]);
    })
    .then(function(projectimages)
    {
        allProjectImages = projectimages;
        return conn.query('SELECT * FROM updates WHERE projectid = ? LIMIT 5', [projectID])
    })
    .then(function(projectupdates)
    {
        allProjectUpdates = projectupdates;
        data = 
        {
            "projectinfo": allProjectInfo,
            "projectimages": allProjectImages,
            "projectupdates": allProjectUpdates
        };
        
        res.type('json').status(200).send({status: 'ok', data:data});
    })
    .catch(function(err)
    {
        res.type('json').status(404).send({status: 'error', data:err});
        throw err;
    });
    conn.end();
};

exports.project_updateproject = async function(req,res)
{
    let conn = await pool.getConnection();
    let description = req.body.description;
    let type = req.body.type;
    let projectID = req.session.client.currentProject;
    console.log(req.body.type);
    
    if(type === "resume1")
    {
        conn.query('UPDATE projects SET resume1 = ? WHERE id = ?', [description, projectID])
        .then(function(result)
        {
            res.type('json').status(200).send({ status: "ok", data:"Descripción actualizada correctamente."});
        })
        .catch(function(err)
        {
            res.type('json').status(404).send({ status: "error", data:err});
            throw err;
        });
    }
    if(type === "resume2")
    {
        conn.query('UPDATE projects SET resume2 = ? WHERE id = ?', [description, projectID])
        .then(function(result)
        {
            res.type('json').status(200).send({ status: "ok", data:"Descripción actualizada correctamente."});
        })
        .catch(function(err)
        {
            res.type('json').status(404).send({ status: "error", data:err});
            throw err;
        });
    }
    if(type === "resume3")
    {
        conn.query('UPDATE projects SET resume3 = ? WHERE id = ?', [description, projectID])
        .then(function(result)
        {
            res.type('json').status(200).send({ status: "ok", data:"Descripción actualizada correctamente."});
        })
        .catch(function(err)
        {
            res.type('json').status(404).send({ status: "error", data:err});
            throw err;
        });
    }
    
    if(type === 'jumbotron')
    {
        conn.query('UPDATE projects SET title = ?, description = ?, tags = ? WHERE id = ?', [req.body.title, req.body.description, req.body.tags, projectID])
        .then(function(result)
        {
            res.type('json').status(200).send({ status: "ok", data:"Proyecto actualizado correctamente."});
        })
        .catch(function(err)
        {
            res.type('json').status(404).send({ status: "error", data:err});
            throw err;
        });
    }
    conn.end();
};

/**
* Recibe el título y el texto de uan noticia creada por un desarrollador del proyecto.
* 
* @param conn conexión con la base de datos
* @param projectID id del proyecto que se está visitando
* @param title título de la noticia
* @param text texto de la noticia
* @param filaname nombre de la imagen de la actualización
*/
exports.project_createupdate = async function(req,res)
{
    let conn = await pool.getConnection();
    let projectID = req.session.client.currentProject;
    let title = req.body.title;
    let text = req.body.text;
    let userId = req.session.client.id;
    let filename = "";
    let userProjects = req.session.client.projects;
    let errors = validationResult(req);
    
    // Comprueba que se haya enviado una imagen y si no es así envía la imagen por defecto del sitio.
    if(!req.file)
    {
        filename = "default_update.jpg";
    } else 
    {
        filename = req.file.filename;
    }
    // Comprueba que todos los campos del formulario son válidos, de lo
    // contrario devolverá un error y eliminará la imagen subida al servidor.
    if (!errors.isEmpty()) { 
        if(!filename == 'default_update.jpg')
        {
            fs.unlink('./public/images/' + filename, function(error)
            {
                if(error)
                {
                    res.type('json').status(500).send({ status: "error", data:"No se ha podido eliminar la imagen."});
                } else 
                {
                    res.type('json').status(400).send({ status: "error", data:"Los campos no pueden estar vacíos."});
                }
            });
        }
        res.type('json').status(400).send({ status: "error", data:"Los campos no pueden estar vacíos."});
        return;
    } 
    
    conn.query('INSERT INTO updates (projectid, userid, title, text, image) VALUES (?, ?, ?, ?, ?)', [projectID, userId, title, text, filename])
    .then(function(result)
    {
        req.session.client.currentUpdate = result.insertId;
        res.type('json').status(200).send({ status: "ok", data:"Actualización creada correctamente."});
    })
    .catch(function(err)
    {
        res.type('json').status(404).send({ status: "error", data:err});
        throw err;
    });
    conn.end();
};

/**
* Recibe el título y el texto de un feedbacks creado por cualquier usuario registrado en el sitio que 
* haya visitado el proyecto.
* 
* @param conn conexión con la base de datos
* @param projectID id del proyecto que se está visitando
* @param userID id del usuario que creo el feedback
* @param title título de la noticia
* @param text texto de la noticia
* @param filename nombre de la imagen que se va a insertar
*/
exports.project_createfeedback = async function(req,res)
{
    let conn = await pool.getConnection();
    let projectID = req.session.client.currentProject;
    let userID = req.session.client.id;
    let title = req.body.title;
    let text = req.body.text;
    let filename = "";
    let errors = validationResult(req);
    
    // Comprueba que se haya enviado una imagen y si no es así añade la imagen por defecto del sitio.
    if(!req.file)
    {
        filename = "default_feedback.jpg";
    } else 
    {
        filename = req.file.filename;
    }
    
    // Comprueba que todos los campos del formulario son válidos, de lo
    // contrario devolverá un error y eliminará la imagen subida al servidor.
    if (!errors.isEmpty()) { 
        if(!filename == 'default_feedback.jpg')
        {
            fs.unlink('./public/images/' + filename, function(error)
            {
                if(error)
                {
                    res.type('json').status(500).send({ status: "error", data:"No se ha podido eliminar la imagen."});
                } else 
                {
                    res.type('json').status(400).send({ status: "error", data:"Los campos no pueden estar vacíos."});
                }
            });
        }
        res.type('json').status(400).send({ status: "error", data:"Los campos no pueden estar vacíos."});
        return;
    } 
    
    conn.query('INSERT INTO feedbacks (projectid, userid, title, text, image) VALUES (?, ?, ?, ?, ?)', [projectID, userID, title, text, filename])
    .then(function(result)
    {
        // Cambiamos el currentFeedback del usuario para redirigirlo a la vista del feedback que acaba de crear
        req.session.client.currentFeedback = result.insertId;
        res.type('json').status(200).send({ status: "ok", data:"Feedback creado correctamente."});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "ok", data:"Error al añadir el comentario a la base de datos."});
        throw err;
    });
    conn.end();
};

/**
* Carga los datos del feedback selsccionado y los envía a la vista para mostrarlos.
* 
* @param conn conexión a la base de datos
* @param projectID id del proyecto al que pertenece el feedback
* @param feedbackID id del feedback que se va a visualizar
*/
exports.project_feedbackview = async function(req,res)
{
    let conn = await pool.getConnection();
    let projectID = req.session.client.currentProject;
    let feedbackID = req.session.client.currentFeedback;
    
    conn.query('SELECT * FROM feedbacks WHERE id = ? && projectid = ?', [feedbackID, projectID])
    .then(function(result)
    {
        let data = 
        {
            "feedback": result,
            "currentProject": projectID,
            "clientProjects": req.session.client.projects,
            "clientId": req.session.client.id
        }
        res.type('json').status(200).send({ status: "ok", data:data});
    })
    .catch(function(err)
    {
        res.type('json').status(404).send({status: 'error', data:err});
        throw err;
    });
    conn.end();
};

exports.project_updates = async function(req,res)
{
    let conn = await pool.getConnection();
    let projectID = req.session.client.currentProject;
    
    conn.query('SELECT * FROM updates WHERE projectid = ? ORDER BY date DESC', [projectID])
    .then(function(result)
    {
        let data = 
        {
            "projectinfo" : result,
            "currentProject": req.session.client.currentProject,
            "clientProjects": req.session.client.projects,
            "clientType": req.session.client.type
        }
        res.type('json').status(200).send({ status: "ok", data:data});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Error al cargar las noticias del proyecto."});
        throw err;
    });
    conn.end();    
};

/**
* Devuelve todos los datos de una actualización para mostrarlos en su vista.
* 
* @param conn conexión a la base de datos.
* @param projectId ID del proyecto al que pertenece la actualización.
* @param updateId ID de la actualización.
*/
exports.project_updateview = async function(req,res)
{
    let conn = await pool.getConnection();
    let projectId = req.session.client.currentProject;
    let updateId = req.session.client.currentUpdate;
    
    conn.query('SELECT * FROM updates WHERE id = ? && projectid = ?', [updateId, projectId])
    .then(function(result)
    {
        let data =
        {
            "update": result,
            "clientProjects": req.session.client.projects,
            "currentProject": req.session.client.currentProject,
            "clientId": req.session.client.id
        };
        res.type('json').status(200).send({ status: "ok", data:data});
    })
    .catch(function(err)
    {
        res.type('json').status(404).send({ status: "ok", data:"No se ha encontrado una actualización con ese ID."});
        throw err;
    });
    conn.end();    
};

exports.project_updatecomments = async function(req,res)
{
    let conn = await pool.getConnection();
    let updateid = req.body.updateid;
    
    try {
        let query = "SELECT * FROM updatescomments WHERE updateid = '"+ req.session.client.currentUpdate +"' ORDER BY date DESC";
        let row = await conn.query(query);
        res.type('json').status(200).send({ status: "ok", data:row});
    } catch (err) {
        res.type('json').status(404).send({ status: "ok", data:err});
        throw err;
    }finally{
        if(conn) return conn.release();
    }
    
};

exports.project_createcomment = async function(req,res)
{
    let conn = await pool.getConnection();
    let userID = req.session.client.id;
    let text = req.body.text;
    let type = req.body.type;
    let errors = validationResult(req);
    
    // Comprueba que todos los campos del formulario son válidos, de lo
    // contrario devolverá un error.
    if (!errors.isEmpty()) { 
        res.type('json').status(400).send({ status: "error", data:"El comentario no cumple los requisitos."});
        return;
    } 
    
    if(type == "feedback")
    {
        conn.query('INSERT INTO feedbackcomments (userid, feedbackid, text) VALUES (?,?,?)', [userID, req.session.client.currentFeedback, text])
        .then(function(result)
        {
            res.type('json').status(200).send({ status: "ok", data:"Comentario publicado correctamente."});
        })
        .catch(function(err)
        {
            res.type('json').status(400).send({status: 'error', data: err});
            throw err;
        });
    }
    if(type == "update")
    {
        conn.query('INSERT INTO updatescomments (userid, updateid, text) VALUES (?,?,?)', [userID, req.session.client.currentUpdate, text])
        .then(function(result)
        {
            res.type('json').status(200).send({ status: "ok", data:"Comentario publicado correctamente."});
        })
        .catch(function(err)
        {
            res.type('json').status(400).send({status: 'error', data: err});
            throw err;
        });
    }
    conn.end();
};

/**
* Carga todos los feedbacks de un proyecto en concreto. Envía tambien información sobre el usuario
* para saber si este está autenticado en el sitio o no.
* 
* @param projectID el id del proyecto del que se van a cargar los feedbacks
* @param conn conexión a la base de datos
*/
exports.project_feedbacks = async function(req,res)
{
    
    let conn = await pool.getConnection();
    let projectID = req.session.client.currentProject;
    
    conn.query('SELECT * FROM feedbacks WHERE projectid = ? ORDER BY date DESC', [projectID])
    .then(function(result)
    {
        let data = 
        {
            "feedbacks": result,
            "userID": req.session.client.id
        }
        res.type('json').status(200).send({ status: "ok", data:data});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "ok", data:"No se pueden cargar los comentarios del proyecto."});
        throw err;
    });
    conn.end();
};

exports.project_feedbackcomments = async function(req,res)
{
    
    let conn = await pool.getConnection();
    let feedbackID = req.session.client.currentFeedback;
    console.log(feedbackID);
    
    conn.query('SELECT * FROM feedbackcomments WHERE feedbackid = ? ORDER BY date DESC', [feedbackID])
    .then(function(result)
    {
        res.type('json').status(200).send({ status: "ok", data:result});
    })
    .catch(function(err)
    {
        res.type('json').status(404).send({ status: "error", data:err});
        throw err;
    })
    conn.end();
};

exports.project_reportcomment = async function(req,res)
{
    session = req.session;
    let conn = await pool.getConnection();
    let commentSection = req.body.section;
    let commentID = req.body.commentid;
    
    if(session.client.type == 'admin' ||session.client.type == 'dev')
    {
        try {
            
            if(commentSection == 'update')
            {
                let query = "DELETE FROM updatescomments WHERE id = '"+ commentID +"'";
                let row = await conn.query(query);
                console.log(row);
                res.type('json').status(204).send({ status: "ok"});
            }
            if(commentSection == 'feedback')
            {
                let query = "DELETE FROM feedbackcomments WHERE id = '"+ commentID +"'";
                let row = await conn.query(query);
                console.log(row);
                res.type('json').status(204).send({ status: "ok"});
            }
            
        } catch (err) {
            res.type('json').status(404).send({ status: "error", data:err});
            throw err;
        }finally{
            if(conn) return conn.release();
        }
        
    } else if(session.client.type == 'user')
    {
        // ENVIARR CORREO AL ADMIN
        res.type('json').status(200).send({ status: "ok", data:'El administrador del sitio ha sido resportado. En breve se revisará su solicitud.'});
    }
    
};

/**
* Busca aquellos proyectos que coinciden con el parámetro enviado y los devuelve. Este puede
* ser una etiqueta o un nombre.
* 
* @param searchItem el nombre o etiqueta a buscar
* @returns lso elementos encontrados en la base de datos.
*/
exports.project_searchprojects = async function(req,res)
{
    let conn = await pool.getConnection();
    let searchItem = req.body.searchItem;
    let errors = validationResult(req);
    
    if(!errors.isEmpty())
    {
        res.type('json').status(400).send({status:"error", data: "Introduce datos para buscar proyectos similares."})
        return;
    }
    
    conn.query("SELECT * FROM projects WHERE tags REGEXP ? OR title REGEXP ?", [searchItem, searchItem])
    .then(function(result)
    {
        res.type('json').status(200).send({status: 'ok', data: result});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({ status: "error", data:"Error al buscar los proyectos con esos parámetros."});
        throw err;
    })
};

/** Recibe el id de la imagen que se quiere eliminar y la borra de la base de datos y del almacenamiento
* local.
* 
* @param imageID el id de la imagen a eliminar
* @param projectID el id del proyecto con la imagen que se quiere borrar
* @param imageName el nombre de la imagen que se va a eliminar
*/
exports.project_removeimage = async function(req,res)
{
    let conn = await pool.getConnection();
    let imageID = req.body.imageid;
    let projectID = req.session.client.currentProject;
    let imageName = "";
    
    conn.query('SELECT image FROM projectimages WHERE id = ? AND projectid = ?', [imageID, projectID])
    .then(function(result)
    {
        imageName = result[0].image;
        return conn.query('DELETE FROM projectimages WHERE id = ? AND projectid = ?', [imageID, projectID])
    })
    .then(function(result)
    {
        fs.unlink('./public/images/' + imageName, function(error)
        {
            if(error)
            {
                res.type('json').status(400).send({ status: "error", data:"No se ha podido eliminar la imagen."});
            } else 
            {
                res.type('json').status(204).send({status: 'ok'});
            }
        });
    })
    .catch(function(err)
    {
        res.type('json').status(400).send({ status: "error", data:"No se ha podido eliminar la imagen."});
        throw err;
    });
    conn.end();
};

/**
* Carga todos los enlaces externos de un proyecto y se lo envía a la vista correspondiente.
* 
* @param conn conexión a la base de datos
* @param projectID id del proyecto al que pertenecen los enlaces
*/
exports.project_outside = async function(req,res)
{
    let conn = await pool.getConnection();
    let projectID = req.session.client.currentProject;
    
    conn.query('SELECT id, name, link FROM outside WHERE projectid = ?', [projectID])
    .then(function(result)
    {
        let data = 
        {
            "links": result,
            "clientProjects": req.session.client.projects,
            "clientType": req.session.client.type,
            "currentProject": projectID
        };
        
        res.type('json').status(200).send({status: 'ok', data:data});
    })
    .catch(function(err)
    {
        res.type('json').status(404).send({status: 'error', data:err});
        throw err;
    });
    conn.end();
};

exports.project_createoutside = async function(req,res)
{
    let conn = await pool.getConnection();
    let name = req.body.name;
    let link = req.body.link;
    let projectID = req.session.client.currentProject;
    let userProjects = req.session.client.projects;
    let errors = validationResult(req);
    
    if(!errors.isEmpty())
    {
        res.type('json').status(400).send({status: 'error', data:"Los parámetros introducidos no son válidos"});
        return;
    }
    
    for(let i = 0; i < userProjects.length; i++)
    {
        if(userProjects[i].id == projectID)
        {
            conn.query('INSERT INTO outside (projectid, name, link) VALUES (?,?,?)', [projectID, name, link])
            .then(function(result)
            {
                res.type('json').status(200).send({status: 'ok', data:"Enlace añadido correctamente"});
            })
            .catch(function(err)
            {
                res.type('json').status(500).send({status: 'error', data:"Error al crear el enlace externo."});
                throw err;
            });
        }
    }
    res.end();
    conn.end();
};

/**
* Cambia el estado de un feedback. Esto solo lo pueden hacer los usuario desarrolladores en sus proyectos.
* 
* @param conn conexión a la base de datos
* @param newState el nuevo estado del feedback
* @param feedbackID  ID del feedback al que se le cambiará el estado
* @param projectID ID del proyecto al que pertene el feedback
*/
exports.project_changuestate = async function(req,res)
{
    let conn = await pool.getConnection();
    let newState = req.body.state;
    let feedbackID = req.session.client.currentFeedback;
    let projectID = req.session.client.currentProject;
    
    conn.query('UPDATE feedbacks SET state = ? WHERE id = ? AND projectid = ?', [newState, feedbackID, projectID])
    .then(function(result)
    {
        res.type('json').status(200).send({status: 'ok', data: "Estado del feedback actualizado correctamente."})
    })
    .catch(function(err)
    {
        res.type('json').status(400).send({status: 'error', data: "Ha ocurrido un error al actualizar el feedback."})
        throw err;
    });
    conn.end();
};

/**
* Elimina el feedback seleccionado de la base de datos asi como la imagen que tiene del almacenamiento
* del servidor. Comprueba primero que se envíe un id y si no es así lo obtiene de la variable de sesión del 
* usuario que quiere borrar el feedback.
* 
* @param conn conexión a la base de datos.
* @param feedbackId ID del feedback que se va a eliminar.
*/
exports.project_removefeedback = async function(req,res)
{   
    let conn = await pool.getConnection();
    let feedbackId = "";
    let isAdmin = req.session.client.type;
    
    if(!req.body.feedbackid)
    {
        feedbackId = req.session.client.currentFeedback;
    } else 
    {
        feedbackId = req.body.feedbackid;
    }    
    
    conn.query('DELETE FROM feedbacks WHERE id = ?', [feedbackId])
    .then(function(result)
    {
        if(isAdmin === 'admin')
        {
            // Construcción del email
            const mailOpts = {
                from: process.env.EMAIL, // Esto es ignorado por Gmail
                to: req.session.client.email,
                subject: "Comentario de feedback eliminado",
                text: "Su comentario de feedback ha sido eliminado."
            };
            
            // Enviar el email
            smtpTrans.sendMail(mailOpts, (error, response) => {
                if (error) {
                    res.type('json').status(500).send({ status: "error", data:"El correo no ha podido ser enviado."});
                    return;
                }
            }); 
        }
        res.type('json').status(204).send({status: 'ok', data: 'Feedback eliminado correctamente.'})
    })
    .catch(function(err)
    {
        res.type('json').status(400).send({status: 'error', data: "Ha ocurrido un error al eliminar el feedback."})
        throw err;
    });
    conn.end();
};

/**
* Elimina la noticia seleccionada de la base de datos asi como la imagen que tiene del almacenamiento
* del servidor.
* 
* @param conn conexión a la base de datos.
* @param updateId ID de la noticia que se va a eliminar.
*/
exports.project_removeupdate = async function(req,res)
{   
    let conn = await pool.getConnection();
    let updateId = "";
    let userId = "";
    
    if(!req.body.updateid)
    {
        updateId = req.session.client.currentUpdate;
    } else 
    {
        updateId = req.body.updateid;
    }
    
    conn.query('SELECT * FROM updates WHERE id = ?', [updateId])
    .then(function(result)
    {
        console.log(result[0]);
        userId = result[0].userid;
        // Comprueba que la imagen que se vaya a borrar no sea la por defecto de la página.
        if(result[0].image != "default_update.jpg")
        {
            fs.unlink('./public/images/' + result[0].image, function(error)
            {
                if(error)
                {
                    throw error;
                } else 
                {
                    return conn.query('DELETE FROM updates WHERE id = ?', [updateId]);
                }
            });
        } else 
        {
            return conn.query('DELETE FROM updates WHERE id = ?', [updateId]);
        }
    })
    .then(function(result)
    {
        return conn.query('SELECT email, type FROM users WHERE id = ?', [userId]);
    })
    .then(function(result)
    {
        console.log(result);
        if(result[0].type != 'admin')
        {
            // Construcción del email
            const mailOpts = {
                from: process.env.EMAIL, // Esto es ignorado por Gmail
                to: result[0].email,
                subject: "Noticia eliminada",
                text: "Su noticia ha sido eliminada."
            };
            
            // Enviar el email
            smtpTrans.sendMail(mailOpts, (error, response) => {
                if (error) {
                    res.type('json').status(500).send({ status: "error", data:"El correo no ha podido ser enviado."});
                    return;
                }
            }); 
        }
        res.type('json').status(204).send({status: 'ok', data: 'Noticia eliminada correctamente.'})
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({status: 'error', data: "Ha ocurrido un error al eliminar la noticia."})
        throw err;
    });
    conn.end();
};

/**
* Edita los parámetros título y texto de un feedback solo si el usuario que lo hace es el que creó
* el feedback.
* 
* @param conn conexión a la base de datos.
* @param title nuevo título del feedback.
* @param text nuevo texto del feedback.
* @param clientId ID del usuario que solicita la edición.
* @param feedbackId ID del feedback que se va a editar.
*/
exports.project_editfeedback = async function(req,res)
{
    let conn = await pool.getConnection();
    let title = req.body.title;
    let text = req.body.text;
    let clientId = req.body.clientId;
    let feedbackId = req.session.client.currentFeedback;
    let errors = validationResult(req);
    
    if(!errors.isEmpty())
    {
        res.type('json').status(400).send({status: 'error', data: "Los datos introducidos en el comentario no son correctos."})
        return;
    }
    
    conn.query('SELECT userid FROM feedbacks WHERE id = ?', [feedbackId])
    .then(function(result)
    {
        // Si el usuario que edita el feedback es el mismoq que lo creó entonces procedemos a la edición.
        if(result[0].userid == clientId)
        {
            console.log("aca");
            return conn.query('UPDATE feedbacks SET title = ?, text = ? WHERE id = ? && userid = ?',[title, text,feedbackId, clientId]);
        }
        else
        {
            return;
        }
    })
    .then(function(result)
    {
        res.type('json').status(200).send({status: 'ok', data: 'Feedback actualizado correctamente.'})
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({status: 'error', data: "Ha ocurrido un error al actualizar el feedback."})
        throw err;
    });
    conn.end();
};

/**
* Edita los parámetros título y texto de una noticia solo si el usuario que lo hace es el que creó
* la misma.
* 
* @param conn conexión a la base de datos.
* @param title nuevo título del feedback.
* @param text nuevo texto del feedback.
* @param updateId ID del feedback que se va a editar.
*/
exports.project_editupdate = async function(req,res)
{
    let conn = await pool.getConnection();
    let title = req.body.title;
    let text = req.body.text;
    let updateId = req.session.client.currentUpdate;
    let errors = validationResult(req);
    
    if(!errors.isEmpty())
    {
        res.type('json').status(400).send({status: 'error', data: "Los datos introducidos en la noticia no son correctos."})
        return;
    }
    
    for(let i = 0; i < req.session.client.projects.length; i++)
    {
        if(req.session.client.projects[i].id == req.session.client.currentProject)
        {
            conn.query('UPDATE updates SET title = ?, text = ? WHERE id = ?',[title, text,updateId])
            .then(function(result)
            {
                res.type('json').status(200).send({status: 'ok', data: 'Noticia actualizada correctamente.'})
            })
            .catch(function(err)
            {
                res.type('json').status(400).send({status: 'error', data: "Ha ocurrido un error al actualizar la noticia."})
                throw err;
            });
        }
    }
    conn.end();
};

/**
 * Elimina un enlace externo por su id.
 * 
 * @param conn conexión a la base de datos.
 * @param outsideId ID del elemento que se va a eliminar.
 */
exports.project_removeoutside = async function(req,res)
{
    let conn = await pool.getConnection();
    let outsideId = req.body.id;

    conn.query('DELETE FROM outside WHERE id = ?', outsideId)
    .then(function(result)
    {
        res.type('json').status(204).send({status: 'ok'});
    })
    .catch(function(err)
    {
        res.type('json').status(500).send({status: 'error', data: "No se ha podido eliminar el enlace externo."});
        throw err;
    });
    conn.end();
};