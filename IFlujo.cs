using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DTOCentralaser;

namespace BLLCentralaser.BusinessInterface
{
    public interface IFlujo
    {
        /// <summary>
        /// Ingresa una nueva sesion al flujo: obligatorio IdUsuario, IdSesion
        /// </summary>
        /// <param name="flujo"></param> 
        /// <returns>mensaje ok = realizado o descripcion del error</returns>
        string IngresarAlFlujo(FlujoDto flujo);

        /// <summary>
        /// Ingresa una sesion al Box: obligatorio IdUsuario, IdSesion
        /// </summary>
        /// <param name="flujo"></param> 
        /// <returns>mensaje ok = realizado o descripcion del error</returns>
        string IngresarAlBox(FlujoDto flujo);

        /// <summary>
        /// Termina la sesion al salir del box: obligatorio IdUsuario, IdSesion, CantidadPulsos
        /// </summary>
        /// <param name="flujo"></param> 
        /// <returns>mensaje ok = realizado o descripcion del error</returns>
        string Terminar(FlujoDto flujo);

        /// <summary>
        /// Anula una sesion y la saca deshabilita de la agenda: obligatorio IdUsuario, IdSesion
        /// </summary>
        /// <param name="flujo"></param> 
        /// <returns>mensaje ok = realizado o descripcion del error</returns>
        string Anular(FlujoDto flujo);
    }
}
