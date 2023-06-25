export const preOrderTraversal = function* (node) {
  yield node;

  if (node.children.length) {
    for (let child of node.children) {
      yield* preOrderTraversal(child);
    }
  }
};

export const move = (
  items,
  parentNodeKey,
  dropNode,
  position,
  childNodeKey
) => {
  for (let node of preOrderTraversal(items)) {
    if (node.id !== parentNodeKey) continue;

    if (position === "middle") {
      node.children.push(dropNode);
      continue;
    }

    const childNodeIndex = node.children.findIndex(
      (i) => i.id === childNodeKey
    );
    const before = node.children.slice(0, childNodeIndex);
    const childNode = node.children[childNodeIndex];
    const after = node.children.slice(childNodeIndex + 1);

    if (position === "before") {
      node.children = [...before, dropNode, childNode, ...after];
      continue;
    }

    if (position === "after") {
      node.children = [...before, childNode, dropNode, ...after];
    }
  }

  return items;
};

export const insert = (items, parentNodeKey, child) => {
  for (let node of preOrderTraversal(items)) {
    if (node.id === parentNodeKey) node.children.push(child);
  }

  return items;
};

export const remove = (items, id) => {
  for (let node of preOrderTraversal(items)) {
    const filtered = node.children.filter((c) => c.id !== id);
    if (filtered.length === node.children.length) continue;
    node.children = filtered;
  }
  return items;
};

export const find = (items, id) => {
  for (let node of preOrderTraversal(items)) {
    if (node.id === id) return node;
  }
  return undefined;
};
