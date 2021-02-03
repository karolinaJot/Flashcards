using Flashcards.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Flashcards.Web.Controllers
{
	[ApiController]
	[Route("api/[action]")]
	public class ApiController : Controller
	{
		private readonly ApplicationDbContext _dbContext;
		public ApiController(ApplicationDbContext dbContext)
		{
			_dbContext = dbContext;
		}


		[HttpGet]
		public IActionResult GetAll()
		{
			return Json(new { data = _dbContext.FlashcardsJS.ToList() });
		}
	}
}
