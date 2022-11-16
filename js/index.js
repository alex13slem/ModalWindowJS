import { $ } from './base.js'
import './plugins/modal.js'
import './content/cards.js'

// const modal = $.modal({
// 	// title: 'Заголовок',
// 	// closable: false,
// 	content: `
// 	<div class="c-modal__content">
// 		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloremque incidunt non esse, excepturi, qui consequuntur aliquid assumenda ducimus natus libero nam. Eligendi minus sint non rerum libero. Quod, laudantium.</p>
// 	</div>
// 	`,
// 	text: ['Замечательная модалка!', 'Согласны?'],
// 	// width: '400px',
// 	footerBtn: [
// 		{
// 			text: 'Да',
// 			style: 'primary',
// 			handler: () => {
// 				console.log('да')
// 				modal.close()
// 			}
// 		},
// 		{
// 			text: 'Нет',
// 			style: 'danger',
// 			handler: () => {
// 				console.log('Нет')
// 				modal.close()
// 			}
// 		},
// 	],
// 	animTime: 1000
// 	// onClose: () => console.log('onClose'),
// 	// onOpen: () => console.log('onOpen'),
// })

const cards = $.cards({})

