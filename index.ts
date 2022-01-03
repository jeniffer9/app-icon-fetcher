import axios from "axios";
import cheerio from "cheerio";

const headers = {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};

export async function getPlayStoreAppIconFromUrl(url: string) {
    const searchUrl = url.includes('&') ? url.split('&')[0] : url;
    return axios
        .get(searchUrl, {
            headers
        })
        .then((response) => {
            const $ = cheerio.load(response.data);
            const imgs = $("img[alt='Cover art']");

            if (imgs.length === 0) {
                console.warn("Couldn't find Play Store app with the URL:", searchUrl)
                return undefined;
            } else {
                return $(imgs[0]).attr("src");
            }
        })
        .catch((err) => {
            console.log("Fetch error " + err);
            return null;
        });
}

// export async function getPlayStoreAppIconWithId(id: string) {
//     return getPlayStoreAppIconFromUrl(`https://play.google.com/store/apps/details?id=${id}`);
// }

export async function getAppStoreAppIconFromUrl(url: string) {
  return axios
    .get(url, {
        headers
    })
    .then((response) => {
        const $ = cheerio.load(response.data);
        const imgs = $("source[type='image/png']", ".product-hero__artwork");

        if (imgs.length === 0) {
            console.warn("Couldn't find App Store app with the URL:", url)
            return undefined;
        } else {
            return $(imgs[0]).attr("srcset")?.split(' ')[0];
        }
    })
    .catch((err) => {
            console.log("Fetch error " + err);
            return null;
    });
}

// Might not always find it if the app has a country restriction
// export async function getAppStoreAppIconWithId(id: string) {
//     return getAppStoreAppIconFromUrl(`https://apps.apple.com/app/id${id}`);
// }

