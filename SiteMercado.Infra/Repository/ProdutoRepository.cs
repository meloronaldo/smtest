using Dapper;
using SiteMercado.Domain.Entities;
using SiteMercado.Infra.Config;
using SiteMercado.Infra.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Infra.Repository
{
    public class ProdutoRepository : IProdutoRepository
    {
        private string QUERY_SELECT_ID = @"SELECT ID, NOME, VALOR, IMAGEM FROM PRODUTO WHERE ID = @ID";
        private string QUERY_SELECT = @"SELECT ID, NOME, VALOR, IMAGEM FROM PRODUTO";
        private string QUERY_INSERT = @"INSERT INTO PRODUTO (NOME, VALOR, IMAGEM) VALUES (@NOME, @VALOR, @IMAGEM)";
        private string QUERY_UPDATE = @"UPDATE PRODUTO SET NOME = @NOME, VALOR = @VALOR, IMAGEM = @IMAGEM WHERE ID = @ID";
        private string QUERY_DELETE = @"DELETE FROM PRODUTO WHERE ID = @ID";

        public async Task<Produto> Create(Produto ponto)
        {
            using (var conn = new SqlConnection(GlobalVariables.ConnectionString))
            {
                var id = await conn.ExecuteAsync(QUERY_INSERT, commandType: CommandType.Text);
                return await GetById(id);
            }
        }

        public async Task Delete(Produto produto)
        {
            var param = new
            {
                ID = produto.Id
            };

            using (var conn = new SqlConnection(GlobalVariables.ConnectionString))
            {
                await conn.ExecuteAsync(QUERY_DELETE, param, commandType: CommandType.Text);
            }
        }

        public async Task<IEnumerable<Produto>> GetAllAsync()
        {
            using (var conn = new SqlConnection(GlobalVariables.ConnectionString))
            {
                return await conn.QueryAsync<Produto>(QUERY_SELECT, commandType: CommandType.Text);
            }
        }

        public async Task<Produto> GetById(int id)
        {
            var param = new
            {
                ID = id
            };

            using (var conn = new SqlConnection(GlobalVariables.ConnectionString))
            {
                return await conn.QuerySingleOrDefaultAsync<Produto>(QUERY_SELECT_ID, param, commandType: CommandType.Text);
            }
        }

        public async Task<Produto> Update(Produto produto)
        {
            var param = new
            {
                ID = produto.Id
            };

            using (var conn = new SqlConnection(GlobalVariables.ConnectionString))
            {
                await conn.ExecuteAsync(QUERY_UPDATE, param, commandType: CommandType.Text);
            }

            return await GetById(produto.Id);
        }

    }
}

