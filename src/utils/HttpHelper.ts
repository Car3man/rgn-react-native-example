export default class HttpHelper {
    static getQueryParam (url: string, param: string): string {
        const urlParams = url.split(/([&,?=])/);
        const paramIndex = urlParams.indexOf(param);
        return urlParams[paramIndex + 2];
    };
}