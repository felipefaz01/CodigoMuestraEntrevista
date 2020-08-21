using System;

namespace DTOCentralaser
{
    public class Agenda
    {
        public int Rut { get; set; }
        public string Dv { get; set; }
        public int CodAgenda { get; set; }
        public int CodSesion { get; set; }
        public string PersonaNombre { get; set; }
        public DateTime FechaHora { get; set; }
        public string TipoSesion { get; set; }
        public int IdTipoSesion { get; set; }
        public string BoxNombre { get; set; }
        public string PackNombre { get; set; }
        public bool Confirmado { get; set; }
        public int Hora { get; set; }
        public int Minuto { get; set; }
        public string Fecha { get; set; }
        public string HoraTexto { get; set; }
    }
}
