import { useState, useEffect } from 'react'

import style from './Message.module.css'

function Message(type, msg){

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        if(!msg){
            setVisible(false)
            return
        } else {
            setVisible(true)
        }

        const timer = setTimeout(() => {
            setVisible(true)
        }, 3000)

        return () => clearTimeout(timer)

    }, [msg])

    return(
        <>
            {visible && (
                <div className={`${style.message} ${style[type]}`}>
                    {msg}
                </div>
            )}
        </>
    )
}

export default Message