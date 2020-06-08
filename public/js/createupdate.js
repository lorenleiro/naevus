$(function()
{   
    $("#createUpdate").submit(function(event)
    {
        event.preventDefault();
        let formData = new FormData(this);
        
        $.ajax({
            url: '/createupdate',
            type: 'POST',
            data: formData,
            success: function(response, textStatus, request)
            {
                document.location = '/updateview';
            },
            error: function(xhr, ajaxOptions, error)
            {
                if (xhr.status==400)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('Error al crear la noticia, no puede haber campos vacíos.').fadeIn(1000);
                }
                if (xhr.status==500)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error.</strong> Ha ocurrido un error al crear la noticia. Por favor, inténtelo más tarde.').fadeIn(1000);
                }
            },
            contentType: false,
            processData: false
        });
    });
    
    
    
});