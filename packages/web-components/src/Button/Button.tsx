import React from 'react'

import {default as MaterialButton} from '@mui/material/Button'

export type ButtonProps = {
    text?: string
    onClick?: React.MouseEventHandler
}

const Button = (props: ButtonProps) => (
    <MaterialButton onClick={props.onClick} variant="contained">{props.text}</MaterialButton>
)

export default Button
