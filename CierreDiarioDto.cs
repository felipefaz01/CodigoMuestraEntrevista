using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DTOCentralaser
{
    public class CierreDiarioDto
    {
        public int IdCierreDiario { get; set; }
        public DateTime FechaCierre { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string UsuarioCierre { get; set; }
        public string Observacion { get; set; }
        public int Monto { get; set; }
    }
}
