import { GetInitials } from "../../utils/validations";

const ProfileInfo = ({userInfo,onLogout}) =>{
    if(!userInfo){
        return null;
    }
    return(
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-white font-medium bg-secondary">{GetInitials(userInfo.fullName)}</div>
            <div className="flex flex-col">
                <p className="text-sm font-medium">{userInfo.fullName}</p>
                <button className="text-xm sm:text-sm text-slate-700 underline" onClick={onLogout}>Logout</button>
            </div>
            
        </div>
    )
}
export default ProfileInfo;