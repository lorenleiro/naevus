$(function()
{var projectId = "";
    $.ajax({
        url: "/projects",
        type: 'POST',
        success: function(response,textStatus,request) {
            if (request.status==200)
            {                
                for(let i = 0; i < response.data.length; i++)
                {
                    let projectid = response.data[i].id;
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    let id = "<td>"+ response.data[i].id +"</td>";
                    let title = "<td>"+ response.data[i].title +"</td>";
                    let description = "<td>"+ response.data[i].description +"</td>";
                    let tags = "<td>"+ response.data[i].tags +"</td>";                    
                    let buttonRemove = document.createElement("button");
                    let buttonEdit = document.createElement("button");
                    
                    $("#projects").append(tr);
                    $(tr).append(id);
                    $(tr).append(title);
                    $(tr).append(description);
                    $(tr).append(tags);
                    $(tr).append(buttonRemove);
                    $(tr).append(buttonEdit);
                    
                    buttonRemove.setAttribute("id", response.data[i].id);
                    buttonRemove.innerHTML = "Eliminar <i class='fas fa-trash-alt'></i>";
                    $(buttonRemove).addClass("btn btn-danger");
                    buttonRemove.setAttribute("data-toggle", "modal");
                    buttonRemove.setAttribute("data-target", "#deleteProject");
                    buttonRemove.addEventListener('click', projectRemoveId);
                    
                    buttonEdit.setAttribute('id', projectid);
                    buttonEdit.addEventListener('click', projectStatus);
                    buttonEdit.innerHTML = "Navegar <i class='fas fa-atlas'></i>";
                    $(buttonEdit).addClass("btn btn-warning");
                }
            }
        },
        error: function (xhr,ajaxOptions,error)
        {
            if (xhr.status==404)
            {
                $("#error").html('').hide().attr('class', '').addClass("alert alert-danger").attr("role","alert").html('Error. No se puede cargar la lista de proyectos.').fadeIn(2000);
            }
        }
    });

    function projectStatus()
    {
        $.ajax({
            url: '/currentProjectID',
            type: 'POST',
            data: {"projectid": $(this).attr('id')},
            success: function(response, textStatus, request)
            {
                document.location = '/projectstatus'
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().attr('class', '').addClass("alert alert-danger").attr("role","alert").html('Error. No se ha podido cargar la lista ddel proyecto.').fadeIn(1000).delay(1000).fadeOut(2000);
            }
        });
    }
});

$("#formDeleteProject").submit(function(event)
{
    event.preventDefault();
    console.log(projectId);

    $.ajax({
        url:"/delete",
        type: "DELETE",
        data: {"projectId": projectId},
        success: function(data, textStatus, request)
        {
            location.reload();
        },
        error: function(xhr, ajaxOptions, error)
        {
            $('#deleteProject').modal('hide');
            $("#notification").html('').hide().attr('class', '').addClass("alert alert-danger").attr("role","alert").html('Error. El usuario no se puede eliminar. Compruebe si el usuario tiene proyectos.').fadeIn(1000).delay(1000).fadeOut(2000);
        }
    });
});

function projectRemoveId()
{
    projectId = $(this).attr('id');
    console.log(projectId);
}