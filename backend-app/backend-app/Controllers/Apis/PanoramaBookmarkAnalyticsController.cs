using backend_app.Models;
using Microsoft.AspNetCore.Mvc;
using backend_app.Models.Api.PanoramaBookmarkAnalyticsModels;
using backend_app.Models.Api.PanoramasModels;

namespace backend_app.Controllers.Apis
{
    [ApiController]

    [Route("api/panoramabookmarks/analytics")]
    public class PanoramaBookmarkAnalyticsController : ControllerBase
    {
        private readonly ILogger<PanoramasController> _logger;

        public PanoramaBookmarkAnalyticsController(ILogger<PanoramasController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetPanoramaBookmarksAnalytics")]
        public object Get()
        {

            using (AirsquireChallengeDbContext entities = new AirsquireChallengeDbContext())
            {
                var usernameCount = entities.PanoramaBookmarks.GroupBy(z=>z.Username.ToLower()).Count();
                var analytics = entities.Panoramas.Select(z => new
                {
                    z.Id,
                    z.PanoramaTitle,
                    BookmarkedCount = entities.PanoramaBookmarks.Where(y => y.PanoramaId == z.Id).Count(),
                }).Select(z => new GetPanoramaBookmarksAnalytics.ResultModel()
                {
                    PanoramaTitle = z.PanoramaTitle,
                    BookmarkedCount = z.BookmarkedCount,
                    UnbookmarkedCount = usernameCount - z.BookmarkedCount
                }).OrderByDescending(z=>z.BookmarkedCount).ToList() ;

                return analytics;
            }
        }
    }
}