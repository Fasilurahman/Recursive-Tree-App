export class Node {
    constructor(
        public id: string,
        public name: string,    
        public parentId: string | null
    ) {}
}   