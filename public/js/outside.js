$(function()
{
    
    // Ocultamos el formulario para añadir un nuevo enlace hasta saber si es el propietario del proyecto
    $("#addOutside").hide();
    
    $.ajax({
        url: '/outside',
        type: 'POST',
        success: function(response, textStatus, request)
        {
            // Tipo de usuario
            let clientType = response.data.clientType;
            // Si es usuario es desarrollador, todos sus proyectos
            let clientProjects = response.data.clientProjects;
            // ID del proyecto que se está visitando ahora mismo
            let currentProject = response.data.currentProject;
            // Todos los enlaces del proyecto
            let links = response.data.links;
            let isPropietary = false;
            
            // Comprobamos que el usuario es un desarrollador y este es uno de los propietarios del proyecto
            // para añadir el botón de creación de nuevos enlaces.
            if(clientType === 'dev')
            {
                for(let i = 0; i < clientProjects.length; i++)
                {
                    if(clientProjects[i].id == currentProject)
                    {
                        isPropietary = true;
                    }
                }
            }
            
            if(isPropietary || clientType === 'admin')
            {
                let createOutside = document.createElement('button');
                $(createOutside).addClass('btn btn-primary m-3');
                $(createOutside).html('Añadir nuevo enlace');
                createOutside.setAttribute('id', 'addButton');
                createOutside.addEventListener('click', function()
                {
                    $("#addOutside").show();
                    $(this).hide();
                })
                $("#actions").append(createOutside);
                
                for(let i = 0; i < links.length; i++)
                {           
                    let linkHref = document.createElement('a');
                    linkHref.setAttribute('href', links[i].link);
                    linkHref.setAttribute('target', '_blank');
                    
                    let buttonGroup = document.createElement('div');
                    $(buttonGroup).addClass('btn-group col-md-4 mb-4');
                    
                    let linkButton = document.createElement('button');
                    $(linkButton).addClass('btn btn-outline-primary');
                    linkButton.setAttribute('title', links[i].link);
                    $(linkButton).html(links[i].name);
                    
                    let removeButton = document.createElement('button');
                    $(removeButton).addClass('btn btn-outline-danger');
                    removeButton.setAttribute('id', links[i].id);
                    removeButton.addEventListener('click', removeOutside);
                    $(removeButton).html('Eliminar enlace')
                    
                    linkHref.append(linkButton);
                    buttonGroup.append(linkHref);
                    buttonGroup.append(removeButton);
                    $("#outside").append(buttonGroup);
                }
            } else 
            {
            // Mostramos todos los enlaces del proyecto
            for(let i = 0; i < links.length; i++)
            {
                let linkHref = document.createElement('a');
                linkHref.setAttribute('href', links[i].link);
                linkHref.setAttribute('target', '_blank');
                
                let linkButton = document.createElement('button');
                $(linkButton).addClass('btn btn-outline-primary col-md-4 mb-4');
                linkButton.setAttribute('title', links[i].link);
                $(linkButton).html(links[i].name);
                
                linkHref.append(linkButton);
                $("#outside").append(linkHref);
                $("#outside").append(" ");
            }
        }
        },
        error: function(xhr, ajaxOptions, error)
        {
            $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cargar los enlaces externos de este proyecto, por favor, vuelva a la <a href="/projects">lista de proyectos</a> y seleccione el proyecto de nuevo.').fadeIn(1000);
        }
    });
    
    // Si se pulsa el botón de cancelar al añadir un nuevo link. Se oculta el formulario y se 
    // muestra de nuevo el botón de añadir link.
    $("#cancel").on('click', function()
    {
        $("#addOutside").hide();
        $("#addButton").show();
    });
    
    $("#addOutside").submit(function(event)
    {
        event.preventDefault();
        
        $.ajax({
            url: '/createoutside',
            type: 'POST',
            data: {"name": $("#addOutside #name").val(), "link": $("#addOutside #link").val()},
            success: function(response, textStatus, request)
            {
                location.reload();
            },
            error: function(xhr, ajaxOptions, error)
            {
                if(xhr.status == 400)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</strong>. Los parámetros introducidos no son válidos.').fadeIn(1000).delay(1000);
                }
                
                if(xhr.status == 500)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</strong>. Ha sucedido un error al crear el enlace externo. Por favor, inténtelo más tarde.').fadeIn(1000).delay(1000);
                }
            }
        });
    });
    
    function removeOutside()
    {
        
        $.ajax({
            url: '/removeoutside',
            type: 'DELETE',
            data: {"id": $(this).attr('id')},
            success: function(response, textStatus, request)
            {
                location.reload();
            },
            error: function(xhr, ajaxOptions, error)
            {
                if(xhr.status == 400)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</strong>. Usted no es el usuario propietario.').fadeIn(1000).delay(1000);
                }
                
                if(xhr.status == 500)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</strong>. Ha sucedido un error al eliminar el enlace externo. Por favor, inténtelo más tarde.').fadeIn(1000);
                }
            }
        });
    }
});