/**
*   Variables
*/

let jsessionId = findJsessionId();
jsessionId = cleanupJsessionId(jsessionId);

let loader, anonymousButton, fullyVisibleButton;

let defaultClassNames = {
    'loader' : 'm-t-3 m-b-2 text-center',
    'anonymousButton' : 'button m-t-2',
    'fullyVisibleButton' : 'button m-t-2'
};

let commandBodies = {
    'anonymous' : '------WebKitFormBoundary\r\nContent-Disposition: form-data; name="dataKey"\r\n\r\nprofileVisibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="el"\r\n\r\n#setting-profile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="settingsUrls"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="name"\r\n\r\nprofile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="locale"\r\n\r\nen_US\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="isNotCnDomain"\r\n\r\ntrue\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="headerData"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="path"\r\n\r\n/psettings/profile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="data"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="lixTests"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="pageTitle"\r\n\r\nProfile viewing\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="settingVisibility"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="device"\r\n\r\nDESKTOP\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="setting"\r\n\r\nprofile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="initialFetch"\r\n\r\ntrue\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="dataVal"\r\n\r\nDISCLOSE_FULL\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="hasSuccess"\r\n\r\nfalse\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="errors"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="discloseAsProfileViewer"\r\n\r\nHIDE\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="csrfToken"\r\n\r\n' + jsessionId + '\r\n------WebKitFormBoundary--\r\n',
    'full' : '------WebKitFormBoundary\r\nContent-Disposition: form-data; name="dataKey"\r\n\r\nprofileVisibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="el"\r\n\r\n#setting-profile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="settingsUrls"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="name"\r\n\r\nprofile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="dataVal"\r\n\r\nHIDE\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="locale"\r\n\r\nen_US\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="isNotCnDomain"\r\n\r\ntrue\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="headerData"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="path"\r\n\r\n/psettings/profile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="data"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="lixTests"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="pageTitle"\r\n\r\nProfile viewing\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="settingVisibility"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="device"\r\n\r\nDESKTOP\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="setting"\r\n\r\nprofile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="initialFetch"\r\n\r\ntrue\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="hasSuccess"\r\n\r\nfalse\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="errors"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="discloseAsProfileViewer"\r\n\r\nDISCLOSE_FULL\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="csrfToken"\r\n\r\n' + jsessionId + '\r\n------WebKitFormBoundary--\r\n'
};

/**
*   Functions
*/

function findJsessionId() {
    let theCookies = document.cookie.split(';');
    for (let i = 1 ; i <= theCookies.length; i++) {
        let cookieStr = theCookies[i-1].trim();
        let cookieParts = cookieStr.split('=');
        if (cookieParts[0].indexOf('JSESSIONID') > -1) {
        	return cookieParts[1];
        }
    }
    return '';
}

function cleanupJsessionId(jsessionId) {
    return jsessionId.substring(1, jsessionId.length - 1);
}

function runCommand(commandKey) {
    showLoading();
    http('POST', '/psettings/profile-visibility', commandBodies[commandKey], {
        'Content-Type' : 'multipart/form-data; boundary=----WebKitFormBoundary',
        'x-requested-with' : 'XMLHttpRequest'
    }, function(rawResponse) {
        location.reload();
    });
}

function http(method, url, requestBody, headers, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open(method, url, true); // true for asynchronous
    for (headerKey in headers) {
        xmlHttp.setRequestHeader(headerKey, headers[headerKey]);   
    }
    xmlHttp.send(requestBody);
}

function fullyAnonymous(){
    runCommand('anonymous');
}

function fullyVisible() {
    runCommand('full');
}

function showLoading() {
    loader.className = defaultClassNames['loader'];
    anonymousButton.className = defaultClassNames['anonymousButton'] + ' hide';
    fullyVisibleButton.className = defaultClassNames['fullyVisibleButton'] + ' hide';
}

function showAnonymousButton() {
    loader.className = defaultClassNames['loader'] + ' hide';
    anonymousButton.className = defaultClassNames['anonymousButton'];
    fullyVisibleButton.className = defaultClassNames['fullyVisibleButton'] + ' hide';
}

function showVisibleButton() {
    loader.className = defaultClassNames['loader'] + ' hide';
    anonymousButton.className = defaultClassNames['anonymousButton'] + ' hide';
    fullyVisibleButton.className = defaultClassNames['fullyVisibleButton'];
}

function isVisible(callback) {
    http('GET', '/psettings/profile-visibility?asJson=true', null, {}, function(rawResponse) {
        let result = JSON.parse(rawResponse);
        let visibility = result.map.data.profileVisibility;
        if (visibility === 'DISCLOSE_FULL') {
            // Visible
            callback(true);
        } else {
            // Hidden
            callback(false);
        }
    });
}

function init() {
    isVisible(function(isVisible) {
        if (isVisible) {
            showAnonymousButton();
        } else {
            showVisibleButton();
        }
    });
}

/**
*   Build DOM
*/

let container = document.createElement('div');
container.id = 'linkedin_hider';
container.className = 'p-2 border-gray';

let logo = document.createElement('div');
logo.className = 'logo linkedin_logo';
container.appendChild(logo);

let hider = document.createElement('h4');
hider.innerHTML = 'Hider';
hider.className = 'text-right color-gray';
container.appendChild(hider);

loader = document.createElement('p');
loader.innerHTML = 'Loading...'
loader.className = defaultClassNames['loader'];
container.appendChild(loader);

anonymousButton = document.createElement('button');
anonymousButton.innerHTML = 'Make me anonymous';
anonymousButton.onclick = fullyAnonymous;
anonymousButton.className = defaultClassNames['anonymousButton'] + ' hide';
container.appendChild(anonymousButton);

fullyVisibleButton = document.createElement('button');
fullyVisibleButton.innerHTML = 'Make me visible';
fullyVisibleButton.onclick = fullyVisible;
fullyVisibleButton.className = defaultClassNames['fullyVisibleButton'] + ' hide';
container.appendChild(fullyVisibleButton);

document.body.appendChild(container);


/**
*   Main
*/

init();
console.log('LinkedIn Hider loaded');
