namespace backend_app.Models.Api.PanoramasModels
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
            public string PanoramaTitle { get; set; }
            public string ImagePath { get; set; }
            public string UploadedBy { get; set; }
            public string UploadedDate { get; set; }
            public bool IsBookmarked { get; set; }
        }

    }

    public class UploadPanoramaParamModel
    {
        public class ParamModel
        {
            public IFormFile File { get; set; }
            public string PanoramaTitle { get; set; }
            public string UploadedBy { get; set; }
            
        }
    }
}
