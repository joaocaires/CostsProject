import style from './Project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Project(){
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
        
        useEffect(() => {
            setTimeout(() => {
                fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
            })
            .catch(err => console.log(err))

            }, 300)
        }, [id])

        function toggleProjectForm(){
            setShowProjectForm(!showProjectForm)
        }

    return(
        <>
            {project.name ? (
            <div className={style.project_details}>
                <Container customClass='column'>
                    <div className={style.details_container}>
                        <h1>Project: {project.name}</h1>
                        <button className={style.btn} onClick={toggleProjectForm}>
                            {!setShowProjectForm ? 'Edit Project' : 'Close'}
                        </button>
                        {!showProjectForm ? (
                            <div className={style.project_info}>
                                <p>
                                    <span>Category:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total budget:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Used:</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={style.project_info}>
                                <p>Project Details</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project