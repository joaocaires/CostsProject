import { Link } from 'react-router-dom'
import style from './ProjectCard.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({ id, name, budget, category, handleRemove }){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Budget</span> R$:{budget}
            </p>
            <p className={style.category_text}>
                <span className={`${style[category?.toLowerCase() || '']}`}></span> {category}
            </p>
            <div className={style.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Edit
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Remove
                </button>
            </div>
        </div>
    )
}

export default ProjectCard