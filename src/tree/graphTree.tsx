
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
            if (node !== null) {
                traverse(node.left!, visitFn, depth + 1, orderType);
            }
            visitFn(node, depth);

            if (node !== null) {
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
            if (node !== null) {
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
            if(node !== null) {
                str +=
                str.length === 0 ? node.value : `\n${"*".repeat(depth)} -> ${node.value}`;
            }
        };

        traverse(this, addNodeToStr, 0, orderType);

        return str;
    };

    total = (): number => {
        let sum = 0;
        traverse(
            this,
            (node: IBinaryTreeNode) => {
                if (node !== null) {
                    sum += node.value!;
                }
            },
            0,
        );
        return sum;
    }

    /**
     * 
     * @returns        
     * 6 -- 4;6 -- 7;8 -- 6;8 -- 22;22 -- 12;22 -- 44;
     */
    toGraphviz = (): string => {
        let str = ""

        const addNodeToStr = (node: IBinaryTreeNode, depth: number) => {
          const nodeValue = (n: IBinaryTreeNode) => n !== null ? n.value : null;
          
          if(node instanceof BinaryTree && node !== null) {
            str += nodeValue(node.left!) !== null ? 
                `${node.value} -- ${nodeValue(node.left!)};` : '';
            str += nodeValue(node.right!) !== null ? 
                `${node.value} -- ${nodeValue(node.right!)};` : '';
          }
    
        };
        
        traverse(this, addNodeToStr, 0, ORDER.IN_ORDER);
    
        return str
      }
}


const GraphTree: React.FC = () => {

    const tree = new BinaryTree(8);
    tree.addLeft(new BinaryTree(6).addLeft(new BinaryTree(4)).addRight(new BinaryTree(7)))
    tree.addRight(new BinaryTree(22).addLeft(new BinaryTree(12)).addRight(new BinaryTree(44)))

    

    const [total, setTotal] = useState(tree.total())
    const [graphviz, setGraphviz] = useState(tree.toGraphviz())
    const [preOrder, setpreOrder] = useState(tree.printTree(ORDER.PRE_ORDER))
    const [postOrder, setpostOrder] = useState(tree.printTree(ORDER.POST_ORDER))
    const [inOrder, setinOrder] = useState(tree.printTree(ORDER.IN_ORDER))
    
    return (
        <pre>
            {graphviz}
            < Graphviz dot={`graph {
                ${graphviz}
            }`} />
            <h2>Preorder</h2>
            {preOrder}
            <h2>Postorder</h2>
            {postOrder}
            <h2>Inorder</h2>
            {inOrder}
            <hr />
            <b>Total: {total}</b>

        </pre>
    );
}

export default GraphTree