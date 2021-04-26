class TrieNode {
    constructor(val) {
        this.val = val;
        this.wordEnd = false;
        this.next = {};
    }
}

class Trie {
    constructor() {
        this.dict = {};
    }

    addWord(word) {
        let level = this.dict;
        for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
            if (!level[word[letterIndex]]) {
                let newNode = new TrieNode(word[letterIndex]);
                level[word[letterIndex]] = newNode;
            }
            
            if (letterIndex !== word.length - 1) {
                level = level[word[letterIndex]].next;
            }
        }
        const lastWord = word[word.length - 1];
        level[lastWord].wordEnd = true;
    }

    searchWord(word, exact) {
        if (exact)
            return this.#searchExactWordRecursively(word, 0, this.dict);
        else
            return this.#searchWordRecursively(word, 0, this.dict);
    }

    #searchWordRecursively(word, index, dictLevel) {
        if (word[index] === '.') {
            for (const key in dictLevel) {
                const testWord = word.substring(0, index) + key + word.substring(index + 1);
                if (index === word.length - 1 && dictLevel[testWord[index]].wordEnd)
                    return true;
                
                if (this.#searchWordRecursively(testWord, index + 1, dictLevel[testWord[index]].next))
                    return true;
            }
            return false;
        } else if (!dictLevel[word[index]])
                return false;
        
        if (index === word.length - 1)
             return dictLevel[word[index]].wordEnd;
        
    
        return this.#searchWordRecursively(word, index + 1, dictLevel[word[index]].next);
    }

    #searchExactWordRecursively(word, index, dictLevel) {
        if (!dictLevel[word[index]])
            return false;

        if (index === word.length - 1)
            return dictLevel[word[index]].wordEnd;

        return this.#searchExactWordRecursively(word, index + 1, dictLevel[word[index]].next);
    }
}