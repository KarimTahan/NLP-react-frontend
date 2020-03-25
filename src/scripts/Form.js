import React from 'react';
import '.././stylesheets/Form.css';
//Function creating Form JSX
const Form = () => {
    return (
        //div content within index.css
       <div className="form">
           <form id="form" action="">
                <label for="author"> Author</label>
                <select id="author" name="pickAuthor">
                    <option value="shakespears">Shakespear</option>
                    <option value="stephenKing">Stephen King</option>
                    <option value="EAP">Edgar Allan Poe</option>
                </select>
                <br/>
                <label for="length"> Seed Length</label>
                <input type="number" id="length" name="lengthOfSeed" placeHolder="Seed Length"/>
                <br/>
                <textarea id="seed" name="seed" placeHolder="Write something.." style={{height:'100px'}}></textarea>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default Form;