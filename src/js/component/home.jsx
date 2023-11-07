import React, { useEffect } from "react";
import '../../styles/home.css';
import ReactDOM from "react-dom";
import { useState } from "react";
import Task from "./Task";

const API_URL = "https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/li88"

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([])
	const [InputText, setInputText] = useState("");

	const createUser = () => {
		fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify([])
		}).then((response) => {
			if (response.ok) {
				//*//volver a llamar a la funcion getUserTask para traer la lista de tareas del usuario creado 
				getUserTasks()
			}
		}).then().catch(error => console.log(error))
	}
	const getUserTasks = () => {
		fetch(API_URL).then((response) => {
			if (response.ok) {
				return response.json()
			} else if (response.status ==400){
				createUser() //si el usuario no existe lo creamos
			}
		}).then((data) => {
			setTasks(data)
		}).catch(error => console.log(error))
	}
	const addUsersTasks = (e) => {
		if (e.key === "Enter") {
			if (InputText.trim() !== '') {
				let newTaskList = [...tasks, {label:InputText, done:false}];
				fetch(API_URL, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newTaskList)
				}).then((response) => {
					if (response.ok) {
						getUserTasks() //volver a llamar a la funcion getUserTask para traer la lista actualizada update
						return response.json()
					}
		
				}).then((data) => {
					console.log(data)
		
				}).catch(error => console.log(error))
				setInputText("")
			}
		}
		
	}


	



	const deleteUserTask = (index) => {
		const updatedTasks = tasks.filter((_, i) => i !== index);
		// a esta funcion deleteUserTask se le mete un fetch
		fetch(API_URL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedTasks)
		}).then((response) => {
			if (response.ok) {
				getUserTasks() //se llama otra vez la funcion getUsersTasks para actulizar la lista
			}
		}).then().catch(error => console.log(error)) //segundo then se puede dejar vacio  por que no vamos a usar los datos
	}

	useEffect(()=>{
getUserTasks()
	},[])
	return (
		<div className="Input-center main-container">
			<h1 className="title mt-5">Todos</h1>
			<ul className=" list-group w-50 position-absolute top-50 start-50 translate-middle">
				<li className="list-group-item input-main-div">
					<input type="setInputText" 
					className="form-control border-0" 
					value={InputText} 
					placeholder="What needs to be done?" 
					onKeyDown={(e)=>{
                    addUsersTasks(e)
					}} 
					onChange={(e) => { setInputText(e.target.value) }} />
				</li>
				{/* Render every input that gets inserted */}
				{tasks.map((task, index) => {
					return <li key={index} className="ul-list list-group-item">
						<Task task={task} deleteTag={deleteUserTask} id={index} />
					</li>
				})}
				<li className="list-group-item Input-start">{tasks.length} Items left</li>
			</ul>


		</div>
	);


};

export default Home;