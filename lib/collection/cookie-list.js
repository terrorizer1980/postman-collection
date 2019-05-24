const _ = require('../util').lodash,
    PropertyList = require('./property-list').PropertyList,
    Cookie = require('./cookie').Cookie;

class CookieList extends PropertyList {
    /**
     * @param {Object} parent
     * @param {Object[]} cookies
     * @extends {PropertyList}
     */
    constructor (parent, cookies) {
        // this constructor is intended to inherit and as such the super constructor is required to be executed
        super(Cookie, parent, cookies);
    }

    /**
     * Checks if the given object is a CookieList
     *
     * @param {*} obj
     * @returns {Boolean}
     */
    static isCookieList (obj) {
        return Boolean(obj) && ((obj instanceof CookieList) ||
            _.inSuperChain(obj.constructor, '_postman_propertyName', CookieList._postman_propertyName));
    }
}

/**
 * Defines the name of this property for internal use.
 * @private
 * @readOnly
 * @type {String}
 */
CookieList._postman_propertyName = 'CookieList';

module.exports = {
    CookieList: CookieList
};
