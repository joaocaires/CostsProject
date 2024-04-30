import style from './Project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../services/ServiceForm'
import ServiceCard from '../services/ServiceCard'

import { json, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { parse, v4 as uuidv4 } from 'uuid'

function Project(){
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [services, setServices] = useState([])
        
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
                setServices(data.services)
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

        function createService(project){
            const lastService = project.services[project.services.length - 1]
            lastService.id = uuidv4()

            const lastServiceCost = lastService.cost

            const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

            if(newCost > parseFloat(project.budget)){
                project.services.pop()
                return false
            }

            project.cost = newCost

            fetch(`http://localhost:5000/projects/${project.id}`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            })
            .then((res) => res.json())
            .then((data) => {
                setShowServiceForm(false)
            })
            .catch((err) => console.log(err))
        }

        function removeService(){

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
                    <div>
                        <h2>Add Service:</h2>
                        <button className={style.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Add service' : 'Close'}
                        </button>
                        <div className={style.service_form_container}>
                            {showServiceForm && (
                                <ServiceForm 
                                    handleSubmit={createService}
                                    btnText='Add a service'
                                    projectData={project}
                                />

                            )}
                        </div>
                    </div>
                    <h2>Services</h2>
                    <Container customClass='start'>
                        {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard 
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))
                        }
                        {services.length === 0 && <p>There are no registered services</p>}
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