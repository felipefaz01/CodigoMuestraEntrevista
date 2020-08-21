using System;
using System.Collections.Generic;
using System.Linq;
using BLLCentralaser.BusinessInterface;
using BLLCentralaser.BusinnesObjects;
using Centralaser.Resourses.BusinessMessages;
using DALCentralaser;
using DTOCentralaser;

namespace BLLCentralaser.BusinnesImplement
{
    public class PagosImpl : IPagos
    {
        #region Private Propieties
        private readonly BancoDal _bancoDal;
        private readonly ParametroBll _parametroBll;
        private readonly PagosDal _pagosDal;
        private readonly CompraDal _compraDal;
        #endregion

        #region Constructor
        public PagosImpl()
        {
            _bancoDal = new BancoDal();
            _parametroBll = new ParametroBll();
            _pagosDal = new PagosDal();
            _compraDal = new CompraDal();
        }
        #endregion

        #region Public Methods
        public IEnumerable<BancoDto> GetAllBancoDtos()
        {
            return _bancoDal.GetAllBancos();
        }

        public Dictionary<int, string> GetAllFormaPago()
        {
            return _parametroBll.GetTipoFormaPago();
        }

        public ResultadoDto AddPago(IEnumerable<PagoDto> listaPagos)
        {
            if (listaPagos == null)
                throw new ArgumentNullException(Error.ERROR_PAGO_NULL);

            var validacion = PagoBo.ValidarMonto(listaPagos.FirstOrDefault().SaldoCompra, listaPagos.Sum(a => a.Monto));

            if (!validacion)
                throw new Exception(Error.ERROR_PAGO_VALIDACION_MONTO);

            var listaResultado = listaPagos.Select(_pagosDal.AddPagos);

            return listaResultado.FirstOrDefault();
        }

        public IEnumerable<PagoDto> GetAllPagosByCompra(int idCompra)
        {
            return _pagosDal.GetPagosByCompra(idCompra);
        }

        #endregion


        public IEnumerable<CompraDto> GetAllComprasByRutCliente(int rut)
        {
            return _compraDal.GetAllCompraByRutCliente(rut);
        }

        public CompraDto GetCompraIdCompra(int idCompra)
        {
            return _compraDal.GetCompraIdCompra(idCompra);
        }

        //nuevos
        public IEnumerable<PagoDto> GetFlujoCajaDia()
        {
            return _pagosDal.GetFlujoCajaDia();
        }

        public ResultadoDto AddCierreDiario(PagoDto pago)
        {
            var validarCierreDia = _pagosDal.ValidarCierreDiarioCaja();
            return validarCierreDia.Exitoso ? _pagosDal.AddCierreDiarioCaja(pago) : validarCierreDia;
        }

        public ResultadoDto ValidarCierreDiario()
        {
            return _pagosDal.ValidarCierreDiarioCaja();
        }
    }
}
