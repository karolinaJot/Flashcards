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
	}
}
