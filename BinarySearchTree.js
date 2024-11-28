class BinarySearchTree {
    constructor(){
        this.height = 0;
    }

    insert(node){
        if(this.root == null){
            node.id = 0;
            this.root = node;
            this.root.position = 1;
            this.root.numLeft = 0;
            this.root.numRight = 0;
        } else {
            this.insertNode(this.root, node);
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
            drawNode(this.root);
    }

    drawNode(node){
        if(node != null){
            //draw
            this.drawNode(node.left);
            this.drawNode(node.right);
        }
    }
}