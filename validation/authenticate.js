/**
* Compruba que el tipo de usuario autenticado es de tipo desarrollador (dev). Esta función
* permite el acceso a las vistas propias de desarrolladores.
*/
function isAuthenticated(req,res,next)
{
    if(req.session.client.id)
    {
        return next();
    }
    else
    {
        res.redirect('/error');
    }
};

/**
* Compruba que el tipo de usuario autenticado es de tipo desarrollador (dev). Esta función
* permite el acceso a las vistas propias de desarrolladores.
*/
function isDev(req,res,next)
{
    if(req.session.client.type === 'dev')
    {
        return next();
    }
    else
    {
        res.redirect('/error');
    }
};

/**
* Comprueba que el tipo de usuario autenticado es administrados (admin). Esta función da acceso
* a todas las vistas que son propias de la administración del sitio.
*/
function isAdmin(req,res,next)
{
    if(req.session.client.type === 'admin')
    {
        return next();
    }
    else
    {
        res.redirect('/error');
    }
};

function devIsPropietary(req,res,next)
{
    let projects = req.session.client.projects;
    let now = req.session.client.currentProject;
    let i = 0;
    let isSecure = false;
    
    while(i < projects.length)
    {
        if(projects[i].id == now)
        {
            isSecure = true;
        }
        i++;
    }
    
    if(isSecure === true)
    {
        return next();
    } else 
    {
        res.redirect('/error');
    }
};

module.exports = { isAuthenticated, isAdmin, isDev, devIsPropietary }