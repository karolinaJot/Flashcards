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

		public IActionResult Index()
		{
			return View();
		}

		[HttpGet]
		public IActionResult ShowForm()
		{
			return View();
		}

		[HttpPost]
		public IActionResult DisplayJS(JSFlashcardsModel jsFlashcard)
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


		//[HttpGet]
		//public IActionResult DisplayJS()
		//{
		//	ViewBag.FlashcardsJS = _dbContext.FlashcardsJS;
		//	return View();
		//}

	}
}
