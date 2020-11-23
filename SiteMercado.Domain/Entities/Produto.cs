using System;
using System.Collections.Generic;
using System.Text;

namespace SiteMercado.Domain.Entities
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public string Imagem { get; set; }
    }
}
