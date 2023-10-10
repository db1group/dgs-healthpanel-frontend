export class TechRadarResponse {
    ring: string;
    title: string;

    constructor(data:any = {}) {
        this.ring = data.ring;
        this.title = data.title;
    }
}
