import { useState } from "react"
import axios from "axios"
const CreateCompany = () => {
    const [inpVal, setInpVal] = useState("");

    const [loading, setLoading] = useState(false);
    const submitHandler = async (e) => {
        e.preventDefault()
        const randomCode = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
        let code = `${randomCode.slice(0, 5)}-${randomCode.slice(5)}`;
        try {
            setLoading(true)
            const res = await axios.post("https://companybackend-code.onrender.com/api/v1/company/add", { name: inpVal, code });
            if (res) {
                // console.log(res.data);
                setInpVal("");
                setLoading(false);

            }
        } catch (error) {
            // console.log(error);
            setLoading(false);

        }

    }
    return (
        <div>
            <>
                <form >

                    <input value={inpVal} onChange={(e) => setInpVal(e.target.value)} />
                    <button onClick={submitHandler}>{loading ? "Creating.." : "Create"}</button>
                </form>
            </>
        </div>
    )
}

export default CreateCompany