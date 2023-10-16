using Leadtools.Codecs;
using Microsoft.AspNetCore.Mvc;

namespace backend_app.Controllers
{
    public static class UtilitiesController
    {
        public static string TimeDescription(DateTime targetDate)
        {
            TimeSpan ts = DateTime.Now - targetDate;


            if (ts.Minutes < 1)
            {
                if (ts.Seconds == 1)
                {
                    return string.Format(ts.Seconds + " second ago");
                }
                return string.Format(ts.Seconds + " seconds ago");
            }
            if (ts.Hours < 1)
            {
                if (ts.Minutes == 1)
                {
                    return string.Format(ts.Minutes + " min ago");
                }
                return string.Format(ts.Minutes + " mins ago");
            }
            if (ts.Days < 1)
            {
                if (ts.Hours == 1)
                {
                    return string.Format(ts.Hours + " hour ago");
                }
                return string.Format(ts.Hours + " hours ago");
            }

            if (ts.Days == 1)
            {
                return string.Format(ts.Days + " day ago");
            }

            return string.Format(ts.Days + " days ago");
        }

        public static string ResizeImage(Image img, int maxWidth, int maxHeight)
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
