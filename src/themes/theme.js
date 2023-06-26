import { createTheme } from "@mui/material";


export const themeOptions={
    palette:{
        primary:{
            main: '#556cd6',
        },
        background:{
            default:'#e0e0e1',
        },
        green: {
            main: "rgb(0, 82, 73)",
            light: "rgb(200, 250, 205)",
            lighter: "rgba(0, 171, 85, 0.08)",
            dark: "rgb(0, 123, 85)",
            darker: "rgb(0, 171, 85)",
        },
        blue: {
            main: "rgb(4, 41, 122)",
            dark: "rgb(12, 83, 183)",
            light: "rgb(208, 242, 255)",
            active: '#6870fa',
            },
        yellow: {
            main: "rgb(122, 79, 1)",
            dark: "rgb(183, 129, 3)",
            light: "rgb(255, 247, 205)",
        },
        maroon: {
            main: "rgb(122, 12, 46)",
            dark: "rgb(183, 33, 54)",
            light: "rgb(255, 231, 217)",
        },
        gray: {
            main: "rgb(99, 115, 129)",
            light: "rgb(223, 223, 223)",
            lighter: "rgb(244, 246, 248)",
        },
        red: {
            main: "rgb(255,120,117)",
        },
    },
    mixins:{
        toolbar: {
            minHeight: 60,
            paddingTop: 8,
            paddingBottom: 8
        }
    },
    typography:{
        fontFamily: ["Public Sans", "sans-serif"].join(","),
        fontSize: 13,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        h1: {
            fontWeight: 600,
            fontSize: '2.375rem',
            lineHeight: 1.21
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.875rem',
            lineHeight: 1.27
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.33
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.4
        },
        h5: {
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.5
        },
        h6: {
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: 1.57
        },
        caption: {
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.66
        },
        body1: {
            fontSize: '0.875rem',
            lineHeight: 1.57
        },
        body2: {
            fontSize: '0.75rem',
            lineHeight: 1.66
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: 1.57
        },
        subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 500,
            lineHeight: 1.66
        },
        overline: {
            lineHeight: 1.66
        },
        button: {
            textTransform: 'capitalize',
        }
    }
}

const theme = createTheme(themeOptions)

export default theme