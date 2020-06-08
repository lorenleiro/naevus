$(function(){
    $.ajax({
        url: "/projects",
        type: 'POST',
        success: function(response,textStatus,request) {
            if (request.status==200)
            {  
                let card = document.getElementById("projects");
                for(let i = 0; i < response.data.length; i++)
                {
                    // ID del proyecto que se va a crear
                    let id = response.data[i].id;
                    // Título del proyecto
                    let title = response.data[i].title;
                    // Descripción completa del proyecto
                    let description = response.data[i].description;
                    // Logo del proyecto
                    let logo = response.data[i].image;
                    // Etiquetas del proyecto
                    let tags = response.data[i].tags;
                    // Array con las etiquetas del proyecto
                    let shortTags = tags.split(",");
                    // Descripción de 400 carácteres más corta sobre el proyecto
                    var shortDescription = description.substring(0, 400);
                    
                    var div = document.createElement('div');
                    $(div).addClass('col-md-4 mb-4');
                    
                    let cardDiv = document.createElement('div');
                    $(cardDiv).addClass('card h-100');
                    
                    let image = document.createElement('img');
                    $(image).addClass('card-img-top');
                    image.setAttribute('src', './images/'+logo)
                    
                    let cardBody = document.createElement('div');
                    $(cardBody).addClass('card-body');
                    
                    let cardTitle = document.createElement('h4');
                    $(cardTitle).addClass('card-title');
                    $(cardTitle).html(title);
                    
                    let cardDescription = document.createElement('p');
                    $(cardDescription).addClass('card-text');
                    $(cardDescription).html(shortDescription + " ...");
                    
                    let cardTags = document.createElement('p');
                    
                    for(let j = 0; j < shortTags.length && j < 5; j++)
                    {
                        let span = document.createElement('span');
                        $(span).addClass('badge badge-primary');
                        $(span).html(shortTags[j]);
                        cardTags.append(span);
                        cardTags.append(" ");
                        console.log(j);
                    }
                    
                    let cardFooter = document.createElement('div');
                    $(cardFooter).addClass('card-footer py-4');
                    
                    var cardButton = document.createElement('button');
                    $(cardButton).addClass('btn btn-outline-primary');
                    $(cardButton).html("Descubre más &raquo;");
                    cardButton.setAttribute('id', id);
                    cardButton.addEventListener('click', viewProject);
                    
                    cardFooter.append(cardButton);
                    cardBody.append(cardTitle);
                    cardBody.append(cardDescription);
                    cardBody.append(cardTags);
                    cardDiv.append(image);
                    cardDiv.append(cardBody);
                    cardDiv.append(cardFooter);
                    div.append(cardDiv);
                    card.append(div);
                }
            }
        },
        error: function (xhr,ajaxOptions,error)
        {
            if (xhr.status==404)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cargar los proyectos, por favor, recargue la página.').fadeIn(1000);
            }
        }
    });
    
    /**
    * Carga en la variable de sessión del cliente actual el id del proyecto que se va a visualizar.
    * Una vez esta cargado el id en la variable de sesión, se redirige hacia la vista de /viewproject.
    * Donde dependiendo del id del proyecto en la variable de sesión asignada, se buscará en la base de datos
    * y se procederá a su  carga.
    */
    function viewProject()
    {
        $.ajax({
            url: '/currentProjectID',
            type: 'POST',
            data: {"projectid": $(this).attr('id')},
            success: function(response, textStatus, request)
            {
                document.location = '/projectview'
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>No se puede cargar la vista del proyecto, por favor, vuelva a la <a href="/projects">lista de proyectos</a> y seleccione el proyecto de nuevo.').fadeIn(1000);
            }
        });
    }
    
    /**
    * Con el parámetro del input busca varios projectos por su etiqueta o nombre y los muestra al usuario.
    * @param searchItem nombre o etiqueta a buscar
    * @returns el o los proyectos que coinciden con la búsqueda
    */
    $("#searchProject").submit(function(event)
    {
        event.preventDefault();
        let searchItem = $('#searchProject').find('input[name="searchItem"]').val();
        
        $.ajax({
            url: '/searchprojects',
            type: 'POST',
            data: {"searchItem": searchItem},
            success: function(response, textStatus, request)
            {
                $("#notification").html('').hide();
                console.log(response.data);
                if(response.data.length == 0)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('No se han encontrado títulos con esos parámetros. Por favor, inténtalo otra vez.').fadeIn(1000);
                } else
                {
                    $("#notification").html('').hide().addClass("alert alert-success").attr("role","alert").html('Se han encontrado '+ response.data.length +' proyecto(s) que coinciden con su búsqueda.').fadeIn(1000);
                    let card = document.getElementById("projects");
                    $(card).html('');
                    for(let i = 0; i < response.data.length; i++)
                    {
                        // ID del proyecto que se va a crear
                        let id = response.data[i].id;
                        // Título del proyecto
                        let title = response.data[i].title;
                        // Descripción completa del proyecto
                        let description = response.data[i].description;
                        // Logo del proyecto
                        let logo = response.data[i].image;
                        // Etiquetas del proyecto
                        let tags = response.data[i].tags;
                        // Array con las etiquetas del proyecto
                        let shortTags = tags.split(",");
                        // Descripción de 400 carácteres más corta sobre el proyecto
                        var shortDescription = description.substring(0, 400);
                        
                        var div = document.createElement('div');
                        $(div).addClass('col-md-4 mb-4');
                        
                        let cardDiv = document.createElement('div');
                        $(cardDiv).addClass('card h-100');
                        
                        let image = document.createElement('img');
                        $(image).addClass('card-img-top');
                        image.setAttribute('src', './images/'+logo)
                        
                        let cardBody = document.createElement('div');
                        $(cardBody).addClass('card-body');
                        
                        let cardTitle = document.createElement('h4');
                        $(cardTitle).addClass('card-title');
                        $(cardTitle).html(title);
                        
                        let cardDescription = document.createElement('p');
                        $(cardDescription).addClass('card-text');
                        $(cardDescription).html(shortDescription + " ...");
                        
                        let cardTags = document.createElement('div');
                        
                        for(let j = 0; j < shortTags.length && j < 5; j++)
                        {
                            let span = document.createElement('span');
                            $(span).addClass('badge badge-primary');
                            $(span).html(shortTags[j]);
                            cardTags.append(span);
                            cardTags.append(" ");
                        }
                        
                        let cardFooter = document.createElement('div');
                        $(cardFooter).addClass('card-footer py-4');
                        
                        var cardButton = document.createElement('button');
                        $(cardButton).addClass('btn btn-outline-primary');
                        $(cardButton).html("Descubre más &raquo;");
                        cardButton.setAttribute('id', id);
                        cardButton.addEventListener('click', viewProject);
                        
                        cardFooter.append(cardButton);
                        cardBody.append(cardTitle);
                        cardBody.append(cardDescription);
                        cardBody.append(cardTags);
                        cardDiv.append(image);
                        cardDiv.append(cardBody);
                        cardDiv.append(cardFooter);
                        div.append(cardDiv);
                        card.append(div);
                    }
                }
            },
            error: function(xhr, ajaxOptions, error)
            {
                if(xhr.status == 400)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('Introduzca un nombre o una etiqueta para buscar los proyectos que le interese.').fadeIn(1000);
                }

                if(xhr.status == 500)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error.</strong> Ha sucedido un error al cargar los proyectos. Por favor recargue la página e inténtelo de nuevo.').fadeIn(1000);
                }
            }
        });
    });
});