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
		public IActionResult ShowForm(JSFlashcardsModel jsFlashcard)
		{
			var flashcardCreated = new FlashcardJsEntity
			{
				Title = jsFlashcard.Title,
				Description = jsFlashcard.Description
			};

			_dbContext.FlashcardsJS.Add(flashcardCreated);
			_dbContext.SaveChanges();
			return RedirectToAction("DisplayJS");
		}
		
		[HttpGet]
		public IActionResult DisplayJS()
		{
			var flashcardsList = _dbContext.FlashcardsJS.ToList();
			List<JSFlashcardsModel> flashcardsFromDB = new List<JSFlashcardsModel>();
			foreach (var flashcard in flashcardsList)
			{
				var temp = new JSFlashcardsModel
				{
					Title = flashcard.Title,
					Description = flashcard.Description,
					Id = flashcard.Id
				};
				flashcardsFromDB.Add(temp);
			}
			return View(flashcardsFromDB);
		}

		[HttpGet]
		public async Task <IActionResult> Edit(int id)
		{
			FlashcardJsEntity dataFromDb = await _dbContext.FlashcardsJS.FindAsync(id);
			var flashcardToEdit = new JSFlashcardsModel
			{
				Title = dataFromDb.Title,
				Description = dataFromDb.Description,
				Id = dataFromDb.Id
			};
			return View(flashcardToEdit);
		}

		[HttpPost]
		public IActionResult Edit(JSFlashcardsModel flashcardEdited)
		{
			var data = new FlashcardJsEntity
			{
				Title = flashcardEdited.Title,
				Description = flashcardEdited.Description,
				Id = flashcardEdited.Id
			};

			var dataFromDb = _dbContext.FlashcardsJS.Find(data.Id);
			dataFromDb.Title = data.Title;
			dataFromDb.Description = data.Description;

			_dbContext.SaveChanges();
			return RedirectToAction("DisplayJS");
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
			var flashcardToDelete = new JSFlashcardsModel
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
			return RedirectToAction("DisplayJS");
		}

		

	}
}
