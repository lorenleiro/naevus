$(function()
{
    $.ajax({
        url: "/projects",
        type: 'POST',
        success: function(response,textStatus,request) {
            if (request.status==200)
            {  
                let projects = document.getElementById('projects');
                let row = document.createElement('div');
                $(row).addClass('row text-center');
                
                for(let j = 0; j < 6 && j < response.data.length; j++)
                {
                    // ID del proyecto que se va a crear
                    let id = response.data[j].id;
                    // Título del proyecto
                    let title = response.data[j].title;
                    // Descripción completa del proyecto
                    let description = response.data[j].description;
                    // Logo del proyecto
                    let logo = response.data[j].image;
                    // Etiquetas del proyecto
                    let tags = response.data[j].tags;
                    // Array con las etiquetas del proyecto
                    let shortTags = tags.split(",");
                    // Descripción de 400 carácteres más corta sobre el proyecto
                    var shortDescription = description.substring(0, 400);

                    let div = document.createElement('div');
                    $(div).addClass('col-md-4 mb-4');
                    
                    let cardDiv = document.createElement('div');
                    $(cardDiv).addClass('card h-100');
                    
                    let image = document.createElement('img');
                    $(image).addClass('card-img-top');
                    image.setAttribute('src', './images/' + logo);
                    
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
                    row.append(div);
                }
                projects.append(row);
            }
        },
        error: function (xhr,ajaxOptions,error)
        {
            if (xhr.status==404)
            {
                $("#resultado").html('').hide().addClass("alert alert-danger").attr("role","alert").html('Ha ocurrido un error al cargar los proyectos.').fadeIn(1000).delay(1000).fadeOut(1000);
            }
        }
    });
    
    function viewProject()
    {
        console.log($(this).attr('id'));
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
                
                console.log("ERROR");
            }
        });
    }
});