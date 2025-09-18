import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data
const industriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/industries.json'), 'utf8'));
const locationsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/locations.json'), 'utf8'));

console.log('🚀 Starting Programmatic SEO Page Generation...');

// Generate Industry Calculator Pages
function generateIndustryPages() {
    console.log('📊 Generating Industry Calculator Pages...');
    
    industriesData.industries.forEach(industry => {
        const pageContent = `---
import AccessibleCalculatorTemplate from '../components/AccessibleCalculatorTemplate.astro';

const industry = ${JSON.stringify(industry, null, 2)};
---

<AccessibleCalculatorTemplate industry={industry} />
`;
        
        const fileName = `${industry.id}-valuation-calculator.astro`;
        const filePath = path.join(__dirname, 'src/pages', fileName);
        
        fs.writeFileSync(filePath, pageContent);
        console.log(`✅ Generated: ${fileName}`);
    });
}

// Generate Location-Based Pages
function generateLocationPages() {
    console.log('🌍 Generating Location-Based Pages...');
    
    locationsData.cities.forEach(city => {
        const pageContent = `---
export const prerender = true;

const city = ${JSON.stringify(city, null, 2)};
const canonicalURL = new URL(\`/business-valuation-\${city.id}\`, Astro.site);
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{city.title} | TheValuationGenie</title>
    <meta name="description" content={city.description}>
    <meta name="keywords" content={city.keywords}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href={canonicalURL}>
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content={city.title}>
    <meta property="og:description" content={city.description}>
    <meta property="og:url" content={canonicalURL}>
    <meta property="og:type" content="website">
    
    <!-- Schema Markup -->
    <script type="application/ld+json" set:html={JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": \`TheValuationGenie - \${city.name}\`,
        "description": city.description,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city.name,
            "addressRegion": city.state,
            "addressCountry": "US"
        },
        "areaServed": {
            "@type": "City",
            "name": city.name,
            "containedInPlace": {
                "@type": "State",
                "name": city.state
            }
        },
        "serviceType": "Business Valuation Services"
    })}>
    </script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Business Valuation Services in {city.name}, {city.state}</h1>
            <p>Professional business appraisal and valuation services in {city.name} with local market expertise</p>
        </header>
        
        <section>
            <h2>Why Choose {city.name} Business Valuation Services?</h2>
            <p>Our {city.name} business valuation experts understand the local market dynamics and provide accurate, comprehensive business appraisals for all industries.</p>
            
            <h3>{city.name} Market Characteristics</h3>
            <ul>
                {city.market_characteristics.map(characteristic => (
                    <li>{characteristic}</li>
                ))}
            </ul>
            
            <h3>Key Industries in {city.name}</h3>
            <ul>
                {city.key_industries.map(industry => (
                    <li>{industry}</li>
                ))}
            </ul>
        </section>
        
        <section>
            <h2>Our {city.name} Business Valuation Process</h2>
            <ol>
                <li><strong>Initial Consultation:</strong> Understanding your business and valuation needs</li>
                <li><strong>Data Collection:</strong> Gathering financial and operational information</li>
                <li><strong>Market Analysis:</strong> Analyzing {city.name} market conditions and comparable sales</li>
                <li><strong>Valuation Analysis:</strong> Applying appropriate valuation methodologies</li>
                <li><strong>Report Delivery:</strong> Providing comprehensive valuation report</li>
            </ol>
        </section>
        
        <div class="cta-section">
            <h3>Get Your {city.name} Business Valuation Today</h3>
            <p>Professional business valuation services in {city.name} starting at $39</p>
            <a href="#" class="cta-btn">Order Report - $39</a>
            <a href="#" class="cta-btn">Free Consultation</a>
        </div>
    </div>
    
    <style>
        /* Include the same styling as the calculator template */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            margin-top: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
        }
        
        header {
            text-align: center;
            margin-bottom: 40px;
            padding: 40px 0;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            border-radius: 10px;
            margin: -20px -20px 40px -20px;
        }
        
        h1 {
            font-size: 2.5em;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        h2 {
            color: #1e3c72;
            border-bottom: 3px solid #2a5298;
            padding-bottom: 10px;
            margin: 30px 0 20px 0;
            font-size: 1.8em;
        }
        
        h3 {
            color: #2a5298;
            margin: 25px 0 15px 0;
            font-size: 1.4em;
        }
        
        ul, ol {
            margin: 15px 0;
            padding-left: 30px;
        }
        
        li {
            margin: 8px 0;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-btn {
            background: white;
            color: #ff6b6b;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s;
            text-decoration: none;
            display: inline-block;
            margin: 10px;
        }
        
        .cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
    </style>
</body>
</html>
`;
        
        const fileName = `business-valuation-${city.id}.astro`;
        const filePath = path.join(__dirname, 'src/pages', fileName);
        
        fs.writeFileSync(filePath, pageContent);
        console.log(`✅ Generated: ${fileName}`);
    });
}

