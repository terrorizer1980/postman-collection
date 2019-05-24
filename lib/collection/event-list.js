const _ = require('../util').lodash,
    PropertyList = require('./property-list').PropertyList,
    Event = require('./event').Event;

class EventList extends PropertyList {
    /**
     * A type of {@link PropertyList}, EventList handles resolving events from parents. If an {@link ItemGroup} contains
     * a set of events, each {@link Item} in that group will inherit those events from its parent, and so on.
     *
     * @param {Object} parent
     * @param {Object[]} populate
     * @extends {PropertyList}
     *
     * This is useful when we need to have a common test across all requests.
     */
    constructor (parent, populate) {
        // this constructor is intended to inherit and as such the super constructor is required to be executed
        super(Event, parent, populate);
    }

    /**
     * Returns an array of listeners filtered by the listener name
     *
     * @note
     * If one needs to access disabled events, use {@link PropertyList#all} or
     * any other similar {@link PropertyList} method.
     *
     * @param {String} name
     * @returns {Array<Event>}
     */
    listeners (name) {
        var all;

        // we first procure all matching events from this list
        all = this.listenersOwn(name);

        this.eachParent((parent) => {
            var parentEvents;

            // we check that the parent is not immediate mother. then we check whether the non immediate mother has a
            // valid `events` store and only if this store has events with specified listener, we push them to the
            // array we are compiling for return
            (parent !== this.__parent) && EventList.isEventList(parent.events) &&
                (parentEvents = parent.events.listenersOwn(name)) && parentEvents.length &&
                all.unshift.apply(all, parentEvents); // eslint-disable-line prefer-spread
        });

        return all;
    }

    /**
     * Returns all events with specific listeners only within this list. Refer to {@link EventList#listeners} for
     * procuring all inherited events
     *
     * @param {string} name
     * @returns {Array<Event>}
     */
    listenersOwn (name) {
        return this.filter(function (event) {
            return (!event.disabled && event.listen === name);
        });
    }

    /**
     * Checks if the given object is an EventList.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    static isEventList (obj) {
        return Boolean(obj) && ((obj instanceof EventList) ||
            _.inSuperChain(obj.constructor, '_postman_propertyName', EventList._postman_propertyName));
    }
}

/**
 * Defines the name of this property for internal use.
 * @private
 * @readOnly
 * @type {String}
 */
EventList._postman_propertyName = 'EventList';

module.exports = {
    EventList: EventList
};
