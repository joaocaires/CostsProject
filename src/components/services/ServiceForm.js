import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import style from '../project/ProjectForm.module.css'

function ServiceForm({ handleSubmit, btnText, projectData }){
    
    const [service, setService] = useState([])

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }
    
    return(
        <form onSubmit={submit} className={style.form}>
            <Input
                type='text'
                text='Service name'
                name='name'
                placeholder='Enter service name'
                handleOnChange={handleChange}
            />

            <Input
                type='number'
                text='Service cost'
                name='cost'
                placeholder='Enter total cost'
                handleOnChange={handleChange}
            />

            <Input
                type='text'
                text='Service description'
                name='description'
                placeholder='Enter a description'
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm