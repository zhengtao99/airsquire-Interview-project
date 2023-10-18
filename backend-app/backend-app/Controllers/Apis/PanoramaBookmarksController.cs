using backend_app.Models;
using Microsoft.AspNetCore.Mvc;
using backend_app.Models.Api.PanoramaBookmarksModels;

namespace backend_app.Controllers.Apis
{
    [ApiController]

    [Route("api/panoramabookmarks")]
    public class PanoramaBookmarksController : ControllerBase
    {
        private readonly ILogger<PanoramasController> _logger;

        public PanoramaBookmarksController(ILogger<PanoramasController> logger)
        {
            _logger = logger;
        }

        [HttpPut(Name = "UpdatePanoromaBookmark")]
        public object Put([FromBody] UpdatePanoromaBookmark.ParamModel paramModel)
        {

            using (AirsquireChallengeDbContext entities = new AirsquireChallengeDbContext())
            {
                var panoramaBookmark = entities.PanoramaBookmarks.Where(z => z.PanoramaId == paramModel.PanoramaId)
                                                                    .Where(z => z.Username == paramModel.Username).FirstOrDefault();
                if (panoramaBookmark == null)
                {
                    panoramaBookmark = new PanoramaBookmark();
                    panoramaBookmark.PanoramaId = paramModel.PanoramaId;
                    panoramaBookmark.Username = paramModel.Username;
                    panoramaBookmark.IsBookmarked = true;
                    entities.PanoramaBookmarks.Add(panoramaBookmark);
                }
                else
                {
                    panoramaBookmark.IsBookmarked = paramModel.IsBookmarked;
                }

                entities.SaveChanges();

                return  (new { success = "success" });
            }
        }
    }
}