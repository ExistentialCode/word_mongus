let seed = Math.floor(Math.random()*12973)
const impostorCount = document.createElement("table")
impostorCount.style.height = (document.querySelector("div.Board-module_board__lbzlf").clientHeight - 20).toString() + "px";
impostorCount.style.borderSpacing = "0"

for(const i of Array(6).fill()){
	const tr = document.createElement("tr"), td = document.createElement("td"), tdDiv = document.createElement("div")
	tdDiv.style.fontFamily = "sans-serif"
	tdDiv.style.fontSize = "xx-large"
	tdDiv.style.fontWeight = "bold"
	tdDiv.dataset.fake = "salmon"
	tdDiv.style.borderRadius = "0 100% 100% 0"
	tdDiv.style.textAlign = "center"
	tdDiv.style.margin = "0 auto"
	td.style.height = document.querySelector("div.Row-module_row__dEHfN div.Tile-module_tile__3ayIZ").clientHeight.toString() + "px";
	td.style.width = document.querySelector("div.Row-module_row__dEHfN div.Tile-module_tile__3ayIZ").clientWidth.toString() + "px";
	td.appendChild(tdDiv)
	tr.appendChild(td)
	impostorCount.appendChild(tr)
}
document.querySelector("div.Board-module_boardContainer__cKb-C").appendChild(impostorCount)
function e(f){console.log(f); return f}
const boardObserver = new MutationObserver(obj => {
	fetch(chrome.runtime.getURL("wordlist.json")).catch(error => console.log(error)).then(response => response.json())
	.then(text => {
		let impostor = [...text[seed]];
		impostor = [..."qwert"];
		[...obj[0].target.parentElement.parentElement.children].filter((tile, index) => {
			const tileContent = tile.firstChild.childNodes[0].textContent, newColor = {3: "white", 5: "white", 6: "var(--green)", 7: "var(--color-tone-2)"}[tile.firstChild.dataset.state.length]
			console.log(tileContent, tile.firstChild.dataset.state, index, impostor, tile.firstChild.dataset.state), keyButton = document.querySelector(`div.Keyboard-module_keyboard__1HSnn button[data-key="${tileContent}"]`)
			if(tileContent !== impostor[index]) return true
			delete impostor[index]
			tile.firstChild.dataset.fake = newColor
			keyButton.dataset.fake = newColor
			
		}).forEach(tile => {
			const tileContent = tile.firstChild.childNodes[0].textContent, impostorIndexFind = impostor.indexOf(tileContent), newColor = {3: "white", 5: "white", 6: "var(--yellow)", 7: "var(--color-tone-2)"}[tile.firstChild.dataset.state.length], keyButton = document.querySelector(`div.Keyboard-module_keyboard__1HSnn button[data-key="${tileContent}"]`)
			console.log(impostor, impostorIndexFind, tile.firstChild.childNodes[0].textContent, newColor)
			if(impostorIndexFind === -1) return
			delete impostor[impostorIndexFind]
			tile.firstChild.dataset.fake = newColor;
			if(keyButton.dataset.fake !== "var(--green)"){ 
				keyButton.dataset.fake = newColor
			}
			console.log(document.querySelector(`div.Keyboard-module_keyboard__1HSnn button[data-key="${tileContent}"]`))
		})
		if(impostor.filter(x => x).length < 5) impostorCount.children[[...obj[0].target.parentElement.parentElement.parentElement.children].reduce((accumulator, row) => [e(accumulator[0]) + e(accumulator[1] ? 0 : 1), e(row) === e(obj[0].target.parentElement.parentElement) || accumulator[1]], [-1, false])[0]].firstChild.firstChild.textContent = 5 - impostor.filter(x => x).length; 
	})
});

const keyboardObserver = new MutationObserver(obj => obj.forEach(keyboardKey => keyboardKey.target.style.transition = "none"))

boardObserver.observe(document.querySelector("div.Board-module_board__lbzlf"), {subtree: true, attributes: true, attributeFilter: ["data-state"]})
keyboardObserver.observe(document.querySelector("div.Keyboard-module_keyboard__1HSnn"), {subtree: true, attributes: true, attributeFilter: ["data-state"]})