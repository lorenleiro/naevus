$(function()
{
    $("#formComment").hide(); // Ocultamos el formulario para crear comentarios
    var title = "";
    var text = "";
    var clientId = "";
    
    $.ajax({
        url: '/updateview',
        type: 'POST',
        success: function(response, textStatus, request)
        {
            loadComments();
            title = response.data.update[0].title;
            text = response.data.update[0].text;
            clientId = response.data.clientId;
            let date = response.data.update[0].date;
            let titleElement = document.getElementById("title");
            let dateElement = document.getElementById("date");
            let textElement = document.getElementById("text");
            let imageElement = document.getElementById("image");
            
            imageElement.setAttribute('src', "./images/" + response.data.update[0].image)
            $(titleElement).html(title);
            $(dateElement).html(date);
            $(textElement).html(text);
            
            // Comprobamos que el usuario que está visualizando la noticia es su creador
            // para permitir que edite el contenido.
            if(response.data.clientProjects)
            {
                for(let i = 0; i < response.data.clientProjects.length; i++)
                {
                    if(response.data.clientProjects[i].id == response.data.currentProject)
                    {
                        // Creamos el botón para permitir la modificación de la noticia
                        let editButton = document.createElement('button');
                        $(editButton).addClass('btn btn-warning m-3');
                        $(editButton).html('Editar noticia');
                        editButton.setAttribute('id', 'editButton');
                        editButton.addEventListener('click', editUpdate);
                        $(dateElement).append(editButton);
                        
                        let removeButton = document.createElement('button');
                        $(removeButton).addClass('btn btn-danger m-3');
                        $(removeButton).html('Eliminar noticia');
                        removeButton.setAttribute('id', 'removeButton');
                        removeButton.addEventListener('click', removeUpdate);
                        $(dateElement).append(removeButton);
                    }
                }
            }
        },
        error: function(xhr, ajaxOptions, error)
        {
            $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cargar la noticia, por favor, intente recargar la página.').fadeIn(1000);
        }
    });
    
    function loadComments()
    {
        $.ajax({
            url: '/updatecomments',
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
                                let username = res.data[i].username;                        
                                let photo = res.data[i].photo;
                                let commentDiv = document.createElement('div');
                                
                                $(commentDiv).addClass('media border p-3');
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
                            $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al los comentarios, por favor, intente recargar la página.').fadeIn(1000);
                        }
                    });
                }
                
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al los comentarios, por favor, intente recargar la página.').fadeIn(1000);
            }
        });
    }
    
    $("#addcomment").on('click', function()
    {
        $("#formComment").show();
    });
    
    $("#formComment").submit(function(event)
    {
        event.preventDefault();
        $.ajax({
            url: '/createcomment',
            type: 'POST',
            data: {"type": "update", "text": $("#formComment #comment").val()},
            success: function(response, textStatus, request)
            {
                $("#formComment").hide();
                loadComments();
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al publicar el comentario, por favor, inténtelo de nuevo.').fadeIn(1000);
            }
        });
    });
    
    function reportComment()
    {
        $.ajax({
            url: "/reportcomment",
            type: 'POST',
            data: {"commentid": $(this).attr('id'), "section": "update"},
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
    
    function editUpdate()
    {
        $(this).hide();
        $("#mainContent").hide();
        $("#editUpdate").prop('hidden', false);
        $("#editUpdate input[name=title]").val(title);
        $("#editUpdate textarea[name=text]").val(text);
    }
    
    $("#cancel").on('click', function()
    {
        $("#editUpdate").prop('hidden', true);
        $("#mainContent").show();
        $("#editButton").show();
    });
    
    $("#editUpdate").submit(function(event)
    {
        event.preventDefault();
        
        $.ajax({
            url: '/editupdate',
            type: 'POST',
            data: {"title": $("#editUpdate input[name='title']").val(), "text": $("#editUpdate textarea[name='text']").val(), "clientId": clientId},
            success: function(response, textStatus, request)
            {
                location.reload();
            },
            error: function(xhr, ajaxOptions, error)
            {
                if (xhr.status==400)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('La noticia no puede tener campos vacíos.').fadeIn(1000);
                }
            }
        });
    });
    
    function removeUpdate()
    {
        $.ajax({
            url: "/removeupdate",
            type: 'POST',
            success: function(respuesta,textStatus,request) {
                if (request.status==204)
                {
                    document.location = '/updates';
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al intentar eliminar la noticia.').fadeIn(1000); 
            }
        });
    }
});