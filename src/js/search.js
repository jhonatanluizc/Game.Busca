class Node {
    constructor(parent, x, y, level, cost, previous, next) {
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.level = level;
        this.cost = cost;
        this.previous = previous;
        this.next = next;
    }
}

class NodeList {
    constructor(head, tail) {
        this.head = null;
        this.tail = null;
    }

    insertAtBeginning(x, y, level, cost, parent) {
        var node = new Node(parent, x, y, level, cost, null, null);
        if (this.head === null) {
            this.tail = node;
            this.head = node;
        }
        else {
            node.next = this.head;
            this.head.previous = node;
            this.head = node;
        }
    }

    insertAtEnd(x, y, level, cost, parent) {
        var node = new Node(parent, x, y, level, cost, null, null);
        if (this.head === null) {
            this.head = node;
        }
        else {
            this.tail.next = node;
            node.previous = this.tail;
        }
        this.tail = node;
    }

    insertAtPosition(x, y, level, cost, parent) {
        if (this.head === null) {
            this.insertAtBeginning(x, y, level, cost, parent);
        }
        else {
            var current = this.head;
            while (current.cost < cost) {
                current = current.next;
                if (current === null) {
                    break;
                }
            }
            if (current === this.head) {
                this.insertAtBeginning(x, y, level, cost, parent);
            }
            else {
                if (current === null) {
                    this.insertAtEnd(x, y, level, cost, parent);
                }
                else {
                    var node = new Node(parent, x, y, level, cost, null, null);
                    var temp = current.previous;
                    temp.next = node;
                    node.previous = temp;
                    current.previous = node;
                    node.next = current;
                }
            }
        }
    }

    deleteAtBeginning() {
        if (this.head === null) {
            return null;
        }
        else {
            var node = this.head;
            this.head = this.head.next;
            if (this.head !== null) {
                this.head.previous = null;
            }
            else {
                this.tail = null;
            }
            return node;
        }
    }

    deleteAtEnd() {
        if (this.tail === null) {
            return null;
        }
        else {
            var node = this.tail;
            this.tail = this.tail.previous;
            if (this.tail !== null) {
                this.tail.next = null;
            }
            else {
                this.head = null;
            }
            return node;
        }
    }

    isEmpty() {
        return (this.head === null);
    }

    /// [OBSOLETE]
    showList() {
        var temp = this.head;
        var lines = [];
        while (temp !== null) {
            var line = [];
            line.push(temp.x);
            line.push(temp.y);
            lines.push(line);
            temp = temp.next;
        }
        return lines;
    }

    /// :: exibeCaminho
    displayPath() {
        var current = this.tail;
        var path = [];
        var line = [];
        while (current.parent !== null) {
            line = [];
            line.push(current.x);
            line.push(current.y);
            path.push(line);
            current = current.parent;
        }
        line = [];
        line.push(current.x);
        line.push(current.y);
        path.push(line);
        path = path.reverse();
        return path;
    }

    /// :: exibeCaminho1
    displayPathByNode(node) {
        var current = this.head;
        var coordinates = [];
        var path = [];
        var line = [];
        coordinates.push(current.x);
        coordinates.push(current.y);
        while (coordinates.toString() !== node.toString()) {
            current = current.next;
            coordinates = [];
            coordinates.push(current.x);
            coordinates.push(current.y);
        }
        current = current.parent;
        while (current.parent !== null) {
            line.push(current.x);
            line.push(current.y);
            path.push(line);
            current = current.parent;
        }
        line = [];
        line.push(current.x);
        line.push(current.y);
        path.push(line);
        return path;
    }

    /// :: exibeCaminho2
    displayPathByCoordinates(coordinates, cost) {
        var current = this.tail;
        var line = [];
        var path = [];
        line.push(current.x);
        line.push(current.y);
        while ((line.toString() !== coordinates.toString()) || (current.cost !== cost)) {
            current = current.previous;
            line = [];
            line.push(current.x);
            line.push(current.y);
        }
        while (current.parent !== null) {
            line = [];
            line.push(current.x);
            line.push(current.y);
            path.push(line);
            current = current.parent;
        }
        line = [];
        line.push(current.x);
        line.push(current.y);
        path.push(line);
        return path;
    }

