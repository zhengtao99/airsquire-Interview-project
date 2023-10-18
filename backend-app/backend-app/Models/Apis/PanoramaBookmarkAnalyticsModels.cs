namespace backend_app.Models.Api.PanoramaBookmarkAnalyticsModels
{
    public class GetPanoramaBookmarksAnalytics
    {
        public class ResultModel
        {
            public string PanoramaTitle { get; set; }
            public int BookmarkedCount { get; set; }
            public int UnbookmarkedCount { get; set; }
        }
    }
}
