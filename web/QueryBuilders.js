/**
 * Created by landon on 17/11/16.
 */


/**
 * Out of date Function
 * Builds a Query bases off the size of the GlobalLink array. It will fill in all the links between uri1 and uri2
 * @param {string} uri1 - used for the first uri in the query.
 * @param {string} uri2 - used for the second uri in the query.
 * @param [Array, Array] link_path
 * @return {string} - completed query to be used in sparql that connects all the links
 */
function QueryBuilderData_old(uri1, uri2, link_path){

    var X = link_path[0].uri;
    var Y = link_path[link_path.length-1].uri;

    if(link_path.length == 3) {
        string1 = SpecialCase(X,Y,link_path);
    }else {
        var string1 = 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                   PREFIX : <http://example.org/>\
                   select ?subject1 ?data1 ?subject2 ?data2 FROM NAMED :rdfGraph {GRAPH ?g { \
                   ?subject1 <' + X + '> ?data1.\
                   ?subject1 <' + link_path[2].uri + '> ?link3.  ';
        for (var i = 3; i < link_path.length - 1; i++) {
            //console.log("i%2: " + (i % 2));
            if ((i % 2) == 1) {
                string1 += '?link' + (i - 2) + ' <' + link_path[i - 1].uri + '> ?link' + i + '.';
            }
        }

        string1 += '?link' + (i - 1) + ' <' + Y + '> ?data2.\ ' +
            ' ?subject2 <' + Y + '> ?data2. }}';

        //console.log(string1);
    }
    //console.log(string1);
    return string1;
}

/**
 * Takes a list of uri's of the format: [ParameterX, TypeX, link1, Type2, link2,...., TypeY, ParameterY] in path[0]
 * path[1] needs to be a parallel list of poitions, 1 and 2. The list is generated in the Make graph
 * function during backtracking
 *
 * The function Takes this list of nested arrays and creates a dynamic query that will retrive the data for the given path.
 *
 * @param uri1 - unsed Parameter lol
 * @param uri2 - I dont use this one either
 * @param [Array, Array] path - a list of all the nodes and edges along the path
 * @return {string}
 */
function QueryBuilderData(uri1, uri2, path){
    var link_path = path[0];

    var X = link_path[0];
    var Y = link_path[link_path.length-1];

    if(link_path.length == 3) {
        string1 = SpecialCase(X,Y,link_path);
    }else {
        var position = path[1];

        var string1 = 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                   PREFIX : <http://example.org/>\
                   select  ?data1  ?data2 FROM NAMED :rdfGraph {GRAPH ?g { \
                   ?link1 <' + X + '> ?data1.  ';
        for (var i = 3; i < link_path.length - 1; i++) {
            console.log("i%2: " + (i % 2));
            if ((i % 2) == 1) {
                if(position[i]==2) {
                    string1 += '?link' + (i - 2) + ' <' + link_path[i - 1] + '> ?link' + i + '.';
                }else{
                    string1 += '?link' + i + ' <' + link_path[i - 1] + '> ?link' + (i-2) + '.';
                }
            }
        }

        string1 += '?link' + (i - 1) + ' <' + Y + '> ?data2.}}';
    }
    console.log(string1);
    return string1;
}

/**
 * Out of Date function, no longer used
 *
 *Creates a query to get the links given two uris and a the distance to search for. checks only the exact distance not up to the distance
 * entered.
 * @param uri1
 * @param uri2
 * @param link_distance
 * @return {string} returns the query as a string
 */
function QueryBuilderLink(uri1, uri2, link_distance){

    if(uri1 === uri2){
        query = SpecialCase();
    }else {
        var query = 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                PREFIX : <http://example.org/>\
                SELECT DISTINCT ?link1 ';
        //add the select statment based on the link_distance:
        for (var i = 1; i < link_distance; i++) {
            query += '?MidType' + i + ' ';
            query += '?link' + (i + 1) + ' ';
        }
        query += 'FROM NAMED :rdfGraph { GRAPH ?g { ';

        //Add triple for each list length
        for (var x = 1; x <= link_distance; x++) {
            if (x >= link_distance) {
                query += '?x' + x + ' ?link' + x + ' ?y .';
                query += '?y rdf:type <' + uri2 + '>. '
            } else {
                query += '?x' + x + ' ?link' + x + ' ?x' + (x + 1) + '. ';
            }
            if (x == 1) {
                query += '?x1 rdf:type <' + uri1 + '>. ';
            } else {
                query += '?x' + x + ' rdf:type ?MidType' + (x - 1) + '. ';
            }
        }
        query += '} }';
    }
    return query;
}

/**
 * This functon takes a list path that must be of length 3. the path needs to be of format [parameterX, type, parameterY]
 * it is an edge case when both parameters have the same type
 * @param X: uri of parameter X
 * @param Y: uri of parameter Y
 * @param link_path: format
 * @return {string}: a query to be executed
 */
function SpecialCase(X, Y, link_path){
    //console.log("special:");
    //console.log(X+"-----"+Y);
    //console.log(link_path);
    var string = 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                   PREFIX : <http://example.org/>\
                   select ?subject1 ?data1 ?data2 FROM NAMED :rdfGraph {GRAPH ?g { \
                   ?subject1 rdf:type <' + link_path[1] + '>;\
                    <' + X + '> ?data1;\
                    <' + Y + '> ?data2.\
                   }}';
    return string;
}