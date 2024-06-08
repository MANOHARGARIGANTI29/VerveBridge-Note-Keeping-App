import { useState } from "react";
import TagsInput from "../../components/inputfields/tagsInput"
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosinstances";

const AddEditNotes = ({onClose ,type,getAllNotes,noteData,showToastMessage})=>{
    const [title,setTitle] = useState(noteData?.title ||"");
    const [content,setContent] = useState(noteData?.content ||"");
    const [tags,setTags] = useState(noteData?.tags || []);
    const [error,setError]=useState(false);
    // Add New Note
    const addNewNote = async ()=>{
        try{
            const response = await axiosInstance.post("/add-note",{
                title,
                content,
                tags,
                isPinned:false,
            });
            if(response.data && response.data.note){
                showToastMessage("Note Added Successfully");
                getAllNotes();
                onClose();
            }
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }
        }
    }
        // edit note
    const editNote = async()=>{
        const noteId = noteData._id
        try{
            const response = await axiosInstance.put("/edit-note/"+ noteId,{
                title,
                content,
                tags,
            });
            if(response.data && response.data.note){
                showToastMessage("Note Updated successfully")
                getAllNotes();
                onClose();
            }
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }
        }
    }
    
    
    const handleAddNote = ()=>{
       if(!title){
        setError("please enter the title");
        return;
       }
       if(!content){
        setError("please enter the content");
        return;
       }
       setError("");
       if(type === "edit"){
        editNote()
       }else{
        addNewNote()
       }
    }
    
    return(
        <div className="relative p-4 sm:p-6 lg:p-8">
            <button className="w-8 h-8 rounded-md flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 " onClick={onClose}>
                <MdClose className="text-xl text-slate-400"/>
            </button>
            <div className="flex flex-col gap-2">
                <label className="input-label text-lg sm:text-xl">TITLE</label>
                <input className="text-lg sm:text-xl lg:text-2xl text-slate-950 outline-none bg-slate-100 p-2 rounded" type="text" placeholder="enter title...
                "
                value={title}
                onChange={({target})=>setTitle(target.value)}/>   
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label text-lg sm:text-xl">CONTENT</label>
                <textarea
                type="text"
                placeholder="enter the content..."
                className="text-sm sm:text-base lg:text-lg text-slate-950 p-2 rounded outline-none bg-slate-100"
                rows={10}
                value={content}
                onChange={({target})=>setContent(target.value)}
                />   
            </div>
            <div className="flex flex-col gap-2 mt-4">
            <label className="input-label text-lg sm:text-xl">TAGS</label>
            <TagsInput tags={tags} setTags={setTags}/>
            </div>
            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
            <button className="btn-secondary font-medium mt-3 p-3 w-full sm:w-auto" onClick={handleAddNote}>{type === 'edit'? 'UPADTE' : "ADD"}</button>
        </div>
    )
}
export default AddEditNotes;