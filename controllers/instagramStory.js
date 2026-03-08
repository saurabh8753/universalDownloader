import axios from "axios";

export const downloadStory = async (req, res) => {
  try {

    const { url } = req.query;

    if (!url) {
      return res.json({
        success: false,
        message: "Story URL required"
      });
    }

    // URL parse
    const match = url.match(/stories\/([^\/]+)\/(\d+)/);

    if (!match) {
      return res.json({
        success: false,
        message: "Invalid story URL"
      });
    }

    const username = match[1];
    const storyId = match[2];

    const api =
      `https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=${username}`;

    const response = await axios.get(api, {
      headers: {
        "user-agent": "Instagram 275.0.0.27.98 Android"
      }
    });

    let result = null;

    const items = response.data.reels_media[0].items;

    items.forEach((item) => {

      if (item.id.includes(storyId)) {

        result = {
          thumbnail: item.image_versions2.candidates[0].url,
          url: item.video_versions
            ? item.video_versions[0].url
            : item.image_versions2.candidates[0].url
        };

      }

    });

    if (!result) {
      return res.json({
        success: false,
        message: "Story not found"
      });
    }

    res.json({
      success: true,
      data: result
    });

  } catch (e) {

    res.json({
      success: false,
      message: "Error fetching story"
    });

  }
};
