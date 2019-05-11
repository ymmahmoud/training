export class Checklist {
    public role: string;
    public items: any[];
    constructor(role: string, items: any[]) {
        this.role = role;
        this.items = items;
    }
}
