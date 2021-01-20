using Flashcards.Web.Models;
using Flashcards.Web.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Flashcards.Web.Controllers
{
	public class FlashcardsController : Controller
	{

		private readonly ApplicationDbContext _dbContext;
		public FlashcardsController(ApplicationDbContext dbContext)
		{
			_dbContext = dbContext;
		}
		[HttpGet]
		public IActionResult Index()
		{
			return View();
		}
		//[HttpGet]
		//public IActionResult DisplayJS()
		//{
		//	return View();
		//}

		[HttpGet]
		public IActionResult ShowForm()
		{
			return View();
		}

		[HttpPost]
		public IActionResult Add(JSFlashcardsModel jsFlashcard)
		{
			var flashcardCreated = new FlashcardJsEntity
			{
				Title = jsFlashcard.Title,
				Description = jsFlashcard.Description
			};

			_dbContext.FlashcardsJS.Add(flashcardCreated);
			_dbContext.SaveChanges();

			return RedirectToAction("Index");
		
		}


		[HttpGet]
		public IActionResult DisplayJS()
		{
			var flashcards = _dbContext.FlashcardsJS.ToList();

			if (flashcards == null) return NotFound("There is nothing to see");

			return Ok(flashcards);

		}

	}
}
