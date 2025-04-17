using Azure.Core;
using Landing_Erfolg.Models;
using Microsoft.Data.SqlClient;
using System.Reflection;

namespace Landing_Erfolg.Repositories
{
    public class DataRepository
    {
        private readonly string _connectionString;

        public DataRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<ConsultationModel> GetConsultations()
        {
            List<ConsultationModel> userList = new List<ConsultationModel>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM consultations WHERE Status = 0;";

                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var item = new ConsultationModel()
                            {
                                RequestId = (int)reader["request_id"],
                                Name = reader["name"].ToString(),
                                Email = reader["email"].ToString(),
                                Topic = reader["topic"].ToString(),
                                Message = reader["message"].ToString(),

                            };

                            userList.Add(item);
                        }
                    }
                }
            }

            return userList;
        }

        public void CreateConsultation(ConsultationModel model)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "INSERT INTO consultations (name, email, topic, message) VALUES ('" + model.Name + "', '" + model.Email + "', '" + model.Topic + "', '" + model.Message + "')";
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.ExecuteNonQuery();
                }
            }
        }
        
        public void CompleteConsultation(int RequestId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "UPDATE consultations SET Status = 1 WHERE request_id = " + RequestId;
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteConnsultation(int RequestId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "DELETE FROM consultations WHERE request_id = " + RequestId;
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }


}
