
var $WsIngresoHoras = "/Ws/Agenda/WsIngresoHora.asmx/";


function SearchPack() {
    // Declare variables 
    var input, filter, table, tr, td,  i;
    input = document.getElementById("txtSearchPack");
    filter = input.value.toUpperCase();
    table = document.getElementById("tblNuevaCompra");

   
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function OnlyNumbers(obj) {
    obj.value = (obj.value + '').replace(/[^0-9]/g, '');
}

function Buscar() {
    Loading();
    var existe = BuscarPaciente();
    if (existe===true) {
        BuscarSesionesPendientes();
        swal.close();
    }
    
   
  

}

function SuccessBuscarPaciente(dato) {
    if (dato.d !== null) {
        var persona = dato.d;

        $("#hdnIdPersona").val(persona.Id);

        if (persona.Id > 0) {
            $("#txtRut").val(persona.Rut);
            $("#txtDv").val(persona.Dv);
            $("#txtNombre").val(persona.Nombre);
            $("#txtApepat").val(persona.ApellidoPaterno);
            $("#txtApemat").val(persona.ApellidoMaterno);
            $("#txtMail").val(persona.Correo);
            $("#txtTelefono1").val(persona.TelefonoUno);
            $("#txtTelefono2").val(persona.TelefonoDos);
            $("#txtRut").attr("disabled", "disabled");
            $("#txtDv").attr("disabled", "disabled");
            return true;
        } else {
            $("#hdnIdPersona").val(0);
            $("#txtRut").attr("enabled", "enabled");
            $("#txtDv").attr("enabled", "enabled");
            swal("Atención", "La persona no existe en la base de datos, ingresela como nueva", "info");
            return false;
        }
    }
}

function ErrorBuscarPaciente() {
    swal("Error", "Se ha producido un error al cargar al paciente", "error");
}

function BuscarPaciente() {
    var rut = $("#txtRutBusqueda").val();
    var idPersona = $("#selNombre").val();
    //primero se busca por rut, luego por nombre
    if (!Number.isNaN(rut) && rut.trim() !== "") {
        var dato = { rut: rut };

        AjaxPostWithParametersNotAcync($WsIngresoHoras + "GetPersona", dato, SuccessBuscarPaciente, ErrorBuscarPaciente);
        return true;
    }
    else if (!Number.isNaN(idPersona) && idPersona !== null) {
        var dato = { id: idPersona };
        AjaxPostWithParametersNotAcync($WsIngresoHoras + "GetPersonaById", dato, SuccessBuscarPaciente, ErrorBuscarPaciente);
        return true;
    } else {
        swal("Atención", "La búsqueda no arrojó resultados. \n puede ser que el paciente no exista en nuestra base de datos \n Ingrese sus datos para crearla", "warning");
        return false;
    }
};

function SuccessGetSesionesPendientes(dato) {
    var lista = dato.d;
    var html = "";

    html += '<table id="tblSesionesPendientes" class="table table-hover table-responsive">';
    html += '<thead>';
    html += '<tr>';
    html += '<td>';
    html += 'Folio de compra';
    html += '</td>';
    html += '<td>';
    html += 'Fecha de compra';
    html += '</td>';
    html += '<td>';
    html += 'Zona o pack';
    html += '</td>';
    html += '<td>';
    html += 'Sesiones realizadas';
    html += '</td>';
    html += '<td>';
    html += 'Pulsos realizados';
    html += '</td>';
    html += '<td>';
    html += 'Sesiones agendadas';
    html += '</td>';
    html += '<td>';
    html += 'sel';
    html += '</td>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    if (lista.length === 0) {
        html += '<tr><td>No hay datos que mostrar</td></tr>';
    } else {

        $(lista).each(function (key, value) {

            html += '<tr>';
            html += '<td>';
            html += value.Folio;
            html += '</td>';
            html += '<td>';
            html += value.FechaCompra;
            html += '</td>';
            html += '<td>';
            html += value.NombrePack;
            html += '</td>';
            html += '<td>';
            html += value.SesionesRealizadas + "/" + value.CantidadSesiones;
            html += '</td>';
            html += '<td>';
            html += value.PulsosRealizados + "/" + value.CantidadPulsos;
            html += '</td>';
            html += '<td>';
            html += value.SesionesAgendadas;
            html += '</td>';
            html += '<td>';
            if (value.CantidadSesiones > value.SesionesAgendadas) {
                html += '<input type="checkbox" class="form-control" data-idCompraPack="' + value.CodCompraPack + '"/>';
            }
           
            html += '</td>';
            html += '</tr>';
        });
    }
    html += '</tbody>';
    html += '</table>';

    $("#divSesionesPendientes").html(html);
   
}

function ErrorGetSesionesPendientes() {
    swal("Error", "Se ha producido un error al cargar las sesiones pendientes", "error");
}

function BuscarSesionesPendientes() {
    var datosPersona = {
        "codPersona": $("#hdnIdPersona").val()
    }
    AjaxPostWithParametersNotAcync("/Ws/Agenda/WsIngresoHora.asmx/GetSesionesPendientes", datosPersona, SuccessGetSesionesPendientes, ErrorGetSesionesPendientes);
}

