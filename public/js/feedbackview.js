$(function()
{
    $("#formComment").hide(); // Ocultamos el formulario para crear comentarios
    $("#changueState").hide(); // Ocultamos el formulario para cambiar el estado del feedback

    var title = "";
    var text = "";
    var clientId = "";
    
    $.ajax({
        url: '/feedbackview',
        type: 'POST',
        success: function(response, textStatus, request)
        {
            loadComments();
            clientId = response.data.clientId;
            title = response.data.feedback[0].title;
            let date = response.data.feedback[0].date;
            text = response.data.feedback[0].text;
            let imageName = response.data.feedback[0].image;
            let state = response.data.feedback[0].state;
            let titleElement = document.getElementById("title");
            let dateElement = document.getElementById("date");
            let textElement = document.getElementById("text");
            let stateElement = document.getElementById("state");
            let image = document.getElementById("image");
            
            if(state == 'unvisualized')
            {
                $(stateElement).addClass('badge badge-secondary');
                $(stateElement).html("Sin visualizar");
                $("#unvisualized").prop("checked", true);
            }
            if(state == 'visualized')
            {
                $(stateElement).addClass('badge badge-info');
                $(stateElement).html("Visto");
                $("#visualized").prop("checked", true);
            }
            if(state == 'working')
            {
                $(stateElement).addClass('badge badge-primary');
                $(stateElement).html("Trabajando en ello");
                $("#working").prop("checked", true);
            }
            if(state == 'searching')
            {
                $(stateElement).addClass('badge badge-primary');
                $(stateElement).html("Buscando solución");
                $("#searching").prop("checked", true);
            }
            if(state == 'incoming')
            {
                $(stateElement).addClass('badge badge-warning');
                $(stateElement).html("Solución próximamente");
                $("#incoming").prop("checked", true);
            }
            if(state == 'finished')
            {
                $(stateElement).addClass('badge badge-success');
                $(stateElement).html("Arreglado");
                $("#finished").prop("checked", true);
            }
            if(state == 'implemented')
            {
                $(stateElement).addClass('badge badge-success');
                $(stateElement).html("Implementado");
                $("#implemented").prop("checked", true);
            }
            if(state == 'notnow')
            {
                $(stateElement).addClass('badge badge-danger');
                $(stateElement).html("Sin interés");
                $("#notnow").prop("checked", true);
            }
            

            $(titleElement).html(title);
            $(dateElement).html(date);
            textElement.innerHTML = text;
            image.setAttribute('src', './images/' + imageName);

            // Comprobamos que el usuario es desarrollador y si el proyecto que se está visualizando
            // es suyo.
            if(response.data.clientProjects)
            {
                for(let i = 0; i < response.data.clientProjects.length; i++)
                {
                    if(response.data.clientProjects[i].id == response.data.currentProject)
                    {
                        // Creamos el botón para permitir la modificación del estado de la etiqueta
                        let changueState = document.createElement('button');
                        $(changueState).addClass('btn btn-primary m-3');
                        $(changueState).html('Cambiar estado');
                        changueState.setAttribute('id', 'buttonChangueState');
                        changueState.addEventListener('click', function()
                        {
                            $("#changueState").show();
                            $(this).hide();
                        })
                        $(changueState).insertAfter(stateElement);
                    }
                }
            }

            // Comprobamos que el usuario que está visualizando el feedback es su creador
            // para permitir que edite el contenido.
            if(response.data.feedback[0].userid == response.data.clientId)
            {
                let editButton = document.createElement('button');
                $(editButton).addClass('btn btn-warning m-3');
                $(editButton).html('Editar feedback');
                editButton.setAttribute('id', 'editButton');
                editButton.addEventListener('click', editFeedback);
                $(editButton).insertAfter(stateElement);

                let removeButton = document.createElement('button');
                $(removeButton).addClass('btn btn-danger m-3');
                $(removeButton).html('Eliminar feedback');
                removeButton.setAttribute('id', 'removeButton');
                removeButton.addEventListener('click', removeFeedback);
                $(removeButton).insertAfter(stateElement);
            }
        },
        error: function(xhr, ajaxOptions, error)
        {
            if (xhr.status==404)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cargar la noticia, por favor, intente recargar la página.').fadeIn(1000);
            }
        }
    });

    function loadComments(){    
    $.ajax({
        url: '/feedbackcomments',
        type: 'POST',
        success: function(response, textStatus, request)
        {
            let commentSection = document.getElementById("comments");         
            $(commentSection).html('');
            for(let i = 0; i < response.data.length; i++)
            {
                let commentid = response.data[i].id;
                let text = response.data[i].text;
                let date = response.data[i].date;
                let userId = response.data[i].userid;
                
                $.ajax({
                    url: '/getuser',
                    type: 'POST',
                    data: {"userid": userId},
                    success: function(res, textStatus, request)
                    {
                        for(let i = 0; i < res.data.length; i++)
                        {   
                            let commentDiv = document.createElement('div');
                            let username = res.data[i].username; 
                            let photo = res.data[i].photo;      

                            $(commentDiv).addClass('media border p-3');
                            commentDiv.setAttribute('id', commentid);
                            let commentImg = document.createElement('img');
                            commentImg.setAttribute('src', './images/' + photo);
                            $(commentImg).addClass('mr-3 mt-3 rounded-circle');
                            $(commentImg).css('width', '60px');
                            let commentBody = document.createElement('div');
                            $(commentBody).addClass('media-body');
                            let commentDate = document.createElement('h4');
                            $(commentDate).addClass('small');
                            $(commentDate).html(username + ", " + date);
                            let commentText = document.createElement('p');
                            $(commentText).html(text);
                            let commentButton = document.createElement('button');
                            $(commentButton).addClass('btn btn-danger');
                            $(commentButton).html('<i class="fas fa-exclamation-circle"></i>');
                            commentButton.setAttribute('title', 'Reportar abuso');
                            commentButton.addEventListener('click', reportComment);
                            commentButton.setAttribute('id', commentid);
                            
                            commentBody.append(commentDate);
                            commentBody.append(commentText);
                            commentBody.append(commentButton);
                            commentDiv.append(commentImg);
                            commentDiv.append(commentBody);
                            commentSection.append(commentDiv);
                        }
                    },
                    error: function(xhr, ajaxOptions, error)
                    {
                        if (xhr.status==404)
                        {
                            $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al los comentarios, por favor, intente recargar la página.').fadeIn(1000);
                        }
                    }
                });
            }
            
        },
        error: function(xhr, ajaxOptions, error)
        {
            if (xhr.status==404)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cargar los comentarios, por favor, intente recargar la página.').fadeIn(1000);
            }
        }
    });
}
    
    $("#addcomment").on('click', function()
    {
        $("#formComment").show();
    });

    $("#cancel").on('click', function(event)
    {
        event.preventDefault();
        $("#changueState").hide();
        $("#buttonChangueState").show();
    });
    
    $("#formComment").submit(function(event)
    {
        event.preventDefault();
        $.ajax({
            url: '/createcomment',
            type: 'POST',
            data: {"type": "feedback", "text": $("#formComment #comment").val()},
            success: function(response, textStatus, request)
            {
                $("#formComment").hide();
                loadComments();
            },
            error: function(xhr, ajaxOptions, error)
            {
                if (xhr.status==404)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al publicar el comentario, por favor, inténtelo de nuevo.').fadeIn(1000);
                }
            }
        });
    });

    $("#formChangueState").submit(function(event)
    {
        event.preventDefault();
        let state = $('input[name="state"]:checked').val();
        console.log(state);

        $.ajax({
            url: '/changuestate',
            type: 'POST',
            data: {"state": state},
            success: function(response, textStatus, request)
            {
                location.reload();
            },
            error: function(xhr, ajaxOptions, error)
            {
                if (xhr.status==404)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cambiar el estado. Inténtelo de nuevo.').fadeIn(1000);
                }
            }
        });
    });

    function editFeedback()
    {
        $(this).hide();
        $("#mainContent").hide();
        $("#editFeedback").prop('hidden', false);
        $("#editFeedback input[name=title]").val(title);
        $("#editFeedback textarea[name=text]").val(text);
    }

    $("#cancel").on('click', function()
    {
        $("#editFeedback").prop('hidden', true);
        $("#mainContent").show();
        $("#editButton").show();
    });

    $("#editFeedback").submit(function(event)
    {
        event.preventDefault();

        $.ajax({
            url: '/editfeedback',
            type: 'POST',
            data: {"title": $("#editFeedback input[name='title']").val(), "text": $("#editFeedback textarea[name='text']").val(), "clientId": clientId},
            success: function(response, textStatus, request)
            {
                location.reload();
            },
            error: function(xhr, ajaxOptions, error)
            {
                if (xhr.status==400)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('Los campos no pueden estar vacíos.').fadeIn(1000);
                }
            }
        });
    });

    function removeFeedback()
    {
        $.ajax({
            url: "/removefeedback",
            type: 'POST',
            success: function(respuesta,textStatus,request) {
                if (request.status==204)
                {
                    document.location = '/feedbacks';
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al intentar eliminar el feedback.').fadeIn(1000); 
            }
        });
    }

    function reportComment()
    {
        $.ajax({
            url: "/reportcomment",
            type: 'POST',
            data: {"commentid": $(this).attr('id'), "section": "feedback"},
            success: function(response,textStatus,request) {
                if (request.status==204)
                {
                    $("#notification").html('').hide().addClass("alert alert-success").attr("role","alert").html('Se ha eliminado el comentario.').fadeIn(1000).fadeOut(3000); 
                    loadComments();
                }
                if (request.status==200)
                {
                    $("#notification").html('').hide().addClass("alert alert-success").attr("role","alert").html('El administrador del sitio ha sido resportado. En breve se revisará su solicitud.').fadeIn(1000).fadeOut(7000); 
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>No se ha podido reportar el comentario.').fadeIn(1000); 
            }
        });
    }
});