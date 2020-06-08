$(function()
{
    $("#formCreateProject").submit(function(event)
    {
        event.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: "/createproject",
            type: 'POST',
            data: formData,
            success: function(response,textStatus,request) {
                if (response.status=='ok')
                {
                    document.location = '/editproject';
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                if (xhr.status==400)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('Error al crear el proyecto, no puede haber campos vacíos.').fadeIn(1000);
                }
                if (xhr.status==500)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error.</strong> Ha ocurrido un error al crear el proyecto. Por favor, inténtelo más tarde.').fadeIn(1000);
                }
            },
            contentType: false,
            processData: false
        });
    });
});