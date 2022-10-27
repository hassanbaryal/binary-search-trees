class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  setData(value) {
    this.data = value;
  }

  setLeft(value) {
    this.left = value;
  }

  setRight(value) { 
    this.right = value;
  }
}

class Tree {
  constructor (node) {
    this.root = node;
  }

  find(value) {
    let temp = this.root;
    while(value !== temp.data) {
      if (value < temp.data) {
        // Check left subtree
        temp = temp.left;
      } else {
        // Check right subtree
        temp = temp.right;
      }
      if (temp === null) return null;
    }
    return temp;
  }

  insert(value) {
    if (this.find(value) !== null) {
      console.log(`${value} is already in the tree!!`);
      return null;
    }
    let temp = this.root;
    let previousNode;
    while(temp !== null) {
      previousNode = temp;
      if (value < temp.data) {
        // Check left subtree
        temp = temp.left;
      } else {
        // Check right subtree
        temp = temp.right;
      }
    }
    // Add value to tree   
    if (value < previousNode.data) {
      previousNode.setLeft(new Node(value));
    } else {
      previousNode.setRight(new Node(value));
    }
    return this.root;
  }

  delete(value) {
    
    if (this.find(value) === null) {
      console.log(`${value} is not in the tree!!`);
      return null;
    }

    let toBeDeleted = this.root;
    let previousNode = null;
    while(toBeDeleted.data !== value) {
      previousNode = toBeDeleted;
      if (value < toBeDeleted.data) {
        // Check left subtree
        toBeDeleted = toBeDeleted.left;
      } else {
        // Check right subtree
        toBeDeleted = toBeDeleted.right;
      }
    }
    // If node to be deleted is a leaf of tree, else if node to be deleted is root of tree (first node), else
    if (toBeDeleted.left === null && toBeDeleted.right === null) {
      if (previousNode === null) {
        this.root.data = null;
      } else if (previousNode.data > toBeDeleted.data) {
        previousNode.setLeft(null);
      } else {
        previousNode.setRight(null);
      }
    } else if (toBeDeleted.left === null || toBeDeleted.right === null) {
      // If node to be deleted only has a right branch, else  only has a left branch
      if (toBeDeleted.left === null) {
        if (previousNode === null) {
          this.root = this.root.right;
        } else if (previousNode.data > toBeDeleted.data) {
          previousNode.setLeft(toBeDeleted.right);
        } else {
          previousNode.setRight(toBeDeleted.right);
        }
      } else {
        if (previousNode === null) {
          this.root = this.root.left;
        } else if (previousNode.data > toBeDeleted.data) {
          previousNode.setLeft(toBeDeleted.left);
        } else {
          previousNode.setRight(toBeDeleted.left);
        }
      }
    } else {
      // If node has two branches
      let rightOfDelete = toBeDeleted.right;
      while (rightOfDelete.left !== null) {
        rightOfDelete = rightOfDelete.left;
      }
      this.delete(rightOfDelete.data);
      toBeDeleted.setData(rightOfDelete.data);
    }
    return this.root;
  }
}

// Builds a Binary Search Tree from an ordered array
function buildTree (array, start = 0, end = array.length - 1) {
  if (start > end) return null;
  const mid = Math.round((start + end) / 2);
  const root = new Node(array[mid]);
  root.setLeft(buildTree(array, start, mid - 1));
  root.setRight(buildTree(array, mid + 1, end));
  return root;
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

// Breadth first search of binary tree
function levelOrder (tree, cb = null) {
  let queue = [];
  let traversalPath = [];
  queue.push(tree);
  while (queue.length > 0) {
    traversalPath.push(queue[0].data);
    if (cb) cb(queue[0].data);
    if (queue[0].left !== null) queue.push(queue[0].left);
    if (queue[0].right !== null) queue.push(queue[0].right); 
    queue.shift();
  }
  return traversalPath;
};

// Breadth-first search of binary tree (recursive)
function levelOrderRecur (node, cb = null, queue = [], traversalPath = []) {
  if (node === undefined) return traversalPath;
  if (queue.length < 1) {
    if (cb) cb(node);
    queue.push(node);
  }
  traversalPath.push(queue[0].data);
  if (node.left !== null) queue.push(node.left);
  if (node.right !== null) queue.push(node.right);
  queue.shift();
  return levelOrderRecur(queue[0], cb, queue, traversalPath);
};

// LDR, depth first search
function inOrder (node, cb = null) {
  let path = [];
  if (node.left !== null) {
    path = path.concat(inOrder(node.left, cb));
  };
  path = path.concat([node.data]);
  if (cb) cb(node.data);
  if (node.right !== null) {
    path = path.concat(inOrder(node.right, cb));
  };
  return path;
};

// DLR, depth first search
function preOrder (node, cb = null) {
  let path = [];
  path = path.concat([node.data]);
  if (cb) cb(node.data);
  if (node.left !== null) {
    path = path.concat(preOrder(node.left, cb));
  };
  if (node.right !== null) {
    path = path.concat(preOrder(node.right, cb));
  };
  return path;
};

// LRD, depth first search
function postOrder (node, cb = null) {
  let path = [];
  if (node.left !== null) {
    path = path.concat(postOrder(node.left, cb));
  };
  if (node.right !== null) {
    path = path.concat(postOrder(node.right, cb));
  };
  path = path.concat([node.data]);
  if (cb) cb(node.data);
  return path;
};

// Calculates height of node (distance of node from farthest leaf node, where leaf node height = 0)
function height (node) {
  if (node.left === null && node.right === null) return 0;
  let leftHeight = 0, rightHeight = 0;
  if (node.left !== null) {
    leftHeight++;
    leftHeight += height(node.left);
  }

  if (node.right !== null) {
    rightHeight++;
    rightHeight += height(node.right);
  }

  if (leftHeight > rightHeight) return leftHeight;
  return rightHeight;
};

// Calculates depth of node (distance of node from root, where root depth = 0)
function depth (root, node) {
  let depth = 0;
  while (root.data !== node.data) {
    if (node.data < root.data) {
      root = root.left;
    } else {
      root = root.right;
    }
    if (root === null) return null;
    depth++;
  }
  return depth;
};

// Checks if a tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
function isBalanced (tree) {
  if (tree.left === null && tree.right === null) return true;
  let left = null, right = null;
  let leftHeight = 1, rightHeight = 1;
  if (tree.left !== null) {
    left = tree.left;
    leftHeight = height(left);
  }
  if (tree.right !== null){
    right = tree.right;
    rightHeight = height(right);
  }

  if (Math.abs(rightHeight - leftHeight) <= 1) {
    if (left === null || right === null) {
      if (leftHeight === 0 || rightHeight === 0) return true;
      return false;
    }
    if (isBalanced(left) && isBalanced(right)) return true;
  }
  return false;
};

// This function returns a new, balanced, binary search tree
function rebalance (tree) {
  const orderedArray = inOrder(tree);
  return buildTree(orderedArray, 0, orderedArray.length - 1);
};

export {Node, Tree, buildTree, prettyPrint, levelOrder, levelOrderRecur, inOrder, preOrder, postOrder, height, depth, isBalanced, rebalance};