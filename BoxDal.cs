using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DTOCentralaser;

namespace DALCentralaser
{
    public class BoxDal :Coneccion
    {
        public List<Box> GetBoxs(string codUsuario)
        {
            using (var sqlConn = new SqlConnection(StringConeccion))
            {
                sqlConn.Open();

                var cmd = new SqlCommand("get_box_by_usuario", sqlConn) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.AddWithValue("@cod_usuario", codUsuario);

                var reader = cmd.ExecuteReader();
                var lista = new List<Box>();
                while (reader.Read())
                {
                    var box = new Box();
                    box.CodigoBox = Convert.ToInt32(reader["cod_box"]);
                    box.Nombre = Convert.ToString(reader["box_nombre"]);
                    box.NombreSucursal = Convert.ToString(reader["sucursal_nombre"]);
                    lista.Add(box);
                }
                sqlConn.Close();
                return lista;
            }
        }
    }
}