    first() {
        return this.head;
    }

    last() {
        return this.tail;
    }
}

class Search {

    successor(x, y) {
        var max_x = gameMap.length;
        var max_y = gameMap[0].length;
        var node = new Node(null, x, y, 0, null, null);
        var action = [];

        /// :: Go right.
        if (node.x + 1 < max_x) {
            var xx = node.x + 1;
            var yy = node.y;
            if (gameMap[xx][yy] !== 1) {
                var position = [];
                position.push(xx);
                position.push(yy);
                var cost = [];
                cost.push(position);
                cost.push(3);
                action.push(cost);
            }
        }

        /// :: Go left.
        if (node.x - 1 >= 0) {
            var xx = node.x - 1;
            var yy = node.y;
            if (gameMap[xx][yy] !== 1) {
                var position = [];
                position.push(xx);
                position.push(yy);
                var cost = [];
                cost.push(position);
                cost.push(2);
                action.push(cost);
            }
        }

        /// :: Go up.
        if (node.y + 1 < max_y) {
            var xx = node.x;
            var yy = node.y + 1;
            if (gameMap[xx][yy] !== 1) {
                var position = [];
                position.push(xx);
                position.push(yy);
                var cost = [];
                cost.push(position);
                cost.push(1);
                action.push(cost);
            }
        }

        /// :: Go down.
        if (node.y - 1 >= 0) {
            var xx = node.x;
            var yy = node.y - 1;
            if (gameMap[xx][yy] !== 1) {
                var position = [];
                position.push(xx);
                position.push(yy);
                var cost = [];
                cost.push(position);
                cost.push(2);
                action.push(cost);
            }
        }
        return action;
    }

    heuristic(point1, point2) {
        return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
    }

