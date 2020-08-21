var $selectZonas = $("#selZonas");
//Persona

var $selectSexo = $("#selSexo");


function Mensaje(tipo, mensaje) {

    var div = $("#divMensaje");
    if (tipo === "ok") {
        div.attr("class", "alert-success col-xs-12");
    }
    else if (tipo === "warning") {
        div.attr("class", "alert-warning col-xs-12");
    }
    else if (tipo === "error") {
        div.attr("class", "alert-danger col-xs-12");
    }

    div.html('<p>' + mensaje + '</p>');
    div.show("slow");
}

function guardar() {
    Loading();
    var brands = $('#selZonas option:selected');
    var zonas = '';
    $(brands).each(function (index, brand) {
        zonas = zonas + [$(this).val()] + ";";
    });

    if (zonas === "") {
        swal("Atención", "Seleccione al menos un pack o zona ", "warning");
        return;
    }

    var datosPersona = {
        "id": $("#hdnIdPersona").val(),
        "rut": $("#txtRut").val() === "" ? "0" : $("#txtRut").val(),
        "nombre": $("#txtNombre").val(),
        "apepat": $("#txtApepat").val(),
        "apemat": $("#txtApemat").val(),
        "correo": $("#txtMail").val(),
        "telefono1": $("#txtTelefono1").val(),
        "telefono2": $("#txtTelefono2").val(),
        "sexo": $("#selSexo").val(),
        "fecha": $("input[id$=hdnFecha]").val(),
        "horas": $("input[id$=hdnHoras]").val(),
        "codPack": zonas,
        "usuario": $("input[id$=hdnUsuario]").val(),
        "codBox": $("input[id$=hdnIdBox]").val(),
        "tipo": $("input[id$=hdnTipo]").val()
    }

    $.ajax(
    {
        type: "POST",
        url: "../../../Ws/Agenda/WsIngresoHora.asmx/GuardarPersona",
        data: JSON.stringify(datosPersona),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var codPersona = response.d;

            if (codPersona.d !== "0") {

                swal("Ok", 'Se ha agregado una nueva hora para:'
                            + $("#txtNombre").val()
                            + ' '
                            + $("#txtApepat").val(), "success");
                ResetForm();

            } else {

                swal("Error", "Ha ocurrido un error, comuniquese con informática", "error");
                ResetForm();
            }
        },
        error:
            function (xhr) {
                swal("Error", "Ha ocurrido un error, comuniquese con informática. Error: " + xhr.responseText, "error");
                ResetForm();
            }
    });
}

function Limpiar() {

    $("#txtDv").val('');
    $("#txtRut").val('');
    $(".oculto").hide("slow");
    $("#txtRut").prop("disabled", false);
    ResetForm();
}


function validarRut() {

    var rut = $('#txtRut').val();

    if (isNaN(rut)) {

        $('#txtRut').parent().parent().attr("class", "form-group has-error has-feedback");
        $("#txtRut").parent().children("span").text("Rut debe ser numérico").show();

        return false;
    }
    else if (rut == null || rut.length === 0 || rut.trim() === '') {

        $('#txtRut').parent().parent().attr("class", "form-group has-error has-feedback");
        $("#txtRut").parent().children("span").text("Ingrese un Rut").show();

        return false;

    } else {

        $('#txtRut').parent().parent().attr("class", "form-group has-success has-feedback");
        $("#txtRut").parent().children("span").hide();
        return true;
    }

}


