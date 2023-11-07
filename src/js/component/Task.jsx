import React from "react";

const Task = (props) => {
    return (

        <div className="d-flex justify-content-between">
            <p>{props.task.label}</p>
            <button className="border-0 bg-transparent" onClick={() => props.deleteTag(props.id)}>❌</button>
        </div>

    );

};

export default Task