import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../../util/httpsForUser/https";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () =>{
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { mutateAsync , isPending, error, isError } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success('Login successfully!')
            navigate('/');
            queryClient.invalidateQueries();
        },
        onError: ()=>{
            toast.error('Invalid Credentials!');
        }
    });

    return {loginMutate : mutateAsync, isPending, error, isError };
}

















// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useDispatch } from 'react-redux';
// import { setCredentials, logout } from '../store/features/authSlice';
// import { getUserProfile, loginUser } from '../api/authApi';
// import { getToken } from '../utils/localStorage';

// export const useLogin = () => {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       dispatch(setCredentials({ token: data.token }));
//       localStorage.setItem('token', data.token);
//       queryClient.invalidateQueries({ queryKey: ['userProfile'] });
//     },
//     onError: (error) => {
//       console.error('Login error:', error.message);
//     }
//   });
// };

// export const useUserProfile = () => {
//   const dispatch = useDispatch();
  
//   return useQuery({
//     queryKey: ['userProfile'],
//     queryFn: getUserProfile,
//     onError: (error) => {
//       if (error.message.includes('401')) {
//         dispatch(logout());
//       }
//     },
//     enabled: !!getToken(),
//     retry: false, // لا تحاول إعادة المحاولة عند فشل الطلب
//   });
// };