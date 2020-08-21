using System;
using System.Configuration;

namespace HelpersCentralaser.Utilities
{
    public static  class Funciones
    {
        public static DateTime GetFechaHoraActual()
        {
            DateTime serverTime = DateTime.Now;
            string zona = ConfigurationManager.AppSettings["ZonaHoraria"];
            var fechaIng = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(serverTime, TimeZoneInfo.Local.Id, zona);
            return new DateTime(fechaIng.Year,fechaIng.Month,fechaIng.Day);
        }

        /// <summary>
        /// //Devuelve el digíto verificador de un RUT
        /// </summary>
        /// <returns></returns>
        public static string DigitoVerificador(string strRut)
        {
            //valido que rut sea número
            int i;
            var esNumerico = int.TryParse(strRut, out i);
            if (!esNumerico) return string.Empty;
            ///////////////////////////////////////////


            var rut = Convert.ToInt32(strRut);
            var contador = 2;
            var acumulador = 0;

            while (rut != 0)
            {
                var multiplo = (rut % 10) * contador;
                acumulador = acumulador + multiplo;
                rut = rut / 10;
                contador = contador + 1;
                if (contador == 8)
                {
                    contador = 2;
                }
            }
            var digito = 11 - (acumulador % 11);
            var rutDigito = digito.ToString().Trim();

            if (digito == 10)
            {
                rutDigito = "K";
            }
            if (digito == 11)
            {
                rutDigito = "0";
            }

            return (rutDigito);
        }
    }
}
