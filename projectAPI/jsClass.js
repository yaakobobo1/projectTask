KEYS_NAMES = ['pictureLink','name', 'email','gender','age'];
MIN_USERS_AT_START=10;


$(document).ready(function () {
    loadFromLocalStorage();
    for (i=localStorage.length;i<MIN_USERS_AT_START;i++) {
        getUser();
    }
    $("#getUser").click(getUser);

});

function loadFromLocalStorage(){
    for (i=0; i< localStorage.length;i++){
        var userId= localStorage.key(i);
        var user = JSON.parse(localStorage.getItem(userId));
        generateSimpleDivs('results', 'User', user, KEYS_NAMES);
    }
}

function getUser() {
    getData("https://randomuser.me/api")
}

function getData(url) {
    const ajaxParameters = {}
    ajaxParameters.url = url
    ajaxParameters.success = handleResult
    ajaxParameters.type = 'GET'
    ajaxParameters.error = handleError
    $.ajax(ajaxParameters)
}
function handleResult(result, status, xhr) {
    var userData=result.results[0];
    var userFullName='';
    for (item in userData.name) {
        userFullName += userData.name[item] + ' ' ;
    }
    var user = {
        id : userData.login.uuid.replace(/\s*\W*/g, ''),
        age : userData.dob.age,
        email : userData.email,
        name : userFullName,
        gender:userData.gender,
        pictureLink: userData.picture.thumbnail 
    }
    localStorage.setItem(user.id,JSON.stringify(user));
    generateSimpleDivs('results', 'User', user, KEYS_NAMES);

}

function handleError(xhr, status, error) {
    $('#results').append('<h1> No users to show !<h1>');
}

function changeToKeysNames(columnNames) {
    return columnNames.map(name => {
        key = name.replace(/\s/g, '');
        return key.charAt(0).toLowerCase() + key.slice(1);
    });
}


function generateSimpleDivs(elementIdWhereToGenerateTheDiv, className, user, keysNames) {
    var divId = user.id + className;
    var localUser=user;
    $('#' + elementIdWhereToGenerateTheDiv).append('<div id=\'' + divId +'\' class=\'' + className + '\'></div>');
    let valueToPutIn='';
    keysNames.forEach(key => {
        switch(key) {
            case 'pictureLink':
                valueToPutIn += '<img src=\"' + user[key] + '\"><br>';
                break;
            default:
                valueToPutIn += '<p>'+ key + ':';
                valueToPutIn += '<span id=\''+key+divId+'\'>'+ user[key] +'</span>';
                valueToPutIn += '</p>';
        }
    });
    valueToPutIn += '<button id=deleteButton' + divId + '> Delete </button>';
    valueToPutIn += '<button id=editButton' + divId + '> Edit </button>';
    valueToPutIn += '<button id=saveButton' + divId + ' class=\'saveButton\'> Save </button>';
    valueToPutIn += '<button id=cancelButton' + divId + ' class=\'cancelButton\'> Cancel </button>';
    
    var toGenerate = '<div class=\'user-info\'>' + valueToPutIn + '</div>';
    $('#' + divId).append(toGenerate);
    
    $("#deleteButton" + divId).click(function() {
        console.log(">>>>>>>>",localUser.id);
        localStorage.removeItem(localUser.id);   
        $("#"+divId).remove();
    });

    $("#editButton" + divId).click(function() {
        $("#deleteButton" + divId).hide();
        $("#editButton" + divId).hide();
        $("#saveButton"+divId).show();
        $("#cancelButton"+divId).show();
        var nameContent = $("#name"+divId).html();
        var emailContent = $("#email"+divId).html();
        $("#name"+divId).html('<textarea id=\'nameTextArea' +divId+'\'>' + nameContent + '</textarea>');
        $("#email"+divId).html('<textarea id=\'emailTextArea' +divId+'\'>' + emailContent + '</textarea>');
    });

    $("#saveButton" + divId).click(function() {
        var newName = $("#nameTextArea"+divId).val();
        var newEmail = $("#emailTextArea"+divId).val();
        
        var userToChange = JSON.parse(localStorage.getItem(localUser.id))
        userToChange.name=newName;
        userToChange.email=newEmail;
        localStorage.setItem(userToChange.id,JSON.stringify(userToChange));
        $("#name"+divId).html(newName);
        $("#email"+divId).html(newEmail);
        backToMainButtons(divId);

    });

    $("#cancelButton" + divId).click(function() {
        
        var userToChange = JSON.parse(localStorage.getItem(localUser.id))
        var oldName = userToChange.name
        var oldEmail = userToChange.email
        $("#name"+divId).html(oldName);
        $("#email"+divId).html(oldEmail);
        backToMainButtons(divId);

    });

    function backToMainButtons(divId){
        $("#deleteButton" + divId).show();
        $("#editButton" + divId).show();
        $("#saveButton"+divId).hide();
        $("#cancelButton"+divId).hide();
    }

}
