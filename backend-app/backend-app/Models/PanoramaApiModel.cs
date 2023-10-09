using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend_app.Models
{
    public class PanoramaApiModel
    {
        public class GetPanoramaParamModel
        {
            public string Token { get; set; }
        }

        public class AddPanoramaParamModel
        {
            public string ImageTitle { get; set; }
            public string ImageFilename { get; set; }
            public string UploadedBy { get; set; }
            public string UploadedDate { get; set; }
        }
    }
}