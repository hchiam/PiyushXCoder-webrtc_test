console.log("Receiver")

const rc = new RTCPeerConnection({
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
      ]
    }
  ]
})

rc.onicecandidate = () => {
  console.log("ICE")
  console.log(rc.localDescription)
}

rc.ondatachannel = e => {
  console.log("Received Data Channel")
  console.log(e)

  rc.dc = e.channel
  rc.dc.onopen = () => console.log("Data Channel Opened!")
  rc.dc.onmessage = msg => console.log(msg)
}

const offer = JSON.parse(prompt("Offer?"));

rc.setRemoteDescription(offer)

rc.createAnswer().then(a => rc.setLocalDescription(a)).then(() => console.log("Created Answer!"))

