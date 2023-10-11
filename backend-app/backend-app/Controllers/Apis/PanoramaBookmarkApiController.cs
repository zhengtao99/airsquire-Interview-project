using ApiServer.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using backend_app.Models.PanoromaBookmarkApiModels;

namespace backend_app.Controllers.Apis
{
    public class PanoramaBookmarkApiController : ApiController
    {
     
        [EnableCors(origins: ConfigController.CorsAllowedUrl, headers: "*", methods: "PUT")]
        [Route("api/panoramabookmarks")]
        [HttpPut]
        public IHttpActionResult UpdatePanoromaBookmark([FromBody] UpdatePanoromaBookmark.ParamModel paramModel)
        {
            using (AirsquireChallengeDBEntities entities = new AirsquireChallengeDBEntities())
            {
                var panoramaBookmark = entities.PanoramaBookmarks.Where(z => z.PanoramaId == paramModel.PanoramaId)
                                                                    .Where(z => z.Username == paramModel.Username).FirstOrDefault();
                if(panoramaBookmark == null)
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

                return Ok("success");
            }
        }

    }
}