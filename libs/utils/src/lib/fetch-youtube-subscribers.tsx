/**
 * Fetch YouTube subscribers
 */
export async function fetchYouTubeSubscribers() {
  try {
    const memberCount = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=UCr7Quur3eIyA_oe8FNYexfg&key=${process.env.YOUTUBE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        return parseInt(data.items[0].statistics.subscriberCount, 10);
      });
    return {
      number: memberCount,
      formattedResult: `${memberCount?.toLocaleString()}+`,
    };
  } catch (err) {
    console.log(err);
    return { number: 7020, formattedResult: '7,020+' };
  }
}
