import { $ } from "../base.js"
import { getData } from "../functions.js"

const url = 'https://fakestoreapi.com/products'

try {
	var dataArray = await getData(url)
}
catch (error) {
	console.error(error.massage)
}

// console.log(dataArray)

const _createCards = () => {

	const cardsBlock = document.createElement('div')
	cardsBlock.classList.add('cards')
	cardsBlock.insertAdjacentHTML('afterbegin', /*html*/`
	${dataArray.map(({ image, title, description, id }) => /*html*/`
		<div class="cards__item card" style="width: 18rem;" id=${id}>
			<img src=${image} class="card__img card-img-top">
			<div class="card__body card-body">
				<h5 class="card__title card-title">${title}</h5>
				<p class="card__text card-text">${description}</p>
				<button class="card__btn btn btn-primary" data-modal-open="true">Подробнее</button>
			</div>
		</div>
		`
	).join('')}
	`)
	const triggerBtn = cardsBlock.querySelectorAll('[data-modal-open]')
	const getCardData = (cardId) => {
		const cardData = dataArray.map(obj => {
			if (obj.id == cardId) {
				return obj
			}
		}).filter(Boolean)[0]
		return cardData
	}
	triggerBtn.forEach(trig => {
		const cardBody = trig.parentElement.parentElement

		trig.onclick = () => {
			const cardData = getCardData(cardBody.id)
			const {
				title: CARD_TITLE,
				image: CARD_IMG,
				description: CARD_TEXT,
				rating: {
					rate: CARD_RATING
				}
			} = cardData
			// console.log(CARD_RATING)
			const newModal = $.modal({
				title: CARD_TITLE,
				content: /*html*/`
				<img class='c-modal__body-img' src=${CARD_IMG} alt="">
				<div class='c-modal__body-content'>
					<div class='c-modal__body-rating' data-rating=${CARD_RATING}></div>
					<p class='c-modal__body-description'>${CARD_TEXT}<p>
				</div>
				`,
				onClose: () => newModal.destroy()
			})
			// console.log(trig.parentElement)

		}
	})
	// console.log(triggerBtn)
	document.querySelector('.main .container').append(cardsBlock)

}

export default $.cards = (props) => {
	if (dataArray) {
		const $cards = _createCards(props)
	}
}