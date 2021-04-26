class BinaryHeap {
    constructor(comparatorFunction = (x, y) => x > y) {
        this.data = [];
        this.comparatorFunction = comparatorFunction;
    }

    push(element) {
        this.data.push(element);
        this.heapifyUp(this.data.length - 1);
    }

    pop() {
        let temp = this.data[this.data.length - 1];
        this.data[this.data.length - 1] = this.data[0];
        this.data[0] = temp;
        this.data.pop();
        this.heapifyDown(0);
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor(index / 2);
            const parent = this.data[parentIndex];
            if (this.comparatorFunction(parent, this.data[index]))
                break;
            
            this.data[parentIndex] = this.data[index];
            this.data[index] = parent;
            
            index = parentIndex;
        }
    }

    heapifyDown(index) {
        while (index < this.data.length) {
            let childToSwap = null;
            if ((index * 2) < this.data.length && this.comparatorFunction(this.data[index * 2], this.data[index])) {
                childToSwap = index * 2;
            }
            if ((index * 2 + 1) < this.data.length && this.comparatorFunction(this.data[index * 2 + 1], this.data[index])) {
                if (!childToSwap || this.comparatorFunction(this.data[index * 2 + 1], this.data[childToSwap]))
                    childToSwap = index * 2 + 1;
            }

            if (!childToSwap)
                break;
            
            const temp = this.data[childToSwap];
            this.data[childToSwap] = this.data[index];
            this.data[index] = temp;

            index = childToSwap;
        }
    }
    
    get top() {
    	return this.data[0];
    }
    
}

export default BinaryHeap;