using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DTOCentralaser;

namespace DALCentralaser
{
    public class AgendaDal : Coneccion
    {
        public List<Agenda> GetAgendaPanelControl(int codBox, DateTime desde, DateTime hasta)
        {
            using (var sqlConn = new SqlConnection(StringConeccion))
            {
                sqlConn.Open();

                var cmd = new SqlCommand("get_agendaPanelControl", sqlConn) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.AddWithValue("@cod_box", codBox);
                cmd.Parameters.AddWithValue("@desde", desde);
                cmd.Parameters.AddWithValue("@hasta", hasta);
                var reader = cmd.ExecuteReader();
                var lista = new List<Agenda>();
                while (reader.Read())
                {
                    var agenda = new Agenda();
                    agenda.CodAgenda = Convert.ToInt32(reader["cod_agenda"]);
                    agenda.CodSesion = Convert.ToInt32(reader["cod_sesion"]);
                    agenda.BoxNombre = Convert.ToString(reader["box_nombre"]);
                    agenda.FechaHora = Convert.ToDateTime(reader["fecha"]);
                    agenda.PackNombre = Convert.ToString(reader["pack_nombre"]);
                    agenda.PersonaNombre = Convert.ToString(reader["persona"]);
                    agenda.Rut = Convert.ToInt32(reader["rut"]);
                    agenda.Dv = Convert.ToString(reader["dv"]);
                    agenda.Confirmado = Convert.ToBoolean(reader["confirmado"]);
                    agenda.Fecha = Convert.ToString(reader["fecha"]);
                    agenda.Hora = Convert.ToInt32(reader["hora"]);
                    agenda.Minuto = Convert.ToInt32(reader["minuto"]);
                    lista.Add(agenda);
                }
                return lista;
            }
        }
        public List<Agenda> GetAgenda(int codBox,DateTime fecha)
        {
            using (var sqlConn = new SqlConnection(StringConeccion))
            {
                sqlConn.Open();
              
                    var cmd = new SqlCommand("get_agenda", sqlConn) { CommandType = CommandType.StoredProcedure };
                    cmd.Parameters.AddWithValue("@cod_box", codBox);
                    cmd.Parameters.AddWithValue("@fecha", fecha);
                    var reader = cmd.ExecuteReader();
                    var lista = new List<Agenda>();
                    while (reader.Read())
                    {
                        var agenda = new Agenda();
                        agenda.CodAgenda = Convert.ToInt32(reader["cod_agenda"]);//
                        agenda.CodSesion = Convert.ToInt32(reader["cod_sesion"]);//
                        agenda.PackNombre = Convert.ToString(reader["compra"]);
                        agenda.PersonaNombre = Convert.ToString(reader["paciente"]);
                        agenda.Confirmado = Convert.ToBoolean(reader["confirmado"]);//
                        agenda.Fecha = Convert.ToString(reader["fecha"]);//
                        agenda.Hora = Convert.ToInt32(reader["hora"]);//
                        agenda.Minuto = Convert.ToInt32(reader["minuto"]);//
                        agenda.IdTipoSesion = Convert.ToInt32(reader["cod_tipo_sesion"]);//
                        agenda.TipoSesion = Convert.ToString(reader["tipo_sesion"]);//
                        lista.Add(agenda);
                    }
                    return lista;
            }
        }

   
        public void add_Agenda(int codSesion, int codAgenda)
        {
            using (var sqlConn = new SqlConnection(StringConeccion))
            {
                sqlConn.Open();

                var cmd = new SqlCommand("add_agenda", sqlConn) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.AddWithValue("@cod_sesion", codSesion);
                cmd.Parameters.AddWithValue("@cod_agenda", codAgenda);
               cmd.ExecuteNonQuery();
                sqlConn.Close();
            }
        }
    }
}
