class Graph {
    constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    // add vertex to the graph
    addVertex(v)
    {
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);
    }

    // add edge to the graph
    addEdge(v, w)
    {
        // get the list for vertex v and put the
        // vertex w denoting edge betweeen v and w
        this.AdjList.get(v).push(w);

        // Since graph is undirected,
        // add an edge from w to w also
        this.AdjList.get(w).push(v);
    }

    // Prints the vertex and adjacency list
    printGraph()
    {
        // get all the vertices
        let get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (let i of get_keys)
        {
            // great the corresponding adjacency list
            // for the vertex
            let get_values = this.AdjList.get(i);
            let conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (let j of get_values)
                conc += j + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }
}

class Cell {
    constructor(tl, tr, br, bl, row, col, cw, ch){
        this.row = row;
        this.col = col;
        this.tl = tl;
        this.tr = tr;
        this.br = br;
        this.bl = bl;
        this.cw = cw;
        this.ch = ch;
        this.middle = {
            'x': tl.x + ((tr.x - tl.x) / 2),
            'y': tl.y + ((bl.y - tl.y) / 2)
        };
        this.visited = false;
        this.walls = [true, true, true, true];
        this.image = loadImage("../assets/whitehouse.png");
    }

    static copy(cell){
        let newCell = new Cell(
            cell.tl,
            cell.tr,
            cell.br,
            cell.bl,
            cell.row,
            cell.col,
            cell.cw,
            cell.ch
        );
        newCell.walls = cell.walls.slice();
        return newCell;
    }

    drawBorder(){
        // TODO draw whitehouse.png
        //fill("#a1010c");
        //rect(this.tl.x, this.tl.y, this.br.x, this.br.y);

        image(
            this.image,
            this.tl.x,
            this.tl.y,
            this.cw,
            this.ch
        );
    }
}

class Maze {

    constructor(game)
    {

        // find number of vertices based on game size;
        let optimal = game.mazeComplexity;
        let horzCells;
        let vertCells;
        if (game.width < game.height){
            let ratio = game.width / game.height;
            vertCells = optimal;
            horzCells = Math.floor(vertCells * ratio);
        } else {
            let ratio = game.height / game.width;
            horzCells = optimal;
            vertCells = Math.floor(horzCells * ratio);
        }
        let noOfVertices = (horzCells + 1) * (vertCells + 1);
        this.graph = new Graph(noOfVertices);

        // build cells & add vertices
        game.cellWidth = game.width / horzCells;
        game.cellHeight = game.height / vertCells;
        game.middle = {
            'x': Math.floor(horzCells / 2),
            'y': Math.floor(vertCells / 2)
        };
        this.cells = [];
        for (let row = 0; row < horzCells; row++){
            let column = [];
            for (let col = 0; col < vertCells; col++){
                let cw = game.cellWidth;
                let ch = game.cellHeight;
                let tl = {'x': row * cw, 'y': col * ch};
                let tr = {'x': row * cw + cw, 'y': col * ch};
                let br = {'x': row * cw + cw, 'y': col * ch + ch};
                let bl = {'x': row * cw, 'y': col * ch + ch};
                let newCell = new Cell(tl, tr, br, bl, row, col, cw, ch);
                this.graph.addVertex(newCell.tl);
                this.graph.addVertex(newCell.tr);
                this.graph.addVertex(newCell.br);
                this.graph.addVertex(newCell.bl);
                column.push(newCell);
            }
            this.cells.push(column);
        }


        this.addCellWalls();
        this.setEdges();
    }


    /*
        Recursive function that gives each cell a wall.
        The culmination of all cells and their walls
        makes a maze.
     */
    addCellWalls(){
        // set walls to cells to draw maze
        let stack = [];
        let current = this.cells[0][0];
        current.visited = true;
        while (current != null) {
            let next = this.checkNeighbors(current, this.cells);
            if (next) {
                next.visited = true;
                stack.push(current);
                this.removeWalls(current, next);
                current = next;
            } else if (stack.length > 0) {
                current = stack.pop();
            } else {
                current = null;
            }
        }
    }

    /*
        adds edges to the maze graph
        based on all cell walls
    */
    setEdges(){
        for (let row = 0; row < this.cells.length; row++){
            for (let col = 0; col < this.cells[0].length; col++){
                let curCell = this.cells[row][col];

                if (curCell.walls[0]){
                    this.graph.addEdge(curCell.tl, curCell.tr);
                }
                if (curCell.walls[1]){
                    this.graph.addEdge(curCell.tr, curCell.br);
                }
                if (curCell.walls[2]){
                    this.graph.addEdge(curCell.br, curCell.bl);
                }
                if (curCell.walls[3]){
                    this.graph.addEdge(curCell.bl, curCell.tl);
                }
            }
        }
    }

    draw()
    {
        let vertices = this.graph.AdjList.keys();
        stroke(255);
        strokeWeight(3);
        for (let vert of vertices){
            let edges = this.graph.AdjList.get(vert);
            for (let edge of edges){
                line(vert.x - game.camera.view.x,
                     vert.y - game.camera.view.y,
                     edge.x - game.camera.view.x,
                     edge.y - game.camera.view.y);
            }

            //point(vert.x - game.camera.view.x, vert.y - game.camera.view.y);
        }

        /*
             draw maze border
        */

        // top
        line(0 - game.camera.view.x,
             0 - game.camera.view.y,
             game.width - game.camera.view.x,
             0 - game.camera.view.y);

        // right
        line(game.width - game.camera.view.x,
             0 - game.camera.view.y,
             game.width - game.camera.view.x,
             game.height - game.camera.view.y);

        // bottom
        line(game.width - game.camera.view.x,
             game.height -game.camera.view.y,
             0 - game.camera.view.x,
             game.height - game.camera.view.y);

        // left
        line(0 - game.camera.view.x,
             game.height - game.camera.view.y,
             0 - game.camera.view.x,
             0 - game.camera.view.y);

    }

    checkNeighbors(cell, cells){
        let neighbors = [];
        let i = cell.row;
        let j = cell.col;

        let top;
        let right;
        let bottom;
        let left;
        if (cells[i] && cells[i][j - 1])
            top = cells[i][j - 1];
        if (cells[i + 1] && cells[i + 1][j])
            right = cells[i + 1][j];
        if (cells[i] && cells[i][j + 1])
            bottom = cells[i][j + 1];
        if (cells[i - 1] && cells[i - 1][j])
            left = cells[i - 1][j];

        if(top && !top.visited) {
            neighbors.push(top);
        }
        if(right && !right.visited) {
            neighbors.push(right);
        }
        if(bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if(left && !left.visited) {
            neighbors.push(left);
        }
        if (neighbors.length > 0) {
            let r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    removeWalls(a, b) {

        let x = a.row - b.row;
        if (x === 1) {
            a.walls[3] = false;
            b.walls[1] = false;
        } else if (x === -1) {
            a.walls[1] = false;
            b.walls[3] = false;
        }
        let y = a.col - b.col;
        if (y === 1) {
            a.walls[0] = false;
            b.walls[2] = false;
        } else if (y === -1) {
            a.walls[2] = false;
            b.walls[0] = false;
        }
    }
}