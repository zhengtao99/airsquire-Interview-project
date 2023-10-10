using ApiServer.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using backend_app.Models;

namespace backend_app.Controllers.Apis
{
    public class PanoramaApiController : ApiController
    {
        //[EnableCors(origins: ConfigController.CorsAllowedUrl, headers: "*", methods: "GET")]
        //[Route("api/paronamas")]
        //public IHttpActionResult GetParonamas([FromUri]  PanoramaApiModel.GetPanoramaParamModel paramModel)
        //{
        //    using(AirsquireChallengeDBEntities entities = new AirsquireChallengeDBEntities())
        //    {

        //    }
        //    return null;
        //}


        [EnableCors(origins: ConfigController.CorsAllowedUrl, headers: "*", methods: "GET")]
        [Route("api/panoramas")]
        [HttpGet]
        public IHttpActionResult GetParonamas([FromUri] PanoramaApiModels.GetPanoramas.ParamModel paramModel)
        {
            using (AirsquireChallengeDBEntities entities = new AirsquireChallengeDBEntities())
            {
                string imagePath = entities.Configs.Where(z => z.Name == "ImagePath").FirstOrDefault().Value;
                var panoramas = entities.Panoramas.AsEnumerable().GroupJoin(entities.PanoramaBookmarks, z => z.Id, y => y.PanoramaId, (z, y) =>
                        new PanoramaApiModels.GetPanoramas.ResultModel() {
                            Id = z.Id,
                            ImagePath = imagePath + z.ImageFilename,
                            ImageTitle = z.ImageTitle,
                            UploadedBy = z.UploadedBy,
                            UploadedDate = UtilitiesController.TimeDescription(((DateTime)z.UploadedDate).ToLocalTime()),
                            IsBookmarked = y.FirstOrDefault() == null ? false : 
                                            y.FirstOrDefault().Username.ToLower() == paramModel.Username.ToLower() ? y.FirstOrDefault().IsBookmarked : false

                        }).ToList();


                return Json(panoramas);
            }
        }


        [EnableCors(origins: ConfigController.CorsAllowedUrl, headers: "*", methods: "POST")]
        [Route("api/panoramas")]
        [HttpPost]
        public IHttpActionResult AddParonama()
        {
            using (AirsquireChallengeDBEntities entities = new AirsquireChallengeDBEntities())
            {
                Panorama panorama = new Panorama();
                panorama.ImageTitle = "Building";
                panorama.ImageFilename = "building.jpg";
                panorama.UploadedBy = "zhengtao";
                panorama.UploadedDate = DateTime.UtcNow;

                entities.Panoramas.Add(panorama);
                entities.SaveChanges();
            }
            return Ok("success");
        }
    }
}