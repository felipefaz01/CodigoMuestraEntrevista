
//---------------------------------------------------------
//                      Public functions
//---------------------------------------------------------
var frameSrc = "Modal/IngresoHora.aspx";
var $divAgenda = $('#accordion');
var $divSobrecupo = $('#accordionSobrecupo');

function toHoraTexto(hora, minuto) {

    hora = hora < 10 ? "0" + hora : hora;
    minuto = minuto < 10 ? "0" + minuto : minuto;

    return hora + ":" + minuto;
}

function successGetAgenda(lista, fechaSplit, fechaBusqueda, codBox) {
    var htmlTable = "";
    htmlTable = htmlTable + "<div class='panel panel-verde'>";
    htmlTable = htmlTable + "<div class='panel-heading'>";
    htmlTable = htmlTable + "<i class='demo-icon icon-home'></i>" + " " + $("#selBoxes option:selected").text();
    htmlTable = htmlTable + "<div class='pull-right'><i class='demo-icon icon-calendar'></i>" + " " + GetDayOfWeek(fechaBusqueda.getDay()) + " " + fechaSplit[0] + " de " + GetMonthOfYear(fechaBusqueda.getMonth()) + " de " + fechaBusqueda.getFullYear() + "</div>";
    htmlTable = htmlTable + "</div>";
    htmlTable = htmlTable + "<div id='" + codBox + "'>";
    htmlTable = htmlTable + "<div class='panel-body' id='box_" + codBox + "'>";
    htmlTable = htmlTable + "<table class='table table-striped table-bordered table-hover table-condensed'>";
    htmlTable = htmlTable + "<thead class='table table-head'>";
    htmlTable = htmlTable + "<tr>";
    htmlTable = htmlTable + "<th>Hora</th>";
    htmlTable = htmlTable + "<th>Paciente</th>";
    htmlTable = htmlTable + "<th>Servicios</th>";
    htmlTable = htmlTable + "<th>Tipo agenda</th>";
    htmlTable = htmlTable + "<th>Confirmado</th>";
    htmlTable = htmlTable + "<th>sel</th>";
    htmlTable = htmlTable + "</tr>";
    htmlTable = htmlTable + "</thead>";
    htmlTable = htmlTable + "<tbody>";
    $(lista).each(function (key, value) {
        var horaminuto = toHoraTexto(value.Hora, value.Minuto);

        var clase = "Default";
        if (value.IdTipoSesion === 2) {
            clase = "warning";
        }
        else if (value.IdTipoSesion === 1) {
            clase = "success";
        }

        htmlTable = htmlTable + "<tr class='" + clase + "'>";
       
        htmlTable = htmlTable + "<td>" + horaminuto;
        htmlTable = htmlTable + "</td>";

        htmlTable = htmlTable + "<td>";
        htmlTable = htmlTable + value.PersonaNombre;
        htmlTable = htmlTable + "</td>";

        htmlTable = htmlTable + "<td>";
        htmlTable = htmlTable + value.PackNombre;
        htmlTable = htmlTable + "</td>";

        htmlTable = htmlTable + "<td>";
        htmlTable = htmlTable + value.TipoSesion;
        htmlTable = htmlTable + "</td>";

        htmlTable = htmlTable + "<td>";
        var codTipo = 1;
        if (value.CodSesion > 0) {
            codTipo = 2;
            if (value.Confirmado) {
                htmlTable = htmlTable + "SI";
            } else {
                htmlTable = htmlTable + "NO";
            }
        }
        htmlTable = htmlTable + "</td>";
        htmlTable = htmlTable + "<td>";
        htmlTable = htmlTable + "<input type='checkbox' class='form-control' data-idBox='" + codBox + "' data-codAgenda=" + value.CodAgenda + "' data-tipo='" + codTipo + "'/>";
        htmlTable = htmlTable + "</td>";
        htmlTable = htmlTable + "</tr>";
    });

    htmlTable = htmlTable + "</tbody>";
    htmlTable = htmlTable + "</table>";
    htmlTable = htmlTable + "</div>";
    htmlTable = htmlTable + "</div>";
    $('#accordion').html(htmlTable);
}

function getAgenda(codBox, fecha) {

    var fechaSplit = $('#txtDate').val().split('/');
    var fechaBusqueda = new Date(fechaSplit[2], fechaSplit[1] - 1, fechaSplit[0]);

    $.ajax({
        type: "POST",
        url: "../../Ws/Agenda/WsAgenda.asmx/GetAll",
        data: JSON.stringify({ codBox: codBox, fecha: fecha }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (dato) {
            var lista = dato.d;
            successGetAgenda(lista, fechaSplit, fechaBusqueda, codBox);
            swal.close();
        }
    });


}

function buscar() {
    Loading();
    var fecha = $("#txtDate").val();
    var codBox = $("#selBoxes").val();

    if (codBox === '0') {

        swal("Atención", "Selecione un box: ", "error");
    } else {
        getAgenda(codBox, fecha);
    }
}

//---------------------------------------------------------
//                      DOCUMENT READY
//---------------------------------------------------------

$(document).ready(function () {


    $("#btnAgendar").on('click', function (e) {

        var lstcodAgenda = '';
        var tipo = '';
        $("input:checkbox:checked").each(function () {

            tipo = $(this).attr('data-tipo');
            lstcodAgenda = lstcodAgenda + $(this).attr("data-codAgenda") + ";";

        });

        if (lstcodAgenda === "") {
            swal("Atención", "Seleccione al menos una hora", "warning");
            return;
        }

        var codBox = $('#selBoxes').val();

        e.preventDefault();

        window.location.href = "IngresoHoras.aspx?codAgenda=" + lstcodAgenda
            + '&codBox=' + codBox
            + '&tipo=' + tipo;

    });


    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    //--------------DatePicker
    $('#sandbox-container .input-group.date').datepicker({
        language: "es",
        todayHighlight: true,
        // startDate: today,
        autoclose: true
    });
    $('#sandbox-container .input-group.date').datepicker('setDate', today);

    //llenar boxes
    $.ajax(
    {
        type: "POST",
        url: "../../Ws/Agenda/WsBox.asmx/GetBoxs",
        data: JSON.stringify({ usuario: $("input[id$=hdnUsuario]").val() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (dato) {

            var lista = dato.d;

            var select = $("#selBoxes");
            select.append(new Option("Seleccionar Box...", 0));

            $.each(lista, function (index, item) {
                select.append(new Option(item.NombreSucursal + " - " + item.Nombre, item.CodigoBox));
            });
        }
    });

    $("#btnBuscar").click(function () {
        buscar();
    });


});