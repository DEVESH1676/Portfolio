import puppeteer from "puppeteer";

async function run() {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", err => console.log("PAGE ERROR:", err.toString()));
  
  await page.goto("https://portfolio.deveshghuge1676.workers.dev", { waitUntil: "networkidle0" });
  console.log("Page loaded.");
  
  const rootHtml = await page.$eval("#root", el => el.innerHTML);
  console.log("Root innerHTML length:", rootHtml.length);
  
  await browser.close();
}
run();
