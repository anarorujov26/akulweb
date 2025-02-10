import { IconButton } from '@mui/material'
import React from 'react'
import DynamicIcon from './DynamicIcon'

function HoverIconButton({ color, icon, hoverIcon, divider, ...props }) {
    return (
        <IconButton
            color={color}
            size="large"
            sx={{
                '& svg': {
                    transition: '0.2s',
                    transform: 'translateX(0) rotate(0)',
                },
                '&:hover, &:focus': {
                    bgcolor: 'unset',
                    '& svg:first-of-type': {
                        transform: 'translateX(-4px) rotate(-20deg)',
                    },
                    '& svg:last-of-type': {
                        right: 0,
                        opacity: 1,
                    },
                },
                '&::after': divider && {
                    content: '""',
                    position: 'absolute',
                    height: '80%',
                    display: 'block',
                    left: 0,
                    width: '1px',
                    bgcolor: 'divider',
                },
            }}
            {...props}
        >
            <DynamicIcon name={icon} />
            <DynamicIcon name={hoverIcon} sx={{ position: 'absolute', right: 4, opacity: 0 }} />
        </IconButton>
    )
}

export default HoverIconButton
