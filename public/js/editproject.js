$(function()
{
    
    var title = "";
    var description = "";
    var tags = "";

    $("#file1").change(function()
    {
        if ($(this).val()) 
        {
            $('#uploadDescription1 input:submit').attr('disabled',false); 
        } 
    });
    $("#file2").change(function()
    {
        if ($(this).val()) 
        {
            $('#uploadDescription2 input:submit').attr('disabled',false); 
        } 
    });
    $("#file3").change(function()
    {
        if ($(this).val()) 
        {
            $('#uploadDescription3 input:submit').attr('disabled',false); 
        } 
    });
    $("#logo").change(function()
    {
        if ($(this).val()) 
        {
            $('#uploadLogo input:submit').attr('disabled',false); 
        } 
    });
    $("#carouselImage").change(function()
    {
        if ($(this).val()) 
        {
            $('#uploadCarousel input:submit').attr('disabled',false); 
        } 
    });
    
    $.ajax({
        url: "/editproject",
        type: 'POST',
        success: function(response,textStatus,request) {
            if (request.status==200)
            {   
                // ID del proyecto
                let id = response.data.projectinfo[0].id;
                // Título del proyecto
                title = response.data.projectinfo[0].title;
                // Descripción del proyecto
                description = response.data.projectinfo[0].description;
                // Resumen 1
                let resume1 = response.data.projectinfo[0].resume1;
                // Resumen 2
                let resume2 = response.data.projectinfo[0].resume2;
                // Resumen 3
                let resume3 = response.data.projectinfo[0].resume3;
                // Todas las etiqeutas que contiene el proyecto
                tags = response.data.projectinfo[0].tags;
                // Transformamos la variable tags en un array para trabajar mejor con el
                let tagsArray = tags.split(",");

                
                // Añadimos las etiquetas del proyecto desde el array creado a la vista del proyecto
                for(let i = 0; i < tagsArray.length; i++)
                {
                    let span = document.createElement('span');
                    $(span).addClass('badge badge-primary');
                    $(span).html(tagsArray[i]);
                    $("#tags").append(span);
                    $("#tags").append(" ");
                }
                
                // Se rellena la vista con los datos recibidos de la base de datos
                $("#title").append(title);
                $("#description").append(description);
                $("#projectName").html(title);
                $("#resume1").html(resume1);
                $("#resume2").html(resume2);
                $("#resume3").html(resume3);
                
                // Cargamos las imágenes de las descripciones en la página
                for(let i = 0; i < response.data.projectimages.length; i++)
                {
                    if(response.data.projectimages[i].type === "carousel")
                    {
                        var carouselImage = response.data.projectimages[i].image;
                    } 
                    if(response.data.projectimages[i].type === "description1")
                    {
                        var description1Image = response.data.projectimages[i].image;
                    }
                    if(response.data.projectimages[i].type === "description2")
                    {
                        var description2Image = response.data.projectimages[i].image;
                    }  
                    if(response.data.projectimages[i].type === "description3")
                    {
                        var description3Image = response.data.projectimages[i].image;
                    }   
                }
                
                // Añadimos las imágenes de las descripciones a la vista de la página
                if(!description1Image)
                {
                    document.getElementById("imgDesc1").setAttribute('src', './images/axe.jpg');
                } else{
                    document.getElementById("imgDesc1").setAttribute('src', './images/' + description1Image);
                }
                
                if(!description2Image)
                {
                    document.getElementById("imgDesc2").setAttribute('src', './images/axe.jpg');
                } else{
                    document.getElementById("imgDesc2").setAttribute('src', './images/' + description2Image);
                }
                
                if(!description3Image)
                {
                    document.getElementById("imgDesc3").setAttribute('src', './images/axe.jpg');
                } else{
                    document.getElementById("imgDesc3").setAttribute('src', './images/' + description3Image);
                }
                
                // Cargamos todas las imágenes del carousel
                
                // Contador para saber cuántas imágenes hay en el carousel
                let j = 0;
                for(let i = 0; i < response.data.projectimages.length; i++)
                {
                    // Si la imagen pertenece al carousel del proyecto entonces la añadimos 
                    if(response.data.projectimages[i].type == 'carousel')
                    {
                        let listItem = document.createElement('li');
                        listItem.setAttribute("data-target", "#projectCarousel");
                        listItem.setAttribute("data-slide-to", j);
                        
                        // Comprobamos si el la primera imagen del carousel para que sea el elemento raíz de este
                        if(j == 0) 
                        {
                            $(listItem).addClass('active');
                        }
                        
                        let carouselDiv = document.createElement('div');
                        
                        // Comprobamos que no existe ningún elemento dentro del carousel para saber si se creará el 
                        // elemento raíz o no
                        if(j == 0)
                        {
                            $(carouselDiv).addClass('carousel-item active')
                        } else {
                            $(carouselDiv).addClass('carousel-item')
                        }
                        // Botón que contendrá el id de la imagen para poder eliminarla si se desea
                        let removeButton = document.createElement('button');
                        removeButton.addEventListener('click', removeImage);
                        removeButton.setAttribute("id", response.data.projectimages[i].id);
                        removeButton.innerHTML = "Eliminar imagen <i class='fas fa-trash-alt'></i>";
                        $(removeButton).addClass("btn btn-danger");
                        
                        // La imagen que se va a insertar
                        let carouselImage = document.createElement('img');
                        $(carouselImage).addClass('d-block w-100');
                        carouselImage.setAttribute('src', './images/' + response.data.projectimages[i].image);
                        
                        // Título de la imagen. En este caso contendrá el botón de eliminar y un aviso
                        let caption = document.createElement('div');
                        let text = document.createElement('p');
                        $(text).html('¡Atención! Al pulsar el botón la imagen se eliminará de inmediato.');
                        $(caption).addClass('carousel-caption');
                        caption.append(text);
                        caption.append(removeButton);
                        
                        // Añadimos todo al carousel
                        carouselDiv.append(caption);
                        carouselDiv.append(carouselImage);
                        $("#carouselImages").append(carouselDiv);
                        $("#carouselList").append(listItem);
                        j++;
                    } 
                }
            }
        },
        error: function (xhr,ajaxOptions,error)
        {
            $("#notification2").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</Strong>. Los datos del proyecto no se han podido cargar con éxito.').fadeIn(1000).delay(5000).fadeOut(1000);
        }
    });
    
    /**
    * Añade una nueva imagen al carousel del proyecto. 
    */
    $("#uploadCarousel").submit(function(event)
    {
        event.preventDefault();
        let formData = new FormData(this);
        
        $.ajax({
            url: '/uploadimage',
            type: 'POST',
            data: formData,
            success: function(response, textStatus, request)
            {
                location.reload();
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</Strong>. No se ha podido añadir la imagen.').fadeIn(1000).delay(5000).fadeOut(1000);
            },
            contentType: false,
            processData: false
        });
    });
    
    // Añade una imagen nueva a la descripción y elimina la anterior
    $("#uploadDescription1").submit(function(event)
    {
        event.preventDefault();
        let formData = new FormData(this);
        
        $.ajax({
            url: '/uploadimage',
            type: 'POST',
            data: formData,
            success: function(response, textStatus, request)
            {
                location.reload();
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification2").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</Strong>. No se ha podido cambiar la imagen.').fadeIn(1000).delay(5000).fadeOut(1000); 
            },
            contentType: false,
            processData: false
        });
    });
    
    // Añade una imagen nueva a la descripción y elimina la anterior
    $("#uploadDescription2").submit(function(event)
    {
        event.preventDefault();
        let formData = new FormData(this);
        
        $.ajax({
            url: '/uploadimage',
            type: 'POST',
            data: formData,
            success: function(response, textStatus, request)
            {
                location.reload();
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification2").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</Strong>. No se ha podido cambiar la imagen.').fadeIn(1000).delay(5000).fadeOut(1000); 
            },
            contentType: false,
            processData: false
        });
    });
    
    // Añade una imagen nueva a la descripción y elimina la anterior
    $("#uploadDescription3").submit(function(event)
    {
        event.preventDefault();
        let formData = new FormData(this);
        
        $.ajax({
            url: '/uploadimage',
            type: 'POST',
            data: formData,
            success: function(response, textStatus, request)
            {
                location.reload();
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification2").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</Strong>. No se ha podido cambiar la imagen.').fadeIn(1000).delay(5000).fadeOut(1000); 
            },
            contentType: false,
            processData: false
        });
    });
    
    /**
    * Permite la edición de la descripción 1 del proyecto.
    * 
    * 
    */
    $("#edit1").on('click', function()
    {
        let editButton = $(this);
        let save = $(this).next();
        let elements = $("div.card-body").find("p.card-text");
        let description1 = elements[0];
        $(save).prop('hidden', false);
        $(editButton).hide();
        $(description1).hide();
        
        let description = document.createElement('textarea');
        description.setAttribute('type', 'text');
        description.setAttribute('name', 'description');
        description.setAttribute('rows', '5');
        $(description).css('width', '100%');
        $(description).val($(description1).html());
        $(description).insertBefore(description1);
        
        $(save).on('click', function()
        {
            $.ajax({
                url: '/updateproject',
                type: 'POST',
                data: {"description" : $(description).val(), type:"resume1"},
                success: function(response, textStatus, request)
                {
                    $(description).hide();
                    $(description1).html($(description).val());
                    $(description1).show();
                    $(editButton).show();
                    $(save).prop('hidden', 'true');
                },
                error: function(xhr, ajaxOptions, error)
                {
                    $("#notification2").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</Strong>. No se ha podido cambiar la descripción detallada.').fadeIn(1000).delay(5000).fadeOut(1000); 
                },
            });  
        });
    });
    $("#edit2").on('click', function()
    {
        let editButton = $(this);
        let save = $(this).next();
        $(save).prop('hidden', false);
        $(editButton).hide();
        let elements = $("div.card-body").find("p.card-text");
        let description2 = elements[1];
        $(description2).hide();
        let description = document.createElement('textarea');
        description.setAttribute('type', 'text');
        description.setAttribute('name', 'description');
        description.setAttribute('rows', '5');
        $(description).css('width', '100%');
        $(description).val($(description2).html());
        $(description).insertBefore(description2);
        
        $(save).on('click', function()
        {
            $.ajax({
                url: '/updateproject',
                type: 'POST',
                data: {"description" : $(description).val(), type:"resume2"},
                success: function(response, textStatus, request)
                {
                    $(description).hide();
                    $(description2).html($(description).val());
                    $(description2).show();
                    $(editButton).show();
                    $(save).prop('hidden', 'true');
                },
                error: function(xhr, ajaxOptions, error)
                {
                    $("#notification2").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</Strong>. No se ha podido cambiar la descripción detallada.').fadeIn(1000).delay(5000).fadeOut(1000); 
                },
            });  
        });
    });
    
    $("#edit3").on('click', function()
    {
        let editButton = $(this);
        let save = $(this).next();
        $(save).prop('hidden', false);
        $(editButton).hide();
        let elements = $("div.card-body").find("p.card-text");
        let description3 = elements[2];
        $(description3).hide();
        let description = document.createElement('textarea');
        description.setAttribute('type', 'text');
        description.setAttribute('name', 'description');
        description.setAttribute('rows', '5');
        $(description).css('width', '100%');
        $(description).val($(description3).html());
        $(description).insertBefore(description3);
        
        $(save).on('click', function()
        {
            $.ajax({
                url: '/updateproject',
                type: 'POST',
                data: {"description" : $(description).val(), type:"resume3"},
                success: function(response, textStatus, request)
                {
                    $(description).hide();
                    $(description3).html($(description).val());
                    $(description3).show();
                    $(editButton).show();
                    $(save).prop('hidden', 'true');
                },
                error: function(xhr, ajaxOptions, error)
                {
                    $("#notification2").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</Strong>. No se ha podido cambiar la descripción detallada.').fadeIn(1000).delay(5000).fadeOut(1000); 
                },
            });  
        });
    });
    
    $("#uploadLogo").submit(function(event)
    {
        event.preventDefault();
        let formData = new FormData(this);
        
        $.ajax({
            url: '/uploadimage',
            type: 'POST',
            data: formData,
            success: function(response, textStatus, request)
            {
                $("#notification").html('').hide().addClass("alert alert-success").attr("role","alert").html('Se ha cambiado el logo de su proyecto con éxito.').fadeIn(1000);
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</Strong>. No se ha podido cambiar la imagen.').fadeIn(1000).delay(5000).fadeOut(1000); 
            },
            contentType: false,
            processData: false
        });
    });
    
    // Al pulsar el botón de editar en el jumbotron se activará el formulario para la edición de la 
    // descripción el título y las tags del proyecto
    $("#edition").on('click', function()
    {
        $(this).hide();
        $("#jumbotroncontent").hide();
        $("#updateProject").prop('hidden', false);
        $("#updateProject input[name=title]").val(title);
        $("#updateProject textarea[name=description]").val(description);
        $("#updateProject input[name=tags]").val(tags);
        
    });
    
    $("#cancelJumbotron").on('click', function()
    {
        $("#updateProject").prop('hidden', true);
        $("#jumbotroncontent").show();
        $("#edition").show();
    });
    
    $("#updateProject").submit(function(event)
    {
        event.preventDefault();
        $.ajax({
            url: '/updateproject',
            type: 'POST',
            data: {"type": "jumbotron", "title": $("#updateProject input[name=title]").val(), "description": $("#updateProject textarea[name=description]").val(), "tags": $("#updateProject input[name=tags]").val()},
            success: function(response, textStatus, request)
            {
                location.reload();
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</Strong>. No se ha podido actualizar el proyecto.').fadeIn(1000).delay(5000).fadeOut(1000); 
            }
        });
    });
    
    $("#addDevs").submit(function(event)
    {
        event.preventDefault();
        
        let password = $("#addDevs #password").val();
        let repeatPassword = $("#addDevs #repeatPassword").val();
        let passwordStrength = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        
        if(password.length != 0 && repeatPassword.length != 0)
        {
            if(password === repeatPassword)
            {
                if(passwordStrength.test(password))
                {
                    $.ajax({
                        url: '/devadd',
                        type: 'POST',
                        data: {"user": $("#user").val(), "email":$("#email").val(), "password": password, "type": "dev"},
                        success: function(response, textStatus, request)
                        {
                            $("#notification").html('').hide().addClass("alert alert-success").attr("role","alert").html('Se ha añadido el nuevo usuario desarrollador al proyecto. Recuerda que puede cambiar su contraseña desde el menú "Perfil" una vez haya iniciado sesión.').fadeIn(1000).delay(5000).fadeOut(1000);
                        },
                        error: function(xhr, ajaxOptions, error)
                        {
                            if(xhr == 400)
                            {
                                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Los datos introducidos son incorrectos, por favor, inténtalo de nuevo.').fadeIn(1000);
                            }
                            if(xhr == 500)
                            {
                            $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al dar de alta el nuevo desarrollador.').fadeIn(1000);
                            }
                        },
                    });
                } else 
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('La contraseña debe tener al menos un dígito, una letra en mayúscula y una letra en minúsula y contener al menos 8 carácteres.').fadeIn(1000);
                    
                }
            } else 
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('Las contraseñas no coinciden.').fadeIn(1000);
            }
        } else 
        {
            $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('La contraseña debe ser de al menos 8 carácteres.').fadeIn(1000);
        }
    });
    
    function removeImage()
    {
        $.ajax({
            url: '/removeimage',
            type: 'POST',
            data: {"imageid" : $(this).attr('id')},
            success: function(response, textStatus, request)
            {
                if(request.status == 204)
                {
                    location.reload();
                }
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('Error, no se ha podido eliminar la imagen.').fadeIn(1000).delay(3000).fadeOut(1000); 
            },
        });  
    }
});