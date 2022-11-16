import { $ } from '../base.js'

const _createModal = ({
	// Параметры по умолчанию
	title = "Стандартный заголовок",
	text = [],
	content = '',
	width = '',
	footerBtn = false,
	closable = true,
}) => {
	// 1. Создание коренного блока модального окна
	// ----- Создаю пустой блок в переменной modal
	const modal = document.createElement('div');
	// ----- Добавляю к пустому блоку CSS класс
	modal.classList.add('c-modal');

	// 2. Добавление html контента внутрь коренного блока
	modal.insertAdjacentHTML('afterbegin', /*html*/`
		<div class="c-modal__overlay" ${closable ? 'data-modal-close="true"' : ''} >
			<div class="c-modal__window" ${width ? `style="width: ${width}"` : ''} >

				<div class="c-modal__header">
					<h3 class="c-modal__title" data-modal-title> ${title} </h3>
					${closable ? /*html*/ `<span class="c-modal__close" data-modal-close="true"> &timesbar; </span>` : ''}
				</div>

				<div class="c-modal__body" data-modal-content>
					${text.map(p => /*html*/ ` <p class="c-modal__p"> ${p} </p> `).join('')}
					${content}
				</div>
				
				${// Если есть массив с кнопками - выводим их в футер
		!footerBtn
			? ``
			: /*html*/ `<div class="c-modal__footer" data-modal-footer>
				${footerBtn.map(btn =>
				/*html*/ ` <button class="btn ${!btn.style ? "btn-secondary" : `btn-${btn.style}`}"> ${btn.text} </button> `)
				.join('')}
							</div>`}
			</div>
		</div>`)

	// 3. Помещаю модальное окно в начало блока body
	document.body.prepend(modal)

	// 4. Возвращаю модальное окно
	return modal
}

export default $.modal = (props) => {
	const $modal = _createModal(props)

	// Флаги
	let MODAL_DESTROYED = false

	// Переменные
	const { animTime = 1000 } = props

	// Колбэк функции
	const { onClose, onOpen } = props
	// Колбэк метод (handler) на кнопки в футере
	const { footerBtn: btnsProps } = props
	const footerBtns = $modal.querySelector('[data-modal-footer]')?.children
	for (let i = 0; i < footerBtns?.length; i++) {
		const btn = footerBtns[i];
		btn.onclick = () => btnsProps[i].handler()
	}

	// Функции
	const modalClosing = event => {
		if (event.target.dataset.modalClose) {
			modalReturn.close()
		}
		if (event.target.dataset.modalDestroy) {
			modalReturn.close()
			modalReturn.destroy()
		}
	}
	const modalOpening = event => {
		if (event.target.dataset.modalOpen) {
			modalReturn.open()
		}
	}

	// Слушатели
	document.addEventListener('click', modalOpening)
	$modal.addEventListener('click', modalClosing)

	const modalReturn = {
		open() {
			if (MODAL_DESTROYED) {
				return null
			} else {
				$modal.classList.add('open')
				if (typeof onOpen === 'function') {
					onOpen()
				}
			}
		},
		close() {
			$modal.classList.remove('open')
			$modal.classList.add('hide')
			setTimeout(() => {
				$modal.classList.remove('hide')
			}, animTime);
			if (typeof onClose === 'function') {
				onClose()
			}
			// console.log('close')
		},
		destroy() {
			setTimeout(() => {
				$modal.parentNode.removeChild($modal)
				$modal.removeEventListener('click', modalClosing)
			}, animTime);



			// Удаление всех тригерных кнопок при удалении модалки
			// const trigerBtns = document.querySelectorAll('[data-modal-open]')
			// !trigerBtns
			// 	? null
			// 	: trigerBtns.forEach((el) => {
			// 		el.parentNode.removeChild(el)
			// 	})

			MODAL_DESTROYED = true
			console.log('destroy')
		},
		setContent(html) {
			$modal.querySelector('[data-modal-content]').innerHTML = html
		},
		setTitle(text) {
			$modal.querySelector('[data-modal-title]').textContent = text
		},
	}
	return modalReturn
}
