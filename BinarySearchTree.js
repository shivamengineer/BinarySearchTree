class BinarySearchTree {
    constructor(){
        this.height = 0;
    }

    insert(node){
        if(this.root == null){
            node.id = 0;
            this.root = node;
        } else {
            this.insertNode(this.root, node);
        }
    }

    insertNode(root, node){
        if(node.value > root.value){
            if(root.right == null){
                node.id = (root.id * 2) + 1;
                root.right = node;
            } else {
                this.insertNode(root.right, node);
            }
        } else {
            if(root.left == null){
                node.id = root.id * 2;
                root.left = node;
            } else {
                this.insertNode(root.left, node);
            }
        }
    }

    remove(value){
        this.root = this.remove(this.root, value);
    }

    removeNode(node, value){
        if(node == null){
            return null;
        } else if(value < node.value){
            this.removeNode(node.left, value);
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

    rotate(){

    }

    draw(){
        
    }
}