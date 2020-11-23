using SiteMercado.Domain.Entities;
using SiteMercado.Infra.Interface;
using SiteMercado.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Service
{
    public class ServiceProduto : IServiceProduto
    {
        private readonly IProdutoRepository _produtoRepository;

        public ServiceProduto(IProdutoRepository produtoRepository)
        {
            _produtoRepository = produtoRepository;
        }

        public async Task<Produto> CreateProduto(Produto produto)
        {
            return await _produtoRepository.Create(produto);
        }

        public async Task<IEnumerable<Produto>> GetAllProduto()
        {
            return await _produtoRepository.GetAllAsync();
        }

        public async Task<Produto> GetProdutoById(int id)
        {
            return await _produtoRepository.GetById(id);
        }

        public async Task<Produto> UpdateProduto(Produto produto)
        {
            return await _produtoRepository.Update(produto);
        }

        public async Task DeleteProduto(Produto produto)
        {
            await _produtoRepository.Delete(produto);
        }
    }
}
