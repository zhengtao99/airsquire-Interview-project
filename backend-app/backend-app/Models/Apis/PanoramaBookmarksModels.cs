﻿namespace backend_app.Models.Api.PanoramaBookmarksModels
{
    public class UpdatePanoromaBookmark
    {
        public class ParamModel
        {
            public int PanoramaId { get; set; }
            public string Username { get; set; }
            public bool IsBookmarked { get; set; }
        }
        public class ResultModel
        {
            public int Id { get; set; }
            public string ImageTitle { get; set; }
            public string ImagePath { get; set; }
            public string UploadedBy { get; set; }
            public string UploadedDate { get; set; }
            public bool IsBookmarked { get; set; }
        }

    }
}
