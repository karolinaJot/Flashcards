using Flashcards.Web.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Flashcards.Web.Controllers
{
	public class AccountController : Controller
	{
		private readonly UserManager<IdentityUser> _userManager;
		private readonly SignInManager<IdentityUser> _singnInManager;

		public AccountController(UserManager<IdentityUser> userManager,
								 SignInManager<IdentityUser> signInManager)
		{
			_userManager = userManager;
			_singnInManager = signInManager;
		}

		[HttpPost]
		public async Task<IActionResult> Logout()
		{
			await _singnInManager.SignOutAsync();
			return RedirectToAction("Index", "Flashcards");
		}
		
		[HttpGet]
		public IActionResult Register()
		{
			return View();
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Register(RegisterModel model)
		{
			if (ModelState.IsValid)
			{
				var user = new IdentityUser { UserName = model.Email, Email = model.Email };
				var result = await _userManager.CreateAsync(user, model.Password);

				if (result.Succeeded)
				{
					await _singnInManager.SignInAsync(user, isPersistent: false);
					return RedirectToAction("CollectionPage", "Flashcards");
				}

				foreach (var error in result.Errors)
				{
					ModelState.AddModelError("", error.Description);
				}
			}


			return View(model);
		}
	}
}
