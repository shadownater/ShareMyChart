/**
 * Drag and Drop ui made from the Jquery UI library
 * Utilizes Draggable, Droppable, and Sortable types
 */


//hard-coded test data
var array_of_paramnames = ["Stocks", "Employee Salaries", "Sales", "Budget Spent", "Months", "Orders", "Fahjkshdas"];

/**
 * initializes the droppables for parameters
 */
$(document).ready(function initDragnDrop(event, ui){

    $('.dropMe').droppable({
        disabled: false,
        hoverClass: "drop-area",
        connectToSortable: '.sortable',
        drop: (function(ev, ui) {

            var id = $(ui.draggable).attr("id");
            var name = $(ui.draggable)[0].childNodes[0].nodeValue;

            $(ui.draggable).remove(); //remove the sortable, create a draggable on the droppable

            //create a draggable object to sit on top of the droppable, since the sortable can't do that
                newdiv = document.createElement('div');
                newdiv.setAttribute('id', id);
                newdiv.id = id
                newdiv.className = 'dragndropShape';
                createdDrags = document.createTextNode(name);
                newdiv.appendChild(createdDrags);

            $(newdiv).draggable({cancel:false,
                revert: "invalid",
                cursor: "move",
                stack: ".dragndropShape",
                hoverClass: "highlightBorder",
                connectToSortable: '.sortable'
                });

            $(this).append($(newdiv));
            $('newdiv').position({of: $(this), my: 'left top', at: 'left top'});

// Harrison Powers, Stack overflow: http://stackoverflow.com/users/2474735/harrison-powers
// http://stackoverflow.com/a/22211268
            //if there is already something in the droppable:
            if ( $(this).find(".dragndropShape").length > 1 ){
                replacedValue = $(this).find(".dragndropShape")[0];

// li is the old value getting sent back into the sortable
                var li = $("<li class='dragndropShape'/>").text(replacedValue.childNodes[0].nodeValue);
                li.id = replacedValue.id;
                $(replacedValue).remove();
                $(".sortable").append(li);
                $(".sortable").sortable('refresh');
            }

        })

    } );
});


/**
 * Create a sortable list from an array of parameters.
 * @param: String[]
 */
$(document).ready(function createDrags(array_of_params){
    /*
     Dynamically creating HTML elements using Javascript:
     KooiInc, Stack Overflow: http://stackoverflow.com/users/58186/kooiinc
     http://stackoverflow.com/a/5536711
     */

    array_of_params = array_of_paramnames; //change after we have file reading correct
    var list = document.createElement('ul');
    list.setAttribute("id","sortable");
    list.className = "sortable";

    var createdDrags = "";
    var newdiv;
    var insertLocation =document.getElementById('drag_parameters');
    for(i=0;i<array_of_params.length;i++){
        newdiv = document.createElement('li');   //create a li element
        newdiv.setAttribute('id',array_of_params[i]);
        newdiv.id = array_of_params[i];
        newdiv.className = 'dragndropShape';
        createdDrags = document.createTextNode(array_of_params[i]);
        newdiv.appendChild(createdDrags); //put text node into draggable
        list.appendChild(newdiv); //put draggable into the sortable list
    }

    $(list).insertAfter(insertLocation);
    $('.sortable').sortable({
         connectWith: '.dragndropShape',
         appendTo: 'body'
    });

});