import { styled } from "@mui/system";
import laptopImage from "../../../assets/images/SignBg.jpg";
import { Box } from "@mui/material";

// تنسيق للخلفية
export const SignUpContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: `url(${laptopImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "20px",
    position: "relative", // إضافة هذا السطر

    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)", // تضيف طبقة معتمة فوق الخلفية
        zIndex: -1, // إضافة هذا السطر لجعل الطبقة خلفية فقط
        pointerEvents: "none", // يمنع التأثير على التفاعل مع العناصر الأخرى
    },
    zIndex: 1,
});

// تنسيق الحقول الشفافة
export const FormContainer = styled(Box)({
    padding: "30px",
    borderRadius: "10px",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)", 
});

export const RightSection = styled(Box)({
    textAlign: "center",
    color: "white",
    zIndex: 1,
    width: '47rem'
});