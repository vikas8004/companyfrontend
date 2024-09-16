import { useState } from "react"
import axios from "axios"
const CreateCompany = () => {
    const [inpVal, setInpVal] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault()
        const randomCode = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
        let code = `${randomCode.slice(0, 5)}-${randomCode.slice(5)}`;
        try {
            const res = await axios.post("http://localhost:5600/api/v1/company/add", { name: inpVal, code });
            if(res){
                console.log(res.data);
                setInpVal("");
                
            }
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div>
            <>
                <form >

                    <input value={inpVal} onChange={(e) => setInpVal(e.target.value)} />
                    <button onClick={submitHandler}>Create</button>
                </form>
            </>
        </div>
    )
}

export default CreateCompany