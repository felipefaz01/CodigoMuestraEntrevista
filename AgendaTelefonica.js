var $WsIngresoHoras = "/Ws/Agenda/WsIngresoHora.asmx/";

$(function() {
      
    function successBuscarPersona(dato) {
        if (dato.d !== null) {
            var persona = dato.d;
            if (persona.Id > 0) {
                $("#txtRut").val(persona.Rut);
                $("#txtDv").val(persona.Dv);
                $("#txtNombre").val(persona.Nombre);
                $("#txtApepat").val(persona.ApellidoPaterno);
                $("#txtApemat").val(persona.ApellidoMaterno);
                $("#txtMail").val(persona.Correo);
                $("#txtTelefono1").val(persona.TelefonoUno);
                $("#txtTelefono2").val(persona.TelefonoDos);
                $("#txtDireccion").val(persona.Domicilio);
                swal.close();

            } else {
                $("#hdnIdPersona").val(0);
                $("#txtRut").attr("enabled", "enabled");
                $("#txtDv").attr("enabled", "enabled");
                swal("Atención", "La persona no existe en la base de datos, ingresela como nueva", "info");

            }
        }
    }

    function errorBuscarByName() {
        swal("Error", "Se ha producido un error al cargar a la persona", "error");
    }

        function errorBuscarPersona() {}

        function buscarPersona() {
            Loading();
        var rut = $("#txtRutBusqueda").val();

        var idPersona = $("#selNombre").val();
        //primero se busca por rut, luego por nombre
        var dato;
        if (!Number.isNaN(rut) && rut.trim() !== "") {
            dato = { rut: rut };
            AjaxPostWithParametersNotAcync($WsIngresoHoras + "GetPersona", dato, successBuscarPersona, errorBuscarPersona);
        }
        else if (!Number.isNaN(idPersona) && idPersona !== null) {
            dato = { id: idPersona };
            AjaxPostWithParametersNotAcync($WsIngresoHoras + "GetPersonaById", dato, successBuscarPersona, errorBuscarPersona);
        } else {
            swal("Atención", "La búsqueda no arrojó resultados. \n puede ser que el paciente no exista en nuestra base de datos", "warning");
        }
    };


    $("#selNombre").selectpicker();
    $(".bs-searchbox:first").each(function () {
        $(this).children().each(function () {
            $(this).keyup(function () {

                var cadena = $(this).val();
                if (cadena.length > 2) {
                    var nombre = {
                        "nombre": cadena
                    }

                    AjaxPostWithParameters($WsIngresoHoras + "GetListaPersonasByNombre", nombre, function (dato) {
                        $("#selNombre").empty();
                        var paciente = dato.d;

                        for (var c in paciente) {
                            if (paciente.hasOwnProperty(c)) {

                                var o = new Option(paciente[c].Texto, paciente[c].Id);
                                $(o).html(paciente[c].Texto);
                                $("#selNombre").append(o);
                            }
                        }
                        $("#selNombre").selectpicker("refresh");

                    }, errorBuscarByName);
                }
            });

        });

    });

    $("#btnBuscar").click(function () { buscarPersona(); });

    }
);