document.addEventListener("DOMContentLoaded", () => {
    const echoUrl = "wss://echo.websocket.org/"
    const geoUrl = "https://www.openstreetmap.org/"
    const inpMsg = document.getElementById("inpMsg")
    const btnSend = document.getElementById("btnSend")
    const btnGeo = document.getElementById("btnGeo")
    const output = document.getElementById("output")
    let echo, connected = false
    echo = new WebSocket(echoUrl)
    echo.onopen = evt => {
        connected = true
    }
    echo.onmessage = evt => {
        writeToScreen(`<span style="color: blue;">RESPONSE: ${evt.data}</span>`)
    }
    echo.onerror = evt => {
        writeToScreen(`<span class="response" style="color: red;">RESPONSE: ${evt.data}</span>`)
    }
    const writeToScreen = msg => {
        const p = document.createElement("p")
        p.style.wordWrap = "break-word;"
        p.innerHTML = msg
        output.appendChild(p)
    }
    btnSend.addEventListener("click", e => {
        const m = inpMsg.value
        if (m.length > 0 && connected) {
            writeToScreen(`<span class="sent" style="color: green;">SENT: ${m}</span>`)
            echo.send(m)
        }
        inpMsg.value = ""
    })
    const geoError = () => {
        writeToScreen(`<span style="color: red;">GEO: Невозможно получить ваше местоположение</span>`)
    }
    const geoSuccess = ({ coords: { latitude, longitude } }) => {
        writeToScreen(`<span style="color: brown;">GEO: Широта: ${latitude}, долгота: ${longitude}</span>`)
        writeToScreen(`<a style="padding: 5px" href="${geoUrl}/#map=14/${latitude}/${longitude} target="_blank"">Посмотреть на карте</a>`)
    }
    btnGeo.addEventListener("click", e => {
        if (!navigator.geolocation)
            writeToScreen(`<span style="color: red;">GEO: Геолокация не поддерживается вашим браузером</span>`)
        else
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
    })
})