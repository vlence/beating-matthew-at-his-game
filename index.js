const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1280,
      height: 1024
    }
  });
  const page = await browser.newPage();
  
  await page.goto('https://typings.gg');

  const difficultyLevels = [ 10, 25, 50, 100, 250 ];
  // const difficultyLevel = 10;
  for (let difficultyLevel of difficultyLevels) {
    const difficultySelector = await page.$(`#wc-${difficultyLevel}`);
    await difficultySelector.click();
    
    const challengeText = await page.$eval('#text-display', node => node.innerText);
    const inputField = await page.$('#input-field');
    
    await inputField.type(challengeText, { delay: 60 });
    await page.screenshot({path: `screenshots/${difficultyLevel}.png`});
  }

  await browser.close();
})();