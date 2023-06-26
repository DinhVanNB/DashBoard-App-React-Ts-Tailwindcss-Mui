
import { useNavigate, useSearchParams } from "react-router-dom";
import TableHeader from "./TableHeader";
import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import userApi from "../../api/userApi";
import { setAccessToken, setAppToast, setLoading } from "../../redux/appSlice";
import { routes } from "../../configs/routes";
import { Avatar, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Toolbar, Tooltip, Typography, TableFooter, TablePagination} from "@mui/material";
import { themeOptions } from "../../themes/theme";
import { DeleteIcon, REACT_APP_PUBLIC_URL } from "../../configs/constant";
import ActionCell from "./ActionCell";

type Order = 'asc' | 'desc';

export default function TableUsers(){
    const [searchParams] = useSearchParams();
    const [order,setOrder] = useState<Order>(searchParams.get('order')? searchParams.get('order') as Order :"asc")
    const [orderBy, setOrderBy] = useState(searchParams.get('orderBy')||'lastName')
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [page, setPage] = useState(Number(searchParams.get('page')||0)); 
    const [rowsPerPage , setRowsPerPage] = useState(Number(searchParams.get('pageSize')||5));
    const [keyWord, setKeyWord] = useState(searchParams.get('keyWord')|| ''); 
    const [usersData, setUserData] = useState<any>({});
    const [reload, setReload] = useState(false);
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const paramsURL: string = window.location.search


    useEffect(()=>{
        searchParams.get('keyWord')? 
        handleSearch(paramsURL):
        handleGetUser(paramsURL)
        // eslint-disable-next-line 
    },[paramsURL, reload])

    const handleSearch = async(params:string)=>{
        try{
            dispatch(setLoading(true))
            const {status, result}= await userApi.onSearchUser(params);
            if(result?.data?.transaction && result?.data?.transaction !=='') dispatch(setAccessToken(result.data.transaction));
            if(status>300) dispatch(setAppToast({status, message: result.message}));
            if(status ===200) setUserData(result?.data)
            dispatch(setLoading(false))
        }
        catch(e){
            dispatch(setAppToast({message:`Connect error!!`, status:403}))
        }
    }

    const handleGetUser=async(params:string)=>{
        try{
            dispatch(setLoading(true))
            const {status, result}= await userApi.onGetUsers(params);
            if(result?.data?.transaction && result?.data?.transaction !=='') dispatch(setAccessToken(result.data.transaction));
            if(status>300) dispatch(setAppToast({status, message: result.message}));
            if(status ===200) setUserData(result?.data)
            dispatch(setLoading(false))
        }
        catch(e){
            dispatch(setAppToast({message:`Connect error!!`, status:403}))
        }
    }


    const onSelectAll =({target}:React.ChangeEvent<HTMLInputElement>)=>{
        setSelectedItems(target.checked ? usersData?.data?.map((user:any)=> user.id):[]);
    }

    const onSelectItem =({target}:React.ChangeEvent<HTMLInputElement>,id:string)=>{
        setSelectedItems((prev:any[]) => target.checked? prev.concat(id): prev.filter((userId:string) => userId!==id))
    }

    const onHanldeSort =(data:string)=>{
        const isAsc = orderBy===data && order ==='asc';
        navigate(`${routes.users.path}${keyWord!==''? `?keyWord=${keyWord}&`:'?'}page=0&pageSize=${rowsPerPage}&orderBy=${data}&order=${isAsc? 'desc' : 'asc'}`)
        setOrder(isAsc? 'desc' : 'asc')
        setPage(0)
        setRowsPerPage(5)
        setOrderBy(data)
    }

    const handleEnterSearch =(e:React.KeyboardEvent)=>{
        if(e.key==='Enter'){
            navigate(`${routes.users.path}${keyWord!==''? `?keyWord=${keyWord}&`:'?'}&page=0&pageSize=${rowsPerPage}&orderBy=${orderBy}&order=${order}`)
        }
    }

    const handleEdit = async(data:object)=>{
        try{
            dispatch(setLoading(true))
            const {status, result} = await userApi.onEdit(data);
            dispatch(setAppToast({status, message: result.message}));
            if(status===201) {toggleReload(); navigate(`${routes.users.path}?page=0&pageSize=${rowsPerPage}&orderBy=${orderBy}&order=${order}`)}
            dispatch(setLoading(false))
        }
        catch(e){
            dispatch(setAppToast({message:`Connect error!!`, status:403}))
        }
    };

    const handleDelete =async(id:string)=>{
        try{
            dispatch(setLoading(true))
            const {status, result} = await userApi.onDeleteById(id);
            dispatch(setAppToast({status, message: result.message}));
            if(status===201){toggleReload(); navigate(`${routes.users.path}?page=0&pageSize=${rowsPerPage}&orderBy=${orderBy}&order=${order}`)}
            dispatch(setLoading(false))
            setSelectedItems([])
        }
        catch(e){
            dispatch(setAppToast({message:`Connect error!!`, status:403}))
        }
    };

   

    const handleDeleteMulti =async()=>{
        try{
            dispatch(setLoading(true))
            const {status, result} = await userApi.onDeleteMulti(selectedItems);
            dispatch(setAppToast({status, message: result.message}));
            if(status===201) navigate(`${routes.users.path}?page=0&pageSize=${rowsPerPage}&orderBy=${orderBy}&order=${order}`)
            dispatch(setLoading(false))
            setSelectedItems([])
        }
        catch(e){
            dispatch(setAppToast({message:`Connect error!!`, status:403}))
        }
    };

    const chooseTypeDelete=()=>{
        if(selectedItems?.length===1) return handleDelete(selectedItems[0])
        handleDeleteMulti()
    }


    const toggleReload = ()=>{
        setReload(prev=>!prev)
    }

    const handleChangePage = (e:unknown,newPage:number) => {
        navigate(`${routes.users.path}${keyWord!==''? `?keyWord=${keyWord}&`:'?'}page=${newPage}&pageSize=${rowsPerPage}&orderBy=${orderBy}&order=${order}`)
        setPage(newPage);
    };

    const handleChangeRowsPerPage =({target}:React.ChangeEvent<HTMLInputElement>) =>{
        navigate(`${routes.users.path}${keyWord!==''? `?keyWord=${keyWord}&`:'?'}page=0&pageSize=${target.value}&orderBy=${orderBy}&order=${order}`)
        setRowsPerPage(parseInt(target.value));
        setPage(0)
    };

    return(
        <Paper sx={{boxShadow:`0px 0px 3px 1px ${themeOptions.palette.gray.light}`}}>
            <Toolbar sx={{...(selectedItems?.length>0 && {
                bgcolor: themeOptions.palette.blue.light,
                opacity: 0.5
            })}}>
                {
                    selectedItems?.length<1 &&  <TextField onKeyUp={handleEnterSearch}  onChange={(e)=>setKeyWord(e.target.value)} sx={{maxHeight:themeOptions.mixins.toolbar.minHeight}} variant="outlined" placeholder="Search..." />
                }
                {selectedItems?.length>0 && 
                    <>
                        <Typography sx={{ flex: '1 1 100%' }} variant="h5">{`${selectedItems.length} rows selected!`}</Typography>
                        <Tooltip title='Delete selected!'>
                            <IconButton onClick={chooseTypeDelete}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </>
                }
            </Toolbar>
            <TableContainer>
                <Table>


                    <TableHeader
                        order={order}
                        orderBy={orderBy} 
                        onSelectAll={onSelectAll} 
                        usersData={usersData}  
                        selectedItems = {selectedItems}
                        onHanldeSort = {onHanldeSort}
                    />

                    <TableBody>
                    {
                            usersData?.data?.map((user:any)=>{
                                return (
                                    <TableRow sx={{width:'100%'}} key={user.id} >
                                        <TableCell width='2%'>
                                            <Checkbox  
                                                checked={selectedItems.indexOf(user.id)!==-1}
                                                onChange={(e)=>onSelectItem(e,user.id)}
                                                sx={{color: themeOptions.palette.gray.main, 
                                                    '&.Mui-checked': {
                                                         color: themeOptions.palette.blue.active,},
                                                    }}
                                            />
                                        </TableCell>
                                        <TableCell width='35%'>
                                            <Avatar sx={{display:'inline-block', marginRight:'10px', width:'35px', height:'35px',verticalAlign:'middle'}} src={user?.image?`${REACT_APP_PUBLIC_URL}${(JSON.parse(user?.image))?.['0']}`||'':''} alt=''/>
                                            <Typography sx={{display:'inline-block',verticalAlign:'middle'}}>{user.firstName + ' ' + user.lastName}</Typography>
                                        </TableCell>
                                        <TableCell width='21%'><Typography>{user.email}</Typography></TableCell>
                                        <TableCell width='15%'><Typography>{user.phone}</Typography></TableCell>
                                        <TableCell width='15%'><Typography>{user.position}</Typography></TableCell>
                                        <TableCell width='5%'><Typography>{user.gender}</Typography> </TableCell>
                                        <TableCell width='2%'> <ActionCell user={user} handleDelete={handleDelete} handleEdit={handleEdit} /> </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>


                    <TableFooter>
                        <TableRow>
                            <TablePagination                                                                                                         
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: usersData?.count || -1 }]}
                            colSpan={7}
                            count={usersData?.count || 0 }
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            
        </Paper>
    )
}