    /// :: Amplitude.
    breadthFirst(start, end) {
        var listHandler = new NodeList();
        var listPath = new NodeList();
        listHandler.insertAtEnd(start[0], start[1], 0, 0, null);
        listPath.insertAtEnd(start[0], start[1], 0, 0, null);
        var line = [];
        var visited = [];
        line.push(start);
        line.push(0);
        visited.push(line);
        while (!listHandler.isEmpty()) {
            var current = listHandler.deleteAtBeginning();
            if (current === null) {
                break;
            }
            var actions = this.successor(current.x, current.y);
            for (var action = 0; action < actions.length; action++) {
                var newNode = actions[action][0];
                var flag = true;
                for (var visiting = 0; visiting < visited.length; visiting++) {
                    if (visited[visiting][0].toString() === newNode.toString()) {
                        if (visited[visiting][1] <= (current.level + 1)) {
                            flag = false;
                        }
                        else {
                            visited[visiting][1] = current.level + 1;
                        }
                        break;
                    }
                }
                if (flag) {
                    listHandler.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current);
                    listPath.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current);
                    line = [];
                    line.push(newNode);
                    line.push(current.level + 1);
                    visited.push(line);
                    if (newNode.toString() === end.toString()) {
                        var path = listPath.displayPath();
                        return path;
                    }
                }
            }
        }
        return 'PATH NOT FOUND';
    }

    /// :: Profundidade.
    depthFirst(start, end) {
        var listHandler = new NodeList();
        var listPath = new NodeList();
        var visited = [];
        listHandler.insertAtEnd(start[0], start[1], 0, 0, null);
        listPath.insertAtEnd(start[0], start[1], 0, 0, null);
        var line = [];
        line.push(start);
        line.push(0);
        visited.push(line);
        while (!listHandler.isEmpty()) {
            var current = listHandler.deleteAtEnd();
            if (current === null) {
                break;
            }
            var actions = this.successor(current.x, current.y);
            for (var action = actions.length - 1; action > -1; action--) {
                var newNode = actions[action][0];
                var flag = true;
                for (var visiting = 0; visiting < visited.length; visiting++) {
                    if (visited[visiting][0].toString() === newNode.toString()) {
                        if (visited[visiting][1] <= (current.level + 1)) {
                            flag = false;
                        }
                        else {
                            visited[visiting][1] = current.level + 1;
                        }
                        break;
                    }
                }
                if (flag) {
                    listHandler.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current)
                    listPath.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current)
                    line = [];
                    line.push(newNode);
                    line.push(current.level + 1);
                    visited.push(line);
                    if (newNode.toString() === end.toString()) {
                        var path = listPath.displayPath();
                        return path;
                    }
                }
            }
        }

        return 'PATH NOT FOUND';
    }

    /// :: Profundidade limitada.
    depthLimited(start, end, limit) {
        var listHandler = new NodeList();
        var listPath = new NodeList();
        var visited = [];
        listHandler.insertAtEnd(start[0], start[1], 0, 0, null);
        listPath.insertAtEnd(start[0], start[1], 0, 0, null);
        var line = [];
        line.push(start);
        line.push(0);
        visited.push(line);
        while (listHandler.isEmpty() !== null) {
            var current = listHandler.deleteAtEnd();
            if (current === null) {
                break;
            }
            if (current.level < limit) {
                var actions = this.successor(current.x, current.y);
                for (var action = actions.length - 1; action > -1; action--) {
                    var newNode = actions[action][0];
                    var flag = true;
                    for (var visiting = 0; visiting < visited.length; visiting++) {
                        if (visited[visiting][0].toString() === newNode.toString()) {
                            if (visited[visiting][1] <= (current.level + 1)) {
                                flag = false;
                            }
                            else {
                                visited[visiting][1] = current.level + 1;
                            }
                            break;
                        }
                    }
                    if (flag) {
                        listHandler.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current);
                        listPath.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current);
                        line = [];
                        line.push(newNode);
                        line.push(current.level + 1);
                        visited.push(line);
                        if (newNode.toString() === end.toString()) {
                            var path = listPath.displayPath();
                            return path;
                        }
                    }
                }
            }
        }
        return 'PATH NOT FOUND';
    }

    /// :: Aprofundamento iterativo.
    iterativeDeepening(start, end) {
        for (var limit = 0; limit < (gameMap.length * gameMap[0].length); limit++) {
            var path = [];
            var listHandler = new NodeList();
            var listPath = new NodeList();
            var visited = [];
            var line = [];
            listHandler.insertAtEnd(start[0], start[1], 0, 0, null)
            listPath.insertAtEnd(start[0], start[1], 0, 0, null)
            line.push(start);
            line.push(0);
            visited.push(line);
            while (listHandler.isEmpty() !== null) {
                var current = listHandler.deleteAtEnd();
                if (current === null) {
                    break;
                }
                if (current.level < limit) {
                    var actions = this.successor(current.x, current.y);
                    for (var action = 0; action < actions.length; action++) {
                        var newNode = actions[action][0];
                        var flag = true;

                        for (var visiting = 0; visiting < visited.length; visiting++) {
                            if (visited[visiting][0].toString() === newNode.toString()) {
                                if (visited[visiting][1] <= (current.level + 1)) {
                                    flag = false;
                                }
                                else {
                                    visited[visiting][1] = current.level + 1;
                                }
                                break;
                            }
                        }
                        if (flag) {
                            listHandler.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current)
                            listPath.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current)
                            line = [];
                            line.push(newNode);
                            line.push(current.level + 1);
                            visited.push(line);
                            if (newNode.toString() === end.toString()) {
                                var path = listPath.displayPath();
                                return path;
                            }
                        }
                    }
                }
            }
        }
        return 'PATH NOT FOUND';
    }

    /// :: Bidirecional.
    bidirectional(start, end) {
        var listHandlerOrigin = new NodeList();
        var listPathOrigin = new NodeList();
        var listHandlerDestiny = new NodeList();
        var listPathDestiny = new NodeList();
        var visited = [];
        var line = [];
        listHandlerOrigin.insertAtEnd(start[0], start[1], 0, 0, null);
        listPathOrigin.insertAtEnd(start[0], start[1], 0, 0, null);
        line.push(start);
        line.push(1);
        visited.push(line);
        listHandlerDestiny.insertAtEnd(end[0], end[1], 0, 0, null);
        listPathDestiny.insertAtEnd(end[0], end[1], 0, 0, null);
        line = [];
        line.push(end);
        line.push(2);
        visited.push(line);
        while (true) {
            var flag1 = true;
            while (flag1) {
                var current = listHandlerOrigin.deleteAtBeginning();
                var actions = this.successor(current.x, current.y);
                for (var action = 0; action < actions.length; action++) {
                    var newNode = actions[action][0];
                    var flag2 = true;
                    var flag3 = false;
                    for (var visiting = 0; visiting < visited.length; visiting++) {
                        if (visited[visiting][0].toString() === newNode.toString()) {
                            if (visited[visiting][1] === 1) {
                                flag2 = false;
                            }
                            else {
                                flag3 = true;
                            }
                            break;
                        }
                    }
                    if (flag2) {
                        listHandlerOrigin.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current);
                        listPathOrigin.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current);
                        if (flag3) {
                            var path = listPathOrigin.displayPath();
                            path = path.concat(listPathDestiny.displayPathByNode(newNode));
                            return path;
                        }
                        else {
                            line = [];
                            line.push(newNode);
                            line.push(1);
                            visited.push(line);
                        }
                    }
                }
                if (listHandlerOrigin.isEmpty() !== true) {
                    var temp = listHandlerOrigin.first();
                    if (temp.level === current.level) {
                        flag1 = true;
                    }
                    else {
                        flag1 = false;
                    }
                }
            }
            var flag1 = true;
            while (flag1) {
                var current = listHandlerDestiny.deleteAtBeginning();
                if (current === null) {
                    break;
                }
                var actions = this.successor(current.x, current.y);
                for (var action = 0; action < actions.length; action++) {
                    var newNode = actions[action][0];
                    var flag2 = true;
                    var flag3 = false;
                    for (var visiting = 0; visiting < visited.length; visiting++) {
                        if (visited[visiting][0].toString() === newNode.toString()) {
                            if (visited[visiting][1] === 2) {
                                flag2 = false;
                            }
                            else {
                                flag3 = true;
                            }
                            break;
                        }
                    }
                    if (flag2) {
                        listHandlerDestiny.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current);
                        listPathDestiny.insertAtEnd(newNode[0], newNode[1], current.level + 1, 0, current);
                        if (flag3) {
                            var path = listPathDestiny.showList();
                            path = path.concat(listPathOrigin.displayPathByNode(newNode));
                            return path.reverse();
                        }
                        else {
                            line = [];
                            line.push(newNode);
                            line.push(2);
                            visited.push(line);
                        }
                    }
                }
                if (listHandlerDestiny.isEmpty() !== true) {
                    var temp = listHandlerDestiny.last();
                    if (current.level === temp.level) {
                        flag1 = true;
                    }
                    else {
                        flag1 = false;
                    }
                }
            }
        }
    }

    /// :: Custo Uniforme.
    uniformCost(start, end) {
        var listHandler = new NodeList();
        var listPath = new NodeList();
        var visited = [];
        var line = [];
        listHandler.insertAtEnd(start[0], start[1], 0, 0, null);
        listPath.insertAtEnd(start[0], start[1], 0, 0, null);
        line.push(start);
        line.push(0);
        visited.push(line);
        while (listHandler.isEmpty() === false) {
            var current = listHandler.deleteAtBeginning();
            var coordinates = [];
            coordinates.push(current.x);
            coordinates.push(current.y);
            if (coordinates.toString() === end.toString()) {
                var path = listPath.displayPathByCoordinates(coordinates, current.cost);
                return [path.reverse(), current.cost];
            }
            var actions = this.successor(current.x, current.y);
            for (var action = 0; action < actions.length; action++) {
                var newNode = actions[action][0];
                var v2 = current.cost + actions[action][1];
                var v1 = v2;
                var flag1 = true;
                var flag2 = true;
                for (var visiting = 0; visiting < visited.length; visiting++) {
                    if (visited[visiting][0].toString() === newNode.toString()) {
                        if (visited[visiting][1] <= v1) {
                            flag1 = false;
                        }
                        else {
                            visited[visiting][1] = v1;
                            flag2 = false;
                        }
                        break;
                    }
                }
                if (flag1) {
                    listHandler.insertAtPosition(newNode[0], newNode[1], v1, v1, current);
                    listPath.insertAtPosition(newNode[0], newNode[1], v1, v1, current);
                    if (flag2) {
                        var line = [];
                        line.push(newNode);
                        line.push(v1);
                        visited.push(line);
                    }
                }
            }
        }
        return 'PATH NOT FOUND';
    }

    /// :: Greedy.
    greedy(start, end) {
        var listHandler = new NodeList();
        var listPath = new NodeList();
        var visited = [];
        var line = [];
        listHandler.insertAtEnd(start[0], start[1], 0, 0, null);
        listPath.insertAtEnd(start[0], start[1], 0, 0, null);
        line.push(start);
        line.push(0);
        visited.push(line);
        while (listHandler.isEmpty() !== null) {
            var current = listHandler.deleteAtBeginning();
            var coordinates = [];
            coordinates.push(current.x);
            coordinates.push(current.y);

            if (coordinates.toString() === end.toString()) {
                var path = listPath.displayPathByCoordinates(coordinates, current.cost);
                return [path.reverse(), current.cost];
            }
            var actions = this.successor(current.x, current.y);
            for (var action = 0; action < actions.length; action++) {
                var newNode = actions[action][0];
                var v2 = current.cost + actions[action][1];
                var v1 = this.heuristic(newNode, end);
                var flag1 = true;
                var flag2 = true;
                for (var visiting = 0; visiting < visited.length; visiting++) {
                    if (visited[visiting][0].toString() === newNode.toString()) {
                        if (visited[visiting][1] <= v1) {
                            flag1 = false;
                        }
                         else {
                            visited[visiting][1] = v1;
                            flag2 = false;
                        }
                        break;
                    }
                }
                if (flag1) {
                    listHandler.insertAtPosition(newNode[0], newNode[1], 0, v2, current);
                    listPath.insertAtPosition(newNode[0], newNode[1], 0, v2, current);
                    if (flag2) {
                        var line = [];
                        line.push(newNode);
                        line.push(v1);
                        visited.push(line);
                    }
                }
            }
        }
        return 'PATH NOT FOUND';
    }

    /// :: A Estrela.
    aStar(start, end) {
        var listHandler = new NodeList();
        var listPath = new NodeList();
        var visited = [];
        var line = [];
        listHandler.insertAtEnd(start[0], start[1], 0, 0, null);
        listPath.insertAtEnd(start[0], start[1], 0, 0, null);
        line.push(start);
        line.push(0);
        visited.push(line);
        while (listHandler.isEmpty() !== null) {
            var current = listHandler.deleteAtBeginning();
            var coordinates = [];
            coordinates.push(current.x);
            coordinates.push(current.y);
            if (coordinates.toString() === end.toString()) {
                var path = listPath.displayPathByCoordinates(coordinates, current.cost);
                return [path.reverse(), current.cost];
            }
            var actions = this.successor(current.x, current.y);
            for (var action = 0; action < actions.length; action++) {
                var newNode = actions[action][0];
                var v2 = current.level + actions[action][1];
                var v1 = v2 + this.heuristic(newNode, end);
                var flag1 = true;
                var flag2 = true;
                for (var visiting = 0; visiting < visited.length; visiting++) {
                    if (visited[visiting][0].toString() === newNode.toString()) {
                        if (visited[visiting][1] <= v1) {
                            flag1 = false;
                        }
                        else {
                            visited[visiting][1] = v1;
                            flag2 = false;
                        }
                        break;
                    }
                }
                if (flag1) {
                    listHandler.insertAtPosition(newNode[0], newNode[1], v2, v1, current);
                    listPath.insertAtPosition(newNode[0], newNode[1], v2, v1, current);
                    if (flag2) {
                        var line = [];
                        line.push(newNode);
                        line.push(v1);
                        visited.push(line);
                    }
                }
            }
        }
        return 'PATH NOT FOUND';
    }
}

/// :: Default game map.
let gameMap = [
    [1, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 0, 0, 0]
];