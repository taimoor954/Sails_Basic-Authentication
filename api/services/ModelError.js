module.exports = function(message, code) {
    var err = new Error();
    err.name = 'Validation';
    err.code = (code ? code : 400);
    err.invalidAttributes = {};
    err.message = message;

    return err;
};