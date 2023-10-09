using ApiServer.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using backend_app.Models;

namespace backend_app.Controllers
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


        [EnableCors(origins: ConfigController.CorsAllowedUrl, headers: "*", methods: "POST")]
        [Route("api/paronamas")]
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