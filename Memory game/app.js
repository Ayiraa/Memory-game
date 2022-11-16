const parent = document.querySelector(".parent")
const livesCount = document.querySelector(".zycia")
const points = document.querySelector('.punkty')
let livesNumber = 7
let flippedCards = []
let guessedCards = []
let punkty = 0

points.textContent = punkty

livesCount.textContent = livesNumber

const linkCards = () => 
[
    {src:"./zdj/1.jpg", nazwa : "skrzypce"},
    {src:"./zdj/2.jpg", nazwa : "gitara1"},
    {src:"./zdj/3.jpg", nazwa : "trabka"},
    {src:"./zdj/4.jpg", nazwa : "gitara2"},
    {src:"./zdj/5.jpg", nazwa : "piano"},
    {src:"./zdj/6.jpg", nazwa :"perkusja"},
    {src:"./zdj/7.jpg", nazwa : "mikro"},
    {src:"./zdj/8.jpg", nazwa : "flet"},
    {src:"./zdj/1.jpg", nazwa : "skrzypce"},
    {src:"./zdj/2.jpg", nazwa : "gitara1"},
    {src:"./zdj/3.jpg", nazwa : "trabka"},
    {src:"./zdj/4.jpg", nazwa : "gitara2"},
    {src:"./zdj/5.jpg", nazwa : "piano"},
    {src:"./zdj/6.jpg", nazwa : "perkusja"},
    {src:"./zdj/7.jpg", nazwa : "mikro"},
    {src:"./zdj/8.jpg", nazwa : "flet"}
]



const zmieszaj = () => {
    const cards = linkCards()
    cards.sort(() => Math.random()-0.8)
    return cards
}

const generate = () => {
    const cards = zmieszaj()
    console.log(cards)
    cards.forEach((element) => {
        const karta = document.createElement("div")
        const awers = document.createElement("img")
        const rewers = document.createElement("img")
        karta.classList = "karta"
        awers.classList = "awers"
        rewers.classList = "rewers"
        parent.appendChild(karta)
        karta.appendChild(awers)
        karta.appendChild(rewers)
        awers.src = element.src
        rewers.src ="./zdj/tło.jpg"
        karta.setAttribute("nazwa", element.nazwa)

        karta.addEventListener('click', (e) => {
            karta.classList.add("flipped")
            console.log(flippedCards)
            flippedCards.push(karta)
            match(e)
        }) 
    });
    
}

const match = () =>{
    if(flippedCards.length==2){
        if(flippedCards[0].getAttribute("nazwa") == flippedCards[1].getAttribute("nazwa")){
            console.log("match")
            guessedCards.push(flippedCards[0])
            guessedCards.push(flippedCards[0])
            console.log(guessedCards)
            flippedCards =[]
            punkty++
            points.textContent = punkty
            if(guessedCards.length==16){
                setTimeout(()=>window.alert("Gratulacje! Wygrałeś! :D"),1000)
                checkWin()
            }
        }else{
            flippedCards.forEach(karta => {
                setTimeout(() => karta.classList.remove("flipped"), 1500)
            })
            livesNumber--
            livesCount.textContent = livesNumber
            flippedCards =[]
            if(livesNumber ==0){
                setTimeout(()=>window.alert("Straciłeś wszystkie życia! Przegrywasz! :("),1000)
                setTimeout(()=>{reset() },1000 ) 
            } 
    }
    }
}
const reset = () =>{
    guessedCards = []
    let noweKarty = zmieszaj()
    let awersy = document.querySelectorAll(".awers")
    let karty = document.querySelectorAll(".karta")
    parent.style.pointerEvents = "none"
    livesNumber = 7
    livesCount.textContent = livesNumber
    punkty = 0
    points.textContent = punkty
    console.log("loser")
    noweKarty.forEach((element, i) => {
        karty[i].classList.remove("flipped")
        setTimeout(() =>{
            awersy[i].src = element.src
            karty[i].setAttribute("nazwa", element.nazwa)
        }, 1100)
        
    })
    parent.style.pointerEvents = "all"
}

const checkWin = () => {
     setTimeout(() => reset(), 1000)
 }
generate()
