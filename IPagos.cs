using System.Collections.Generic;
using DTOCentralaser;

namespace BLLCentralaser.BusinessInterface
{
   public interface IPagos
    {
        /// <summary>
        /// Devuelve una lista de todos los bancos
        /// </summary>
        /// <returns>IEnumerable de BancoDto</returns>
        IEnumerable<BancoDto> GetAllBancoDtos();

        /// <summary>
        /// Devuelve un diccionario con las formas de pago
        /// </summary>
        /// <returns>Dictionary int, string</returns>
        Dictionary<int, string> GetAllFormaPago();

        /// <summary>
        /// Inserta los pagos a una compra
        /// </summary>
        /// <param name="listaPagos"></param>
        /// <returns>ResultadoDto</returns>
        ResultadoDto AddPago(IEnumerable<PagoDto> listaPagos);

        /// <summary>
        /// Obtiene los pagos realizados a una compra determinada
        /// </summary>
        /// <param name="idCompra"></param>
        /// <returns>Ienumerable de PagoDto</returns>
        IEnumerable<PagoDto> GetAllPagosByCompra(int idCompra);

        /// <summary>
        /// Obtiene todas las compras realizadas por un cliente
        /// </summary>
        /// <param name="rut"></param>
        /// <returns>IEnumerable de comprasDto</returns>
        IEnumerable<CompraDto> GetAllComprasByRutCliente(int rut);

        /// <summary>
        /// obtiene informacion de cabecera de una compra en particular
        /// </summary>
        /// <param name="idCompra"></param>
        /// <returns>CompraDto</returns>
        CompraDto GetCompraIdCompra(int idCompra);

        //----------------------------------------------
        /// <summary>
        /// obtiene una lista de los pagos realizados hoy
        /// </summary>
        /// <returns>Ienumerable de pagos dto</returns>
        IEnumerable<PagoDto> GetFlujoCajaDia();

       /// <summary>
       /// Genera el proceso de cierre diario
       /// </summary>
       /// <param name="pago"></param>
       /// <returns>Resultado dto</returns>
       ResultadoDto AddCierreDiario(PagoDto pago);

       /// <summary>
       /// Valida que no existan cierres de caja para hoy (true = abierto o no existe cierre)
       /// </summary>
       /// <returns>ResultadoDto</returns>
       ResultadoDto ValidarCierreDiario();
    }
}
