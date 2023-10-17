import puppeteer from "puppeteer";

const getGames = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://steamdb.info/charts/", {
    waitUntil: "domcontentloaded",
  });

  const games = await page.evaluate(() => {
    const gameNodes = document.querySelectorAll("tr.app");
    const gameArray = Array.from(gameNodes);

    const gameData = gameArray.map((game) => {
      const gameRanking = game.querySelector("td:nth-child(1)").innerText;
      const gameImg = game.querySelector("img").src;
      const gameName = game.querySelector("td:nth-child(3) a").innerText;
      const gameConcurrentPlayers =
        game.querySelector("td:nth-child(4)").innerText;

      return { gameRanking, gameImg, gameName, gameConcurrentPlayers };
    });

    return gameData;
  });

  console.log(games);

  await browser.close();
};

getGames();
