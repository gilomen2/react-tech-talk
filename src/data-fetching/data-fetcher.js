export async function getArticlesFeed(category = 'science') {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=6&apiKey=75c0b6a86f504d4f8fd28f270bbad045`
  );
  return parseResponse(response);
}

function parseResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    return new Error('Error retrieving articles');
  }
}