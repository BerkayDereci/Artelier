using Microsoft.EntityFrameworkCore;
using Artelier.Web.Models;

public class ArtelierDbContext : DbContext
{
    public ArtelierDbContext(DbContextOptions<ArtelierDbContext> options)
        : base(options)
    {
    }

    public DbSet<Artwork> Artworks { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Artwork>()
            .Property(a => a.Price)
            .HasColumnType("decimal(18,2)");

        modelBuilder.Entity<Artwork>()
            .HasOne(a => a.Category)
            .WithMany(c => c.Artworks)
            .HasForeignKey(a => a.CategoryId);
    }
} 