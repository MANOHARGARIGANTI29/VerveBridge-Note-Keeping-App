import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
    return (
        <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                    <h6 className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">{title}</h6>
                    <span className="text-xs text-slate-500 block">{moment(date).format('Do MMM YYYY')}</span>
                </div>
                <MdOutlinePushPin 
                    className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} 
                    onClick={onPinNote} 
                />
            </div>
            <p className="text-sm text-slate-800 mb-2">{content?.slice(0, 60)}</p>
            <div className="flex items-center justify-between mt-auto">
                <div className="text-xs text-slate-500 flex-1">
                    {tags.map((item, index) => (
                        <span key={index} className="mr-1">#{item} </span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <MdCreate
                        className="icon-btn hover:text-green-600"
                        onClick={onEdit}
                    />
                    <MdDelete
                        className="icon-btn hover:text-red-600"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
