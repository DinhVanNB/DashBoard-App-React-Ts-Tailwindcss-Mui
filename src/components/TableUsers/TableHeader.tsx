import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material"
import { themeOptions } from "../../themes/theme"

interface propsType{
    usersData: Record<string,any>
    selectedItems: string[]
    onSelectAll: (e:React.ChangeEvent<HTMLInputElement>)=>void
    orderBy:string
    order:'asc' | 'desc'
    onHanldeSort:(id:string)=>void
}


const labelHead =[
    {
        id:'lastName',
        label: 'Name'
    },
    {
        id:'email',
        label:'Email'
    },
    {
        id: 'phone',
        label:'Phone'
    },
    {
        id: 'position',
        label: 'Position'
    },
    {
        id:'gender',
        label: 'Gender'
    }
]

export default function TableHeader(props: propsType){
    const { usersData , selectedItems , onSelectAll, orderBy, order, onHanldeSort} = props; 
    
    const rowCount = usersData?.data?.length ||0
    const countSelect = selectedItems?.length ||0


    return(
        <TableHead>
            <TableRow>
                <TableCell>
                    <Checkbox 
                        sx={{
                            color: themeOptions.palette.gray.main,
                            '&.Mui-checked': {
                                color: themeOptions.palette.blue.active,}
                        }}
                        indeterminate={countSelect>0 && {...usersData}?.data?.filter((user:any)=> !selectedItems.includes(user.id))?.length>0 }
                        checked = {rowCount>0 && {...usersData}?.data?.filter((user:any)=> selectedItems.includes(user.id))?.length === usersData?.data?.length  }
                        onChange={onSelectAll}
                    />
                </TableCell>
                {
                    labelHead.map(cell=>(
                        <TableCell
                            key={cell.id}
                            sortDirection={orderBy===cell.id?order:false}
                        >
                            <TableSortLabel
                                active={orderBy===cell.id}
                                direction={orderBy===cell.id?order:'asc'}
                                onClick={()=>onHanldeSort(cell.id)}
                            >
                                <Typography>{cell.label}</Typography>
                            </TableSortLabel>
                        </TableCell>
                    ))
                }
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    )
}