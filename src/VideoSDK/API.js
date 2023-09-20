//Auth token we will use to generate a meeting and connect to it
export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0YmU4ZWIwOC05NDdmLTQyOWUtOGVjYy04MDM4Zjg4YTBmZDIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5NTA1MDE0NSwiZXhwIjoxNzI2NTg2MTQ1fQ.1VudSreVHTtPIbfKL1T6nYP4sUfq54go1gt--uRl310";
// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};
