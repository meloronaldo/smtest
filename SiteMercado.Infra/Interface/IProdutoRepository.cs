using SiteMercado.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Infra.Interface
{
    public interface IProdutoRepository
    {
        Task<IEnumerable<Produto>> GetAllAsync();
        Task<Produto> GetById(int id);
        Task<Produto> Create(Produto ponto);
        Task<Produto> Update(Produto produto);
        Task Delete(Produto produto);
    }
}
