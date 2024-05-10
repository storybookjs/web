interface DiscordData {
  approximate_member_count: number;
  // include other properties you might be interested in
}

export async function fetchDiscordMembers(): Promise<{
  number: number;
  formattedResult: string;
}> {
  try {
    const memberCount = await fetch(
      'https://discord.com/api/v9/invites/storybook?with_counts=true&with_expiration=true',
    )
      .then((res) => res.json() as Promise<DiscordData>)
      .then((data) => data.approximate_member_count);
    return {
      number: memberCount,
      formattedResult: `${memberCount.toLocaleString()}+`,
    };
  } catch (err) {
    return { number: 0, formattedResult: '0' };
  }
}
