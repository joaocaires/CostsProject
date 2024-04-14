import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}){
    return(
        <form className={styles.form}>
            <Input type="text" text="Project Name" name="name" placeholder="Enter a project name"/>
            <Input type="number" text="Project budget" name="budget" placeholder="Enter a total budget"/>
            <Select name="category_id" text="Enter a category" />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm