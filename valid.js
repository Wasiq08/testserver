/**
 * Created by Wasiq on 6/7/2016.
 */
exports.iso8601 = function(value){
    var datePattern = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    return (datePattern.test(value));

}

exports.isNull = function(str){

    if(str === undefined)
        return true;
    else if(str == null)
        return true;
    else if(str.length === 0)
        return true;
    else
        return false;
}
