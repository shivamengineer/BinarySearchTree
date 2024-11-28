class BinarySearchTree {
    constructor(){
        this.height = 0;
    }

    insert(value){
        var n = new Node(value, 1);
        this.insertWithNode(n);
    }

    insertWithNode(node){
        if(this.root == null){
            node.id = 1;
            this.root = node;
            this.root.position = 1;
            this.root.numLeft = 0;
            this.root.numRight = 0;
            this.numNodes = 1;
        } else {
            this.insertNode(this.root, node);
            this.numNodes++;
        }
    }

    insertNode(root, node){
        if(node.value > root.value){
            if(root.right == null){
                node.id = (root.id * 2) + 1;
                root.right = node;
                node.position = root.position + 1;
            } else {
                this.insertNode(root.right, node);
            }
        } else {
            root.position++;
            this.increasePositionForSubtree(root.right);
            if(root.left == null){
                node.id = root.id * 2;
                root.left = node;
                node.position = root.position - 1;
            } else {
                this.insertNode(root.left, node);
            }
        }
    }

    remove(value){
        this.root = this.removeNode(this.root, value);
    }

    removeNode(node, value){
        if(node == null){
            return null;
        } else if(value < node.value){
            this.removeNode(node.left, value);
            node.position--;
            this.decreasePositionForSubtree(node.right);
            return node;
        } else if(value > node.value){
            this.removeNode(node.right, value);
            return node;
        } else {
            if(node.left == null & node.right == null){
                node = null;
                return null;
            }
            if(node.left == null){
                node = node.right;
                return node;
            } else if(node.right == null){
                node = node.left;
                return node;
            }

            var nextNode = this.findMinNode(node.right);
            node.value = nextNode.value;

            node.right = this.removeNode(node.right, nextNode.value);
            return node;
        }
    }

    findMinNode(node){
        if(node.left == null){
            return null;
        }
        var minNode = node;
        while(minNode.left != null){
            minNode = minNode.left;
        }
        return minNode;
    }
    
    increasePositionForSubtree(node){
        if(node != null){
            node.position++;
            this.increasePositionForSubtree(node.left);
            this.increasePositionForSubtree(node.right);
        }
    }

    decreasePositionForSubtree(node){
        if(node != null){
            node.position--;
            this.decreasePositionForSubtree(node.left);
            this.decreasePositionForSubtree(node.right);
        }
    }

    rotateRight(node){
        if(node.left != null){
            var leftNode = node.left;
            if(leftNode.right != null){
                node.left = leftNode.right;
            }
            leftNode.right = node;
        }
    }

    rotateLeft(node){
        if(node.right != null){
            var rightNode = node.right;
            if(rightNode.left != null){
                node.right = rightNode.left;
            }
            rightNode.left = node;
        }
    }

    draw(){
        if(this != null)
            this.drawCurrentNode(this.root);
    }

    drawCurrentNode(node){
        if(node != null){
            //draw
            var height = -1;
            var level = 0
            while(height == -1){
                if(node.id < (2 ** level)){
                    height = level;
                } else {
                    level++;
                }
            }
            node.drawNode(node.position * 150, height * 150, 50);
            this.drawCurrentNode(node.left);
            this.drawCurrentNode(node.right);
            if(node.left != null){
                var height2 = -1;
                var level = 0
                while(height2 == -1){
                    if(node.left.id < (2 ** level)){
                        height2 = level;
                    } else {
                        level++;
                    }
                }
                ctx.beginPath();
                ctx.moveTo(node.position * 150, height * 150);
                ctx.lineTo(node.left.position * 150, height2 * 150);
                ctx.stroke();
            }
            if(node.right != null){
                var height2 = -1;
                var level = 0
                while(height2 == -1){
                    if(node.right.id < (2 ** level)){
                        height2 = level;
                    } else {
                        level++;
                    }
                }
                ctx.beginPath();
                ctx.moveTo(node.position * 150, height * 150);
                ctx.lineTo(node.right.position * 150, height2 * 150);
                ctx.stroke();
            }
        }
    }
}