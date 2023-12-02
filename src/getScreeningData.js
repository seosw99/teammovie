export async function getScreeningData() {
    let response = await fetch(
      'https://raw.githubusercontent.com/mittinu/movies/main/screeningData.json'
    );
    let data = await response.json();
    return data.screeningInfo;
  }
  