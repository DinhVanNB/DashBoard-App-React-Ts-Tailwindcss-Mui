import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, useTheme} from '@mui/material';
import { VisibilityIcon, Edit, MoreVert, DeleteIcon } from '../../configs/constant';
import { routes } from '../../configs/routes';
import EditDialog from './EditDialog';
import DeleteDialog from './DeleteDialog';

interface propsType{
    user:any
    handleDelete:(id:string)=>void
    handleEdit:(data:object)=>Promise<void>
}

export default function ActionCell({user, handleDelete, handleEdit}:propsType){
    const [anchor, setAnchor] = useState< null| HTMLElement>(null);
    const [openModal, setOpenModal] = useState({type:'',isOpen:false})
    const open = Boolean(anchor);
    const navigate  = useNavigate();
    const theme = useTheme()

    return(
        <>
            <IconButton  aria-label="Edit User" onClick={(e:React.MouseEvent<HTMLElement>)=>setAnchor(e.currentTarget)} size="small">
                <MoreVert fontSize="small"/>
            </IconButton>
            <Menu 
                sx={{ "& .MuiListItemIcon-root": {
                    color: theme.palette.text.secondary,
                    minWidth: 0,
                    marginRight: theme.spacing(2),
                },}}
                open={open}
                anchorEl={anchor}
                onClose={()=>setAnchor(null)}
                PaperProps={{ sx: { width: 150, maxWidth: "100%" } }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
               >
                <MenuItem onClick={()=>{setAnchor(null);navigate(`${routes.info.path}?id=${user.id}`)}}>
                    <ListItemIcon>
                        <VisibilityIcon/>
                    </ListItemIcon>
                    <ListItemText primary="View"/>
                </MenuItem>
                <MenuItem onClick={()=>{setOpenModal({type:'edit',isOpen:true});setAnchor(null)}}>
                    <ListItemIcon>
                        <Edit/>
                    </ListItemIcon>
                    <ListItemText primary="Edit"/>
                       
                </MenuItem>
                <MenuItem onClick={()=>{setOpenModal({type:'delete',isOpen:true});setAnchor(null)}}>
                    <ListItemIcon>
                        <DeleteIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Delete"/>
                </MenuItem>
            </Menu>
            <Dialog 
                open={openModal.isOpen}
                // onClose={()=>setOpenModal({type:'',isOpen:false})}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                   openModal.type ==='edit' && <EditDialog handleEdit={handleEdit} setOpenModal={setOpenModal} user={user} />
                } 
                {
                    openModal.type ==='delete' && <DeleteDialog handleDelete={handleDelete} user={user} setOpenModal={setOpenModal}/>
                } 
            </Dialog>
        </>
    )
}