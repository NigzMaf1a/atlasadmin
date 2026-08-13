import { useState } from "react"
import { useNavigate } from "react-router-dom"

//components
import Page from "../components/Page"
import CustomDiv from "../components/CustomDiv"
import ButtonAdv from "../components/ButtonAdv"
import LabelledInput from "../components/LabelledInput"

//styles
import Styles from "../styles/sections"

//utils
import Toaster from "../scripts/utils/Toaster"
import login from "../scripts/utils/login"
import Session from "../scripts/utils/session"

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()

    async function loginUser() {
        if (!email) {
            Toaster('Please enter an email to login', 'info')
            return
        }

        if (!password) {
            Toaster('Please enter a password to login', 'info')
            return
        }

        const { token, user } = await login(email, password)

        Toaster('Login successful', 'success')

        Session.storeToken(token)
        Session.storeUser(user)

        resetFields()

        setTimeout(() => {
            navigate('/', { replace: true })
        }, 1500)
    }

    function resetFields() {
        setEmail('')
        setPassword('')
    }

    return (
        <Page className={Styles.centered()}>
            <CustomDiv className={Styles.form()}>
                <LabelledInput
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter email"
                />

                <LabelledInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter password"
                />

                <CustomDiv className={Styles.formFooter()}>
                    <ButtonAdv
                        label="Login"
                        onClick={() => loginUser()}
                        btn_type="primary"
                        color="info"
                        size="lg"
                    />
                </CustomDiv>
            </CustomDiv>
        </Page>
    )
}