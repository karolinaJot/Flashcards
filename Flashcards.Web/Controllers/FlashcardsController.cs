using Flashcards.Web.Models;
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

		//[HttpPost]
		//public IActionResult ShowForm(JSFlashcardsModel jSFlashcard)
		//{

		//	var flashcardJS = new JSFlashcardsAddedModel
		//	{
		//		TitleJs = jSFlashcard.Title,
		//		DescriptionJs = jSFlashcard.Description
		//	};

		//	return View("JSFlashcardsAdded", flashcardJS);
		//}


		[HttpPost]
		public IActionResult Add(JSFlashcardsModel jsFlashcard)
		{
			var flashcardCreated = new JSFlashcardsModel
			{
				Title = jsFlashcard.Title,
				Description = jsFlashcard.Description
			};

			_dbContext.JSFlashcard.Add(flashcardCreated);
			_dbContext.SaveChanges();

			return View("ShowForm");
		
		}


		[HttpGet]
		public IActionResult GetAll()
		{
			return Json(new { data = _dbContext.JSFlashcard.ToList() });
		}

	}
}
