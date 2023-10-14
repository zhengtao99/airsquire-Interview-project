using System;
using System.Collections.Generic;

namespace backend_app.Models;

public partial class PanoramaBookmark
{
    public int PanoramaId { get; set; }

    public string Username { get; set; } = null!;

    public bool IsBookmarked { get; set; }

    public virtual Panorama Panorama { get; set; } = null!;
}
