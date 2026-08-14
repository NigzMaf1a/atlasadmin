//hooks
import { useNavigate } from "react-router-dom"

//components
import CustomDiv from "../components/CustomDiv"

export default function AddRolePrompt() {
    const navigate = useNavigate()

    return (
        <CustomDiv className="w-full h-20 flex flex-row justify-end items-center">
            <CustomDiv
                className={`
                    flex flex-row justify-center items-center
                    hover:cursor-pointer
                    bg-blue-600 w-20 h-10 mr-3 text-white rounded-lg`
                }
                onClick={() => navigate('/roles/add')}
            >
                Add Role
            </CustomDiv>
        </CustomDiv>
    )
}
