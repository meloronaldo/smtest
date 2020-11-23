
using System;
using System.Collections.Generic;
using System.Text;

namespace SiteMercado.Infra.Config
{
    public class GlobalVariables
    {
        private static string _connectionString;

        public static string ConnectionString
        {
            get
            {
                return (string.IsNullOrWhiteSpace(_connectionString))
                    ? "Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;"
                    : _connectionString;
            }

            private set { _connectionString = value; }
        }
    }
}
