export default class Utils {
    static async waitForTime (milliseconds: number) {
        await new Promise((resolve) => {
            setTimeout(() => {
                return resolve(null);
            }, milliseconds);
        });
    };
}