// app/api/scrape/route.ts (Next.js App Router)
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export default async function GET() {
  function between(min: number, max: number) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }
  const number=between(1,380)
  try {
    console.log("Gonna fetch Thirukural");
    
    const res = await fetch(`https://www.thirukural.ai/kural/${number}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    console.log("Fetched Thirukural");
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // More specific selectors - adjust these based on the actual HTML structure
    const kuralNo = $(".tamil, .kural-tamil, h2.tamil, .verse-tamil").first().text().trim();
    const kural = $(".h6.tamil").first().text().trim()
    // const tamilElement = $('*:contains("தெய்வத்தான்")').first();

// Get the next English translation
// const kuralMeaning = $(".h6.tamil").first().next('div').find('span').text().trim();
// const kuralMeaning = $('html body div#__next main.single-kural div.kural-scroll div.kural-header div.row.justify-content-center div.col-12.col-lg-6.kural-header-content div span').text();
const kuralMeaning=$('.kural-header-content > div:nth-child(4)').prev().text()
    
    // Fallback selectors if the above don't work
    if (!kuralNo && !kural) {
      const allText = $("body").text().trim();
      return NextResponse.json({ 
        headline: "Could not parse specific elements", 
        summary: allText.slice(0, 200),
        debug: "Check the HTML structure of the page"
      });
    }
    
    return NextResponse.json({ 
      kuralNo: kuralNo || "No headline found", 
      kural: kural || "No summary found" ,
      kuralMeaning: kuralMeaning
    });
    
  } catch (error) {
    console.error("Error scraping Thirukural:", error);
    return NextResponse.json(
      { 
        error: "Failed to scrape data", 
        details: error instanceof Error ? error.message : "Unknown error occurred" 
      },
      { status: 500 }
    );
  }
}

// Edge runtime works well for simple scraping tasks
export const runtime = 'edge';