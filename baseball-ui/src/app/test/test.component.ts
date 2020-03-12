import { Component, OnInit } from '@angular/core';
// import { assert } from 'console';

interface Nodes {
    id: string;
    path: string;
    children?: Nodes[];
}

interface Morse {
    value: string;
    childLeft?: Morse;
    childRigth?: Morse;
}

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
        // let nodes: Nodes[] = [
        //   {
        //     id: '1',
        //     path: '/home',
        //   },
        //   {
        //     id: '2',
        //     path: '/users',
        //   },
        //   {
        //     id: '3',
        //     path: '/users/alice',
        //   },
        //   {
        //     id: '4',
        //     path: '/users/bob',
        //   },
        //   {
        //     id: '5',
        //     path: '/users/alice/posts',
        //   }
        // ];

        // let nodes: Nodes[] = [ {id: '42', path: "/a/b"}];
        // let nodes: Nodes[] = [
        //   { id: '42', path: "/a/b/c/d/e" },
        //   { id: '42', path: "/d" }
        // ];

        // nodes.sort((a, b) => {
        //     return (a.path > b.path) ? 1 : -1;

        // });

        // let pathTree = { path: '/', children: [] };

        // nodes.forEach(element => {
        //   this.createNode(pathTree, element, 1);
        // });

        // assert.deepEqual(this.possibilities('.-.'), ['R', 'N']);
    }

    public possibilities(signals: string) {
        const treeInt = ['start', 'E', 'T', 'I', 'A', 'N', 'M', 'S', 'U', 'R', 'W', 'D', 'K', 'G', 'O'];
        const result = this.decodeMorse(signals, 0, treeInt, 0).split('');
        return result;
    }

    dot(i) { return 2 * i + 1; }
    dash(i) { return 2 * i + 2; }
    parent(i) { return (i - 1) / 2; }

    decodeMorse(morseArray: string, positionMorse, tree: string[], positionTree: number) {
        let result = '';

        if (morseArray.length <= positionMorse + 1) {
            if (morseArray[positionMorse] === '.') {
                result += tree[this.dot(positionTree)];
            }
            if (morseArray[positionMorse] === '-') {
                result += tree[this.dash(positionTree)];
            }
            if (morseArray[positionMorse] === '?') {
                result +=
                    tree[this.dot(positionTree)] +
                    tree[this.dash(positionTree)];
            }
        }

        if (morseArray[positionMorse] === '.') {
            const actualNodeIndex = this.dot(positionTree);
            positionMorse++;
            result += this.decodeMorse(morseArray, positionMorse, tree, actualNodeIndex);
        }
        if (morseArray[positionMorse] === '-') {
            const actualNodeIndex = this.dash(positionTree);
            positionMorse++;
            result += this.decodeMorse(morseArray, positionMorse, tree, actualNodeIndex);
        }
        if (morseArray[positionMorse] === '?') {
            positionMorse++;

            const leftNode = this.dot(positionTree);
            result += this.decodeMorse(morseArray, positionMorse, tree, leftNode);
            const rightNode = this.dash(positionTree);
            result += this.decodeMorse(morseArray, positionMorse, tree, rightNode);
        }

        return result;
    }

    createNode(pathTree, nodeToInsert: Nodes, pathLevel: number) {
        // let result = (pathTree.children as Nodes[]).find(ele => nodeToInsert.path.includes(ele.path));
        const result = (pathTree.children as Nodes[]).find(ele => {
            return (nodeToInsert.path.split('/')[pathLevel] === ele.path.split('/')[pathLevel]);
        });

        if (result) {
            pathLevel++;
            this.createNode(result, nodeToInsert, pathLevel);
        } else {
            if (nodeToInsert.path.split('/').length > pathLevel + 1) {
                // let newPath = "/" + nodeToInsert.path.split('/')[pathLevel];

                const pathArray = nodeToInsert.path.split('/');
                let newPath = '';
                for (let index = 1; index <= pathLevel; index++) {
                    newPath += '/' + pathArray[index];
                }

                const newNode = { path: newPath, children: [] };

                pathTree.children.push(newNode);
                pathLevel++;
                this.createNode(newNode, nodeToInsert, pathLevel);
            } else {
                nodeToInsert.children = [];
                pathTree.children.push(nodeToInsert);
            }
        }
    }
}
