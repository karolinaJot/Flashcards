using Flashcards.Web.Models;
using Flashcards.Web.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
		

		[HttpGet]
		public IActionResult ShowForm()
		{
			return View();
		}

		[HttpPost]
		public IActionResult ShowForm(FlashcardsModel flashcardModel)
		{
			if (ModelState.IsValid)
			{
				var flashcardCreated = new FlashcardEntity
				{
					Title = flashcardModel.Title,
					Description = flashcardModel.Description
				};

				_dbContext.FlashcardsJS.Add(flashcardCreated);
				_dbContext.SaveChanges();
				return RedirectToAction("CollectionPage");
			}
			return View(flashcardModel);
		}

		[HttpGet]
		public IActionResult DisplayFlashcard()
		{
			return View();
		}

		[HttpGet]
		public IActionResult CollectionPage()
		{
			return View();
		}

		[HttpGet]
		public async Task <IActionResult> Edit(int id)
		{
			FlashcardEntity dataFromDb = await _dbContext.FlashcardsJS.FindAsync(id);
			var flashcardToEdit = new FlashcardsModel
			{
				Title = dataFromDb.Title,
				Description = dataFromDb.Description,
				Id = dataFromDb.Id
			};
			return View(flashcardToEdit);
		}

		[HttpPost]
		public IActionResult Edit(FlashcardsModel flashcardEdited)
		{

			if (ModelState.IsValid)
			{
				var data = new FlashcardEntity
				{
					Title = flashcardEdited.Title,
					Description = flashcardEdited.Description,
					Id = flashcardEdited.Id
				};

				var dataFromDb = _dbContext.FlashcardsJS.Find(data.Id);
				dataFromDb.Title = data.Title;
				dataFromDb.Description = data.Description;

				_dbContext.SaveChanges();
				return RedirectToAction("CollectionPage");
			}
			return View(flashcardEdited);

		}

		[HttpGet]
		public IActionResult Delete(int? id)
		{
			if (id == null)
			{
				return NotFound();
			}

			var dataToDelete = _dbContext.FlashcardsJS.FirstOrDefault(f => f.Id == id);
			if (dataToDelete == null)
			{
				return NotFound();
			}
			var flashcardToDelete = new FlashcardsModel
			{
				Title = dataToDelete.Title,
				Description = dataToDelete.Description,
				Id = dataToDelete.Id
			};
			return View(flashcardToDelete);
		}

		[HttpPost, ActionName("Delete")]
		public IActionResult DeleteConfirmed(int id)
		{
			var data = _dbContext.FlashcardsJS.Find(id);
			_dbContext.FlashcardsJS.Remove(data);
			_dbContext.SaveChanges();
			return RedirectToAction("CollectionPage");
		}

		

	}
}
