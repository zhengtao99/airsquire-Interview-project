using System;
using System.Collections.Generic;

namespace backend_app.Models;

public partial class Panorama
{
    public int Id { get; set; }

    public string? PanoramaTitle { get; set; }

    public string? ImageFilename { get; set; }

    public string? UploadedBy { get; set; }

    public DateTime? UploadedDate { get; set; }

    public virtual PanoramaBookmark? PanoramaBookmark { get; set; }
}
