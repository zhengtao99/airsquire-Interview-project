using backend_app.Models;
using Microsoft.AspNetCore.Mvc;
using backend_app.Models.PanoramaApiModels;

namespace backend_app.Controllers.Apis
{
    [ApiController]

    [Route("api/panoramas")]
    public class PanoramaApiController : ControllerBase
    {
        private readonly ILogger<PanoramaApiController> _logger;

        public PanoramaApiController(ILogger<PanoramaApiController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetParonamas")]
        public List<GetPanoramas.ResultModel> Get([FromQuery] GetPanoramas.ParamModel paramModel)
        {

            using (AirsquireChallengeDbContext entities = new AirsquireChallengeDbContext())
            {
                if (paramModel.Title == null)
                {
                    paramModel.Title = "";
                }
                string imagePath = entities.Configs.Where(z => z.Name == "ImagePath").FirstOrDefault().Value;

                // filter by panorama title
                var panoramas = entities.Panoramas.Where(z => z.ImageTitle.Contains(paramModel.Title));

                // order by latest uploaded
                panoramas = panoramas.OrderByDescending(z => z.UploadedDate);

                var results = panoramas.AsEnumerable().GroupJoin(entities.PanoramaBookmarks, z => z.Id, y => y.PanoramaId, (z, y) =>
                    new GetPanoramas.ResultModel()
                    {
                        PanoramaId = z.Id,
                        ImagePath = imagePath + z.ImageFilename,
                        ImageTitle = z.ImageTitle,
                        UploadedBy = z.UploadedBy,
                        UploadedDate = UtilitiesController.TimeDescription(((DateTime)z.UploadedDate).ToLocalTime()),
                        IsBookmarked = y.FirstOrDefault() == null ? false :
                        paramModel.Username == "" ? false :
                                        y.FirstOrDefault().Username.ToLower() == paramModel.Username.ToLower() ? y.FirstOrDefault().IsBookmarked : false

                    }).ToList();

                return results;
            }
        }
    }
}