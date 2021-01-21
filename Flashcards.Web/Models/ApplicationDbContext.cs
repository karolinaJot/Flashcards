using Flashcards.Web.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Flashcards.Web.Models
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base (options)
		{

		}
		protected override void OnModelCreating(ModelBuilder builder)
		{

		}

		public DbSet<FlashcardJsEntity> FlashcardsJS { get; set; }
	}
}
