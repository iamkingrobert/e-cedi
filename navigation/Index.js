import { useAuthentication } from "../hook/useAuthentication";
import UserStack from "./userStack";
import AuthStack from "./authStack";

export default function RootNavigation(){
    const {user} = useAuthentication();
    return user ? <UserStack/> : <AuthStack/>;
}