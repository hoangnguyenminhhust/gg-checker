const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const useProxy = require('puppeteer-page-proxy');

const run = async (sim) => {
    try {
        console.log("RUNING SIM: " , sim.sim)
        const browser = await puppeteer.launch({
            headless: true,
            userDataDir: '/tmp/userDir',
            ignoreDefaultArgs: ['--disable-extensions'],
            args: [ '--no-sandbox', '--disable-setuid-sandbox'],
            // executablePath: '/usr/bin/chromium'
        });
        const page = await browser.newPage();
        await useProxy(page, 'http://appsim-rotate:zsse9nacovvu@p.webshare.io');
        await page.setViewport({
            width: 1368,
            height: 768
        })
        await page.goto("https://google.com.vn/search?num=100&q=" + sim.sim + "&gs_l=hp.3..35i39j0l9.927987.928835.0.929090.13.10.0.0.0.0.317.858.1j2j1j1.5.0.ecynfh...0...1.1.64.hp..11.2.332.0.WxTlrXXGTOc");
        console.log("WAITNG----")
        await sleep(5000)
        await browser.close()
    } catch (error) {
    }

}

const init = async () => {

    try {
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: '/tmp/userDir',
            ignoreDefaultArgs: ['--disable-extensions'],
            args: [ '--no-sandbox', '--disable-setuid-sandbox'],
            // executablePath: '/usr/bin/chromium'
        });
    
        await browser.userAgent()
        const page = await browser.newPage();
        await page.goto('https://accounts.google.com/')
    
        await page.waitForSelector('input[type="email"]')
        await page.click('input[type="email"]')
    
        await page.type('input[type="email"]', 'devops.hust@gmail.com')
    
        await page.waitForSelector('#identifierNext')
        await page.click('#identifierNext')
    
        await page.waitFor(500);
    
        await page.waitForSelector('input[type="password"]')
        await page.click('input[type="email"]')
        await page.waitFor(500);
    
        await page.type('input[type="password"]', '1chapnhandi')
    
        await page.waitForSelector('#passwordNext')
        await page.click('#passwordNext')
        await sleep(3000)
        await browser.close()
    } catch (error) {
        console.log(error)
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = {
    run,
    init
};