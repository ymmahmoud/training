export class Checklist {
    public role: string;
    public sections: any[];
    constructor(role: string, sections: any[]) {
        this.role = role;
        this.sections = sections;
    }
}
