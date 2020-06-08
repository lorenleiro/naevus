$(function()
{
    $.ajax({
        url: "/projectstatus",
        type: 'POST',
        success: function(response,textStatus,request) {
            if (request.status==200)
            {    
                let updates = response.data.updates;
                let feedbacks = response.data.feedbacks;
                let outside = response.data.outside;  
                
                $("#updatesCount").html(updates.length);
                $("#feedbacksCount").html(feedbacks.length);
                $("#outsideCount").html(outside.length);
                
                for(let i = 0; i < updates.length; i++)
                {
                    let updateid = updates[i].id;
                    let title = updates[i].title;
                    let text = updates[i].text;
                    let time = updates[i].date;
                    
                    let div = document.getElementById('updates');
                    let br = document.createElement('br');
                    let card = document.createElement('div');
                    $(card).addClass('card');
                    
                    let cardBody = document.createElement('div');
                    $(cardBody).addClass('card-body');
                    
                    let titleDiv = document.createElement('div');
                    $(titleDiv).addClass('card-title');
                    
                    let cardTitle = document.createElement('h4');
                    $(cardTitle).html(title);
                    
                    let cardDate = document.createElement('p');
                    $(cardDate).addClass('small');
                    $(cardDate).html(time);
                    
                    let cardText = document.createElement('p');
                    $(cardText).addClass('card-text');
                    $(cardText).html(text);
                    
                    let a = document.createElement('button');
                    $(a).addClass('card-link btn btn-primary');
                    $(a).html("Seguir leyendo");
                    a.setAttribute('id', updateid);
                    a.addEventListener('click', viewUpdate)
                    
                    let removeButton = document.createElement('button');
                    $(removeButton).addClass('card-link btn btn-danger');
                    $(removeButton).html("Eliminar noticia");
                    removeButton.setAttribute('id', updateid);
                    removeButton.addEventListener('click', removeUpdate)
                    
                    titleDiv.append(cardTitle);
                    titleDiv.append(cardDate);
                    cardBody.append(titleDiv);
                    cardBody.append(cardText);
                    cardBody.append(a);
                    cardBody.append(removeButton);
                    card.append(cardBody);
                    div.append(card);
                    div.append(br);
                }
                
                for(let i = 0; i < feedbacks.length; i++)
                {
                    let feedbackid = feedbacks[i].id;
                    let title = feedbacks[i].title;
                    let text = feedbacks[i].text;
                    let state = feedbacks[i].state;
                    let time = feedbacks[i].date;
                    
                    let div = document.getElementById('feedbacks');
                    let br = document.createElement('br');
                    let card = document.createElement('div');
                    $(card).addClass('card');
                    
                    let cardBody = document.createElement('div');
                    $(cardBody).addClass('card-body');
                    
                    let titleDiv = document.createElement('div');
                    $(titleDiv).addClass('card-title');
                    
                    let cardTitle = document.createElement('h4');
                    $(cardTitle).html(title);
                    
                    let cardDate = document.createElement('p');
                    $(cardDate).addClass('small');
                    $(cardDate).html(time);
                    
                    let cardState = document.createElement('button');
                    
                    if(state == 'unvisualized')
                    {
                        $(cardState).addClass('btn btn-secondary');
                        $(cardState).html("Sin visualizar");
                    }
                    if(state == 'visualized')
                    {
                        $(cardState).addClass('btn btn-info');
                        $(cardState).html("Visto");
                    }
                    if(state == 'working')
                    {
                        $(cardState).addClass('btn btn-primary');
                        $(cardState).html("Trabajando en ello");
                    }
                    if(state == 'searching')
                    {
                        $(cardState).addClass('btn btn-primary');
                        $(cardState).html("Buscando solución");
                    }
                    if(state == 'incoming')
                    {
                        $(cardState).addClass('btn btn-warning');
                        $(cardState).html("Solución próximamente");
                    }
                    if(state == 'finished')
                    {
                        $(cardState).addClass('btn btn-success');
                        $(cardState).html("Arreglado");
                    }
                    if(state == 'implemented')
                    {
                        $(cardState).addClass('btn btn-success');
                        $(cardState).html("Implementado");
                    }
                    if(state == 'notnow')
                    {
                        $(cardState).addClass('btn btn-danger');
                        $(cardState).html("Sin interés");
                    }
                    
                    let a = document.createElement('button');
                    $(a).addClass('card-link btn btn-primary');
                    $(a).html("Seguir leyendo");
                    a.setAttribute('id', feedbackid);
                    a.addEventListener('click', viewFeedback)
                    
                    let removeButton = document.createElement('button');
                    $(removeButton).addClass('card-link btn btn-danger');
                    $(removeButton).html("Eliminar feedback");
                    removeButton.setAttribute('id', feedbackid);
                    removeButton.addEventListener('click', removeFeedback)
                    
                    cardTitle.append(" ");
                    cardTitle.append(cardState);
                    titleDiv.append(cardTitle);
                    titleDiv.append(cardDate);
                    cardBody.append(titleDiv);
                    cardBody.append(a);
                    cardBody.append(removeButton);
                    card.append(cardBody);
                    div.append(card);
                    div.append(br);
                }
                
                for(let i = 0; i < outside.length; i++)
                {
                    let outsideid = outside[i].id;
                    let name = outside[i].name;
                    let link = outside[i].link;
                    let div = document.getElementById('outside');
                    
                    let linkHref = document.createElement('a');
                    linkHref.setAttribute('href', link);
                    linkHref.setAttribute('target', '_blank');
                    
                    let buttonGroup = document.createElement('div');
                    $(buttonGroup).addClass('btn-group col-md-4 mb-4');
                    
                    let linkButton = document.createElement('button');
                    $(linkButton).addClass('btn btn-outline-primary');
                    linkButton.setAttribute('title', name);
                    $(linkButton).html(name);
                    
                    let removeButton = document.createElement('button');
                    $(removeButton).addClass('btn btn-outline-danger');
                    removeButton.setAttribute('id', outsideid);
                    removeButton.addEventListener('click', removeOutside);
                    $(removeButton).html('Eliminar enlace')
                    
                    linkHref.append(linkButton);
                    buttonGroup.append(linkHref);
                    buttonGroup.append(removeButton);
                    
                    div.append(buttonGroup);
                }
            }
        },
        error: function (xhr,ajaxOptions,error)
        {
            if (xhr.status==404)
            {
                $("#error").html('').hide().attr('class', '').addClass("alert alert-danger").attr("role","alert").html('Error. No se puede cargar la lista de contenido del proyecto.').fadeIn(2000);
            }
        }
    });
    
    function viewUpdate()
    {
        $.ajax({
            url: "/currentUpdateID",
            type: 'POST',
            data: {"updateid": $(this).attr('id')},
            success: function(respuesta,textStatus,request) {
                if (request.status==200)
                {
                    document.location = '/updateview';
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al seleccionar el proyecto, por favor, inténtelo de nuevo.').fadeIn(1000); 
            }
        });
    }
    
    function viewFeedback()
    {
        $.ajax({
            url: "/currentFeedbackID",
            type: 'POST',
            data: {"feedbackid": $(this).attr('id')},
            success: function(respuesta,textStatus,request) {
                if (request.status==200)
                {
                    document.location = '/feedbackview';
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al seleccionar el proyecto, por favor, inténtelo de nuevo.').fadeIn(1000); 
            }
        });
    }
    
    function removeFeedback()
    {
        $.ajax({
            url: "/removefeedback",
            type: 'POST',
            data: {"feedbackid": $(this).attr('id')},
            success: function(respuesta,textStatus,request) {
                if (request.status==204)
                {
                    $("#notification").html('').hide().addClass("alert alert-success").attr("role","alert").html('Se ha eliminado el feedback.').fadeIn(1000).fadeOut(3000); 
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al intentar eliminar el feedback.').fadeIn(1000); 
            }
        });
    }
    
    function removeUpdate()
    {
        $.ajax({
            url: "/removeupdate",
            type: 'POST',
            data: {"updateid": $(this).attr('id')},
            success: function(respuesta,textStatus,request) {
                if (request.status==204)
                {
                    $("#notification").html('').hide().addClass("alert alert-success").attr("role","alert").html('Se ha eliminado la noticia.').fadeIn(1000).fadeOut(3000); 
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al intentar eliminar la noticia.').fadeIn(1000); 
            }
        });
    }
    
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