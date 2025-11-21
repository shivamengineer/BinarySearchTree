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
            this.root.height = 1;
            this.height = 1;
        } else {
            this.insertNode(this.root, node);
            this.numNodes++;
        }
    }

    insertNode(root, node){
        node.height = root.height + 1;
        if(node.height > this.height) { this.height = node.height; }
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
        this.updateHeightsOfTree(this.root, 1);
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

    findNodeFromValue(value){
        if(this.root == null){
            return null;
        } else {
            var found = false;
            var n = this.root;
            while(!found){
                if(n.value == value){
                    return n;
                } else if(n.value < value){
                    console.log("right");
                    if(n.right != null){
                        n = n.right;
                    } else {
                        return null;
                    }
                } else if(n.value > value){
                    console.log("left");
                    if(n.left != null){
                        n = n.left;
                    } else {
                        return null;
                    }
                }
            }
        }
    }

    findParentFromValue(value){
        if(this.root == null){
            return null;
        } else {
            var found = false;
            var n = this.root;
            while(!found){
                if(n.value < value){
                    if(n.right != null){
                        if(n.right.value == value){
                            return n;
                        } else {
                            n = n.right;
                        }
                    } else {
                        return null;
                    }
                } else if(n.value > value){
                    if(n.left != null){
                        if(n.left.value == value){
                            return n;
                        } else {
                            n = n.left;
                        }
                    } else {
                        return null;
                    }
                }
            }
        }
    }

    resetPositionRight(node, parentID){
        node.id = (parentID * 2) + 1;
        if(node.left != null){
            this.resetPositionLeft(node.left, node.id);
        }
        if(node.right != null){
            this.resetPositionRight(node.right, node.id);
        }
    }

    resetPositionLeft(node, parentID){
        node.id = parentID * 2;
        if(node.left != null){
            this.resetPositionLeft(node.left, node.id);
        }
        if(node.right != null){
            this.resetPositionRight(node.right, node.id);
        }
    }

    rotateRight(value){
        var n = this.findNodeFromValue(value);
        if(n != null) this.rotateNodeRight(n);
    }

    rotateNodeRight(node){
        if(node.value == this.root.value){
            if(this.root.left != null){
                var n = this.root;
                this.root = this.root.left;
                if(this.root.right != null){
                    n.left = this.root.right;
                } else {
                    n.left = null;
                }
                this.root.right = n;
                this.root.id = 1;
                if(this.root.left != null){
                    this.resetPositionLeft(this.root.left, 1);
                }
                this.resetPositionRight(this.root.right, 1);
            }
        } else {
            var parent = this.findParentFromValue(node.value);
            if(node.left != null){
                var leftNode = node.left;
                if(leftNode.right != null){
                    node.left = leftNode.right;
                } else {
                    node.left = null;
                }
                leftNode.right = node;
                if(parent.left != null && parent.left.value == node.value){
                    parent.left = leftNode;
                    this.resetPositionLeft(leftNode, parent.id);
                } else {
                    parent.right = leftNode;
                    this.resetPositionRight(leftNode, parent.id);
                }
            }
        }
    }

    rotateLeft(value){
        var n = this.findNodeFromValue(value);
        if(n != null)
            this.rotateNodeLeft(n);
    }

    rotateNodeLeft(node){
        if(node.value == this.root.value){
            if(this.root.right != null){
                var n = this.root;
                this.root = this.root.right;
                if(this.root.left != null){
                    n.right = this.root.left;
                } else {
                    n.right = null;
                }
                this.root.left = n;
                this.root.id = 1;
                if(this.root.right != null){
                    this.resetPositionRight(this.root.right, 1);
                }
                this.resetPositionLeft(this.root.left, 1);
            }
        } else {
            var parent = this.findParentFromValue(node.value);
            if(node.right != null){
                var rightNode = node.right;
                if(rightNode.left != null){
                    node.right = rightNode.left;
                } else {
                    node.right = null;
                }
                rightNode.left = node;
                if(parent.right != null && parent.right.value == node.value){
                    parent.right = rightNode;
                    this.resetPositionRight(rightNode, parent.id);
                } else {
                    parent.left = rightNode;
                    this.resetPositionLeft(rightNode, parent.id);
                }
            }
        }
        this.updateHeightsOfTree(this.root, 1);
    }

    updateHeightsOfTree(node, height){
        node.height = height;
        if(this.height < node.height) { this.height = node.height; }
        if(node.left != null) { this.updateHeightsOfTree(node.left, height + 1); }
        if(node.right != null) { this.updateHeightsOfTree(node.right, height + 1); }
        console.log(this.height);
    }

    draw(){
        if(this != null)
            this.drawCurrentNode(this.root);
    }



    getXPos(nodePosition){ // 150 * position
        return (((innerWidth * 5 / 6) / this.numNodes) * nodePosition);
    }

    getYPos(height){ // 150 * height
        return (((innerHeight * 5 / 6) / this.height) * height);
    }

    collidesWithNode(x, y){
        return this.collidesWith(this.root, x, y);
    }

    collidesWith(node, x, y){
        if(node.collides(x, y)){
            return node.value;
        }
        var ret = -999;
        if(node.left != null){
            ret = this.collidesWith(node.left, x, y);
            if(ret != -999){
                return ret;
            }
        }
        if(node.right != null){
            ret = this.collidesWith(node.right, x, y);
            if(ret != -999){
                return ret;
            }
        }
        return ret;
    }


    drawCurrentNode(node){
        if(node != null){
            var height = -1;
            var level = 0;
            while(height == -1){
                if(node.id < (2 ** level)){
                    height = level;
                } else {
                    level++;
                }
            }
            node.setNodeDrawingAttributes(this.getXPos(node.position), this.getYPos(height), 50);
            node.drawNode();
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
                ctx.moveTo(this.getXPos(node.position), this.getYPos(height));
                ctx.lineTo(this.getXPos(node.left.position), this.getYPos(height2));
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
                ctx.moveTo(this.getXPos(node.position), this.getYPos(height));
                ctx.lineTo(this.getXPos(node.right.position), this.getYPos(height2));
                ctx.stroke();
            }
        }
    }
}