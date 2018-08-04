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
        var get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (var i of get_keys)
        {
            // great the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }
}

class Maze {

    constructor(game)
    {

        // find number of vertices based on game size;
        let optimal = 21;
        let horzDots;
        let vertDots;
        if (game.width < game.height){
            let ratio = game.width / game.height;
            vertDots = optimal;
            horzDots = Math.floor(vertDots * ratio);
        } else {
            let ratio = game.height / game.width;
            horzDots = optimal;
            vertDots = Math.floor(horzDots * ratio);
        }

        let noOfVertices = horzDots * vertDots;
        this.graph = new Graph(noOfVertices);

        // add vertices to graph
        let vertPathWidth = game.height / vertDots;
        let horzPathWidth = game.width / horzDots;
        let vertices = [];
        for (let x = 0; x <= game.width; x += horzPathWidth){
            let col = [];
            for (let y = 0; y <= game.height; y += vertPathWidth){
                let vert = {'x': x, 'y': y};
                this.graph.addVertex(vert);
                col.push(vert);
            }
            vertices.push(col);
        }
        game.pathSize = (vertPathWidth > horzPathWidth) ? vertPathWidth:horzPathWidth;

        // add edges to graph
        let switcher = true;
        for (let col = 0; col < vertices.length; col++){
            switcher = !switcher;
            for (let row = 0; row < vertices[col].length; row++){
                if (switcher) {
                    let above = null;
                    let left = null;
                    let right = null;
                    let below = null;
                    if (vertices[col] && vertices[col][row - 1])
                        above = vertices[col][row - 1];
                    if (vertices[col - 1] && vertices[col - 1][row])
                        left = vertices[col - 1][row];
                    if (vertices[col + 1] && vertices[col + 1][row])
                        right = vertices[col + 1][row];
                    if (vertices[col] && vertices[col][row + 1])
                        below = vertices[col][row + 1];

                    let around = [above, left, right, below];
                    let vert;

                    // set first line
                    do {
                        let rand = Math.floor(Math.random() * 4);
                        vert = around[rand];
                    } while (vert === null);

                    let nextVert;
                    do {
                        let rand = Math.floor(Math.random() * 4);
                        nextVert = around[rand];
                    } while (nextVert === null || nextVert === vert);

                    this.graph.addEdge(vertices[col][row], vert);
                    this.graph.addEdge(vertices[col][row], nextVert);
                }
                switcher = !switcher;
            }
        }
        let vert = { 'x': vertices[1][2].x + 5, 'y': vertices[1][2].y };
        this.graph.addVertex(vert);
    }

    drawVertices(){
        let vertices = this.graph.AdjList.keys();
        for (let vert of vertices){
            stroke(255);
            point(vert.x + game.camera.view.x, vert.y + game.camera.view.y);
        }
    }

    draw()
    {
        let vertices = this.graph.AdjList.keys();
        stroke(255);
        for (let vert of vertices){
            let edges = this.graph.AdjList.get(vert);
            for (let edge of edges){
                line(vert.x + game.camera.view.x,
                     vert.y + game.camera.view.y,
                     edge.x + game.camera.view.x,
                     edge.y + game.camera.view.y);
            }

            //point(vert.x + game.camera.view.x, vert.y + game.camera.view.y);
        }

        /*
             draw maze border
        */

        // top
        line(0 + game.camera.view.x,
             0 + game.camera.view.y,
             game.width + game.camera.view.x,
             0 + game.camera.view.y);

        // right
        line(game.width + game.camera.view.x,
             0 + game.camera.view.y,
             game.width + game.camera.view.x,
             game.height + game.camera.view.y);

        // bottom
        line(game.width + game.camera.view.x,
             game.height + game.camera.view.y,
             0 + game.camera.view.x,
             game.height + game.camera.view.y);

        // left
        line(0 + game.camera.view.x,
             game.height + game.camera.view.y,
             0 + game.camera.view.x,
             0 + game.camera.view.y);

    }
}