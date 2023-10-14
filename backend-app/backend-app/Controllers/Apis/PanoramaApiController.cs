using backend_app.Models;
using Microsoft.AspNetCore.Mvc;
using backend_app.Models.PanoramaApiModels;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

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


        [HttpPost(Name = "UploadPanorama")]
        public async Task<object> Post (IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            string filename = Guid.NewGuid().ToString().Replace("-", "");


            if(file.ContentType == "image/jpeg")
            {
                filename = filename + ".jpg";
            }

            else if (file.ContentType == "image/png")
            {
                filename = filename + ".png";
            }
            else
            {
                return BadRequest("Invalid file type");
            }

            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Panoramas", filename);

            using (Stream fileStream = new FileStream(filepath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);

               
            }
            using (var image = Image.Load(file.OpenReadStream()))
            {
                var filepath_small = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Panoramas-Small", filename);
                string newSize = ResizeImage(image, 274, 140);
                string[] aSize = newSize.Split(',');
                image.Mutate(h => h.Resize(Convert.ToInt32(aSize[1]), Convert.ToInt32(aSize[0])));
                image.Save(filepath_small);
            }




            return new {success = "success"};
        }

        private string ResizeImage(Image img, int maxWidth, int maxHeight)
        {
            if (img.Width > maxWidth || img.Height > maxHeight)
            {
                double widthRatio = (double)img.Width / (double)maxWidth;
                double heightRatio = (double)img.Height / (double)maxHeight;
                double ratio = Math.Max(widthRatio, heightRatio);
                int newWidth = (int)(img.Width / ratio);
                int newHeight = (int)(img.Height / ratio);
                return newHeight.ToString() + "," + newWidth.ToString();
            }
            else
            {
                return img.Height.ToString() + img.Width.ToString();
            }
        }
    }
}