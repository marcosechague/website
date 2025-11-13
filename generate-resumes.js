const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDFs() {
  console.log('🚀 Starting PDF generation...');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Set the page format
  await page.setViewport({
    width: 794,  // A4 width in pixels at 96 DPI
    height: 1123, // A4 height in pixels at 96 DPI
    deviceScaleFactor: 1,
  });

  const outputDir = path.join(__dirname, 'public', 'resumes');
  
  // Generate English PDF
  console.log('📄 Generating English resume...');
  const htmlPathEn = path.join(outputDir, 'resume-en.html');
  const pdfPathEn = path.join(outputDir, 'Marcos_Echague_Resume_EN.pdf');
  
  const htmlContentEn = fs.readFileSync(htmlPathEn, 'utf8');
  await page.setContent(htmlContentEn, { waitUntil: 'networkidle0' });
  
  await page.pdf({
    path: pdfPathEn,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.3in',
      right: '0.3in',
      bottom: '0.3in',
      left: '0.3in'
    }
  });
  
  console.log('✅ English resume generated:', pdfPathEn);

  // Generate Spanish PDF with new page
  console.log('📄 Generating Spanish resume...');
  const htmlPathEs = path.join(outputDir, 'resume-es.html');
  const pdfPathEs = path.join(outputDir, 'Marcos_Echague_Resume_ES.pdf');
  
  // Create a new page for Spanish resume
  const pageEs = await browser.newPage();
  await pageEs.setViewport({
    width: 794,
    height: 1123,
    deviceScaleFactor: 1,
  });
  
  const htmlContentEs = fs.readFileSync(htmlPathEs, 'utf8');
  await pageEs.setContent(htmlContentEs, { 
    waitUntil: 'domcontentloaded',
    timeout: 60000 
  });
  
  await pageEs.pdf({
    path: pdfPathEs,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.3in',
      right: '0.3in',
      bottom: '0.3in',
      left: '0.3in'
    }
  });
  
  await pageEs.close();
  console.log('✅ Spanish resume generated:', pdfPathEs);

  await browser.close();
  console.log('🎉 PDF generation completed!');
}

// Run the generator
generatePDFs().catch(console.error);