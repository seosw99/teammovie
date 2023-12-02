export async function getData() {
    let response = await fetch(
      'https://raw.githubusercontent.com/mittinu/movies/main/movieData.json'
    );
    let data = await response.json();
    return data.movieInfo;
  }
  