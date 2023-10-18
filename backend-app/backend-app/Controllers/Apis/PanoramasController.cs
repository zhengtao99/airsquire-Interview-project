using backend_app.Models;
using Microsoft.AspNetCore.Mvc;
using backend_app.Models.Api.PanoramasModels;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using Leadtools.Codecs;

namespace backend_app.Controllers.Apis
{
    [ApiController]

    [Route("api/panoramas")]
    public class PanoramasController : ControllerBase
    {
        private readonly ILogger<PanoramasController> _logger;

        public PanoramasController(ILogger<PanoramasController> logger)
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
                var panoramas = entities.Panoramas.Where(z => z.PanoramaTitle.ToLower().Contains(paramModel.Title.ToLower()));

                // order by latest uploaded
                panoramas = panoramas.OrderByDescending(z => z.UploadedDate);

                var results = panoramas.AsEnumerable().GroupJoin(entities.PanoramaBookmarks, z => z.Id, y => y.PanoramaId, (z, y) =>
                    new GetPanoramas.ResultModel()
                    {
                        PanoramaId = z.Id,
                        ImagePath = imagePath + z.ImageFilename,
                        PanoramaTitle = z.PanoramaTitle,
                        UploadedBy = z.UploadedBy,
                        UploadedDate = UtilitiesController.TimeDescription(((DateTime)z.UploadedDate).ToLocalTime()),
                        IsBookmarked =  paramModel.Username == "" ? false :
                                        y.Where(x=>x.Username.ToLower() == paramModel.Username.ToLower()).FirstOrDefault() != null ?
                                        y.Where(x => x.Username.ToLower() == paramModel.Username.ToLower()).FirstOrDefault().IsBookmarked : false

                    }).ToList();

                return results;
            }
        }


        [HttpPost(Name = "UploadPanorama")]
        [DisableRequestSizeLimit]
        public async Task<object> Post ([FromForm] UploadPanoramaParamModel.ParamModel model )
        {
            // Validations
            if (model.File == null || model.File.Length == 0)
                return BadRequest("No file uploaded.");

            string filename = Guid.NewGuid().ToString().Replace("-", "");


            if (model.File.ContentType == "image/jpeg")
            {
                filename = filename + ".jpg";
            }

            else if (model.File.ContentType == "image/png")
            {
                filename = filename + ".png";
            }
            else
            {
                return BadRequest("Invalid file type");
            }

            if(model.UploadedBy == "")
            {
                return BadRequest("Enter a username");
            }

            // Save images to directory
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Panoramas", filename);
            using (Stream fileStream = new FileStream(filepath, FileMode.Create))
            {
                await model.File.CopyToAsync(fileStream);
            }

            // Save images to directory for compressed panorama images
            using (var image = Image.Load(model.File.OpenReadStream()))
            {
                var filepath_small = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Panoramas-Small", filename);
                string newSize = UtilitiesController.ResizeImage(image, 548, 280);
                string[] aSize = newSize.Split(',');
                image.Mutate(h => h.Resize(Convert.ToInt32(aSize[1]), Convert.ToInt32(aSize[0])));
                image.Save(filepath_small);
            }


            // Save info to database
            using (AirsquireChallengeDbContext entities  =  new AirsquireChallengeDbContext())
            {
                Panorama panorama = new Panorama();
                panorama.ImageFilename = filename;
                panorama.PanoramaTitle = model.PanoramaTitle;
                panorama.UploadedBy = model.UploadedBy;
                panorama.UploadedDate = DateTime.UtcNow;

                entities.Panoramas.Add(panorama);
                entities.SaveChanges();
            }


            return new {success = "success"};
        }



    }
}