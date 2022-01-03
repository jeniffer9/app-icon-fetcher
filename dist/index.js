"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppStoreAppIconFromUrl = exports.getPlayStoreAppIconFromUrl = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};
function getPlayStoreAppIconFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchUrl = url.includes('&') ? url.split('&')[0] : url;
        return axios_1.default
            .get(searchUrl, {
            headers
        })
            .then((response) => {
            const $ = cheerio_1.default.load(response.data);
            const imgs = $("img[alt='Cover art']");
            if (imgs.length === 0) {
                console.warn("Couldn't find Play Store app with the URL:", searchUrl);
                return undefined;
            }
            else {
                return $(imgs[0]).attr("src");
            }
        })
            .catch((err) => {
            console.log("Fetch error " + err);
            return null;
        });
    });
}
exports.getPlayStoreAppIconFromUrl = getPlayStoreAppIconFromUrl;
// export async function getPlayStoreAppIconWithId(id: string) {
//     return getPlayStoreAppIconFromUrl(`https://play.google.com/store/apps/details?id=${id}`);
// }
function getAppStoreAppIconFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return axios_1.default
            .get(url, {
            headers
        })
            .then((response) => {
            var _a;
            const $ = cheerio_1.default.load(response.data);
            const imgs = $("source[type='image/png']", ".product-hero__artwork");
            if (imgs.length === 0) {
                console.warn("Couldn't find App Store app with the URL:", url);
                return undefined;
            }
            else {
                return (_a = $(imgs[0]).attr("srcset")) === null || _a === void 0 ? void 0 : _a.split(' ')[0];
            }
        })
            .catch((err) => {
            console.log("Fetch error " + err);
            return null;
        });
    });
}
exports.getAppStoreAppIconFromUrl = getAppStoreAppIconFromUrl;
// Might not always find it if the app has a country restriction
// export async function getAppStoreAppIconWithId(id: string) {
//     return getAppStoreAppIconFromUrl(`https://apps.apple.com/app/id${id}`);
// }
