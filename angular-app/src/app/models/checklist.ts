export class Checklist {
    public title: string;
    public items: any[];
    public roles: string[];
    constructor(title: string, items: any[], roles: string[]) {
        this.title = title;
        this.items = items;
        this.roles = roles;
    }
}
