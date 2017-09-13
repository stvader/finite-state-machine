class FSM { 
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.state = this.config.initial;
        this.statesHistory = [this.state];
        this.currentHistoruNum = this.statesHistory.length - 1;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {        
        this.state = state;
        this.statesHistory.push(this.state);
        this.currentHistoruNum = this.statesHistory.length - 1;//
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.state = this.config.states[this.state].transitions[event];
        this.statesHistory.push(this.state);
        this.currentHistoruNum = this.statesHistory.length - 1;//
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let statesArr = [];
        let statesAll = this.config.states;
        if (event) {
            Object.keys(statesAll).forEach(function(key) {
                if (statesAll[key].transitions.hasOwnProperty(event)) {
                   statesArr.push(key); 
                }
            });
        } else {
            statesArr = Object.keys(statesAll);
        }
        return statesArr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        //let histLength = this.statesHistory.length;
        //let prevStateNum = histLength - 2;
        this.currentHistoruNum -= 1;
        //if (histLength <= 1) return false;
        //if (prevStateNum <= 2) return false;
        if (this.currentHistoruNum <= 0) {
            this.currentHistoruNum += 1;
            return false;
        };  
        this.state = this.statesHistory[this.currentHistoruNum];
        //this.statesHistory.pop();
        return true;        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
