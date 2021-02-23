using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Flashcards.Web.Models
{
	public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
	{
		public ApplicationDbContext CreateDbContext(string[] args)
		{
			var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
			optionsBuilder.UseSqlServer("Data Source=tcp:flashcards-v1-webdbserver.database.windows.net,1433; Initial Catalog=Flashcards.Web_db; User Id=karolina@flashcards-v1-webdbserver; Password=71A3Hc$R8S");
			return new ApplicationDbContext(optionsBuilder.Options);
		}
	}
}
