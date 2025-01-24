import { useState } from 'react';
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from './components/SelectedProject.jsx';


function App() {

  const [projectsState,setProjectsState]=useState({
    // currentAction:'nothing-selected'
    selectedProjectId:undefined,
    //projects is the array having the tasks and we will now maintain the sub task array at the same location
    projects: [],
    tasks:[],
  });

//function to add a task in an array 
function handleAddTask(text)
{
  setProjectsState((prevState)=> {
    const taskId=Math.random();
    const newTask={
      text:text,
      projectId:prevState.selectedProjectId,
      id:taskId,

    };

    return {
      ...prevState,
      tasks: [...prevState.tasks,newTask],
    };
  });

}

//function to del a task
function handleDeleteTask(id)
{

  setProjectsState((prevState) => {
    return{
    ...prevState,
    tasks: prevState.tasks.filter((task) => task.id !==id),
    };
  });


}


  //the handleSelectProject will be used to select the tasks on the sidebar
function handleSelectProject(id) {
  setProjectsState((prevState) => {
    return{
    ...prevState,
    selectedProjectId: id,
    };
});
}

  function handleStartAddProject() {
    setProjectsState(prevState => ({
        ...prevState,
        selectedProjectId: null,

    }));
  }
//the handleCancelAddProject is made for goin back to the default page when we click "cancel" in the data entry page
function handleCancleAddProject() {
  setProjectsState(prevState => ({
    ...prevState,
    selectedProjectId: undefined,

}));
}
//handles adding the new project
  function handleAddProject(projectData) {
    setProjectsState(prevState=> {
      const projectId=Math.random();
      const newProject={
        ...projectData,
        id:projectId,

      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects,newProject]
      };
    });
  }
//we are making this handle delete fucntion just to make sure the delete button work when we try to delete our task by using filter function(buildin) that works on boolean 
function handleDeleteProject() {
  setProjectsState((prevState) => {
    return{
    ...prevState,
    selectedProjectId: undefined,
    projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId),
    };
  });
}

// Find the selected project
const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = (<SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks}/> );


  if(projectsState.selectedProjectId===null)
  {
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancleAddProject}/>
  }
  else if(projectsState.selectedProjectId===undefined)
  {
    content=<NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
    <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId}  />
    {content}
    </main>
  );
}

export default App;
