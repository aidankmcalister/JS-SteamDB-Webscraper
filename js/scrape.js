const getGames = async () => {
  try {
    const response = await fetch("https://steamdb.info/charts/");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const gameNodes = doc.querySelectorAll("tr.app");

    const games = Array.from(gameNodes).map((element) => {
      const gameRanking = element.querySelector("td:nth-child(1)").textContent;
      const gameImg = element.querySelector("img").getAttribute("src");
      const gameName = element.querySelector("td:nth-child(3) a").textContent;
      const gameConcurrentPlayers =
        element.querySelector("td:nth-child(4)").textContent;

      return { gameRanking, gameImg, gameName, gameConcurrentPlayers };
    });

    console.log(games[0]);
  } catch (error) {
    console.error("Error:", error);
  }
};

getGames();
