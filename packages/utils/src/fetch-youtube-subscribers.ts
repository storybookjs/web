interface YoutubeData {
  items: {
    statistics: {
      subscriberCount: string;
    };
  }[];
}

export const fetchYouTubeSubscribers = async (): Promise<{
  number: number;
  formattedResult: string;
}> => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=UCr7Quur3eIyA_oe8FNYexfg&key=${process.env.YOUTUBE_API_KEY}`,
  );

  const data = (await response.json()) as YoutubeData;
  const number = parseInt(data.items[0].statistics.subscriberCount, 10);

  if (!response.ok) return { number: 0, formattedResult: '0' };

  return {
    number,
    formattedResult: number.toLocaleString(),
  };
};
