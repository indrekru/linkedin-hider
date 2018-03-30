/**
*   Variables
*/

let jsessionId = findJsessionId();
jsessionId = cleanupJsessionId(jsessionId);

let loader, anonymousButton, fullyVisibleButton;

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
    $.ajax({
        method: 'POST',
        url: "/psettings/profile-visibility",
        contentType: 'multipart/form-data; boundary=----WebKitFormBoundary',
        data: commandBodies[commandKey],
        success: function(result){
            location.reload();
        }
    });
}

function fullyAnonymous(){
    runCommand('anonymous');
}

function fullyVisible() {
    runCommand('full');
}

function defer(method) {
    if (window.$) {
        method();
    } else {
        setTimeout(function() { defer(method) }, 50);
    }
}

function showLoading() {
    $(loader).removeClass('hide');
    $(anonymousButton).addClass('hide');
    $(fullyVisibleButton).addClass('hide');
}

function showAnonymousButton() {
    $(loader).addClass('hide');
    $(anonymousButton).removeClass('hide');
    $(fullyVisibleButton).addClass('hide');
}

function showVisibleButton() {
    $(loader).addClass('hide');
    $(anonymousButton).addClass('hide');
    $(fullyVisibleButton).removeClass('hide');
}

function isVisible() {    
    $.ajax({
        method: 'GET',
        url: '/psettings/profile-visibility?asJson=true',
        success: function(result){
            let visibility = result.map.data.profileVisibility;
            if (visibility === 'DISCLOSE_FULL') {
                // Visible
                showAnonymousButton();
            } else {
                // Hidden
                showVisibleButton();
            }
        }
    });
}

/**
*   Build DOM
*/

let container = document.createElement('div');
container.id = 'linkedin_hider';

let logo = document.createElement('div');
logo.className = 'logo linkedin_logo';
container.appendChild(logo);

let hider = document.createElement('h4');
hider.innerHTML = 'Hider';
hider.className = 'hider';
container.appendChild(hider);

loader = document.createElement('p');
loader.innerHTML = 'Loading...'
loader.className = 'm-t-3 m-b-3 text-center';
container.appendChild(loader);

anonymousButton = document.createElement('button');
anonymousButton.innerHTML = 'Make me anonymous';
anonymousButton.onclick = fullyAnonymous;
anonymousButton.className = 'button m-t-2 m-b-2 hide';
container.appendChild(anonymousButton);

fullyVisibleButton = document.createElement('button');
fullyVisibleButton.innerHTML = 'Make me visible';
fullyVisibleButton.onclick = fullyVisible;
fullyVisibleButton.className = 'button m-t-2 m-b-2 hide';
container.appendChild(fullyVisibleButton);

document.body.appendChild(container);


/**
*   Main
*/

defer(function () {
    isVisible();
    console.log('LinkedIn Hider loaded');
});
