
import React, { Component, useState } from 'react';
import { Graphviz } from 'graphviz-react'

interface IBinaryTreeNode {
    left: IBinaryTreeNode | null;
    right: IBinaryTreeNode | null;
    value: number | null;
    // addLeft?: (left: number) => IBinaryTreeNode
    // addRight?: (right: number) => IBinaryTreeNode
}

// interface INode<U> {
//     value: U
//     left: INode<U> | null
//     right: INode<U> | null
// }

enum ORDER {
    PRE_ORDER = 0,
    POST_ORDER = 1,
    IN_ORDER = 2
}

const traverse = (node: IBinaryTreeNode, visitFn: any, depth: number, orderType = ORDER.PRE_ORDER): void => {

    switch (orderType) {
        case ORDER.IN_ORDER:
          if (typeof node !== "number") {
            traverse(node.left!, visitFn, depth + 1, orderType);
          }
          visitFn(node, depth);
    
          if (typeof node !== "number") {
            traverse(node.right!, visitFn, depth + 1, orderType);
          }
          return;
        case ORDER.PRE_ORDER:
          visitFn(node, depth);
          if (node !== null) {
            traverse(node.left!, visitFn, depth + 1, orderType);
            traverse(node.right!, visitFn, depth + 1, orderType);
          }
          return;
        case ORDER.POST_ORDER:
          if (typeof node !== "number") {
            traverse(node.left!, visitFn, depth + 1, orderType);
            traverse(node.right!, visitFn, depth + 1, orderType);
          }
          visitFn(node, depth);
          return;
      }
}

class BinaryTree {
    left: BinaryTree | null = null;
    right: BinaryTree | null = null;
    value: number | null = null;

    constructor(val: number | null) {
        this.value = val;
    }

    addLeft = (left: BinaryTree | null) => {
        this.left = left && left.value ? left : null;
        return this;
    }

    /**
     * 
     * @param right : number;
     * @returns 
     */
    addRight = (right: BinaryTree | null) => {
        this.right = right && right.value ? right : null;
        return this;
    }

    printTree = (orderType: ORDER = ORDER.PRE_ORDER): string => {
        let str = "";

        const addNodeToStr = (node: IBinaryTreeNode, depth: number): void => {
            const nodeValue = typeof node === "number" ? node : node.value;
            str +=
                str.length === 0 ? nodeValue : `\n${" ".repeat(depth)} -> ${nodeValue}`;
        };

        traverse(this, addNodeToStr, 0, orderType);

        return str;
    };

    total = (): number => {
        let sum = 0;
        traverse(
            this,
            (node: IBinaryTreeNode) => {
                if(node !== null) {
                    sum += node.value!;
                }
                // const nodeValue = typeof node === "object" ? node.value : node.value;
            },
            0,
        );
        return sum;
    }
}


const GraphTree: React.FC = () => {

    const tree = new BinaryTree(8);
    tree.addLeft(new BinaryTree(6).addLeft(new BinaryTree(1)).addRight(new BinaryTree(4)))
    tree.addRight(new BinaryTree(15).addLeft(new BinaryTree(10)).addRight(new BinaryTree(17)))

    const [total, setTotal] = useState(tree.total())

    return (
        <pre>
            < Graphviz dot={`graph {

            }`} />
            <h2>Preorder</h2>
            <h2>Postorder</h2>
            <h2>Inorder</h2>
            <hr />
            <b>Total: {total}</b>

        </pre>
    );
}

export default GraphTree