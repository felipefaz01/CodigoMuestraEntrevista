using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using DTOCentralaser;

namespace DALCentralaser
{
    public class BancoDal : Coneccion
    {
        public List<BancoDto> GetAllBancos()
        {
            using (var sqlConn = new SqlConnection(StringConeccion))
            {
                sqlConn.Open();

                var cmd = new SqlCommand("get_bancos", sqlConn) {CommandType = CommandType.StoredProcedure};
                var reader = cmd.ExecuteReader();
                var lista = new List<BancoDto>();
                while (reader.Read())
                {
                    var box = new BancoDto();
                    box.IdBanco = Convert.ToInt32(reader["id_banco"]);
                    box.Nombre = Convert.ToString(reader["nombre"]);
                    box.Codigo = Convert.ToString(reader["codigo"]);
                    lista.Add(box);
                }
                sqlConn.Close();
                return lista;
            }
        }
    }
}
