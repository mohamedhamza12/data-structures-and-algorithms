class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addEdge(u, v, undirected) {
        this.nodes.get(u).push(v);

        if (undirected)
            this.nodes.get(v).push(u);
    }

    removeEdge(u, v, undirected) {
        const uNode = this.nodes.get(u);
        const vIndex = uNode.indexOf(v);

        if (vIndex !== -1)
            uNode.splice(vIndex, 1);

        if (undirected) {
            const vNode = this.nodes.get(v);
            const uIndex = vNode.indexOf(u);
    
            if (uIndex !== -1)
                vNode.splice(uIndex, 1);
        }
    }

    addNode(u) {
        if (!this.nodes.has(u))
            this.nodes.set(u, []);
    }

    topologicalSort() {
        let visited = new Map();
        let stack = [];
        let res = [];
        for (const node of this.nodes) {
            visited.set(node[0], false);
        }
        for (const node of this.nodes) {
            if(!visited.get(node[0])) {
                this.#topologicalSortHelper(node[0], visited, stack);
            }
        }

        while (stack.length !== 0) {
            res.push(stack.pop());
        }
        return res;
    }

    #topologicalSortHelper(nodeKey, visited, stack) {
        visited.set(nodeKey, true);

        for (const adjacentNode of this.nodes.get(nodeKey)) {
            if (!visited.get(adjacentNode))
                this.#topologicalSortHelper(adjacentNode, visited, stack);
        }

        stack.push(nodeKey);
    }
}