function SuccessBuscarPacksByBox(dato) {
    var lista = dato.d;
    var html = "";
    html += '<input type="text" id="txtSearchPack" onkeyup="SearchPack()" class="form-control" placeholder="Buscar nombre de pack..">';

    html += '<table id="tblNuevaCompra" class="table table-hover table-responsive">';
    html += '<thead>';
    html += '<tr>';
    html += '<th>';
    html += 'Zona o pack';
    html += '</th>';
    html += '<th>';
    html += 'Valor';
    html += '</th>';
    html += '<th>';
    html += 'N° sesiones';
    html += '</th>';
    html += '<th>';
    html += 'N° Pulsos';
    html += '</th>';
    html += '<th>';
    html += 'sel';
    html += '</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    if (lista.length === 0) {
        html += '<tr><td>No hay datos que mostrar</td></tr>';
    } else {


        $(lista).each(function (key, value) {

            html += '<tr>';
            html += '<td>';
            html += value.NombrePack;
            html += '</td>';
            html += '<td>';
            html += '<input type="text" class="form-control" style="text-align:right;" onkeyup="return OnlyNumbers(this)" value="' + value.ValorPack + '"  data-codPack="' + value.CodPack + '" />';
            html += '</td>';
            html += '<td>';
            html += '<input type="text" class="form-control" style="text-align:right;" onkeyup="return OnlyNumbers(this)" value="0"/>';
            html += '</td>';
            html += '<td>';

            if (value.VentaPulsos) {
                html += '<input type="text" class="form-control" style="text-align:right;" onkeyup="return OnlyNumbers(this)"  value="' + value.CantidadPulsos + '"/>';
            } else {
                html += '<input type="text" class="form-control" style="text-align:right;" onkeyup="return OnlyNumbers(this)"  value="0"/>';
            }

            html += '</td>';
            html += '<td>';
            html += '<input type="checkbox" class="form-control" data-codPack="' + value.CodPack + '"/>';
            html += '</td>';
            html += '</tr>';

        });
    }

    html += '</tbody>';
    html += '</table>';

    $("#divNuevaCompra").html(html);

}

function ErrorBuscarPacksByBox() {
    swal("Error", "Se ha producido un error al cargar la lista de packs", "error");
}

function BuscarPacksByBox() {
    var datos = {
        "idBox":$("input[id$=hdnIdBox]").val()
    }
    AjaxPostWithParameters("/Ws/Agenda/WsIngresoHora.asmx/ListaPacks", datos, SuccessBuscarPacksByBox, ErrorBuscarPacksByBox);
}

function ErrorGetPersonaByName() {
    swal("Error", "Se ha producido un error al cargar la lista de personas", "error");
}

function GetPersonaForm() {
    var datosPersona = {
        "CodPersona": $("#hdnIdPersona").val(),
        "Rut": $("#txtRut").val() === "" ? "0" : $("#txtRut").val(),
        "Nombre": $("#txtNombre").val(),
        "ApellidoPaterno": $("#txtApepat").val(),
        "ApellidoMaterno": $("#txtApemat").val(),
        "Correo": $("#txtMail").val(),
        "Telefono1": $("#txtTelefono1").val(),
        "Telefono2": $("#txtTelefono2").val()
    }
    return datosPersona;
}

function GetSesionesPendientesForm() {
    var jsonObj = [];

    $("#tblSesionesPendientes input[type=checkbox]:checked").each(function () {
        var item = {};
        item["IdCompraPack"] = $(this).attr("data-idCompraPack");
        jsonObj.push(item);
    });
   
    return jsonObj;
}

function GetCodAgendaForm() {
    var jsonObj = [];
    var codigos = $("input[id$=hdnCodAgenda]").val();
    var arr = codigos.split(";");
    $(arr).each(function (key, value) {

        if (value !== "") {
            var item = {};
            item["DatoInt"] = value.replace("'","");
            jsonObj.push(item);
        }
    });

    return jsonObj;
}

function GetNuevaCompraForm() {
    var jsonObj = [];

    $("#tblNuevaCompra input[type=checkbox]:checked").each(function () {


        var columna = 0;
        var item = {}
        item["IdPack"] = $(this).attr("data-codPack");
        $(this).closest('td').siblings().each(function () {

            columna++;
            switch (columna) {
                case 2: item["Valor"] = $(this).find("input").val();
                    break;
                case 3: item["Sesiones"] = $(this).find("input").val();
                    break;
                case 4: item["Pulsos"] = $(this).find("input").val();
                    break;
            }
        });
        jsonObj.push(item);
    });
   
    return jsonObj;
   

}

function SuccessAgendarHora() {

    swal({
        title: "Correcto",
        text: "Hora agendada corretamente",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Si",
        closeOnConfirm: false
    },
         function () {
             window.location.replace("/Operacional/Agenda/Agenda.aspx");
         });
}

function ErrorAgendarHora() {
    swal("Error", "Se ha producido un error al generar la hora", "error");
}
function AgendarHora() {
    
    //Rescato datos de la persona
    var persona = GetPersonaForm();
    var codigoSesionesPendientes = GetSesionesPendientesForm();
    var nuevaCompra = GetNuevaCompraForm();
    var jsoncodAgenda = GetCodAgendaForm();

    var jsontipo = { "Dato": $("input[id$=hdnTipo]").val() };
    var jsonUsuario = { "Dato": $("input[id$=hdnUsuario]").val() };
    var jsonBox = { "DatoInt": $("input[id$=hdnIdBox]").val() };
   

    $.ajax(
{
    type: "POST",
    url: $WsIngresoHoras + "Agendar",
    data: JSON.stringify({
        "persona": JSON.stringify(persona),
        "compra": JSON.stringify(nuevaCompra),
        "sesionPendiente": JSON.stringify(codigoSesionesPendientes),
        "codAgenda": JSON.stringify(jsoncodAgenda),
        "tipo": JSON.stringify(jsontipo),
        "box": JSON.stringify(jsonBox),
        "usuario" :JSON.stringify(jsonUsuario)
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: SuccessAgendarHora,
    error: ErrorAgendarHora
});
}

$(function () {

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

                    }, ErrorGetPersonaByName);
                }
            });

        });

    });

    BuscarPacksByBox();

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
            Loading();
            AgendarHora();
            
        });

    });

});