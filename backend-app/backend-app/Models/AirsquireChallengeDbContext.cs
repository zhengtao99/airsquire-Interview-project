using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend_app.Models;

public partial class AirsquireChallengeDbContext : DbContext
{
    public AirsquireChallengeDbContext()
    {
    }

    public AirsquireChallengeDbContext(DbContextOptions<AirsquireChallengeDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Config> Configs { get; set; }

    public virtual DbSet<Panorama> Panoramas { get; set; }

    public virtual DbSet<PanoramaBookmark> PanoramaBookmarks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=AirsquireChallengeDB; TrustServerCertificate=True;Integrated Security=True; MultipleActiveResultSets=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Config>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Panorama>(entity =>
        {
            entity.Property(e => e.PanoramaTitle).HasMaxLength(100);
            entity.Property(e => e.UploadedBy).HasMaxLength(50);
            entity.Property(e => e.UploadedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<PanoramaBookmark>(entity =>
        {
            entity.HasKey(e => new { e.PanoramaId, e.Username });

            entity.Property(e => e.Username).HasMaxLength(50);

            entity.HasOne(d => d.Panorama).WithMany(p => p.PanoramaBookmarks)
                .HasForeignKey(d => d.PanoramaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PanoramaBookmarks_Panoramas");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
