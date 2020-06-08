$(function(){
    $.ajax({
        url: "/myprojects",
        type: 'POST',
        success: function(response,textStatus,request) {
            if (request.status==200)
            {  
                for(let i = 0; i < response.data.projects.length; i++)
                {
                    let tr = document.createElement("tr");
                    let id = response.data.projects[i].id;
                    let title = response.data.projects[i].title;
                    let description = response.data.projects[i].description;
                    let tags = response.data.projects[i].tags;
                    let projectMaster = response.data.projects[i].projectmaster;
                    let isOwner = "<td><span class='badge badge-secondary'>No</span></td>";

                    if(projectMaster === response.data.userId)
                    {
                        isOwner = "<td><span class='badge badge-success'>Si</span></td>";
                    }

                    let projectTitle = "<td>"+title+"</td>";
                    let projectDescription = "<td>"+description+"</td>";
                    let projectTags = "<td>"+tags+"</td>";
                    let buttonEdit = document.createElement('button');
                    $(buttonEdit).addClass('btn btn-warning');
                    buttonEdit.setAttribute('id', id);
                    buttonEdit.setAttribute('title', 'Editar');
                    buttonEdit.addEventListener('click', editFunction);
                    buttonEdit.innerHTML = "Editar <i class='fas fa-pencil-alt'></i>";

                    $("#proyectos").append(tr);
                    $("#proyectos").append(projectTitle);
                    $("#proyectos").append(projectDescription);
                    $("#proyectos").append(projectTags);
                    $("#proyectos").append(isOwner);
                    $("#proyectos").append(buttonEdit);

                    if(projectMaster === response.data.userId)
                    {
                    let buttonRemove = document.createElement('button');
                    $(buttonRemove).addClass('btn btn-danger');
                    buttonRemove.setAttribute('id', id);
                    buttonRemove.setAttribute('title', 'Eliminar');
                    buttonRemove.addEventListener('click', deleteFunction);
                    buttonRemove.innerHTML = "Eliminar <i class='fas fa-trash-alt'></i>";
                    buttonRemove.setAttribute("data-target", "#deleteProject");
                    $("#proyectos").append(buttonRemove);
                    }
                }
            }
        },
        error: function (xhr,ajaxOptions,error)
        {
            if (xhr.status==404)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cargar sus proyectos, por favor, inténtelo de nuevo.').fadeIn(1000);
            }
        }
    });

    function editFunction() {
        $.ajax({
            url: "/currentProjectID",
            type: 'POST',
            data: {"projectid": $(this).attr('id')},
            success: function(response,textStatus,request) {
                if (request.status==200)
                {
                    document.location = '/editproject';
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al seleccionar el proyecto, por favor, inténtelo de nuevo.').fadeIn(1000);
            }
        });
    }

    function deleteFunction() {
        console.log($(this).attr('id'));
        $.ajax({
            url: "/currentProjectID",
            type: 'POST',
            data: {"projectid": $(this).attr('id')},
            success: function(respuesta,textStatus,request) {
                if (request.status==200)
                {
                    $('#deleteProject').modal('toggle');
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al eliminar el proyecto, por favor, inténtelo de nuevo.').fadeIn(1000); 
            }
        });
    }

    $("#formDeleteProject").submit(function()
    {
        $.ajax({
            url: "/delete",
            type: 'DELETE',
            success: function(respuesta,textStatus,request) {
                if (request.status==204)
                {
                    console.log("borrao");
                    $('#deleteProject').modal('hide');
                    $("#notification").html('').hide().addClass("alert alert-success").attr("role","alert").html('Se ha eliminado el proyecto  correctamente.').fadeIn(1000).fadeOut(1000);
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al seleccionar el proyecto, por favor, inténtelo de nuevo.').fadeIn(1000);
            }
        });
    });
});