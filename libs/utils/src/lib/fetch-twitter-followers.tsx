export async function fetchTwitterFollowers() {
  try {
    const followersCount = await fetch(
      'https://api.twitter.com/1.1/users/show.json?screen_name=storybookjs',
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        return data.followers_count;
      });
    return {
      number: followersCount,
      formattedResult: `${followersCount?.toLocaleString()}+`,
    };
  } catch (error) {
    console.log(error);
    return { number: 18350, formattedResult: '18,350+' };
  }
}
