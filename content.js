/**
*	Variables
*/

let jsessionId;

/**
*	Functions
*/

function findJsessionId() {
    var theCookies = document.cookie.split(';');
    for (var i = 1 ; i <= theCookies.length; i++) {
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
 

function fullyAnonymous(){	
	$.ajax({
		method: 'POST',
		url: "/psettings/profile-visibility",
		contentType: 'multipart/form-data; boundary=----WebKitFormBoundary',
		data: '------WebKitFormBoundary\r\nContent-Disposition: form-data; name="dataKey"\r\n\r\nprofileVisibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="el"\r\n\r\n#setting-profile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="settingsUrls"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="name"\r\n\r\nprofile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="locale"\r\n\r\nen_US\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="isNotCnDomain"\r\n\r\ntrue\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="headerData"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="path"\r\n\r\n/psettings/profile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="data"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="lixTests"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="pageTitle"\r\n\r\nProfile viewing\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="settingVisibility"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="device"\r\n\r\nDESKTOP\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="setting"\r\n\r\nprofile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="initialFetch"\r\n\r\ntrue\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="dataVal"\r\n\r\nDISCLOSE_FULL\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="hasSuccess"\r\n\r\nfalse\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="errors"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="discloseAsProfileViewer"\r\n\r\nHIDE\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="csrfToken"\r\n\r\n' + jsessionId + '\r\n------WebKitFormBoundary--\r\n',
		success: function(result){
			location.reload();
    	}
    });
	
	
}

function fullyVisible() {
	$.ajax({
		method: 'POST',
		url: "/psettings/profile-visibility",
		contentType: 'multipart/form-data; boundary=----WebKitFormBoundary',
		data: '------WebKitFormBoundary\r\nContent-Disposition: form-data; name="dataKey"\r\n\r\nprofileVisibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="el"\r\n\r\n#setting-profile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="settingsUrls"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="name"\r\n\r\nprofile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="dataVal"\r\n\r\nHIDE\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="locale"\r\n\r\nen_US\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="isNotCnDomain"\r\n\r\ntrue\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="headerData"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="path"\r\n\r\n/psettings/profile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="data"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="lixTests"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="pageTitle"\r\n\r\nProfile viewing\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="settingVisibility"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="device"\r\n\r\nDESKTOP\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="setting"\r\n\r\nprofile-visibility\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="initialFetch"\r\n\r\ntrue\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="hasSuccess"\r\n\r\nfalse\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="errors"\r\n\r\n[object Object]\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="discloseAsProfileViewer"\r\n\r\nDISCLOSE_FULL\r\n------WebKitFormBoundary\r\nContent-Disposition: form-data; name="csrfToken"\r\n\r\n' + jsessionId + '\r\n------WebKitFormBoundary--\r\n',
		success: function(result){
			location.reload();
    	}
    });
	
}

/**
* 	Build DOM
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

let anonymousButton = document.createElement('button');
anonymousButton.innerHTML = 'Anonymous';
anonymousButton.onclick = fullyAnonymous;
anonymousButton.className = 'button';
container.appendChild(anonymousButton);

let fullyVisibleButton = document.createElement('button');
fullyVisibleButton.innerHTML = 'Visible';
fullyVisibleButton.onclick = fullyVisible;
fullyVisibleButton.className = 'button';
container.appendChild(fullyVisibleButton);


document.body.appendChild(container);

/**
*	Main
*/

jsessionId = findJsessionId();
jsessionId = cleanupJsessionId(jsessionId);

console.log('LinkedIn Hider loaded');
