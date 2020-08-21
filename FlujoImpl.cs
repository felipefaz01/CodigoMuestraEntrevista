using System;
using BLLCentralaser.BusinessInterface;
using DALCentralaser;
using DTOCentralaser;

namespace BLLCentralaser.BusinnesImplement
{
    public class FlujoImpl : IFlujo
    {
        private readonly FlujoDal _flujoDal;

        public FlujoImpl()
        {
            _flujoDal = new FlujoDal();
        }

        public string IngresarAlFlujo(FlujoDto flujo)
        {
            try
            {
                _flujoDal.Ingresar(flujo);
                return "OK";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public string IngresarAlBox(FlujoDto flujo)
        {
            try
            {
                _flujoDal.EnBox(flujo);
                return "OK";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public string Terminar(FlujoDto flujo)
        {
            try
            {
                _flujoDal.Terminar(flujo);
                return "OK";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public string Anular(FlujoDto flujo)
        {
            try
            {
                _flujoDal.Anular(flujo);
                return "OK";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
