var keyword, url, httpRequest, jsonResponse
var searchResult, description, wikiLink
var subdiv, maindiv
var para, link, head
var paraNode, linkNode, headNode
var i 

var keyword = ""
/* searchable keyword to be sent to Wikipedia to get content/result */

function construct() {
    if (keyword == "") {
        keyword = document.getElementById("srchStr").value

    } else {
        document.getElementById("display").innerHTML = ""
        /* if keyword is not empty (meaning there exists a previous search), set it to empty */
        keyword = document.getElementById("srchStr").value
    }

    url = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + keyword + "&limit=10&format=json"

    makeRequest()
}

function makeRequest() {
    httpRequest = new XMLHttpRequest()
    httpRequest.open("GET", url, true)
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            jsonResponse = JSON.parse(httpRequest.responseText)
            breakDown()
        }
    }
    httpRequest.send()

}

function breakDown() {
    searchResult = jsonResponse[1]
    description = jsonResponse[2]
    wikiLink = jsonResponse[3]
    please ()
}

function please() {
    maindiv = document.createElement("div")
    maindiv.setAttribute("class", "result-box") 


    for (i=0; i<9; i++) {
        sub = createSection(searchResult[i], description[i], wikiLink[i])
        /* see function below */
        maindiv.appendChild(sub)

    }

    document.getElementById("display").appendChild(maindiv)
    console.log(maindiv)
}

function createSection(search_result, desc, wiki_link) {

    subdiv = document.createElement("div")

    para = document.createElement("div")
    link = document.createElement("a")
    link.setAttribute('href', wiki_link);
    head = document.createElement("h3")

    paraNode = document.createTextNode(desc)
    linkNode = document.createTextNode(wiki_link)
    headNode = document.createTextNode(search_result)

    head.appendChild(headNode)
    para.appendChild(paraNode)
    link.appendChild(linkNode)

    subdiv.appendChild(head)
    subdiv.appendChild(para)
    subdiv.appendChild(link)
    subdiv.setAttribute("class", "sub-div")

    return subdiv
}



document.getElementById("send").addEventListener("click", construct)



{/* <div>
    <div>
        <div>
            <div>paraNode</div> <--- para
            <div>linkNode</div> <--- link
            <div>headNode</div> <--- head
        </div> <--- subdiv
    </div> <--- maindiv
</div> <--- in html */}

