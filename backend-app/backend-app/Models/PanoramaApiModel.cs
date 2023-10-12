using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend_app.Models.PanoramaApiModels
{
    public class GetPanoramas
    {
        public class ParamModel
        {
            public string Username { get; set; } = "";
            public string Title { get; set; } = "";
        }
        public class ResultModel
        {
            public int PanoramaId { get; set; }
            public string ImageTitle { get; set; }
            public string ImagePath { get; set; }
            public string UploadedBy { get; set; }
            public string UploadedDate { get; set; }
            public bool IsBookmarked { get; set; }
        }
            
    }

    public class AddPanoramaParamModel
    {
        public string ImageTitle { get; set; }
        public string ImageFilename { get; set; }
        public string UploadedBy { get; set; }
        public string UploadedDate { get; set; }
    }
}