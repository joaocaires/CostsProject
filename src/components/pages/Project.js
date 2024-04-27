import style from './Project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Project(){
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
        
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

        function editPost(project){
            fetch(`http://localhost:5000/projects/${project.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project),
            })
            .then(res => res.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
            })
            .catch(err => console.log(err))
        }

        function toggleProjectForm(){
            setShowProjectForm(!showProjectForm)
        }

        function toggleServiceForm(){
            setShowServiceForm(!showServiceForm)
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
                                <ProjectForm handleSubmit={editPost} btnText="Finish Edit" projectData={project}/>
                            </div>
                        )}
                    </div>
                    <div className={style.service_form_container}>
                        <h2>Add Service:</h2>
                        <button className={style.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Add service' : 'Close'}
                        </button>
                        <div className={style.service_form_container}>
                            {showServiceForm && <div>Service Form</div>}
                        </div>
                    </div>
                    <h2>Services</h2>
                    <Container customClass='start'>
                        <p>Services itens</p>
                    </Container>
                </Container>
            </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project