using SiteMercado.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Service.Interface
{
    public interface IServiceProduto
    {
        Task<IEnumerable<Produto>> GetAllProduto();
        Task<Produto> GetProdutoById(int id);
        Task<Produto> CreateProduto(Produto produto);
        Task<Produto> UpdateProduto(Produto produto);
        Task DeleteProduto(Produto produto);
    }
}
