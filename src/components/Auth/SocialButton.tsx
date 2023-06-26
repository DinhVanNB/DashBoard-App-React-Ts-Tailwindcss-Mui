import { Button, Divider, Grid, Typography, Stack} from "@mui/material";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../../configs/constant";

interface PropsType {
    caption: string
}

const SocialButton =({caption}:PropsType)=>{

    return(
        <>
            <Grid item xs={12}>
                <Divider>
                    <Typography variant="caption">
                        {caption}
                    </Typography>
                </Divider>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" gap={2} className=" justify-between items-center">
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ color: "rgb(223, 62, 48)",padding: "10px 0",borderColor:'#ccc'}}
                    >
                        <GoogleIcon/>
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ color: "rgb(24, 119, 242)",padding: "10px 0",borderColor:'#ccc'}}
                    >
                        <FacebookIcon/>
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ color: "rgb(3,169,244)",padding: "10px 0",borderColor:'#ccc'}}
                    >
                        <TwitterIcon/>
                    </Button>
                </Stack>
            </Grid>
        </>
    )
}

export default SocialButton;