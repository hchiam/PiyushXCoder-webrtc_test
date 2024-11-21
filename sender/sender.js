console.log("Sender!")

const lc = new RTCPeerConnection({
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
const dc = lc.createDataChannel("")

lc.onicecandidate = () => {
  console.log("ICE")
  console.log(lc.localDescription)
}

dc.onopen = () => console.log("Data Channel Opened!")
dc.onmessage = msg => console.log(msg)

lc.createOffer().then(o => lc.setLocalDescription(o)).then(() => console.log("Offer Created!"))

setTimeout(() => {
  // Copy the last ICE before this propmt comes! fastttt!
  const answer = JSON.parse(prompt("Answer?"))

  lc.setRemoteDescription(answer)

  setTimeout(() => {
    console.log("Sending Hi!")
    dc.send("Hi!")
  }, 1000)
}, 5000)
