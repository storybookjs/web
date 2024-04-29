export async function fetchDiscordMembers() {
  try {
    const memberCount = await fetch(
      'https://discord.com/api/v9/invites/storybook?with_counts=true&with_expiration=true'
    )
      .then((res) => res.json())
      .then((data) => data.approximate_member_count);
    return {
      number: memberCount,
      formattedResult: `${memberCount?.toLocaleString()}+`,
    };
  } catch (err) {
    console.log(err);
    return { number: 0, formattedResult: '0' };
  }
}
