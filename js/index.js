var SitesCountianr = [];

var SiteNameInput = document.getElementById("SiteNameInput");
var SiteURLInput = document.getElementById("SiteURLInput");

var siteUlrRegex =
  /^[(http(s)?):\/\/(www\.)a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
var siteuNameRegex = /^[\w]{3,}$/;

var dialogbtn = document.getElementById("dialogbtn")


if (localStorage.getItem("sites") != null) {
  SitesCountianr = JSON.parse(localStorage.getItem("sites"));
  displaysite();
}

function AddSite() {
  var SiteName = SiteNameInput.value;
  var SiteURL = SiteURLInput.value;

  if (siteuNameRegex.test(SiteName) && siteUlrRegex.test(SiteURL) ) {
    var site = {
        name: SiteName,
        url: SiteURL,
      };
    
      SitesCountianr.push(site);
    
      localStorage.setItem("sites", JSON.stringify(SitesCountianr));
      displaysite();
      clearinputs();  
  }
  else{
    dialogbtn.showModal();
  }

 
}

function displaysite() {
  var sitepath = "";
  for (let i = 0; i < SitesCountianr.length; i++) {
    sitepath += `<tr>
            <td>${i + 1}</td>
            <td>${SitesCountianr[i].name}</td>
            <td>
            <button class="btn btn-visit" onclick="visitSite(${i}) " >
                <i class="fa-solid fa-eye"></i> Visit
            </button>
            </td>
            <td>
            <button class="btn btn-delete" onclick="deletesite(${i})">
                <i class="fa-solid fa-eraser"></i> Delete
            </button>
            </td>
    </tr>
        `;
  }

  document.getElementById("tBody").innerHTML = sitepath;
}
function clearinputs() {
  SiteNameInput.value = "";
  SiteURLInput.value = "";
 
}

function deletesite(deleteindex) {
  SitesCountianr.splice(deleteindex, 1);
  localStorage.setItem("sites", JSON.stringify(SitesCountianr));
  displaysite();
}

function visitSite(siteurl) {
  window.open(SitesCountianr[siteurl].url);
}

function ValidateSiteName() {
    if (siteuNameRegex.test(SiteNameInput.value)) 
    {
        SiteNameInput.classList.add("is-valid")
        SiteNameInput.classList.remove("is-invalid")
    }
    else{
        SiteNameInput.classList.add("is-invalid")
        SiteNameInput.classList.remove("is-valid")
    }
    
}

function ValidateSiteUrl() {
    if (siteUlrRegex.test(SiteURLInput.value)) 
    {
        SiteURLInput.classList.add("is-valid")
        SiteURLInput.classList.remove("is-invalid")
    }
    else{
        SiteURLInput.classList.add("is-invalid")
        SiteURLInput.classList.remove("is-valid")
    }
}
function closedialog() {
    dialogbtn.close();
}