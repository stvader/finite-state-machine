class FSM { 
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.statesHistory = [this.config.initial];
        this.currentHistoryNum = this.statesHistory.length - 1;
        this.state = this.statesHistory[this.currentHistoryNum];        
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
        if (!this.config.states.hasOwnProperty(state)) throw new Error;
        if (this.currentHistoryNum !== this.statesHistory.length - 1) {
           this.statesHistory = this.statesHistory.slice(0, this.currentHistoryNum+1);
        }
        this.statesHistory.push(state);
        this.currentHistoryNum = this.statesHistory.length - 1;
        this.state = this.statesHistory[this.currentHistoryNum];             
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this.config.states[this.state].transitions.hasOwnProperty(event)) throw new Error;
        if (this.currentHistoryNum !== this.statesHistory.length - 1) {
           this.statesHistory = this.statesHistory.slice(0, this.currentHistoryNum+1);
        }
        this.state = this.config.states[this.state].transitions[event];
        this.statesHistory.push(this.state);
        this.currentHistoryNum = this.statesHistory.length - 1;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {        
        this.currentHistoryNum = 0;
        this.state = this.statesHistory[this.currentHistoryNum];        
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
        if (this.currentHistoryNum === 0) return false;
        this.currentHistoryNum = this.currentHistoryNum - 1;
        this.state = this.statesHistory[this.currentHistoryNum];      
        return true;        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.statesHistory.length === 1 
            || this.currentHistoryNum === this.statesHistory.length - 1) return false;
        this.currentHistoryNum = this.currentHistoryNum + 1;
        this.state = this.statesHistory[this.currentHistoryNum];      
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.statesHistory = [this.config.initial];
        this.currentHistoryNum = this.statesHistory.length - 1;
        this.state = this.statesHistory[this.currentHistoryNum];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
