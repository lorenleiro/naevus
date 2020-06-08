$(function()
{
    $.ajax({
        url: '/updates',
        type: 'POST',
        success: function(response, textStatus, request)
        {
            console.log(response.data);
            
            // Comprobamos que el que visualiza el proyecto es uno de sus desarrolladores para permitirle crear nuevas noticias<button type="button" class="btn btn-primary">Crear una noticia o evento <i class='fas fa-plus-circle'></i></button>
            if(response.data.clientType === 'dev')
            {
                for(let j = 0; j < response.data.clientProjects.length; j++)
                {
                    if(response.data.clientProjects[j].id == response.data.currentProject)
                    {
                        // Creamos el botón para permitir la creación de noticias
                        let createUpdate = document.createElement('button');
                        $(createUpdate).addClass('btn btn-primary m-3');
                        $(createUpdate).html('Añadir actualización');
                        createUpdate.addEventListener('click', function()
                        {
                            document.location = '/createupdate';
                        })

                        $(createUpdate).insertBefore("#updates");
                    }
                }
            }
            
            
            for(let i = 0; i < response.data.projectinfo.length; i++)
            {                
                let updateid = response.data.projectinfo[i].id;
                let title = response.data.projectinfo[i].title;
                let text = response.data.projectinfo[i].text;
                let time = response.data.projectinfo[i].date;
                
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
                
                var a = document.createElement('button');
                $(a).addClass('card-link btn btn-primary');
                $(a).html("Seguir leyendo");
                a.setAttribute('id', updateid);
                a.addEventListener('click', viewUpdate)
                
                titleDiv.append(cardTitle);
                titleDiv.append(cardDate);
                cardBody.append(titleDiv);
                cardBody.append(cardText);
                cardBody.append(a);
                card.append(cardBody);
                div.append(card);
                div.append(br);
            }           
        },
        error: function(xhr, ajaxOptions, error)
        {
            if (xhr.status==500)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cargar las noticias de este proyecto, por favor, vuelva a la <a href="/projects">lista de proyectos</a> y seleccione el proyecto de nuevo.').fadeIn(1000);
            }
        }
    });
    
    /**
     * Carga en una variable de sesión del usuario que está autenticado el id de la noticia que va a visualizar
     * para despues cargarla correctamente en la vista de la página correspondiente.
     */
    function viewUpdate()
    {
        console.log($(this).attr('id'));
        $.ajax({
            url: '/currentUpdateID',
            type: 'POST',
            data: {"updateid": $(this).attr('id')},
            success: function(response, textStatus, request)
            {
                document.location = '/updateview'
            },
            error: function(xhr, ajaxOptions, error)
            {
                
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>No se puede cargar la vista de la noticia, por favor, vuelva a la <a href="/projects">lista de proyectos</a> y seleccione el proyecto de nuevo.').fadeIn(1000);
            }
        });
    }
});