// Generate Sitemap entries
function generateSitemapEntries() {
    console.log('🗺️ Generating Sitemap Entries...');
    
    let sitemapEntries = [];
    
    // Add industry calculator pages
    industriesData.industries.forEach(industry => {
        sitemapEntries.push(`https://thevaluationgenie.com/${industry.id}-valuation-calculator`);
    });
    
    // Add location pages
    locationsData.cities.forEach(city => {
        sitemapEntries.push(`https://thevaluationgenie.com/business-valuation-${city.id}`);
    });
    
    const sitemapContent = sitemapEntries.join('\n');
    fs.writeFileSync(path.join(__dirname, 'generated-sitemap-entries.txt'), sitemapContent);
    console.log(`✅ Generated sitemap entries: ${sitemapEntries.length} URLs`);
}

// Generate Internal Linking Structure
function generateInternalLinks() {
    console.log('🔗 Generating Internal Link Structure...');
    
    const linkStructure = {
        industry_to_location: {},
        location_to_industry: {},
        related_industries: {}
    };
    
    // Create cross-linking between industries and locations
    industriesData.industries.forEach(industry => {
        linkStructure.industry_to_location[industry.id] = locationsData.cities.map(city => ({
            url: `/business-valuation-${city.id}`,
            anchor: `${industry.name} Valuation in ${city.name}`,
            title: `Professional ${industry.name} valuation services in ${city.name}`
        }));
    });
    
    locationsData.cities.forEach(city => {
        linkStructure.location_to_industry[city.id] = industriesData.industries.map(industry => ({
            url: `/${industry.id}-valuation-calculator`,
            anchor: `${industry.name} Calculator`,
            title: `Calculate ${industry.name} value in ${city.name}`
        }));
    });
    
    fs.writeFileSync(
        path.join(__dirname, 'src/data/internal-links.json'), 
        JSON.stringify(linkStructure, null, 2)
    );
    console.log('✅ Generated internal linking structure');
}

// Main execution
async function main() {
    try {
        // Create directories if they don't exist
        const pagesDir = path.join(__dirname, 'src/pages');
        const dataDir = path.join(__dirname, 'src/data');
        
        if (!fs.existsSync(pagesDir)) {
            fs.mkdirSync(pagesDir, { recursive: true });
        }
        
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        // Generate all pages
        generateIndustryPages();
        generateLocationPages();
        generateSitemapEntries();
        generateInternalLinks();
        
        console.log('\n🎉 Programmatic SEO Generation Complete!');
        console.log(`📊 Generated ${industriesData.industries.length} industry calculator pages`);
        console.log(`🌍 Generated ${locationsData.cities.length} location-based pages`);
        console.log(`🔗 Created internal linking structure`);
        console.log(`🗺️ Generated sitemap entries`);
        console.log('\n💡 Next steps:');
        console.log('1. Run: npm run build');
        console.log('2. Deploy to production');
        console.log('3. Submit sitemap to Google Search Console');
        console.log('4. Monitor performance in Google Analytics');
        
    } catch (error) {
        console.error('❌ Error generating pages:', error);
    }
}

// Run the generator
main();
