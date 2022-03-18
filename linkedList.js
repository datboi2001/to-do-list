"use strict"
class Node {
    // constructor
    constructor(element) {
        this.element = element;
        this.next = null
    }

}
// linkedlist class
class LinkedList {
    constructor(key) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.key = key;
        
        let value = JSON.parse(localStorage.getItem(this.key));
        value = value === null ? []: value;
        // loop
        value.forEach(element => {
            this.add(element);
        })

    }

    toList(){
        const result = [];

        let head_copy = this.head;
        while (head_copy !== null){
            result.push(head_copy.element);
            head_copy = head_copy.next;
        }
        return result;
    }

    // adds an element at the end
    // of list
    add(element) {
        // creates a new node
        var node = new Node(element);

        // to store current node
        var current;
        if (!this.head){
            this.head = node;
            this.tail = this.head;
        }
        else{
            this.tail.next = node;
            this.tail = node;
        }
        
        this.size++;
        this.updateLocalStorage()   
    }


    updateLocalStorage(){
        localStorage.setItem(this.key, JSON.stringify(this.toList()));
    }
    pop(){
        if (!this.head){
            return undefined;
        }
        var current = this.head;
        var newTail = current.next;
        while(current.next){
            newTail = current.next;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.size--;
        if (this.size === 0){
            this.head = null;
            this.tail = null;
        }
        return current
    }

    shift(){
        if (!this.head){
            return undefined;
        }
        var currentHead = this.head;
        this.head = currentHead.next;
        this.size--;
        if (this.size === 0){
            this.tail = null;
        }
        return currentHead;
    }

    get(index){
        if (index < 0 || index >= this.size){
            return null;
        }
        var counter = 0;
        var current = this.head;
        while (counter !== index){
            current = current.next;
            counter++;
        }
        return current;
    }

    remove(index){
        if (index < 0 || index >= this.size){
            return undefined;
        }
        if (index === 0){
            return this.shift();
        }
        if (index === this.length - 1){
            return this.pop();
        }
        var previousNode = this.get(index -1);
        var removed = previousNode.next;
        previousNode.next = removed.next;
        this.size--;

        this.updateLocalStorage();

        return removed;

    }
    // checks the list for empty
    isEmpty() {
        return this.size == 0;
    }

    // gives the size of the list
    length() {
        return this.size;
    }


    // prints the list items
    printList() {
        var curr = this.head;
        var str = "";
        while (curr) {
            str += curr.element + " ";
            curr = curr.next;
        }
        return str;
    }

}