function trieInsert(trie, string, item) {
	let walker = trie;
	for (let i = 0; i < string.length; i++) {
		const char = string[i];

		// add child node if not already present
		if (walker.children[char] == null) {
			walker.children[char] = {
				parent: walker,
				children: {},
				candidates: [],
				depth: 0,
			};
		}

		// log max depth of this subtree
		walker.depth = Math.max(walker.depth, string.length - i);

		// step into child node
		walker = walker.children[char];
	}

	walker.candidates.push(item);
}

function trieRemove(trie, string, item) {
	let walker = trie;
	for (let i = 0; i < string.length; i++) {
		const char = string[i];

		// string is not in trie
		if (walker.children[char] == null) {
			return false;
		}

		walker = walker.children[char];
	}

	const indexOfCandidate = walker.candidates.indexOf(item);

	// candidate item is not in trie
	if (indexOfCandidate === -1) {
		return false;
	}

	// remove candidate from candidate list
	walker.candidates.splice(indexOfCandidate, 1);

	while (walker.parent != null) {
		const count = walker.candidates.length + walker.children.length;

		// remove this node if it has no children/candidates
		if (count === 0) {
			const indexOfChild = walker.parent.children.indexOf(walker);
			walker.parent.children.splice(indexOfChild, 1);
		}

		// update max depth of subtries
		walker = walker.parent;
		walker.depth = Math.max(...walker.children.map((c) => c.depth));
	}

	return true;
}

export class TrieStoragePlugin {
	constructor(candidates = []) {
		for (const [string, item] of candidates) {
			trieInsert(this.#trie, string, item);
		}

		this.#count = candidates.length;
	}
	add(candidates = []) {
		for (const [string, item] of candidates) {
			trieInsert(this.#trie, string, item);
		}

		this.#count += candidates.length;
	}
	remove(string, item) {
		if (trieRemove(this.#trie, string, item)) {
			this.#count--;
		}
	}

	get count() {
		return this.#count;
	}

	#trie = {children: {}, candidates: [], depth: 0};
	#count = 0;
}
