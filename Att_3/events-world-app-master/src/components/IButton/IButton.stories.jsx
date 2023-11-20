import { IButton } from './index'
import './style.css'

export default {
    title: 'IButton',
    component: IButton,
    argTypes: {
        className: {
            type: 'string',
            description: 'класс для стилизации',
            options: ['button_def', 'button_external'],
            control: {
                type: 'radio',
            }
        },
        children: {
            type: 'string',
            description: 'текст на кнопке',
        },
    },
}

const Template = (arg) => <IButton {...arg}/>

export const Default = Template.bind({})
Default.args = {
    className: 'button_def',
    children: 'Test button',
}

export const External = Template.bind({})
External.args = {
    className: 'button_external',
    children: 'Test button',
}