$(function()
{
    $.ajax({
        url: '/feedbacks',
        type: 'POST',
        success: function(response, textStatus, request)
        {
            // Comprobamos que el usuario esté logueado para permitir crear un feedback nuevo
            if(response.data.userID)
            {
                let createFeedback = document.createElement('button');
                $(createFeedback).addClass('btn btn-primary m-3');
                $(createFeedback).html('Añadir sugerencias o fallos');
                createFeedback.addEventListener('click', function()
                {
                    document.location = '/createfeedback';
                })
                
                $(createFeedback).insertBefore("#feedbacks");
            }

            for(let i = 0; i < response.data.feedbacks.length; i++)
            {
                let feedbackid = response.data.feedbacks[i].id;
                let title = response.data.feedbacks[i].title;
                let state = response.data.feedbacks[i].state;
                let time = response.data.feedbacks[i].date;      
                let div = document.getElementById('feedbacks');
                
                let br = document.createElement('br');
                let card = document.createElement('div');
                $(card).addClass('card');
                
                let cardBody = document.createElement('div');
                $(cardBody).addClass('card-body');
                
                let titleDiv = document.createElement('div');
                $(titleDiv).addClass('card-title d-flex w-100 justify-content-between');
                
                let cardTitle = document.createElement('h4');
                $(cardTitle).addClass('mb-1');
                $(cardTitle).html(title);
                
                let cardDate = document.createElement('p');
                $(cardDate).addClass('small');
                $(cardDate).html(time);
                
                let cardState = document.createElement('button');
                $(cardState).addClass('btn btn-lg');
                cardState.setAttribute('type', 'button');
                cardState.setAttribute('data-container', 'body');
                cardState.setAttribute('data-toggle', 'popover');
                cardState.setAttribute('data-placement', 'left');
                cardState.setAttribute('data-trigger', 'focus');
                
                
                var a = document.createElement('button');
                $(a).addClass('card-link btn btn-primary');
                $(a).html("Seguir leyendo");
                a.setAttribute('id', feedbackid);
                a.addEventListener('click', viewFeedback)
                
                cardTitle.append(" ");
                cardTitle.append(cardState);
                titleDiv.append(cardTitle);
                titleDiv.append(cardState);
                cardBody.append(titleDiv);
                cardBody.append(cardDate);
                cardBody.append(a);
                card.append(cardBody);
                div.append(card);
                div.append(br);

                if(state == 'unvisualized')
                {
                    $(cardState).addClass('btn-secondary');
                    $(cardState).html("Sin visualizar");
                    cardState.setAttribute('data-content', 'Los desarrolladores del proyecto todavía no han visto este comentario.');
                    $("#unvisualized").prop("checked", true);
                }
                if(state == 'visualized')
                {
                    $(cardState).addClass('btn-info');
                    $(cardState).html("Visto");
                    cardState.setAttribute('data-content', 'Los desarrolladores del proyecto ya han visto este comentario y están pensando que hacer.');
                    $("#visualized").prop("checked", true);
                }
                if(state == 'working')
                {
                    $(cardState).addClass('btn btn-primary');
                    $(cardState).html("Trabajando en ello");
                    cardState.setAttribute('data-content', 'Los desarrolladores han leído este comentario y se han puesto manos a la obra.');
                    $("#working").prop("checked", true);
                }
                if(state == 'searching')
                {
                    $(cardState).addClass('btn-primary');
                    $(cardState).html("Buscando solución");
                    cardState.setAttribute('data-content', 'Los desarrolladores han leído el comentario y arreglarán pronto el problema. Están buscando una solución.');
                    $("#searching").prop("checked", true);
                }
                if(state == 'incoming')
                {
                    $(cardState).addClass('btn-warning');
                    $(cardState).html("Próximamente");
                    cardState.setAttribute('data-content', 'Los desarrolladores indican que el contenido del que se está hablando en este comentario estará disponible próximamente.');
                    $("#incoming").prop("checked", true);
                }
                if(state == 'finished')
                {
                    $(cardState).addClass('btn-success');
                    $(cardState).html("Arreglado");
                    cardState.setAttribute('data-content', 'Lo que se estaba hablando en el comentario ya ha sido arreglado.');
                    $("#finished").prop("checked", true);
                }
                if(state == 'implemented')
                {
                    $(cardState).addClass('btn-success');
                    $(cardState).html("Implementado");
                    cardState.setAttribute('data-content', '¡Lo que se estaba hablando en el comentario ya está dentro del juego!');
                    $("#implemented").prop("checked", true);
                }
                if(state == 'notnow')
                {
                    $(cardState).addClass('btn-danger');
                    $(cardState).html("Sin interés");
                    cardState.setAttribute('data-content', 'Los desarrolladores creen que lo que se habla dentro de este comentario no tiene mucha importancia.');
                    $("#notnow").prop("checked", true);
                }
            }
            $('[data-toggle="popover"]').popover();
            $('.popover-dismiss').popover({
                trigger: 'focus'
              })
        },
        error: function(xhr, ajaxOptions, error)
        {
            if (xhr.status==500)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cargar los comentarios de este proyecto, por favor, vuelva a la <a href="/projects">lista de proyectos</a> y seleccione el proyecto de nuevo.').fadeIn(1000);
            }
        }
    });

    /**
     * Carga en una variable de sesión del usuario que está autenticado el id del feedback que va a visualizar
     * para despues cargarla correctamente en la vista de la página correspondiente.
     */
    function viewFeedback()
    {
        console.log($(this).attr('id'));
        $.ajax({
            url: '/currentFeedbackID',
            type: 'POST',
            data: {"feedbackid": $(this).attr('id')},
            success: function(response, textStatus, request)
            {
                document.location = '/feedbackview'
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>No se puede cargar la vista del comentario, por favor, vuelva a la <a href="/projects">lista de proyectos</a> y seleccione el proyecto de nuevo.').fadeIn(1000);
            }
        });
    }

});