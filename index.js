var keyword, url, httpRequest, jsonResponse
var searchResult, description, wikiLink
var subdiv, maindiv
var para, link, head
var paraNode, linkNode, headNode
var i 

var keyword = ""

function construct() {
    if (keyword == "") {
        keyword = document.getElementById("srchStr").value

    } else {
        document.getElementById("display").innerHTML = ""
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
            // document.getElementById("display").innerHTML = httpRequest.responseText
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
    

    for (i=0; i<10; i++) {
        sub = createSection(searchResult[i], description[i], wikiLink[i])
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

    return subdiv
}



document.getElementById("send").addEventListener("click", construct)




