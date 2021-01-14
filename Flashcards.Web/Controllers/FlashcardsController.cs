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
		public IActionResult ShowForm(JSFlashcardsModel jSFlashcard)
		{

			var flashcardJS = new JSFlashcardsAddedModel
			{
				TitleJs = jSFlashcard.Title,
				DescriptionJs = jSFlashcard.Description
			};

			return View("JSFlashcardsAdded", flashcardJS);
		}

	}
}
