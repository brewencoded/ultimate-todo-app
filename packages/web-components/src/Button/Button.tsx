import React from 'react'

import ButtonCss from './Button.module.css'

export type ButtonProps = {
    text?: string
    onClick?: React.MouseEventHandler
}

const Button = (props: ButtonProps) => (
    <div className={ButtonCss["common-button"]} onClick={props.onClick}>
        {props.text}
    </div>
)

export default Button
