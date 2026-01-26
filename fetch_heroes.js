const fs = require('fs');
const https = require('https');
const path = require('path');

const HERO_LIST_URL = 'https://mapi.mobilelegends.com/hero/list';
const HERO_DETAIL_URL = 'https://mapi.mobilelegends.com/hero/detail?id=';

function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function main() {
    try {
        console.log('Fetching hero list...');
        const listData = await fetchData(HERO_LIST_URL);
        if (listData.code !== 2000) throw new Error('Failed to fetch list');

        const heroes = listData.data;
        const allHeroDetails = [];

        console.log(`Found ${heroes.length} heroes. Fetching details...`);

        for (let i = 0; i < heroes.length; i++) {
            const hero = heroes[i];
            console.log(`[${i + 1}/${heroes.length}] Fetching details for ${hero.name}...`);
            try {
                const detailData = await fetchData(HERO_DETAIL_URL + hero.heroid);
                if (detailData.code === 2000) {
                    allHeroDetails.push({
                        ...detailData.data,
                        heroid: hero.heroid,
                        list_image: hero.key
                    });
                }
            } catch (err) {
                console.error(`Failed to fetch ${hero.name}:`, err.message);
            }
            // Small delay to avoid overloading
            await new Promise(r => setTimeout(r, 100));
        }

        const outputPath = path.join(__dirname, 'mobile-legends', 'data', 'heroes.json');
        fs.writeFileSync(outputPath, JSON.stringify(allHeroDetails, null, 2));
        console.log(`Successfully saved ${allHeroDetails.length} heroes to ${outputPath}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
