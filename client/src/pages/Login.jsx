import Header from "../components/Header"
import Login from "../components/Login"

export default function LoginPage(){
    return(
        <>
             <Header
                heading="Login to your Each One Teach One Account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="./signup"
                />
            <Login/>
        </>
    )
}