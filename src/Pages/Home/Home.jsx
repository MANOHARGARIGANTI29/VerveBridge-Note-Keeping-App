import { MdAdd } from "react-icons/md";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import AddEditNotes from "../Home/AddEditNotes";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstances";
import Toast from "../../components/TostMessage/Toast";
import EmptyCard from "../../components/empty-cards/empty-cards";
import AddnotesImg from "../../assets/images/Untitled design.png";
import Nonote from "../../assets/images/empty-notes-isolated-vector-17057936.jpg";

const Home = () => {
    const [openAddEditModel, setOpenAddEditModel] = useState({
        isShown: false,
        type: "add",
        data: null,
    });
    const [showToastMesg, setShowToastMesg] = useState({
        isShown: false,
        type: "add",
        message: "",
    });
    const [allNotes, setAllNotes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isSearch,setIsSearch] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModel({ isShown: true, data: noteDetails, type: "edit" });
    };

    const showToastMessage = (message, type) => {
        setShowToastMesg({
            isShown: true,
            message,
            type,
        });
    };

    const handleCloseToast = () => {
        setShowToastMesg({
            isShown: false,
            message: "",
        });
    };

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes");
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    };
    const deleteNote =async(data)=>{
        const noteId = data._id
        try{
            const response = await axiosInstance.delete("/delete-notes/"+ noteId);
            if(response.data && !response.data.error){
                showToastMessage("Note Deleted successfully",'delete')
                getAllNotes();
               
            }
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                console.log("An Unexpected error is occurred.Please try again.")
            }
        }

    };
    const onSearchNote = async (query)=>{
        try{
            const response = await axiosInstance.get('/search-notes',{
                params:{query},
            });
            if(response.data && response.data.notes){
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        }catch(error){
            console.log(error);
        }
    }
    const handleClearSearch=()=>{
        setIsSearch(false);
        getAllNotes();
    }
    const updateIsPinned = async(noteData)=>{
        const noteId = noteData._id;
        try{
            const response =await axiosInstance.put('/Update-note-pinned/'+noteId,{
                isPinned:!noteData.isPinned,
            });
            if (response.data && response.data.note) {
                showToastMessage("Note Updated Successfully", "update");
                // Update the local state to reflect the pinned status change
                setAllNotes((prevNotes) => {
                    const updatedNotes = prevNotes.map((note) =>
                        note._id === noteId ? { ...note, isPinned: !note.isPinned } : note
                    );
                    // Sort the notes so that pinned notes come first
                    updatedNotes.sort((a, b) => b.isPinned - a.isPinned);
                    return updatedNotes;
                });
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
            <div className="container mx-auto px-4">
            {allNotes.length > 0 ?(
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {allNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}  
                            onPinNote={() => updateIsPinned(item)} 
                        />
                    ))}
                </div>
                ):(
                    <EmptyCard imageSrc={isSearch?Nonote:AddnotesImg} message={isSearch?`Oops! No notes found matching your search`:`Start creating your first Note! Click the 'Add' button to join thought,ideas,and reminders.Let's get started!`}/>
                )
            }
            </div>
            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-900 fixed right-10 bottom-10 sm:right-6 sm:bottom-6"
                onClick={() => {
                    setOpenAddEditModel({ isShown: true, type: "add", data: null });
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>
            <Modal
                isOpen={openAddEditModel.isShown}
                onRequestClose={() => setOpenAddEditModel({ isShown: false, type: "add", data: null })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel=""
                className="w-full max-w-3xl mx-auto mt-14 p-5 bg-white rounded-md overflow-auto"
            >
                <AddEditNotes
                    type={openAddEditModel.type}
                    noteData={openAddEditModel.data}
                    onClose={() => setOpenAddEditModel({ isShown: false, type: "add", data: null })}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>
            <Toast
                isShown={showToastMesg.isShown}
                message={showToastMesg.message}
                type={showToastMesg.type}
                onClose={handleCloseToast}
            />
        </>
    );
};

export default Home;
