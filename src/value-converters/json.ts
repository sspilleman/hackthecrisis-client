export class JsonValueConverter {
    toView(value: any) {
        return JSON.stringify(value, null, 4).trim();
    }
}