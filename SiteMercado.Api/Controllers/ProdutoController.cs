using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SiteMercado.Domain.Entities;
using SiteMercado.Infra.Config;
using SiteMercado.Service.Interface;

namespace SiteMercado.Api.Controllers
{
    [Route("api/produto")]
    [ApiController]
    public class ProdutoController : Controller
    {
        private readonly IServiceProduto _serviceProduto;

        public ProdutoController(IServiceProduto serviceProduto)
        {
            _serviceProduto = serviceProduto;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Produto), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> Post([FromBody] Produto produto)
        {
            try
            {
                var response = await _serviceProduto.CreateProduto(produto);

                return StatusCode(HttpStatusCode.OK.GetHashCode(), response);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(HttpStatusCode.NotFound.GetHashCode(), ex.Message);
            }
            catch (ApplicationException ex)
            {
                return StatusCode(HttpStatusCode.BadRequest.GetHashCode(), ex.Message);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, GlobalMessages.InternalServerError);
            }
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(typeof(Produto), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetById([Required] string produtoId)
        {
            try
            {
                var response = await _serviceProduto.GetProdutoById(Convert.ToInt32(produtoId));

                return StatusCode(HttpStatusCode.OK.GetHashCode(), response);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(HttpStatusCode.NotFound.GetHashCode(), ex.Message);
            }
            catch (ApplicationException ex)
            {
                return StatusCode(HttpStatusCode.BadRequest.GetHashCode(), ex.Message);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, GlobalMessages.InternalServerError);
            }
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(Produto), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var response = await _serviceProduto.GetAllProduto();

                return StatusCode(HttpStatusCode.OK.GetHashCode(), response);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(HttpStatusCode.NotFound.GetHashCode(), ex.Message);
            }
            catch (ApplicationException ex)
            {
                return StatusCode(HttpStatusCode.BadRequest.GetHashCode(), ex.Message);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, GlobalMessages.InternalServerError);
            }
        }

        [HttpPut("")]
        [ProducesResponseType(typeof(Produto), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> Update([FromBody] Produto produto)
        {
            try
            {
                var response = await _serviceProduto.UpdateProduto(produto);

                return StatusCode(HttpStatusCode.OK.GetHashCode(), response);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(HttpStatusCode.NotFound.GetHashCode(), ex.Message);
            }
            catch (ApplicationException ex)
            {
                return StatusCode(HttpStatusCode.BadRequest.GetHashCode(), ex.Message);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, GlobalMessages.InternalServerError);
            }
        }

        [HttpDelete("")]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> Delete([FromBody] Produto produto)
        {
            try
            {
                await _serviceProduto.DeleteProduto(produto);

                return StatusCode(HttpStatusCode.OK.GetHashCode());
            }
            catch (ArgumentException ex)
            {
                return StatusCode(HttpStatusCode.NotFound.GetHashCode(), ex.Message);
            }
            catch (ApplicationException ex)
            {
                return StatusCode(HttpStatusCode.BadRequest.GetHashCode(), ex.Message);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, GlobalMessages.InternalServerError);
            }
        }
    }
}