function getPersona() {

    if (!validarRut()) { return false; }
    Loading();
    var rut = $("#txtRut").val();
    var datos = { "rut": rut };
    var formulario = $("#info1");
    $.ajax(
    {
        type: "POST",
        url: "../../../Ws/Agenda/WsIngresoHora.asmx/GetPersona",
        data: JSON.stringify(datos),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (dato) {
            if (dato.d !== null) {
                var persona = dato.d;

                $("#hdnIdPersona").val(persona.Id);

                if (persona.Id !== 0) {
                    $("#txtDv").val(persona.Dv);
                    $("#txtNombre").val(persona.Nombre);
                    $("#txtApepat").val(persona.ApellidoPaterno);
                    $("#txtApemat").val(persona.ApellidoMaterno);
                    $("#txtMail").val(persona.Correo);
                    $("#txtTelefono1").val(persona.TelefonoUno);
                    $("#txtTelefono2").val(persona.TelefonoDos);
                    $("#selSexo option[value=" + persona.IdSexo + "]").attr("selected", true);
                    $("#txtRut").attr("disabled", "disabled");
                    $("#txtDv").attr("disabled", "disabled");
                    
                    if (!$(formulario).is(":visible")) {
                        $(".oculto").hide("slow");
                        $(formulario).fadeToggle("fast");
                    }
                    swal.close();

                } else {

                    swal("Atención", "La persona no existe en la base de datos, ingresela como nueva", "info");

                    if (!$(formulario).is(":visible")) {
                        $(".oculto").hide("slow");
                        $(formulario).fadeToggle("fast");
                    }
                }
            }
        },
        error: function (xhr) {
            swal.Close();
            swal("Error", "ha ocurrido el siguiente error:" + xhr.responseText, "error");
        }
    }
    );

    return false;

}


function ResetForm() {
    //se resetean los campos
    $('#txtRut').val("");
    $("#txtDv").val("");
    $("#txtNombre").val("");
    $("#txtApepat").val("");
    $("#txtApemat").val("");
    $("#txtMail").val("");
    $("#txtTelefono1").val("");
    $("#txtTelefono2").val("");
    $("#selSexo option[value=0]").attr("selected", true);
}



$(document).ready(function () {

   var idBox = $("input[id$=hdnIdBox]").val();
    $(".oculto").hide();
    $("#divError").hide();


    $("#divMensaje").hide();
    $("#valrut").hide();
    $("#divCorrecto").hide();
    $("#divBusquedaRut").hide();

    $(this).click(function () {
        $("#divMensaje").hide("slow").delay(3000);
    });
    
    $("#btnGuardar").click(function () {

        swal({
            title: "Guardar y agendar",
            text: "Está seguro de Agendar esta hora",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Si",
            closeOnConfirm: false
        },
        function () {
           
            guardar();
           
        });
    });

    
    
    //Para Llenar Lista de packs
    var datoIdBox = { "idBox": idBox };
    $.ajax(
    {
        type: "POST",
        url: "../../../Ws/Agenda/WsIngresoHora.asmx/ListaPacks",
        data: JSON.stringify(datoIdBox),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(dato) {
            var lista = dato.d;

           $.each(lista, function(index, item) {
                $selectZonas.append("<option value=\"" + item.CodPack + "\">" + item.NombrePack + "</option>");
            });


            $(function() {
                $('.chosen-select').chosen();
                $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
               
                $('#selZonas_chosen').css({ 'width': '780px'});
            });
            
        }
    });

    //$("#selZonas_chosen").addClass("chosen-with-drop chosen-container-active");
   
    //Para Llenar Lista de Sexos
    $.ajax(
    {
        type: "POST",
        url: "../../../Ws/Agenda/WsIngresoHora.asmx/ListaSexo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (dato) {
            var lista = dato.d;
            $selectSexo.append(new Option("Seleccionar Sexo...", 0));

            $.each(lista, function (index, item) {
                $selectSexo.append(new Option(item.Nombre, item.Id));
            });
        }
    });

    $("#btnExistente").click(function () {
        
        $(this).hide();
        $("#btnNuevo").show();
        $("#divBusquedaRut").show("fast");
        $(".oculto").hide("fast");
    });

    $("#btnNuevo").click(function () {
       
        $(this).hide();
        $("#btnExistente").show();
        $("#divBusquedaRut").hide();
        $(".oculto").show("fast");
        ResetForm();
    });

   
});

