const _ = require('../util').lodash,
    PropertyList = require('./property-list').PropertyList,
    Header = require('./header').Header,

    E = '',
    CRLF = '\r\n',
    PROP_NAME = '_postman_propertyName';

class HeaderList extends PropertyList {
    /**
     * Contains a list of header elements
     *
     * @param {Object} parent
     * @param {Header[]} headers
     * @extends {PropertyList}
     */
    constructor (parent, headers) {
        // this constructor is intended to inherit and as such the super constructor is required to be executed
        super(Header, parent, headers);
    }

    /**
     * Gets size of a list of headers excluding standard header prefix.
     *
     * @returns {Number}
     */
    contentSize () {
        if (!this.count()) { return 0; }

        var raw = this.reduce(function (acc, header) {
            // unparse header only if it has a valid key and is not disabled
            if (header && !header.disabled) {
                // *( header-field CRLF )
                acc += Header.unparseSingle(header) + CRLF;
            }

            return acc;
        }, E);

        return raw.length;
    }

    /**
     * Checks if the given object is a HeaderList
     *
     * @param {*} obj
     * @returns {Boolean}
     */
    static isHeaderList (obj) {
        return Boolean(obj) && ((obj instanceof HeaderList) ||
          _.inSuperChain(obj.constructor, PROP_NAME, HeaderList._postman_propertyName));
    }
}

/**
 * Defines the name of this property for internal use.
 * @private
 * @readOnly
 * @type {String}
 */
HeaderList._postman_propertyName = 'HeaderList';

module.exports = {
    HeaderList: HeaderList
};
